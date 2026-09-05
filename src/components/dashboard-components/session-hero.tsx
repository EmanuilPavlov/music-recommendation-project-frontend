"use client";

import * as React from "react";
import {
    Activity,
    Download,
    Heart,
    List,
    MoreHorizontal,
    Pause,
    Play,
    X,
} from "lucide-react";

import { Container } from "@/lib/container";
import { Typography } from "@/lib/typography";
import { Button } from "@/components/ui/button";
import {
    UnifiedFilter,
    LimitDropdown,
    type SearchType,
    type FilterValue,
} from "@/components/custom-components/filter-bar";
import { CustomSidebarTrigger } from "@/components/custom-components/custom-sidebar-trigger";
import Logo from "@/components/custom-components/logo";
import { Mood } from "@/type/Mood";
import { MedicalCondition } from "@/type/MedicalCondition";

export interface SessionHeroProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    sessionCount: number;
    totalDuration: string;
    isPlaying?: boolean;
    isSaved?: boolean;
    onPlayAll?: () => void;
    onToggleSave?: () => void;
    onFiltersChange?: (type: SearchType, value: string | null, limit: number) => void;
}

const MOOD_OPTIONS: FilterValue[] = [
    { label: Mood.Happy },
    { label: Mood.Sad },
    { label: Mood.Angry },
    { label: Mood.Romantic },
];

// ✅ Updated with ALL 10 medical conditions from your ontology
const CONDITION_OPTIONS: FilterValue[] = [
    { label: MedicalCondition.ADHD },
    { label: MedicalCondition.Anxiety },
    { label: MedicalCondition.Burnout },
    { label: MedicalCondition.ChronicPain },
    { label: MedicalCondition.Dementia },
    { label: MedicalCondition.Depression },
    { label: MedicalCondition.Dyslexia },
    { label: MedicalCondition.Insomnia },
    { label: MedicalCondition.Schizophrenia },
    { label: MedicalCondition.SevereFatigue },
];

export function SessionHero({
                                eyebrow = "Curated session",
                                title = "Matched to you",
                                description = "Low-tempo, low-percussion sessions matched to your mood and conditions.",
                                sessionCount,
                                totalDuration,
                                isPlaying = false,
                                isSaved = false,
                                onPlayAll,
                                onToggleSave,
                                onFiltersChange,
                            }: SessionHeroProps) {
    const [selectedType, setSelectedType] = React.useState<SearchType>(null);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
    const [limit, setLimit] = React.useState<number>(10);

    const hasSelection = Boolean(selectedType && selectedValue);

    const handleSelect = (type: SearchType, value: string | null) => {
        setSelectedType(type);
        setSelectedValue(value);
        if (onFiltersChange) {
            onFiltersChange(type, value, limit);
        }
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        if (hasSelection && onFiltersChange) {
            onFiltersChange(selectedType, selectedValue, newLimit);
        }
    };

    const clearFilters = () => {
        setSelectedType(null);
        setSelectedValue(null);
        if (onFiltersChange) {
            onFiltersChange(null, null, limit);
        }
    };

    return (
        <Container variant="section" className="overflow-hidden !p-0 !mb-0">
            <Container
                as="div"
                className="absolute inset-x-0 top-0 z-20 flex flex-row items-center justify-between px-4 py-5 sm:hidden"
            >
                <Logo />
                <CustomSidebarTrigger />
            </Container>

            <Container
                as="div"
                className="relative flex h-auto md:h-75 flex-col justify-start px-4 sm:px-6 md:px-7 pt-20 md:pt-8 pb-6 md:pb-8"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.2) 80%, #0a0a0a 100%), radial-gradient(ellipse at 70% 30%, #7c2d12 0%, #451a03 45%, #1c1917 100%)",
                }}
            >
                <Typography variant="muted" className="font-semibold text-[#d4d4d8] text-xs sm:text-sm">
                    {eyebrow}
                </Typography>

                <Typography
                    as="h1"
                    variant="h1"
                    className="mt-1.5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none tracking-tight text-[#f2f2f3]"
                >
                    {title}
                </Typography>


                <Typography variant="p" className="mt-1! max-w-md text-sm sm:text-base text-[#d4d4d8]">
                    {description}
                </Typography>

                <Container variant="row" className="mt-1! gap-1.5 flex-wrap">
                    <Activity className="h-3.5 w-3.5 text-[#e8493f]" />
                    <span className="text-[11px] font-semibold text-[#f2f2f3]">Pulsewell</span>
                    <span className="text-[11px] text-[#71717a] whitespace-nowrap">
                        &middot; {sessionCount} session{sessionCount === 1 ? "" : "s"}, about {totalDuration}
                    </span>
                </Container>

                {/* Filter Controls - Fully Responsive, all inline together */}
                <Container variant="row" className="gap-2 pb-2 pt-1 mt-5 flex-wrap items-center">
                    <UnifiedFilter
                        moodOptions={MOOD_OPTIONS}
                        conditionOptions={CONDITION_OPTIONS}
                        selectedType={selectedType}
                        selectedValue={selectedValue}
                        onSelect={handleSelect}
                        placeholder="Search by mood or condition..."
                    />

                    <LimitDropdown limit={limit} onLimitChange={handleLimitChange} />

                    {hasSelection && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={clearFilters}
                            aria-label="Clear filters"
                            className={
                                "flex h-auto shrink-0 items-center gap-1.5 " +
                                "rounded-[9px] border border-[#2a2a2e] " +
                                "px-3 py-[9px] " +
                                "text-[13px] font-normal text-[#a1a1aa] " +
                                "bg-transparent hover:bg-[#1c1c1f] hover:text-[#e8e8ea] hover:border-[#e8493f]/40 " +
                                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8493f]/40 " +
                                "transition-all"
                            }
                        >
                            <X className="h-3.5 w-3.5 shrink-0" />
                        </Button>
                    )}
                </Container>
            </Container>

            {/* Action Buttons - Fully Responsive */}
            <Container variant="row" className="gap-2 sm:gap-4 px-4 sm:px-6 pb-2 pt-3.5 flex-wrap">
                <Button
                    onClick={onPlayAll}
                    size="icon"
                    className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full bg-[#e8493f] text-[#1a0a09] hover:scale-105 hover:bg-[#e8493f]/90"
                    aria-label={isPlaying ? "Pause" : "Play all sessions"}
                >
                    {isPlaying ? (
                        <Pause className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" fill="currentColor" />
                    ) : (
                        <Play className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" fill="currentColor" />
                    )}
                </Button>

                <button onClick={onToggleSave} aria-label="Save" className="p-1">
                    <Heart
                        className={
                            isSaved
                                ? "h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] fill-[#e8493f] text-[#e8493f]"
                                : "h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] text-[#a1a1aa] transition-colors hover:text-[#e8e8ea]"
                        }
                    />
                </button>

                <button aria-label="Download" className="p-1">
                    <Download className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] text-[#a1a1aa] transition-colors hover:text-[#e8e8ea]" />
                </button>

                <button aria-label="More options" className="p-1">
                    <MoreHorizontal className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] text-[#a1a1aa] transition-colors hover:text-[#e8e8ea]" />
                </button>

                <Container variant="row" className="ml-auto gap-1 text-[10px] sm:text-[11px] text-[#a1a1aa] items-center">
                    <List className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden xs:inline">List</span>
                </Container>
            </Container>
        </Container>
    );
}