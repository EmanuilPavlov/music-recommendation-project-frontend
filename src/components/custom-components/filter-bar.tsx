"use client";

import * as React from "react";
import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    Smile,
    CloudRain,
    Flame,
    Heart,
    Zap,
    BatteryLow,
    CloudDrizzle,
    BookOpen,
    Moon,
    Stethoscope,
    Check,
    X,
    Wind,
    Bone, BrainCog, Bed, Puzzle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@/lib/typography";
import { Container } from "@/lib/container";
import { Mood } from "@/type/Mood";
import { MedicalCondition } from "@/type/MedicalCondition";

export type SearchType = "mood" | "condition" | null;

export interface FilterValue {
    label: string;
    description?: string;
}

export interface UnifiedFilterProps {
    moodOptions: FilterValue[];
    conditionOptions: FilterValue[];
    selectedType: SearchType;
    selectedValue: string | null;
    onSelect: (type: SearchType, value: string | null) => void;
    placeholder?: string;
}

const CATEGORY_ACCENT: Record<"mood" | "condition", string> = {
    mood: "#e0857a",
    condition: "#5dc2b0",
};

const CATEGORY_LABELS: Record<"mood" | "condition", string> = {
    mood: "Mood",
    condition: "Condition",
};

const MOOD_ICONS: Record<Mood, LucideIcon> = {
    [Mood.Happy]: Smile,
    [Mood.Sad]: CloudRain,
    [Mood.Angry]: Flame,
    [Mood.Romantic]: Heart,
};

const CONDITION_ICONS: Record<MedicalCondition, LucideIcon> = {
    [MedicalCondition.ADHD]: Zap,
    [MedicalCondition.Anxiety]: Wind,
    [MedicalCondition.Burnout]: BatteryLow,
    [MedicalCondition.ChronicPain]: Bone,
    [MedicalCondition.Dementia]: BrainCog,
    [MedicalCondition.Depression]: CloudDrizzle,
    [MedicalCondition.Dyslexia]: BookOpen,
    [MedicalCondition.Insomnia]: Bed,
    [MedicalCondition.Schizophrenia]: Puzzle,
    [MedicalCondition.SevereFatigue]: Moon,
};

function getOptionIcon(
    type: SearchType,
    label: string
): LucideIcon {
    if (type === "mood") {
        return MOOD_ICONS[label as Mood] ?? Smile;
    }

    if (type === "condition") {
        return (
            CONDITION_ICONS[label as MedicalCondition] ??
            Stethoscope
        );
    }

    return Smile;
}

interface CategoryRowProps {
    catKey: "mood" | "condition";
    count: number;
    isSelected: boolean;
    isActive: boolean;
    onClick: () => void;
}

function CategoryRow({
                         catKey,
                         count,
                         isSelected,
                         isActive,
                         onClick,
                     }: CategoryRowProps) {
    const accent = CATEGORY_ACCENT[catKey];
    const Icon = catKey === "mood" ? Smile : Stethoscope;

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group w-full rounded-[9px] px-2 py-2 text-left transition-colors",
                "hover:bg-[#1c1c1f]",
                isActive && "bg-[#1c1c1f]"
            )}
        >
            <Container
                variant="row"
                className="w-full justify-between gap-3"
            >
                <Container
                    variant="row"
                    className="gap-3 min-w-0"
                >
                    <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] transition-transform duration-150 group-hover:scale-[1.04]"
                        style={{
                            background: `${accent}1f`,
                            color: accent,
                        }}
                    >
                        <Icon className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0">
                        <Typography
                            as="p"
                            className="text-[13px] font-medium text-[#e8e8ea] leading-tight truncate"
                        >
                            {CATEGORY_LABELS[catKey]}
                        </Typography>

                        <Typography
                            as="p"
                            variant="muted"
                            className="text-[10px] text-[#55555c] leading-tight"
                        >
                            {count} options
                        </Typography>
                    </div>
                </Container>

                <Container
                    variant="row"
                    className="gap-1.5 shrink-0"
                >
                    {isSelected && (
                        <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{
                                background: accent,
                                boxShadow: `0 0 0 3px ${accent}22`,
                            }}
                        />
                    )}

                    <ChevronRight
                        className={cn(
                            "h-3.5 w-3.5 shrink-0 text-[#55555c] transition-transform",
                            "md:group-hover:translate-x-0.5",
                            isActive && "translate-x-0.5"
                        )}
                    />
                </Container>
            </Container>
        </button>
    );
}

