import type {FilterValue} from "@/components/custom-components/filter-bar";

export enum Mood {
    Happy = "Happy",
    Sad = "Sad",
    Angry = "Angry",
    Romantic = "Romantic",
}

export const MOOD_OPTIONS: FilterValue[] = [
    { label: Mood.Happy },
    { label: Mood.Sad },
    { label: Mood.Angry },
    { label: Mood.Romantic },
];