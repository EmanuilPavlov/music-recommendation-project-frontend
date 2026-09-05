// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Pulsewell",
    description: "Get personalized music recommendations based on your mood",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full antialiased dark",
                geist.variable,
                geistMono.variable,
                jetbrainsMono.variable
            )}
        >
        <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    );
}
