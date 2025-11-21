import { Card } from "@/components/ui/card";
import SectionWrapper from "../section-wrapper";

import { BarChart3, Calendar, Camera, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
    const workflowSteps = [
        {
            title: "Student Registration",
            description: "One-time facial data capture during enrollment",
            icon: UserCheck,
            color: "bg-blue-300/50",
        },
        {
            title: "Event Creation",
            description: "Faculty creates sessions with flexible parameters",
            icon: Calendar,
            color: "bg-purple-300/50",
        },
        {
            title: "Attendance Marking",
            description: "Students check in using face recognition",
            icon: Camera,
            color: "bg-green-300/50",
        },
        {
            title: "Real-Time Reports",
            description: "View comprehensive analytics and attendance data",
            icon: BarChart3,
            color: "bg-orange-300/50",
        },
    ];

    
    return (
        <SectionWrapper id="how-it-works">
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    How it works
                </h2>
                <p className="text-muted-foreground font-light">
                    From registration to reporting in four simple steps
                </p>
            </div>

            {/* Simple Grid Layout */}
            <div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {workflowSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Card
                            className="h-full relative p-6 rounded-2xl group overflow-hidden border-0"
                        >
                            {/* Gradient Background */}
                            <div
                                className={`absolute inset-0 ${step.color}`}
                            />{" "}
                            <div
                                className={`absolute h-28 w-28 group-hover:h-full group-hover:w-full group-hover:rounded-none rounded-tl-full  right-0 bottom-0 bg-gradient-to-br transition-all ${step.color}`}
                            />
                            <div className="relative z-10 space-y-6">
                                {/* Icon and Number */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`h-14 w-14 rounded-md  ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                    >
                                        <step.icon className="h-7 w-7" />
                                    </div>
                                    <div className="text-5xl font-light text-muted-foreground/50 group-hover:text-muted-foreground/20 transition-colors">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <h3 className="text-xl font-normal">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-light">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                            {/* Step Connector Line */}
                            {index < 3 && (
                                <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-border/30" />
                            )}
                        </Card>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
