// app/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/lib/container";
import { Typography } from "@/lib/typography";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Wait for AuthContext to finish resolving before deciding where
        // to send the person. router.push() isn't setState, so this
        // doesn't trigger the "setState in effect" warning the previous
        // version had from wrapping it in setIsRedirecting(true) first.
        if (loading) return;
        router.push(user ? '/player' : '/login');
    }, [user, loading, router]);

    // This page never renders real content - it's purely a router that
    // sends people to /player or /login, so a single loading state
    // covers the whole lifetime of this component.
    return (
        <Container as={"div"} className="flex items-center justify-center min-h-screen">
            <Container as={"div"} className="flex flex-col items-center gap-4">
                <Container
                    as={"div"}
                    className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                />
                <Typography variant={"p"} className="text-muted-foreground">
                    Loading...
                </Typography>
            </Container>
        </Container>
    );
}