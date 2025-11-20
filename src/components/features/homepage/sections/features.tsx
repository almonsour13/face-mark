import { Card } from "@/components/ui/card";
import SectionWrapper from "../section-wrapper";

import {
    BarChart3,
    Calendar,
    CheckCircle2,
    Clock,
    Lock,
    Scan,
    Shield,
    Users,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Features() {
    const features = [
        {
            icon: Scan,
            title: "Facial Recognition",
            description:
                "Advanced AI-powered face detection ensures accurate and fraud-proof attendance tracking",
            color: "bg-primary",
        },
        {
            icon: Users,
            title: "Role-Based Access",
            description:
                "Secure user management with distinct permissions for admins, faculty, and students",
            color: "bg-purple-300/50",
        },
        {
            icon: Calendar,
            title: "Event Management",
            description:
                "Create and organize events with multiple sessions, grace periods, and flexible schedules",
            color: "bg-green-300/50",
        },
        {
            icon: Shield,
            title: "Duplicate Prevention",
            description:
                "Automatically prevents multiple check-ins or repeated timestamps for the same attendee",
            color: "bg-orange-300/50",
        },
        {
            icon: Clock,
            title: "Real-Time Tracking",
            description:
                "Instant attendance logging with time-in and time-out records for every session",
            color: "bg-indigo-300/50",
        },
        {
            icon: BarChart3,
            title: "Smart Reporting",
            description:
                "Comprehensive attendance reports filtered by student, event, or session",
            color: "bg-teal-300/50",
        },
    ];

    return (
        <SectionWrapper className="min-h-screen" id="features">
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Powerful features
                </h2>
                <p className="text-muted-foreground font-light">
                    Everything you need to manage attendance with precision and
                    ease
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className={`${
                            index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                        }`}
                    >
                        <Card
                            key={index}
                            className={`p-6 border-0 relative overflow-hidden  rounded-2xl space-y-4 group ${
                                index === 0 ? "bg-primary hover:bg-primary" : ""
                            }`}
                        >
                            <div
                                className={`absolute inset-0 h-full ${feature.color}`}
                            />
                            {index === 0 ? (
                                <div className="relative z-10 h-full flex flex-col text-white">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="h-16 w-16 rounded-xl bg-white flex items-center justify-center">
                                            <Scan className="h-8 w-8 text-primary" />
                                        </div>
                                        <span className="px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
                                            Core Feature
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-2xl lg:text-3xl font-light">
                                            {feature.title}
                                        </h3>
                                        <p className=" font-light text-lg max-w-lg">
                                            {feature.description}
                                        </p>

                                        <div className="pt-6 grid gap-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-light">
                                                    99.9% accuracy rate
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-light">
                                                    Sub-second recognition
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-light">
                                                    Fraud prevention built-in
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 group z-10">
                                    <div
                                        className={`h-12 w-12 rounded-md ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                    >
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-normal mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm font-light">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
