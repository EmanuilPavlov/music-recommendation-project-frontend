import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "@/components/dashboard-components/sidebar-app";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <SidebarProvider defaultOpen={true}>
                <SidebarApp />

                <SidebarInset className="p-0 m-0">
                    <main className="h-full">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
