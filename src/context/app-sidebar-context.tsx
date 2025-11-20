"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
} from "react";

interface AppSidebarContextProps {
    open: boolean;
    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;
}

const AppSidebarContext = createContext<AppSidebarContextProps | undefined>(
    undefined
);

interface AppSidebarProviderProps {
    children: ReactNode;
}

export const AppSidebarProvider = ({ children }: AppSidebarProviderProps) => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);
    const openSidebar = useCallback(() => setOpen(true), []);
    const closeSidebar = useCallback(() => setOpen(false), []);

    return (
        <AppSidebarContext.Provider
            value={{ open, toggleSidebar, openSidebar, closeSidebar }}
        >
            {children}
        </AppSidebarContext.Provider>
    );
};

export const useAppSidebar = () => {
    const context = useContext(AppSidebarContext);
    if (!context) {
        throw new Error(
            "useAppSidebar must be used within an AppSidebarProvider"
        );
    }
    return context;
};
