import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Centre = {
    id : Text;
    name : Text;
    phoneNumbers : [Text];
    address : ?Text;
  };

  type EmbedConfig = {
    youtubeIntroUrl : Text;
    youtubeFacebookPageUrl : Text;
    announcementVideoEmbedUrl : ?Text;
  };

  type MockTestContent = {
    #video : Text;
    #pdf : Text;
    #text : Text;
  };

  type MockTest = {
    id : Nat;
    title : Text;
    content : MockTestContent;
    createdAt : Time.Time;
  };

  type Announcement = {
    id : Nat;
    text : Text;
    videoUrl : ?Text;
    audioUrl : ?Text;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  public type SiteWideEffect = {
    id : Nat;
    description : Text;
    effectType : Text;
    active : Bool;
    triggerEpisode : Text;
    createdAt : Time.Time;
  };

  public type PopupAnnouncement = {
    id : Nat;
    message : Text;
    isActive : Bool;
    createdAt : Time.Time;
    videoUrl : ?Text;
    audioUrl : ?Text;
  };

  let centres = Map.empty<Text, Centre>();
  let mockTests = Map.empty<Nat, MockTest>();
  let announcements = Map.empty<Nat, Announcement>();

  var activeSiteWideEffect : ?SiteWideEffect = null;
  let popupAnnouncements = List.empty<PopupAnnouncement>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var embedConfig : EmbedConfig = {
    youtubeIntroUrl = "";
    youtubeFacebookPageUrl = "";
    announcementVideoEmbedUrl = null;
  };

  var nextMockTestId = 1;
  var nextAnnouncementId = 1;
  var nextPopupId = 1;
  var nextSiteWideEffectId = 1;

  // Admin access code
  let ADMIN_ACCESS_CODE = "12345-QUICKL";

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Announcement {
    public func compare(a : Announcement, b : Announcement) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
  };

  module PopupAnnouncementHelper {
    public func compareByCreatedAt(a : PopupAnnouncement, b : PopupAnnouncement) : Order.Order {
      if (a.createdAt < b.createdAt) { #less } else if (a.createdAt > b.createdAt) { #greater } else {
        #equal;
      };
    };

    public func compareById(a : PopupAnnouncement, b : PopupAnnouncement) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Admin Access Management
  public shared ({ caller }) func unlockAdminAccess(accessCode : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can unlock admin access");
    };
    if (accessCode == ADMIN_ACCESS_CODE) {
      AccessControl.assignRole(accessControlState, caller, caller, #admin);
      true;
    } else {
      false;
    };
  };

  public shared ({ caller }) func revokeAdminAccess() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can revoke admin access");
    };
    AccessControl.assignRole(accessControlState, caller, caller, #user);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Centres & Contacts
  public query ({ caller }) func getCentres() : async [Centre] {
    centres.values().toArray();
  };

  public shared ({ caller }) func addOrUpdateCentre(id : Text, name : Text, phoneNumbers : [Text], address : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update centres");
    };
    let centre : Centre = {
      id;
      name;
      phoneNumbers;
      address;
    };
    centres.add(id, centre);
  };

  public shared ({ caller }) func deleteCentre(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete centres");
    };
    centres.remove(id);
  };

  // Embed Configuration
  public query ({ caller }) func getEmbedConfig() : async EmbedConfig {
    embedConfig;
  };

  public shared ({ caller }) func updateEmbedConfig(config : EmbedConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update embed config");
    };
    embedConfig := config;
  };

  // Mock Tests
  public query ({ caller }) func getMockTests() : async [MockTest] {
    mockTests.values().toArray();
  };

  public query ({ caller }) func getMockTestsByType(contentType : Text) : async [MockTest] {
    switch (contentType) {
      case ("video") { mockTests.values().toArray().filter(func(t) { switch (t.content) { case (#video(_)) { true }; case (_) { false } } }) };
      case ("pdf") { mockTests.values().toArray().filter(func(t) { switch (t.content) { case (#pdf(_)) { true }; case (_) { false } } }) };
      case ("text") { mockTests.values().toArray().filter(func(t) { switch (t.content) { case (#text(_)) { true }; case (_) { false } } }) };
      case (_) { [] };
    };
  };

  public shared ({ caller }) func createMockTest(title : Text, content : MockTestContent) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create mock tests");
    };
    let id = nextMockTestId;
    let mockTest : MockTest = {
      id;
      title;
      content;
      createdAt = Time.now();
    };
    mockTests.add(id, mockTest);
    nextMockTestId += 1;
    id;
  };

  public shared ({ caller }) func updateMockTest(id : Nat, title : Text, content : MockTestContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update mock tests");
    };
    switch (mockTests.get(id)) {
      case (null) { Runtime.trap("Mock test not found") };
      case (?existing) {
        let updated : MockTest = {
          id;
          title;
          content;
          createdAt = existing.createdAt;
        };
        mockTests.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteMockTest(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete mock tests");
    };
    mockTests.remove(id);
  };

  // Announcements
  public query ({ caller }) func getAnnouncements() : async [Announcement] {
    announcements.values().toArray().sort();
  };

  public shared ({ caller }) func createAnnouncement(text : Text, videoUrl : ?Text, audioUrl : ?Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create announcements");
    };
    let id = nextAnnouncementId;
    let announcement : Announcement = {
      id;
      text;
      videoUrl;
      audioUrl;
      createdAt = Time.now();
    };
    announcements.add(id, announcement);
    nextAnnouncementId += 1;
    id;
  };

  public shared ({ caller }) func updateAnnouncement(id : Nat, text : Text, videoUrl : ?Text, audioUrl : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update announcements");
    };
    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?existing) {
        let updated : Announcement = {
          id;
          text;
          videoUrl;
          audioUrl;
          createdAt = existing.createdAt;
        };
        announcements.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteAnnouncement(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    announcements.remove(id);
  };

  // Sitewide lasting effects (since episode 5)
  public shared ({ caller }) func triggerSiteWideEffect(description : Text, effectType : Text, triggerEpisode : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can trigger site-wide effects");
    };

    let id = nextSiteWideEffectId;
    let newEffect : SiteWideEffect = {
      id;
      description;
      effectType;
      active = true;
      triggerEpisode;
      createdAt = Time.now();
    };
    activeSiteWideEffect := ?newEffect;
    nextSiteWideEffectId += 1;
    id;
  };

  public shared ({ caller }) func clearSiteWideEffect() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can clear site-wide effects");
    };
    activeSiteWideEffect := null;
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getActiveSiteWideEffect() : async ?SiteWideEffect {
    activeSiteWideEffect;
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func isEffectActive(effectType : Text) : async Bool {
    switch (activeSiteWideEffect) {
      case (null) { false };
      case (?effect) {
        effect.active and effect.effectType == effectType;
      };
    };
  };

  public shared ({ caller }) func adminToggleEffectActive(isActive : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can activate or deactivate effects");
    };
    switch (activeSiteWideEffect) {
      case (null) { Runtime.trap("No active effect found") };
      case (?effect) {
        activeSiteWideEffect := ?{
          effect with active = isActive;
        };
      };
    };
  };

  // Persistent popup announcements (since episode 5)
  public shared ({ caller }) func createOrUpdatePopupAnnouncement(
    id : ?Nat,
    message : Text,
    videoUrl : ?Text,
    audioUrl : ?Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage popups");
    };

    var popupId = switch (id) {
      case (null) {
        let newId = nextPopupId;
        nextPopupId += 1;
        newId;
      };
      case (?existingId) { existingId };
    };

    let currentTime = Time.now();
    let newPopup : PopupAnnouncement = {
      id = popupId;
      message;
      isActive = true;
      createdAt = currentTime;
      videoUrl;
      audioUrl;
    };

    if (id == null) {
      popupAnnouncements.add(newPopup);
    } else {
      var found = false;
      let transformedList = popupAnnouncements.toArray().map(
        func(p) {
          if (p.id == popupId) {
            found := true;
            newPopup;
          } else {
            p;
          };
        }
      );
      if (not found) {
        popupAnnouncements.add(newPopup);
      } else {
        popupAnnouncements.clear();
        popupAnnouncements.addAll(transformedList.values());
      };
    };
    popupId;
  };

  public shared ({ caller }) func deletePopupAnnouncement(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete popups");
    };

    var indexToRemove : ?Nat = null;
    let transformedList = popupAnnouncements.toArray().map(
      func(p) {
        if (p.id == id) {
          if (indexToRemove == null) {
            indexToRemove := ?0;
          };
          p;
        } else {
          p;
        };
      }
    );

    switch (indexToRemove) {
      case (null) { () };
      case (?_) {
        popupAnnouncements.clear();
        for (i in Nat.range(0, transformedList.size())) {
          if (i != 0) {
            let p = transformedList[i];
            popupAnnouncements.add(p);
          };
        };
      };
    };
  };

  public shared ({ caller }) func deactivatePopupAnnouncement(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can deactivate popups");
    };
    let transformedArray = popupAnnouncements.toArray().map(
      func(p) {
        if (p.id == id) {
          { p with isActive = false };
        } else {
          p;
        };
      }
    );
    popupAnnouncements.clear();
    popupAnnouncements.addAll(transformedArray.values());
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getActivePopupAnnouncements() : async [PopupAnnouncement] {
    popupAnnouncements.toArray().filter(func(p) { p.isActive });
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getPopupAnnouncementById(id : Nat) : async ?PopupAnnouncement {
    switch (popupAnnouncements.toArray().find(func(p) { p.id == id })) {
      case (null) { null };
      case (?popup) { ?popup };
    };
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getAllPopupsSorted() : async [PopupAnnouncement] {
    popupAnnouncements.toArray().sort(
      PopupAnnouncementHelper.compareByCreatedAt
    );
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getAllPopupsSortedById() : async [PopupAnnouncement] {
    popupAnnouncements.toArray().sort(
      PopupAnnouncementHelper.compareById
    );
  };

  // Public query - accessible by all users including guests for frontend page load
  public query ({ caller }) func getPopupsPaged(pageSize : Nat, pageNum : Nat) : async {
    popups : [PopupAnnouncement];
    hasNextPage : Bool;
  } {
    let sortedList = popupAnnouncements.toArray().sort(
      PopupAnnouncementHelper.compareByCreatedAt
    );
    let totalPopups = sortedList.size();
    let start = pageNum * pageSize;
    if (start >= totalPopups) {
      return { popups = []; hasNextPage = false };
    };
    let end = Nat.min(start + pageSize, totalPopups);
    let popups = sortedList.sliceToArray(start, end);
    let hasNextPage = end < totalPopups;
    { popups; hasNextPage };
  };
};
