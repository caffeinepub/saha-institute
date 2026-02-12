import Map "mo:core/Map";
import List "mo:core/List";

module {
  type Announcement = {
    id : Nat;
    text : Text;
    videoUrl : ?Text;
    audioUrl : ?Text;
    createdAt : Int;
  };

  type OldActor = {
    centres : Map.Map<Text, { id : Text; name : Text; phoneNumbers : [Text]; address : ?Text }>;
    mockTests : Map.Map<Nat, { id : Nat; title : Text; content : { #video : Text; #pdf : Text; #text : Text }; createdAt : Int }>;
    announcements : Map.Map<Nat, Announcement>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    embedConfig : { youtubeIntroUrl : Text; youtubeFacebookPageUrl : Text; announcementVideoEmbedUrl : ?Text };
    nextMockTestId : Nat;
    nextAnnouncementId : Nat;
  };

  type NewActor = {
    centres : Map.Map<Text, { id : Text; name : Text; phoneNumbers : [Text]; address : ?Text }>;
    mockTests : Map.Map<Nat, { id : Nat; title : Text; content : { #video : Text; #pdf : Text; #text : Text }; createdAt : Int }>;
    announcements : Map.Map<Nat, Announcement>;
    userProfiles : Map.Map<Principal, { name : Text }>;
    embedConfig : { youtubeIntroUrl : Text; youtubeFacebookPageUrl : Text; announcementVideoEmbedUrl : ?Text };
    nextMockTestId : Nat;
    nextAnnouncementId : Nat;
    activeSiteWideEffect : ?{
      id : Nat;
      description : Text;
      effectType : Text;
      active : Bool;
      triggerEpisode : Text;
      createdAt : Int;
    };
    popupAnnouncements : List.List<{
      id : Nat;
      message : Text;
      isActive : Bool;
      createdAt : Int;
      videoUrl : ?Text;
      audioUrl : ?Text;
    }>;
    nextPopupId : Nat;
    nextSiteWideEffectId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    { old with activeSiteWideEffect = null; popupAnnouncements = List.empty(); nextPopupId = 1; nextSiteWideEffectId = 1 };
  };
};
