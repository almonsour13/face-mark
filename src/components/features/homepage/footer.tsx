import AppLogo from "@/components/app-logo";
import { Scan } from "lucide-react";

export default function Footer() {
    return (
        <footer className="px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <AppLogo/>
                            <span className="text-lg uppercase font-semibold">
                                Face Mark
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light">
                            AI-powered attendance management for modern
                            institutions
                        </p>
                    </div>
                </div>

                <div className="h-16 border-t flex justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-xs text-muted-foreground font-light">
                            © 2025 Face Mark. All rights reserved.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <p className="text-xs text-muted-foreground font-light flex items-center gap-2">
                            Developed by
                            <a
                                href="https://github.com/almonsour13"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors font-medium"
                            >
                                Al-Monsour Salida
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
