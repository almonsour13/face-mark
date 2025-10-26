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
            className={`h-14 w-full px-4 flex items-center justify-between border-b sticky top-0  shrink-0 ${className} transform transition duration-300 ease-in-out`}
        >
            {children}
        </header>
    );
}
