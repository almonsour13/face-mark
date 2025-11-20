"use client";

import { Star } from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Card } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Testimonials() {
    const controls = useAnimation();
    const isDragging = useRef(false);

    // Auto-play animation function
    const startAnimation = () => {
        controls.start({
            x: ["0%", "-50%"],
            transition: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
            },
        });
    };

    useEffect(() => {
        // Start autoplay on mount
        startAnimation();
    }, []);

    const testimonials = [
        {
            quote: "Face Mark reduced our attendance processing time by 85%. It's been transformative for our institution.",
            author: "Dr. Sarah Chen",
            role: "Dean of Student Affairs",
            institution: "Pacific University",
        },
        {
            quote: "The accuracy is remarkable. We've completely eliminated attendance fraud since implementing Face Mark.",
            author: "Prof. Michael Rodriguez",
            role: "Department Head",
            institution: "Tech Institute",
        },
        {
            quote: "Simple, elegant, and powerful. Exactly what we needed for our growing campus.",
            author: "Jennifer Park",
            role: "IT Director",
            institution: "Metro College",
        },
        {
            quote: "Face Mark integrates seamlessly with our LMS. The staff loves it!",
            author: "Dr. Liam Wong",
            role: "Academic Coordinator",
            institution: "Global University",
        },
        {
            quote: "We now have real-time attendance data at our fingertips. It's a game-changer!",
            author: "Anna Smith",
            role: "Operations Manager",
            institution: "City College",
        },
        {
            quote: "A reliable and innovative solution that ensures smooth attendance management.",
            author: "Prof. Carlos Mendes",
            role: "Head of IT Department",
            institution: "National Polytechnic",
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center flex-col overflow-hidden">
            <div className="text-center space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Trusted by educators
                </h2>
                <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                    See what institutions are saying about Face Mark
                </p>
            </div>

            {/* Marquee / Infinite scroll */}
            <div className="relative w-full overflow-hidden py-4">
                {/* LEFT GRADIENT FADE */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-muted to-transparent z-20"></div>

                {/* RIGHT GRADIENT FADE */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-muted to-transparent z-20"></div>

                <motion.div
                    className="flex gap-6 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: -3000, right: 0 }}
                    dragElastic={0.1}
                    animate={controls}
                    onDragStart={() => {
                        isDragging.current = true;
                        controls.stop(); // pause marquee
                    }}
                    onDragEnd={() => {
                        isDragging.current = false;
                        startAnimation(); // resume autoplay
                    }}
                >
                    {[...testimonials, ...testimonials].map(
                        (testimonial, index) => (
                            <Card
                                key={index}
                                className="max-w-[400px] p-6 border rounded-2xl flex-shrink-0"
                            >
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm font-light italic mb-3">
                                    "{testimonial.quote}"
                                </p>
                                {/* <div className="border-t border-border/20 pt-2 text-xs text-muted-foreground font-light">
                                    <p className="font-medium">
                                        {testimonial.author}
                                    </p>
                                    <p>{testimonial.role}</p>
                                    <p>{testimonial.institution}</p>
                                </div> */}
                            </Card>
                        )
                    )}
                </motion.div>
            </div>
        </div>
    );
}
