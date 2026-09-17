"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function CustomSidebarTrigger() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            className="md:hidden text-[#9c9ca1] hover:text-[#e8e8ea] hover:bg-transparent"
        >
            <Menu className="h-5 w-5" />
        </Button>
    );
}