import {Heart, History, Home, Search} from "lucide-react";

export const SidebarMenuData = [
    {
        title: "Home",
        icon: Home,
        href: "/dashboard",
        isActive: true
    },
    {
        title: "Search",
        icon: Search,
        href: "/search",
        isActive: false
    },
    {
        title: "Your History",
        icon: History,
        href: "/history",
        isActive: false
    },
    {
        title: "Favorites",
        icon: Heart,
        href: "/favorites",
        isActive: false
    }
]