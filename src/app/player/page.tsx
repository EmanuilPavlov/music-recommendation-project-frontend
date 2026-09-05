'use client';

import { useAuth } from "@/context/AuthContext";
import { Container } from "@/lib/container";
import SessionsPage from "@/components/dashboard-components/session-page";
import {Typography} from "@/lib/typography";

export default function PlayerPage() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <Container as={"div"} className="flex items-center justify-center min-h-screen bg-background">
                <Container as={"div"} className="flex flex-col items-center gap-4">
                    <Container as={"div"} className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <Typography variant={"p"} className="text-muted-foreground">
                        Loading...
                    </Typography>
                </Container>
            </Container>
        );
    }

    return (
        <Container as="div" variant={"section"} className="font-sans !m-0 !p-0 rounded-none!">
            <SessionsPage />
        </Container>
    );
}