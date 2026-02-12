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

  let centres = Map.empty<Text, Centre>();
  let mockTests = Map.empty<Nat, MockTest>();
  let announcements = Map.empty<Nat, Announcement>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var embedConfig : EmbedConfig = {
    youtubeIntroUrl = "";
    youtubeFacebookPageUrl = "";
    announcementVideoEmbedUrl = null;
  };

  var nextMockTestId = 1;
  var nextAnnouncementId = 1;

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Announcement {
    public func compare(a : Announcement, b : Announcement) : Order.Order {
      Int.compare(b.createdAt, a.createdAt);
    };
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
};
