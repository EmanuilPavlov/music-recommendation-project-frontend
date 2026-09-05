'use client'

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Play, Pause} from "lucide-react";
import {cn} from "@/lib/utils";
import {Typography} from "@/lib/typography";
import { useState } from "react";

import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration.js';

interface PlaylistItemProps {
    title: string;
    artist?: string;
    tags: string;
    duration: number;
    artwork?: string;
    active?: boolean;
    playing?: boolean;
    onSelect?: () => void;
}

// ⚠️ IMPORTANT: Extend dayjs with duration plugin
dayjs.extend(duration);

// Default album art SVG (matches Spotify's circular music note aesthetic)
const DEFAULT_ALBUM_ART = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23333'/%3E%3Cstop offset='100%25' style='stop-color:%231a1a1a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ccircle cx='200' cy='200' r='90' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='6'/%3E%3Ccircle cx='200' cy='200' r='60' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='3'/%3E%3Ctext x='200' y='215' text-anchor='middle' font-family='sans-serif' font-size='64' fill='rgba(255,255,255,0.15)' font-weight='300'%3E♫%3C/text%3E%3C/svg%3E";

export function PlaylistItem({
                                 title,
                                 artist,
                                 tags,
                                 duration,
                                 artwork,
                                 active = false,
                                 playing = false,
                                 onSelect,
                             }: PlaylistItemProps) {
    const [imgError, setImgError] = useState(false);

    const getImageSrc = () => {
        if (artwork && !imgError) {
            return artwork;
        }
        return DEFAULT_ALBUM_ART;
    };

    return (
        <Card
            onClick={onSelect}
            className={cn(
                "!flex !flex-row !flex-nowrap items-center gap-3 sm:gap-4 rounded-lg !p-3 sm:!p-4 transition-colors cursor-pointer group",
                active
                    ? "border border-[#e8493f]/50 bg-gradient-to-r from-[#e8493f]/50 via-[#e8493f]/25 to-transparent shadow-[0_0_18px_3px_rgba(232,73,63,0.35)]"
                    : "border-none bg-transparent shadow-none hover:bg-muted/50"
            )}
        >
            {/* Artwork with default fallback */}
            <div className="relative h-16 w-16 sm:h-14 sm:w-14 shrink-0 rounded-[10px] overflow-hidden shadow-md">
                <img
                    src={getImageSrc()}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImgError(true)}
                />
                {/* Subtle overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <CardHeader className="min-w-0 flex-1 gap-0 p-0">
                <CardTitle className="truncate font-semibold leading-none">
                    <Typography
                        variant="p"
                        className={cn("truncate", active ? "text-[#e8e8ea]" : "text-foreground")}
                    >
                        {title}
                    </Typography>
                </CardTitle>
                <CardDescription className="truncate">
                    <Typography variant="muted" className="truncate">
                        {artist ?? tags}
                    </Typography>
                </CardDescription>
            </CardHeader>

            <CardContent className="hidden shrink-0 whitespace-nowrap p-0 sm:block">
                <Typography variant="muted">
                    {(() => dayjs.duration(duration, 'seconds').format('m:ss'))()}
                </Typography>
            </CardContent>

            <CardFooter className="shrink-0 border-none p-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-9 w-9 shrink-0 rounded-full cursor-pointer transition-all duration-200",
                        active
                            ? "bg-[#e8493f] hover:bg-[#e8493f]/90 border-none shadow-lg shadow-[#e8493f]/30"
                            : "bg-transparent border border-white/15 hover:border-white/30 hover:bg-white/5 hover:scale-105"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect?.();
                    }}
                >
                    {playing ? (
                        <Pause className="text-foreground" fill="currentColor" />
                    ) : (
                        <Play className="text-foreground" fill="currentColor" />
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}