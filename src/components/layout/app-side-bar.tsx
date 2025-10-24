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

export default function AppSidebar() {
    const pathName = usePathname();
    const { setOpen } = useSidebar();
    
    const menu = [
        {
            title: "Events",
            url: "/event",
        },
        {
            title:"Users",
            url:"/user"
        }
    ];
    useEffect(() => {
        if (pathName.includes("scan") && pathName.includes("event")) {
            setOpen(false);
        }
    }, [pathName]);
    return (
        <Sidebar className="w-a96">
            <SidebarHeader className="h-14 border-b">
                <div className="w-full h-full flex items-center px-2">
                    <h1>Face Mark</h1>
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
            <SidebarFooter />
        </Sidebar>
    );
}