interface OptionListProps {
    catKey: "mood" | "condition";
    options: FilterValue[];
    selectedType: SearchType;
    selectedValue: string | null;
    onValueSelect: (
        type: "mood" | "condition",
        value: string
    ) => void;
}

function OptionList({
                        catKey,
                        options,
                        selectedType,
                        selectedValue,
                        onValueSelect,
                    }: OptionListProps) {
    const accent = CATEGORY_ACCENT[catKey];

    return (
        <div className="min-w-0">
            <DropdownMenuLabel className="text-[10px] text-[#55555c] uppercase tracking-[0.08em] px-2 pt-1 pb-3">
                Choose a {CATEGORY_LABELS[catKey].toLowerCase()}
            </DropdownMenuLabel>

            <div className="filter-options-scroll max-h-[280px] overflow-y-auto pr-0.5 space-y-1.5">
                {options.map((option) => {
                    const isSelected =
                        selectedType === catKey &&
                        selectedValue === option.label;

                    const Icon = getOptionIcon(
                        catKey,
                        option.label
                    );

                    return (
                        <DropdownMenuItem
                            key={option.label}
                            onSelect={() =>
                                onValueSelect(
                                    catKey,
                                    option.label
                                )
                            }
                            className={cn(
                                "flex items-center gap-3 rounded-[10px]",
                                "px-3 py-2.5 cursor-pointer",
                                "focus:bg-[#1c1c1f]",
                                isSelected && "border"
                            )}
                            style={
                                isSelected
                                    ? {
                                        background: `${accent}14`,
                                        borderColor: `${accent}40`,
                                    }
                                    : undefined
                            }
                        >
                            <div
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]"
                                style={{
                                    background: isSelected
                                        ? accent
                                        : "#1c1c1f",
                                }}
                            >
                                <Icon
                                    className="h-4 w-4"
                                    style={{
                                        color: isSelected
                                            ? "#0e0e10"
                                            : "#a1a1aa",
                                    }}
                                />
                            </div>

                            <span
                                className={cn(
                                    "flex-1 min-w-0 text-[13.5px] truncate",
                                    isSelected
                                        ? "text-[#f1f1f3] font-medium"
                                        : "text-[#c4c4c8]"
                                )}
                            >
                                {option.label}
                            </span>

                            {isSelected && (
                                <Check
                                    className="h-3.5 w-3.5 shrink-0"
                                    style={{ color: accent }}
                                />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </div>
        </div>
    );
}

export function createMoodOptions(): FilterValue[] {
    return Object.values(Mood).map((mood) => ({
        label: mood,
        description: `Mood: ${mood}`,
    }));
}

export function createConditionOptions(): FilterValue[] {
    return Object.values(MedicalCondition).map((condition) => ({
        label: condition,
        description: `Condition: ${condition}`,
    }));
}

export function UnifiedFilter({
                                  moodOptions,
                                  conditionOptions,
                                  selectedType,
                                  selectedValue,
                                  onSelect,
                                  placeholder = "Search by...",
                              }: UnifiedFilterProps) {
    const [open, setOpen] = React.useState(false);

    const [activeCategory, setActiveCategory] =
        React.useState<"mood" | "condition">("mood");

    const hasSelection = Boolean(
        selectedType && selectedValue
    );

    const accent = selectedType
        ? CATEGORY_ACCENT[selectedType]
        : "#e8493f";

    const getSelectedLabel = () => {
        if (!selectedType || !selectedValue) {
            return null;
        }

        const options =
            selectedType === "mood"
                ? moodOptions
                : conditionOptions;

        return options.find(
            (o) => o.label === selectedValue
        )?.label;
    };

    const handleValueSelect = (
        type: "mood" | "condition",
        value: string
    ) => {
        onSelect(type, value);
        setOpen(false);
    };

    const selectedLabel = getSelectedLabel();

    const activeOptions =
        activeCategory === "mood"
            ? moodOptions
            : conditionOptions;

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
            modal={false}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex items-center gap-2",
                        "h-auto max-w-full",
                        "bg-[#18181b] border-[#2a2a2e]",
                        "rounded-[9px]",
                        "px-3.5 py-[9px]",
                        "text-[13px] font-normal",
                        "hover:bg-[#1c1c1f]",
                        "hover:text-[#e8e8ea]",
                        "focus-visible:outline-none",
                        "focus-visible:ring-1",
                        "focus-visible:ring-[#e8493f]/40",
                        "transition-all",
                        "min-w-[140px]",
                        "sm:min-w-[180px]",
                        "shrink-0"
                    )}
                    style={
                        hasSelection
                            ? {
                                borderColor: `${accent}80`,
                            }
                            : undefined
                    }
                >
                    {hasSelection ? (
                        <>
                            <span
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{
                                    background: accent,
                                    boxShadow: `0 0 0 3px ${accent}22`,
                                }}
                            />

                            <span className="text-[#7a7a7f] hidden sm:inline">
                                {selectedType === "mood"
                                    ? "Mood"
                                    : "Condition"}
                            </span>

                            <span className="text-[#e8e8ea] font-medium truncate">
                                {selectedLabel}
                            </span>
                        </>
                    ) : (
                        <span className="text-[#7a7a7f] truncate">
                            {placeholder}
                        </span>
                    )}

                    <ChevronDown
                        className="h-3.5 w-3.5 transition-transform shrink-0"
                        style={{
                            color: hasSelection
                                ? accent
                                : "#6b6b70",
                        }}
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                sideOffset={8}
                collisionPadding={12}
                className={cn(
                    "bg-[#0e0e10]",
                    "border-[#232327]",
                    "rounded-[14px]",
                    "p-2",
                    "shadow-2xl",
                    "w-[calc(100vw-24px)]",
                    "max-w-[420px]",
                    "md:w-[570px]"
                )}
            >
                <div className="hidden md:flex gap-2">
                    <div className="w-[220px] shrink-0">
                        <DropdownMenuLabel className="text-[10px] text-[#55555c] uppercase tracking-[0.08em] px-1.5 pb-2 pt-1">
                            Filter by
                        </DropdownMenuLabel>

                        <div className="space-y-1.5">
                            <CategoryRow
                                catKey="mood"
                                count={moodOptions.length}
                                isSelected={
                                    selectedType === "mood"
                                }
                                isActive={
                                    activeCategory === "mood"
                                }
                                onClick={() =>
                                    setActiveCategory("mood")
                                }
                            />

                            <CategoryRow
                                catKey="condition"
                                count={conditionOptions.length}
                                isSelected={
                                    selectedType === "condition"
                                }
                                isActive={
                                    activeCategory === "condition"
                                }
                                onClick={() =>
                                    setActiveCategory("condition")
                                }
                            />
                        </div>
                    </div>

                    <div className="w-px bg-[#232327] my-1" />

                    <div className="flex-1 min-w-0 bg-[#151517] rounded-[11px] p-2">
                        <OptionList
                            catKey={activeCategory}
                            options={activeOptions}
                            selectedType={selectedType}
                            selectedValue={selectedValue}
                            onValueSelect={handleValueSelect}
                        />
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="flex items-center justify-between">
                        <DropdownMenuLabel className="text-[10px] text-[#55555c] uppercase tracking-[0.08em] px-1.5 pb-2 pt-1">
                            Filter by
                        </DropdownMenuLabel>
                    </div>

                    <div className="space-y-1.5">
                        <CategoryRow
                            catKey="mood"
                            count={moodOptions.length}
                            isSelected={
                                selectedType === "mood"
                            }
                            isActive={
                                activeCategory === "mood"
                            }
                            onClick={() =>
                                setActiveCategory("mood")
                            }
                        />

                        <CategoryRow
                            catKey="condition"
                            count={conditionOptions.length}
                            isSelected={
                                selectedType === "condition"
                            }
                            isActive={
                                activeCategory === "condition"
                            }
                            onClick={() =>
                                setActiveCategory("condition")
                            }
                        />
                    </div>

                    <div className="mt-3 border-t border-[#232327] pt-2">
                        <div className="bg-[#151517] rounded-[11px] p-2">
                            <OptionList
                                catKey={activeCategory}
                                options={activeOptions}
                                selectedType={selectedType}
                                selectedValue={selectedValue}
                                onValueSelect={handleValueSelect}
                            />
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export interface LimitDropdownProps {
    limit: number;
    onLimitChange: (limit: number) => void;
}

const LIMIT_OPTIONS = [10, 20, 30, 40, 50];

export function LimitDropdown({
                                  limit,
                                  onLimitChange,
                              }: LimitDropdownProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex items-center gap-1.5",
                        "h-auto",
                        "bg-[#18181b]",
                        "border-[#2a2a2e]",
                        "rounded-[9px]",
                        "px-3 py-[9px]",
                        "text-[13px] font-normal",
                        "hover:bg-[#1c1c1f]",
                        "hover:text-[#e8e8ea]",
                        "focus-visible:outline-none",
                        "focus-visible:ring-1",
                        "focus-visible:ring-[#e8493f]/40",
                        "transition-all",
                        "min-w-[100px]",
                        "shrink-0"
                    )}
                >
                    <span className="text-[#7a7a7f]">
                        Limit
                    </span>

                    <span className="text-[#e8e8ea] font-medium">
                        {limit}
                    </span>

                    <ChevronDown className="h-3.5 w-3.5 text-[#6b6b70] shrink-0" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                sideOffset={6}
                collisionPadding={12}
                className="w-[140px] bg-[#18181b] border-[#2a2a2e] rounded-[10px] p-1 overflow-hidden shadow-xl"
            >
                <Container
                    variant="stack"
                    className="gap-2.5"
                >
                    {LIMIT_OPTIONS.map((val) => (
                        <button
                            key={val}
                            type="button"
                            onClick={() => {
                                onLimitChange(val);
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center justify-between",
                                "px-2.5 py-2",
                                "rounded-[6px]",
                                "transition-all",
                                "text-left",
                                limit === val
                                    ? "bg-[#e8493f]/10 border border-[#e8493f]/20 text-[#e8e8ea] font-medium"
                                    : "text-[#a1a1aa] hover:bg-[#222225] hover:text-[#e8e8ea]"
                            )}
                        >
                            <span className="text-[13px]">
                                {val}
                            </span>

                            {limit === val && (
                                <Check className="h-3.5 w-3.5 text-[#e8493f] shrink-0" />
                            )}
                        </button>
                    ))}
                </Container>
            </PopoverContent>
        </Popover>
    );
}

