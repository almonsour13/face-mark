import { useEffect, useState } from "react";

interface HeaderProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
}
export default function Header({ title, className, children }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return (
        <header
            className={`${className} ${
                isScrolled &&
                "bg-background/80 backdrop-blur-md border-b "
            } transition-all duration-30 h-14 border-b bg-background w-full px-2 md:px-4 flex items-center justify-between sticky top-0 z-20  shrink-0  transform`}
        >
            {children}
        </header>
    );
}
