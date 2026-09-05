"use client";

import { useEffect, useMemo, useState } from "react";
import { SessionHero } from "@/components/dashboard-components/session-hero";
import { Playlist } from "@/components/dashboard-components/playlist";
import { Container } from "@/lib/container";
import recommendService from "@/services/recommend-service";
import type { SongRecommendation } from "@/type/song-recommendation";
import { Mood } from "@/type/Mood";
import { MedicalCondition } from "@/type/MedicalCondition";
import type { SearchType } from "@/components/custom-components/filter-bar";

function toDisplaySession(song: SongRecommendation) {
    return {
        id: song.audioUrl,
        title: song.title,
        tags: `${song.artist} - ${song.bpm} bpm`,
        duration: song.duration,
        artwork: song.artwork,
        audioUrl: song.audioUrl,
    };
}

export default function SessionsPage() {
    const [selectedType, setSelectedType] = useState<SearchType>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(10);
    const [songs, setSongs] = useState<SongRecommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<string>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const hasFilter = selectedType !== null && selectedValue !== null;

    function handleFiltersChange(type: SearchType, value: string | null, newLimit: number) {
        setSelectedType(type);
        setSelectedValue(value);
        setLimit(newLimit);
    }

    function handleSetFilter() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        if (!hasFilter) {
            setSongs([]);
            setError(null);
            return;
        }

        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);
            try {
                let results: SongRecommendation[];
                if (selectedType === "mood") {
                    results = await recommendService.getRecommendationsByMood(selectedValue as Mood, limit);
                } else {
                    results = await recommendService.getRecommendationsByMedicalCondition(selectedValue as MedicalCondition, limit);
                }
                if (!cancelled) setSongs(results);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load sessions");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [selectedType, selectedValue, hasFilter, limit]);

    const displaySessions = useMemo(() => songs.map(toDisplaySession), [songs]);

    function handleSelect(id: string) {
        if (id === currentId) {
            setIsPlaying((p) => !p);
        } else {
            setCurrentId(id);
            setIsPlaying(true);
        }
    }

    return (
        <Container as={"div"} className="flex flex-col gap-3 sm:gap-4">
            <SessionHero
                sessionCount={displaySessions.length}
                totalDuration=""
                isPlaying={isPlaying}
                isSaved={isSaved}
                onPlayAll={() => displaySessions[0] && handleSelect(displaySessions[0].id)}
                onToggleSave={() => setIsSaved((s) => !s)}
                onFiltersChange={handleFiltersChange}
            />

            {error && (
                <div className="mx-4 sm:mx-6 rounded-[9px] border border-[#e8493f]/30 bg-[#e8493f]/10 px-3.5 py-2.5 text-[12px] sm:text-[13px] text-[#e0857a]">
                    {error}
                </div>
            )}

            <div className="px-0 sm:px-1">
                <Playlist
                    sessions={displaySessions}
                    hasFilter={hasFilter}
                    currentId={currentId}
                    isPlaying={isPlaying}
                    onSelect={handleSelect}
                    onSetFilter={handleSetFilter}
                    loading={loading}
                />
            </div>
        </Container>
    );
}