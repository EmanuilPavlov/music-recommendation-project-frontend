'use client'

import {SlidersHorizontal, ListX} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Container} from "@/lib/container";
import {Typography} from "@/lib/typography";
import {PlaylistItem} from "@/components/custom-components/list_item";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import React from "react";
import {SongData} from "@/type/song-recommendation";


interface PlaylistProps {
    sessions?: SongData[],
    hasFilter?: boolean,
    currentId?: string,
    isPlaying?: boolean,
    onSelect?: (id: string) => void,
    onSetFilter?: () => void,
    loading?: boolean
}

const SKELETON_ROWS = 6;

function PlaylistItemSkeleton() {
    return (
        <Card
            className={cn(
                "!flex !flex-row !flex-nowrap items-center gap-3 sm:gap-4",
                "rounded-lg !p-3 sm:!p-4",
                "border-none bg-transparent shadow-none"
            )}
        >
            <Skeleton className="h-16 w-16 sm:h-14 sm:w-14 shrink-0 rounded-[10px] bg-[#1c1c1f]" />

            <CardHeader className="min-w-0 flex-1 gap-1.5 p-0">
                <Skeleton className="h-4 w-[60%] rounded-full bg-[#1c1c1f]" />
                <Skeleton className="h-3 w-[38%] rounded-full bg-[#1c1c1f]" />
            </CardHeader>

            <CardContent className="hidden shrink-0 p-0 sm:block">
                <Skeleton className="h-3 w-8 rounded-full bg-[#1c1c1f]" />
            </CardContent>

            <CardFooter className="shrink-0 border-none p-0">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-[#1c1c1f]" />
            </CardFooter>
        </Card>
    );
}

function PlaylistLoadingState() {
    return (
        <Container as="ul" variant="stack" className="gap-2">
            {Array.from({length: SKELETON_ROWS}).map((_, i) => (
                <PlaylistItemSkeleton key={i} />
            ))}
        </Container>
    );
}

export function Playlist({
                             sessions = [],
                             hasFilter = true,
                             currentId,
                             isPlaying = false,
                             onSelect,
                             onSetFilter,
                             loading = false,
                         }: PlaylistProps) {
    return (
        <ScrollArea className="h-full w-full">
            <Container variant="section" className="flex-1 py-2 my-2">
                {loading ? (
                    <PlaylistLoadingState />
                ) : !hasFilter ? (
                    <Container as="div" className="flex flex-col items-center px-5 py-8 text-center">
                        <Container as="div"
                                   className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <ListX size={26} className="text-muted-foreground"/>
                        </Container>
                        <Typography variant="h4" className="mb-2 text-foreground">
                            Nothing matched yet
                        </Typography>
                        <Typography variant="muted" className="mb-6 max-w-sm">
                            Choose a mood or a condition and Pulsewell will line up sessions for it.
                        </Typography>
                        <Button
                            className="gap-2 rounded-full bg-[#e8493f] text-background hover:bg-[#e8493f]/90"
                            onClick={onSetFilter}
                        >
                            <SlidersHorizontal size={15}/>
                            Set mood and conditions
                        </Button>
                    </Container>
                ) : sessions.length === 0 ? (
                    <Container as="div" className="flex flex-col items-center px-5 py-20 text-center">
                        <Container as="div"
                                   className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <ListX size={26} className="text-muted-foreground"/>
                        </Container>
                        <Typography variant="h4" className="mb-2">
                            No matches for this combination
                        </Typography>
                        <Typography variant="muted" className="mb-6 max-w-sm">
                            Try a different mood or condition, or clear a filter to widen the results.
                        </Typography>
                        <Button
                            variant="outline"
                            className="gap-2 rounded-full"
                            onClick={onSetFilter}
                        >
                            <SlidersHorizontal size={15}/>
                            Adjust filters
                        </Button>
                    </Container>
                ) : (
                    <Container as="ul" variant="stack" className="gap-2">
                        {sessions.map((s) => (
                            <PlaylistItem
                                key={s.id}
                                title={s.title}
                                artist={s.artist}
                                bpm={s.bpm}
                                duration={s.duration}
                                artwork={s.artwork}
                                matchedEffect={s.matchedEffect}
                                relatedSymptoms={s.relatedSymptoms}
                                active={s.id === currentId}
                                playing={s.id === currentId && isPlaying}
                                onSelect={() => onSelect?.(s.id)}
                            />
                        ))}
                    </Container>
                )}
            </Container>
        </ScrollArea>
    );
}