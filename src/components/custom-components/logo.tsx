"use client";

import { Activity } from "lucide-react";

const sizeMap = {
    sm: { box: 24, icon: 12, text: "text-sm", gap: "gap-1.5" },
    md: { box: 32, icon: 16, text: "text-base", gap: "gap-2" },
    lg: { box: 40, icon: 20, text: "text-lg", gap: "gap-2.5" },
    xl: { box: 48, icon: 24, text: "text-xl", gap: "gap-3" },
} as const;

export interface LogoProps {
    size?: keyof typeof sizeMap | number;
    showText?: boolean;
    className?: string;
}

export default function Logo({
                                 size = "md",
                                 showText = true,
                                 className = "",
                             }: LogoProps) {
    const preset = typeof size === "string" ? sizeMap[size] : null;

    const boxSize = preset ? preset.box : size;
    const iconSize = preset ? preset.icon : size / 2;
    const textClass = preset ? preset.text : "text-xl";
    const gapClass = preset ? preset.gap : "gap-3";

    return (
        <div className={`flex items-center ${gapClass} ${className}`}>
            <div
                className="flex items-center justify-center bg-[#e8493f] text-[#1a0a09] rounded-lg shrink-0"
                style={{ width: boxSize, height: boxSize }}
            >
                <Activity style={{ width: iconSize, height: iconSize }} />
            </div>

            {showText && (
                <span className={`font-semibold text-[#f2f2f3] ${textClass}`}>
                    Pulsewell
                </span>
            )}
        </div>
    );
}