/* ------------------------------------------------------------------ */
/* Clear Filters Button                                                */
/* ------------------------------------------------------------------ */

export interface ClearFiltersButtonProps {
    onClear: () => void;
    visible?: boolean;
}

export function ClearFiltersButton({
                                       onClear,
                                       visible = true,
                                   }: ClearFiltersButtonProps) {
    if (!visible) return null;

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onClear}
            aria-label="Clear filters"
            className={cn(
                "flex items-center gap-1.5",
                "h-auto",
                "bg-transparent",
                "border border-[#2a2a2e]",
                "rounded-[9px]",
                "px-3 py-[9px]",
                "text-[13px] font-normal",
                "text-[#a1a1aa]",
                "hover:bg-[#1c1c1f]",
                "hover:text-[#e8e8ea]",
                "hover:border-[#e8493f]/40",
                "focus-visible:outline-none",
                "focus-visible:ring-1",
                "focus-visible:ring-[#e8493f]/40",
                "transition-all",
                "shrink-0"
            )}
        >
            <span className="hidden sm:inline">Clear filters</span>
            <X className="h-3.5 w-3.5 shrink-0" />
        </Button>
    );
}

/* ------------------------------------------------------------------ */
/* Filters Bar — combines UnifiedFilter + LimitDropdown + Clear        */
/* ------------------------------------------------------------------ */

export interface FiltersBarProps {
    moodOptions: FilterValue[];
    conditionOptions: FilterValue[];
    selectedType: SearchType;
    selectedValue: string | null;
    onFilterSelect: (type: SearchType, value: string | null) => void;
    limit: number;
    onLimitChange: (limit: number) => void;
}

export function FiltersBar({
                               moodOptions,
                               conditionOptions,
                               selectedType,
                               selectedValue,
                               onFilterSelect,
                               limit,
                               onLimitChange,
                           }: FiltersBarProps) {
    const hasActiveFilters = Boolean(selectedType && selectedValue);

    const handleClear = () => {
        onFilterSelect(null, null);
    };

    return (
        <div
            className={cn(
                "flex flex-wrap items-center gap-2",
                "w-full"
            )}
        >
            <UnifiedFilter
                moodOptions={moodOptions}
                conditionOptions={conditionOptions}
                selectedType={selectedType}
                selectedValue={selectedValue}
                onSelect={onFilterSelect}
            />

            <LimitDropdown
                limit={limit}
                onLimitChange={onLimitChange}
            />

            <ClearFiltersButton
                onClear={handleClear}
                visible={hasActiveFilters}
            />
        </div>
    );
}