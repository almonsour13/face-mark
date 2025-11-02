"use client";

import type React from "react";

import { motion } from "framer-motion";

interface StatisticItem {
    statName: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
}

interface StatisticsCardProps {
    statistics: StatisticItem[];
    title?: string;
}

export default function StatisticsCard({
    statistics,
    title = "Statistics",
}: StatisticsCardProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold">
                {title}
            </h2>
            <motion.div
                className="grid grid-cols-2 gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {statistics.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col gap-2 p-4 rounded-lg bg-card border backdrop-blur-sm hover:border-border/80 transition-colors"
                        variants={itemVariants}
                    >
                        <div className="flex items-start justify-between">
                            <span className="text-xs text-muted-foreground">
                                {stat.statName}
                            </span>
                            {stat.icon && (
                                <div className="text-muted-foreground">
                                    {stat.icon}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl md:text-4xl font-light text-foreground">
                                {stat.value}
                            </span>
                            {stat.description && (
                                <p className="text-xs text-muted-foreground font-light">
                                    {stat.description}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
