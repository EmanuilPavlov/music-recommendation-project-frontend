"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/lib/container";
import { Typography } from "@/lib/typography";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        router.push(user ? '/player' : '/auth');
    }, [user, loading, router]);

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