"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminAppSidebar() {
    const { setTheme, theme } = useTheme();
    const pathName = usePathname();
    const { setOpen } = useSidebar();

    const menu = [
        {
            title: "Home",
            url: "/home",
        },
        {
            title: "Events",
            url: "/event",
        },
        {
            title: "Attendance",
            url: "/attendance",
        },
        {
            title: "users",
            url: "/user",
        },
        {
            title: "Settings",
            url: "/setting",
        },
    ];
    const handleClick = (url: string) => {
        if (url.includes("scan")) {
            setOpen(false);
        }
    };
    return (
        <Sidebar className="w-a96">
            <SidebarHeader className="h-14 border-b">
                <div className="w-full h-full flex items-center justify-between px-2">
                    <h1>Face Mark (Admin)</h1>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarMenu>
                        {menu.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className="h-10"
                                    isActive={pathName.includes(item.url)}
                                    onAbort={() => handleClick(item.url)}
                                >
                                    <a href={item.url}>
                                        {/* <item.icon /> */}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <Button
                        onClick={() => signOut({ callbackUrl: "/signin" })}
                        variant="destructive"
                    >
                        Sign Out
                    </Button>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
