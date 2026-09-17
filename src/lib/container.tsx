import * as React from "react";
import { cn } from "@/lib/utils";

const PANEL_CLASSNAME =
    "overflow-hidden rounded-xl border-border bg-background shadow-sm";

const BAR_CLASSNAME =
    "flex items-center justify-between border-b border-border px-7 py-5";

const SECTION_CLASSNAME =
    "px-7";

const ROW_CLASSNAME =
    "flex items-center gap-3.5 ";

const STACK_CLASSNAME =
    "flex flex-col gap-2";

const CLUSTER_CLASSNAME =
    "flex flex-wrap items-center gap-2";

const PLAYLIST_ITEM =
    "w-full flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-muted/50";

const PLAYLIST_ITEM_ACTIVE =
    "bg-red";

const variants = {
    panel: PANEL_CLASSNAME,
    bar: BAR_CLASSNAME,
    section: SECTION_CLASSNAME,
    row: ROW_CLASSNAME,
    stack: STACK_CLASSNAME,
    cluster: CLUSTER_CLASSNAME,
    playlistItem: PLAYLIST_ITEM,
} as const;

type Variant = keyof typeof variants;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    variant?: Variant;
    embedded?: boolean;
    active?: boolean;
}

export function Container({
                              as: Comp = "div",
                              variant = "stack",
                              embedded = false,
                              active = false,
                              className,
                              ...props
                          }: ContainerProps) {
    return (
        <Comp
            className={cn(
                embedded && variant === "panel"
                    ? SECTION_CLASSNAME
                    : variants[variant],
                active && variant === "playlistItem" && PLAYLIST_ITEM_ACTIVE,
                className
            )}
            {...props}
        />
    );
}
