import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowUpRight,
    BadgeCheck,
    CalendarCheck2,
    FileText,
    Home,
    LayoutDashboard,
    ScanFace,
} from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { use, useEffect, useState } from "react";
import Image from "next/image";

export default function ScreenShot() {
    const screenshot = [
        {
            title: "Home",
            description: "Quick access to all essential features",
            icon: Home,
            color: "bg-blue-300/50",
            images: [
                "/images/homepage/screenshots/home-1.png",
                "/images/homepage/screenshots/home-2.png",
            ],
        },
        {
            title: "Dashboard",
            description: "Overview of attendance and system activity",
            icon: LayoutDashboard,
            color: "bg-green-300/50",
            images: [
                "/images/homepage/screenshots/dashboard-1.png",
                "/images/homepage/screenshots/dashboard-2.png",
                "/images/homepage/screenshots/dashboard-3.png",
            ],
        },
        {
            title: "Events",
            description: "Manage and view all registered events",
            icon: CalendarCheck2,
            color: "bg-yellow-300/50",
            images: [
                "/images/homepage/screenshots/events-1.png",
                "/images/homepage/screenshots/events-2.png",
            ],
        },
        {
            title: "Event Details",
            description: "Detailed insights on specific events",
            icon: FileText,
            color: "bg-pink-300/50",
            images: [
                "/images/homepage/screenshots/event-details-1.png",
                "/images/homepage/screenshots/event-details-2.png",
            ],
        },
        {
            title: "Scan or Face Recognition",
            description: "Verify attendance instantly using biometrics",
            icon: ScanFace,
            color: "bg-orange-300/50",
            images: ["/images/homepage/screenshots/scan-1.png"],
        },
        {
            title: "Attendance",
            description: "Track and monitor attendance records",
            icon: BadgeCheck,
            color: "bg-teal-300/50",
            images: ["/images/homepage/screenshots/attendance-1.png"],
        },
    ];
    return (
        <SectionWrapper>
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Every feature, beautifully designed
                </h2>
                <p className="text-muted-foreground font-light">
                    Experience a modern interface built for efficiency. From
                    real-time recognition to detailed analytics, every screen is
                    crafted for clarity.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {screenshot.map((item, index) => (
                    <ScreenShotCard key={index} index={index} item={item} />
                ))}
            </div>
        </SectionWrapper>
    );
}
const ScreenShotCard = ({ index, item }: { index: number; item: any }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (item.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % item.images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [item.images.length]);

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <Card className="p-6 border-0 relative overflow-hidden  rounded-2xl space-y-4 group transition-all hover:opacity-80 duration-300">
                <div className={`absolute inset-0 h-full ${item.color}`} />
                <div className="flex flex-col gap-4 z-10 cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-xl font-normal">
                                {item.title}
                            </h3>
                            <p className="text-sm font-light">
                                {item.description}
                            </p>
                        </div>
                        <Button className="h-14 w-14 group-hover:scale-110 transition-transform rounded-full bg-foreground hover:bg-foreground/80 p-0">
                            <ArrowUpRight className="text-background w-8 h-8" />
                        </Button>
                    </div>
                    {/* mocked image holder */}
                    <div className="relative flex-col border-2 border-zinc-900 items-start h-50 md:h-48 asapect-video overflow-hidden bg-muted rounded-md flex justify-center">
                        <div className="flex items-center gap-1 h-3 ml-1">
                            <div className="h-1 w-1 rounded-full bg-red-500" />
                            <div className="h-1 w-1 rounded-full bg-yellow-500" />
                            <div className="h-1 w-1 rounded-full bg-green-500" />
                        </div>
                        <div className="relative flex-1 h-full w-full flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {item.images.map(
                                    (img: string, imgIndex: number) => (
                                        <div
                                            key={imgIndex}
                                            className={`absolute inset-0 transition-opacity duration-500 ${
                                                imgIndex === currentIndex
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={item.title + " screenshot"}
                                                width={800}
                                                height={800}
                                                className="object-contain"
                                            />
                                        </div>
                                    )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
