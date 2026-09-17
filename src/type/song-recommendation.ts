export interface SongRecommendationBase {
    title: string;
    artist: string;
    bpm: number;
    audioUrl: string;
    artwork: string;
    duration: number;
}

export interface SongImageProps {
    src?: string | null;
    alt?: string;
    width?: number;
    height?: number;
}

export interface MoodRecommendation extends SongRecommendationBase {
    mood: string;
}

export interface MedicalConditionRecommendationResponse extends SongRecommendationBase {
    condition: string;
    matchedEffect: string;
    relatedSymptoms: string[];
}

export type SongRecommendation = MoodRecommendation | MedicalConditionRecommendationResponse;

export interface SongData {
    id: string;
    title: string;
    artist?: string;
    bpm: number;
    audioUrl: string;
    duration: number;
    artwork?: string;
    active?: boolean;
    matchedEffect?: string;
    relatedSymptoms?: string[];
}

export interface PlaylistItemProps {
    title: string;
    artist?: string;
    bpm: number;
    duration: number;
    artwork?: string;
    matchedEffect?: string;
    relatedSymptoms?: string[];
    active?: boolean;
    playing?: boolean;
    onSelect?: () => void;
}