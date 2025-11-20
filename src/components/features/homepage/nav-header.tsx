"use client";

import AppLogo from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Scan, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavHeader() {
    const { setTheme, theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menus = [
        {
            title: "Features",
            href: "#features",
        },
        {
            title: "How It Works",
            href: "#how-it-works",
        },
        {
            title: "Use Cases",
            href: "#use-cases",
        },
    ];
    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-muted/80 backdrop-blur-lg" : "bg-transparent"
            }`}
        >
            <div className="px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <AppLogo/>
                            <span className="text-xl uppercase font-semibold">
                                Face Mark
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            {menus.map((menu, index) => (
                                <a
                                    key={index}
                                    href={menu.href}
                                    className="text-sm font-light text-foreground transition-colors"
                                >
                                    {menu.title}
                                </a>
                            ))}
                            <div className="flex items-center gap-3">
                                <Link href="#contact">
                                    <Button>Contact Us</Button>
                                </Link>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        setTheme(
                                            theme === "dark" ? "light" : "dark"
                                        )
                                    }
                                >
                                    {theme === "dark" ? <Sun /> : <Moon />}
                                </Button>
                            </div>
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-border/30">
                    <div className="px-6 py-4 space-y-3">
                        <a
                            href="#features"
                            className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How It Works
                        </a>
                        <a
                            href="#use-cases"
                            className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Use Cases
                        </a>
                        <a
                            href="#pricing"
                            className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </a>
                        <div className="pt-3 space-y-2">
                            <button className="w-full px-4 py-2 text-sm font-light border border-border/30 rounded-lg hover:border-border/50 transition-colors">
                                Sign In
                            </button>
                            <button className="w-full px-4 py-2 bg-foreground text-background rounded-lg text-sm font-light hover:bg-foreground/90 transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
