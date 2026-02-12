import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MockTest {
    id: bigint;
    title: string;
    content: MockTestContent;
    createdAt: Time;
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
export interface EmbedConfig {
    announcementVideoEmbedUrl?: string;
    youtubeIntroUrl: string;
    youtubeFacebookPageUrl: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdateCentre(id: string, name: string, phoneNumbers: Array<string>, address: string | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAnnouncement(text: string, videoUrl: string | null, audioUrl: string | null): Promise<bigint>;
    createMockTest(title: string, content: MockTestContent): Promise<bigint>;
    deleteAnnouncement(id: bigint): Promise<void>;
    deleteCentre(id: string): Promise<void>;
    deleteMockTest(id: bigint): Promise<void>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCentres(): Promise<Array<Centre>>;
    getEmbedConfig(): Promise<EmbedConfig>;
    getMockTests(): Promise<Array<MockTest>>;
    getMockTestsByType(contentType: string): Promise<Array<MockTest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAnnouncement(id: bigint, text: string, videoUrl: string | null, audioUrl: string | null): Promise<void>;
    updateEmbedConfig(config: EmbedConfig): Promise<void>;
    updateMockTest(id: bigint, title: string, content: MockTestContent): Promise<void>;
}
