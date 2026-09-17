import * as React from "react";
import { cn } from "@/lib/utils";

const base = "text-gray-900";

const variants = {
    h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 text-3xl font-semibold tracking-tight pb-1",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6 text-foreground",
    lead: "text-xl text-muted-foreground",
    muted: "text-sm text-muted-foreground",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    ul: "my-6 ml-6 list-disc [&>li]:mt-2",
    code: "rounded bg-muted px-1 py-0.5 font-mono text-sm",
    pre: "my-6 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm",
    table: "w-full text-sm",
    span: "text-foreground",
} as const;

type Variant = keyof typeof variants;

export interface TypographyProps
    extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    variant?: Variant;
}

export function Typography({
                               as,
                               variant = "p",
                               className,
                               ...props
                           }: TypographyProps) {
    const Comp =
        as ??
        (variant === "blockquote"
            ? "blockquote"
            : variant === "lead"
                ? "p"
                : variant === "muted"
                    ? "p"
                    : variant === "ul"
                        ? "ul"
                        : variant === "code"
                            ? "code"
                            : variant === "pre"
                                ? "pre"
                                : variant === "table"
                                    ? "table"
                                    : variant);

    return (
        <Comp
            className={cn(base, variants[variant], className)}
            {...props}
        />
    );
}