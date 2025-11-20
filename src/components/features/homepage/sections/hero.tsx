"use client";
import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Clock,
    Scan,
    Shield,
    Sparkles,
    Target,
    Zap,
} from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const stats = [
        {
            value: "99.97%",
            label: "Recognition Accuracy",
            icon: Target,
            color: "bg-blue-300/50",
        },
        {
            value: "<500ms",
            label: "Processing Speed",
            icon: Zap,
            color: "bg-yellow-300/50",
        },
        {
            value: "AI-Secured",
            label: "Duplicate Prevention",
            icon: Shield,
            color: "bg-green-300/50",
        },
        {
            value: "99.99%",
            label: "Uptime & Reliability",
            icon: Clock,
            color: "bg-purple-300/50",
        },
    ];

    const mockedAttendance = [
        {
            // 1 = female
            name: "Sophia Reyes",
            studentId: "2131",
            course: "Computer Science",
            level: "2nd Year",
            time: "09:15 AM",
            image: "/images/homepage/avatars/avatar-1.png", // female avatar
            type: 1,
            method: 1,
            session: "Morning",
            status: 1,
            gender: "female",
        },
        {
            // 2 = male
            name: "John Doe",
            studentId: "2145",
            course: "Information Technology",
            level: "1st Year",
            time: "09:18 AM",
            image: "/images/homepage/avatars/avatar-2.png", // male avatar
            type: 1,
            method: 1,
            session: "Morning",
            status: 1,
            gender: "male",
        },
        {
            // 3 = male
            name: "Michael Smith",
            studentId: "2152",
            course: "Software Engineering",
            level: "3rd Year",
            time: "09:20 AM",
            image: "/images/homepage/avatars/avatar-3.png", // male avatar
            type: 1,
            method: 1,
            session: "Morning",
            status: 0, // Late
            gender: "male",
        },
        {
            // 4 = female
            name: "Emily Johnson",
            studentId: "2160",
            course: "Computer Science",
            level: "2nd Year",
            time: "09:22 AM",
            image: "/images/homepage/avatars/avatar-4.png", // female avatar
            type: 1,
            method: 1,
            session: "Morning",
            status: 1,
            gender: "female",
        },
        {
            // 5 = male
            name: "David Lee",
            studentId: "2167",
            course: "Information Technology",
            level: "1st Year",
            time: "09:25 AM",
            image: "/images/homepage/avatars/avatar-5.png", // male avatar
            type: 1,
            method: 1,
            session: "Morning",
            status: 0, // Late
            gender: "male",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % mockedAttendance.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const attendance = mockedAttendance[currentIndex];

    return (
        <SectionWrapper className="min-h-screen">
            <div className="h-16" />

            <div className="flex flex-col gap-16">
                <div className="flex flex-col md:flex-row  gap-12">
                    <div className="space-y-6 flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                            <Sparkles className="h-3 w-3" />
                            AI-Powered Attendance
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-semibold max-w-3xl">
                            Attendance tracking
                            <span className="block text-muted-foreground">
                                reimagined
                            </span>
                        </h1>
                        <Card className="md:col-span-2 border-0 p-0 rounded-2xl bg-transparent hover:bg-transparent space-y-6">
                            <p className="text-lg text-muted-foreground font-light">
                                Facial recognition technology meets elegant
                                design. Automate attendance, prevent fraud, and
                                focus on what matters.
                            </p>

                            <div className="flex gap-3">
                                <Link href="#contact">
                                    <Button className="px-6 py-6">
                                        Get Started
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </div>
                    <div className="mb-12 md:mb-0  flex-1 flex items-start relative">
                        {/* Masked image */}
                        <div className="w-full relative mask-herao max-w-xl rounded-xl overflow-hidden">
                            <Image
                                alt="banner image"
                                src={"/images/homepage/avatars/scan-people-v2.png"}
                                width={1000}
                                height={1000}
                                className="object-contain h-full"
                            />
                        </div>

                        {/* Rotating attendance display */}
                        <div className="absolute right-0 left-0 -bottom-12 md:right-0 md:bottom-0 flex items-center justify-center md:justify-end  ">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="bg-card rounded-md p-4 flex gap-4 shadow-lg  border"
                                >
                                    <div className="h-20 w-20 bg-muted rounded">
                                        <Image
                                            src={
                                                attendance.image
                                                    ? attendance.image
                                                    : `https://thispersondoesnotexist.com?${attendance.name}`
                                            }
                                            alt={attendance.name}
                                            width={80}
                                            height={80}
                                            className="object-cover h-full w-full rounded"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <h1 className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors">
                                                    {attendance.name}
                                                </h1>

                                                <div className="">
                                                    <p className="text-xs font-light text-muted-foreground">
                                                        {[
                                                            attendance.studentId,
                                                            attendance.course,
                                                            attendance.level,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(" | ")}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {attendance.method === 1
                                                        ? "Face"
                                                        : "Manual"}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        attendance.type === 1
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {attendance.type === 1
                                                        ? "In"
                                                        : "Out"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                                            <span className="text-foreground">
                                                {attendance.session}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3 w-3" />
                                                <span className="text-foreground">
                                                    {attendance.time}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {attendance.status === 1 ? (
                                                    <>
                                                        <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                        <span className="text-green-600 dark:text-green-400">
                                                            On Time
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                                        <span className="text-yellow-600 dark:text-yellow-400">
                                                            Late
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Card className="rounded-2xl p-6 border-0 relative overflow-hidden border-border/30 hover:border-border/50 transition-all">
                                <div
                                    className={`absolute inset-0 ${stat.color}`}
                                />
                                <div className="relative z-10 space-y-3">
                                    <stat.icon className="h-5 w-5" />
                                    <p className="text-3xl font-light">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-light uppercase tracking-wide">
                                        {stat.label}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
