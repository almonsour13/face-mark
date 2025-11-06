import { useEffect } from "react";

interface HeaderProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
}
export default function Header({ title, className, children }: HeaderProps) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return (
        <header
            className={`${className} h-14 bg-background w-full px-2 md:px-4 flex items-center justify-between border-b sticky top-0 z-20  shrink-0  transform transition duration-300 ease-in-out`}
        >
            {children}
        </header>
    );
}
