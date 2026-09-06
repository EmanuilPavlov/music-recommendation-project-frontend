import type {FilterValue} from "@/components/custom-components/filter-bar";

export enum MedicalCondition {
    ADHD = "ADHD",
    Anxiety = "Anxiety",
    Dementia = "Dementia",
    Depression = "Depression",
    Dyslexia = "Dyslexia",
    Insomnia = "Insomnia"
}

export const CONDITION_OPTIONS: FilterValue[] = [
    { label: MedicalCondition.ADHD },
    { label: MedicalCondition.Anxiety },
    { label: MedicalCondition.Dementia },
    { label: MedicalCondition.Depression },
    { label: MedicalCondition.Dyslexia },
    { label: MedicalCondition.Insomnia }
];