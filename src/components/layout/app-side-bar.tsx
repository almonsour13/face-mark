"use client";

import { roleValue } from "@/constant";
import { useAppSidebar } from "@/context/app-sidebar-context";
import {
    CalendarDays,
    CheckSquare,
    Home,
    LayoutDashboard,
    Menu,
    Moon,
    Settings,
    Sun,
    Users
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function AppSidebar() {
    const { data: session, status } = useSession();
    const { open, toggleSidebar } = useAppSidebar();
    const pathname = usePathname();
    const { setTheme, theme } = useTheme();

    const role = session?.user?.role ? roleValue[session.user.role] : null;

    const menu = [
        {
            title: "Home",
            url: "/home",
            roles: ["user", "admin"],
            icon: Home,
        },
        {
            title: "Dashboard",
            url: "/dashboard",
            roles: ["admin"],
            icon: LayoutDashboard,
        },
        {
            title: "Events",
            url: "/event",
            roles: ["user", "admin"],
            icon: CalendarDays,
        },
        {
            title: "Attendance",
            url: "/attendance",
            roles: ["user", "admin"],
            icon: CheckSquare,
        },
        {
            title: "Users",
            url: "/user",
            roles: ["admin"],
            icon: Users,
        },
        {
            title: "Settings",
            url: "/setting",
            roles: ["user", "admin"],
            icon: Settings,
        },
    ];
    const visibleItems = menu.filter((item) => {
        if (item.roles && item.roles.some((rle) => rle === role)) {
            return true;
        }

        return false;
    });

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
            <div
                className={`
                        flex flex-col w-0 transition-all duration-300 
                        ${open ? "md:w-0" : "w-0 lg:w-64"}`}
            >
                <div
                    className={`w-72 lg:w-64 border-r min-h-screen fixed z-40 bg-background flex flex-col transition-transform duration-300 ${
                        open ? "md:-translate-x-full" : "-translate-x-full lg:translate-x-0"
                    }`}
                >
                    <div className="h-14 border-b px-6 flex items-center gap-3">
                        <h2 className="text-xl font-light">Face Mark</h2>
                    </div>
                    <div className="flex-1">
                        <div className="p-2 min-h-0  flex flex-col items-center">
                            <nav className="space-y-1 w-full">
                                {visibleItems.map((item, index) => {
                                    const isActive = pathname.includes(
                                        item.url
                                    );
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.url}
                                            className="block w-full"
                                        >
                                            <Button
                                                size="lg"
                                                variant={
                                                    isActive
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                className="w-full items-center justify-start px-4 gap-3 font-light"
                                            >
                                                <Icon className="h-5 w-5 flex-shrink-0 stroke-2" />
                                                {item.title}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        {/* 🔹 Common Links */}
                    </div>
                    {session?.user && (
                        <div className="h-14 flex items-center px-6 border-t border-border/30">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                                    <span className="text-sm font-light">
                                        {session.user.name
                                            ?.charAt(0)
                                            .toUpperCase() || "U"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-light text-foreground truncate">
                                        {session.user.name || "User"}
                                    </p>
                                    <p className="text-xs font-light text-muted-foreground truncate">
                                        {role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="px-2 w-full flex h-14 border-t items-center gap-2">
                        <Button
                            size="lg"
                            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                            variant={"destructive"}
                            className="flex-1 items-center justify-start px-4"
                        >
                            Sign out
                        </Button>
                        <Button
                            size="icon-lg"
                            variant="outline"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {theme === "dark" ? <Sun /> : <Moon />}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
export const SidebarTriggerButton = () => {
    const { toggleSidebar } = useAppSidebar();
    return (
        <Button onClick={toggleSidebar} variant="ghost" size="icon-sm">
            <Menu className="w-5 h-5" />
        </Button>
    );
};
