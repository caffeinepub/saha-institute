import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PopupAnnouncement {
    id: bigint;
    createdAt: Time;
    audioUrl?: string;
    isActive: boolean;
    message: string;
    videoUrl?: string;
}
export interface SiteWideEffect {
    id: bigint;
    active: boolean;
    createdAt: Time;
    description: string;
    effectType: string;
    triggerEpisode: string;
}
export interface EmbedConfig {
    announcementVideoEmbedUrl?: string;
    youtubeIntroUrl: string;
    youtubeFacebookPageUrl: string;
}
export type Time = bigint;
export type MockTestContent = {
    __kind__: "pdf";
    pdf: string;
} | {
    __kind__: "video";
    video: string;
} | {
    __kind__: "text";
    text: string;
};
export interface Announcement {
    id: bigint;
    createdAt: Time;
    text: string;
    audioUrl?: string;
    videoUrl?: string;
}
export interface Centre {
    id: string;
    phoneNumbers: Array<string>;
    name: string;
    address?: string;
}
export interface UserProfile {
    name: string;
}
export interface MockTest {
    id: bigint;
    title: string;
    content: MockTestContent;
    createdAt: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateCentre(id: string, name: string, phoneNumbers: Array<string>, address: string | null): Promise<void>;
    adminToggleEffectActive(isActive: boolean): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearSiteWideEffect(): Promise<void>;
    createAnnouncement(text: string, videoUrl: string | null, audioUrl: string | null): Promise<bigint>;
    createMockTest(title: string, content: MockTestContent): Promise<bigint>;
    createOrUpdatePopupAnnouncement(id: bigint | null, message: string, videoUrl: string | null, audioUrl: string | null): Promise<bigint>;
    deactivatePopupAnnouncement(id: bigint): Promise<void>;
    deleteAnnouncement(id: bigint): Promise<void>;
    deleteCentre(id: string): Promise<void>;
    deleteMockTest(id: bigint): Promise<void>;
    deletePopupAnnouncement(id: bigint): Promise<void>;
    getActivePopupAnnouncements(): Promise<Array<PopupAnnouncement>>;
    getActiveSiteWideEffect(): Promise<SiteWideEffect | null>;
    getAllPopupsSorted(): Promise<Array<PopupAnnouncement>>;
    getAllPopupsSortedById(): Promise<Array<PopupAnnouncement>>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCentres(): Promise<Array<Centre>>;
    getEmbedConfig(): Promise<EmbedConfig>;
    getMockTests(): Promise<Array<MockTest>>;
    getMockTestsByType(contentType: string): Promise<Array<MockTest>>;
    getPopupAnnouncementById(id: bigint): Promise<PopupAnnouncement | null>;
    getPopupsPaged(pageSize: bigint, pageNum: bigint): Promise<{
        hasNextPage: boolean;
        popups: Array<PopupAnnouncement>;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isEffectActive(effectType: string): Promise<boolean>;
    revokeAdminAccess(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    triggerSiteWideEffect(description: string, effectType: string, triggerEpisode: string): Promise<bigint>;
    unlockAdminAccess(accessCode: string): Promise<boolean>;
    updateAnnouncement(id: bigint, text: string, videoUrl: string | null, audioUrl: string | null): Promise<void>;
    updateEmbedConfig(config: EmbedConfig): Promise<void>;
    updateMockTest(id: bigint, title: string, content: MockTestContent): Promise<void>;
}
