"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    ChevronDown,
    Clock,
    LogOut,
    Settings,
    User,
    X,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { SidebarMenuData } from "@/data/menu-elements"
import Logo from "@/components/custom-components/logo"
import { useAuth } from "@/context/AuthContext"
import { Container } from "@/lib/container"
import { Typography } from "@/lib/typography"
import { cn } from "@/lib/utils"
import { groupHistoryByDate, formatRelativeTime, type HistoryItem } from "@/type/user-search-history"
import userService from "@/services/user-service"

const HISTORY_POLL_INTERVAL_MS = 15_000

export default function SidebarApp() {
    const pathname = usePathname()
    const router = useRouter()
    const [historyOpen, setHistoryOpen] = useState(true)
    const [accountOpen, setAccountOpen] = useState(false)
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [refreshTick, setRefreshTick] = useState(0)

    const { isMobile, setOpenMobile } = useSidebar()
    const { user, logout } = useAuth()

    const historyGroups = useMemo(() => groupHistoryByDate(history), [history])

    // Fetch on mount / login, and whenever refreshTick bumps (polling below).
    useEffect(() => {
        if (!user?.firebaseUid) {
            setHistory([])
            return
        }

        let cancelled = false

        userService
            .getUserSearchHistory(user.firebaseUid)
            .then((data) => {
                if (!cancelled) setHistory(data)
            })
            .catch(() => {
                if (!cancelled) setHistory([])
            })

        return () => {
            cancelled = true
        }
    }, [user?.firebaseUid, refreshTick])

    // Poll periodically so a search made elsewhere in the app (e.g. the
    // sessions page) shows up here without needing a shared context/store.
    useEffect(() => {
        if (!user?.firebaseUid) return

        const interval = setInterval(() => {
            setRefreshTick((tick) => tick + 1)
        }, HISTORY_POLL_INTERVAL_MS)

        return () => clearInterval(interval)
    }, [user?.firebaseUid])

    // Re-runs a past search using the same filters it was saved with.
    // Adjust the path/param names below to match your actual sessions route.
    const replayHistoryItem = (item: HistoryItem) => {
        const params = new URLSearchParams({
            mood: item.type,
            limit: String(item.limit),
        })
        router.push(`/sessions?${params.toString()}`)
        if (isMobile) setOpenMobile(false)
    }

    const handleLogout = async () => {
        setAccountOpen(false)
        await logout()
        router.push("/login")
    }

    const goTo = (href: string) => {
        setAccountOpen(false)
        router.push(href)
    }

    const initial = (() => {
        if (user?.displayName) {
            const parts = user.displayName.trim().split(/\s+/)
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            }
            return parts[0].slice(0, 2).toUpperCase()
        }
        if (user?.email) {
            return user.email.slice(0, 2).toUpperCase()
        }
        return "?"
    })()

    return (
        <Sidebar
            side="left"
            collapsible="offcanvas"
            className="border-[#1f1f22] bg-[#0a0a0a] text-[#e8e8ea]"
        >
            <SidebarHeader className="mt-1 flex flex-row items-center justify-between px-4 py-4">
                <Logo size={32} />

                {isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-[#71717a] hover:bg-[#18181b] hover:text-[#e8e8ea]"
                        onClick={() => setOpenMobile(false)}
                        aria-label="Close menu"
                    >
                        <X className="size-4" />
                    </Button>
                )}
            </SidebarHeader>

            <SidebarContent className="px-1">
                {/* Main navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wide text-[#52525b]">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-1">
                        <SidebarMenu className="gap-0.5">
                            {SidebarMenuData.map((item) => {
                                const isActive = pathname === item.href

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={cn(
                                                "rounded-[9px] px-3 py-2 text-[13.5px] font-medium text-[#a1a1aa] transition-colors",
                                                "hover:bg-[#18181b] hover:text-[#e8e8ea]",
                                                isActive &&
                                                "bg-[#e8493f]/10 text-[#f2f2f3] hover:bg-[#e8493f]/10 hover:text-[#f2f2f3]"
                                            )}
                                        >
                                            <Link href={item.href} className="flex items-center gap-2.5">
                                                <item.icon
                                                    className={cn(
                                                        "size-4",
                                                        isActive ? "text-[#e8493f]" : "text-[#71717a]"
                                                    )}
                                                />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* History */}
                <Collapsible
                    open={historyOpen}
                    onOpenChange={setHistoryOpen}
                    className="group/collapsible mt-2 flex min-h-0 flex-1 flex-col"
                >
                    <Separator className="my-2 bg-[#1f1f22]" />
                    <SidebarGroup className="flex min-h-0 flex-1 flex-col">
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="flex w-full items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-[#52525b] hover:text-[#a1a1aa]">
                                <Clock className="size-3.5" />
                                <span>History</span>
                                <ChevronDown className="ml-auto size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>

                        <CollapsibleContent className="flex min-h-0 flex-1 flex-col">
                            <ScrollArea className="h-full pr-2 [&_[data-slot=scroll-area-scrollbar]]:hidden">
                                <SidebarGroupContent className="mt-1">
                                    {history.length === 0 ? (
                                        <Container as="div" className="px-3 py-1.5 text-xs text-[#52525b]">
                                            No recent activity
                                        </Container>
                                    ) : (
                                        historyGroups.map((group) => (
                                            <Container as="div" key={group.label} className="mb-2 last:mb-0">
                                                <Typography
                                                    variant="span"
                                                    className="block px-3 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-wide text-[#3f3f46]"
                                                >
                                                    {group.label}
                                                </Typography>
                                                <SidebarMenu className="gap-0.5">
                                                    {group.items.map((item) => (
                                                        <SidebarMenuItem key={item.id}>
                                                            <SidebarMenuButton
                                                                size="sm"
                                                                tooltip={`Replay ${item.title} · ${item.limit} sessions`}
                                                                onClick={() => replayHistoryItem(item)}
                                                                className="h-auto flex-col items-start gap-0 rounded-[9px] px-3 py-1.5 text-[13px] text-[#a1a1aa] hover:bg-[#18181b] hover:text-[#e8e8ea]"
                                                            >
                                                                <span className="flex w-full items-center gap-1.5">
                                                                    <span className="truncate">{item.title}</span>
                                                                    {item.count > 1 && (
                                                                        <span className="shrink-0 rounded-full bg-[#e8493f]/15 px-1.5 py-px text-[10px] font-semibold text-[#e8493f]">
                                                                            ×{item.count}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <span className="truncate text-[10.5px] text-[#52525b]">
                                                                    {item.limit} sessions · {formatRelativeTime(item.timestamp)}
                                                                </span>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </Container>
                                        ))
                                    )}
                                </SidebarGroupContent>
                            </ScrollArea>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>

            {/* Account footer */}
            <SidebarFooter className="border-t border-[#1f1f22] p-2">
                {user && (
                    <DropdownMenu open={accountOpen} onOpenChange={setAccountOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "flex h-auto w-full items-center gap-2.5 rounded-[10px] p-2 text-left transition-colors",
                                    "hover:bg-[#18181b]",
                                    accountOpen && "bg-[#18181b]"
                                )}
                            >
                                <Container
                                    as="div"
                                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8493f] text-md  font-semibold text-[#1a0a09]"
                                >
                                    {initial}
                                    <Typography variant={"span"} className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-500" />
                                </Container>
                                <Container as="div" className="grid min-w-0 flex-1 text-left leading-tight gap-1!">
                                    <Typography variant="span" className="truncate text-[13px] font-semibold text-[#f2f2f3]">
                                        {user.displayName || "Account"}
                                    </Typography>
                                    <Typography variant="span" className="truncate text-[11.5px] text-[#71717a]">
                                        {user.email}
                                    </Typography>
                                </Container>
                                <ChevronDown
                                    className={cn(
                                        "size-3.5 shrink-0 text-[#52525b] transition-transform",
                                        accountOpen && "rotate-180"
                                    )}
                                />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            side="top"
                            align="end"
                            sideOffset={10}
                            className="w-64 rounded-[14px] border border-[#2a2a2e] bg-[#131316] p-1.5 text-[#e8e8ea] shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <Container as="div" className="flex items-center gap-1 px-2.5 py-2.5">
                                    <Container
                                        as="div"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8493f] text-lg font-semibold text-[#1a0a09]"
                                    >
                                        {initial}
                                    </Container>
                                    <Container as="div" className="min-w-0">
                                        <Typography variant="p" className="text-center mt-0! truncate text-[13.5px] font-semibold text-[#f2f2f3]">
                                            {user.displayName || "Account"}
                                        </Typography>
                                        <Typography variant="p" className="text-center mt-0! truncate text-[12px] text-[#71717a]">
                                            {user.email}
                                        </Typography>
                                    </Container>
                                </Container>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="my-1 bg-[#2a2a2e]" />

                            <DropdownMenuItem
                                onClick={() => goTo("/profile")}
                                className="cursor-pointer gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] text-[#d4d4d8] focus:bg-[#1f1f22] focus:text-[#f2f2f3]"
                            >
                                <User className="size-4 text-[#71717a]" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => goTo("/settings")}
                                className="cursor-pointer gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] text-[#d4d4d8] focus:bg-[#1f1f22] focus:text-[#f2f2f3]"
                            >
                                <Settings className="size-4 text-[#71717a]" />
                                Settings
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="my-1 bg-[#2a2a2e]" />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] font-medium text-[#e0857a] focus:bg-[#e8493f]/10 focus:text-[#e8493f]"
                            >
                                <LogOut className="size-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}