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