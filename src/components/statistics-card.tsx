"use client";

import type React from "react";

import { motion } from "framer-motion";
import { Card } from "./ui/card";

interface StatisticItem {
    name: string;
    value: number;
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
    return (
        <div className="flex flex-col gap-2 sticky top-0">
            <h2 className="text-lg font-light">Statistic</h2>
            <div className="grid grid-cols-2 gap-2">
                {statistics.map((stat, index) => (
                    <Card
                        key={index}
                        className="gap-2"
                    >
                        <div className="flex items-start justify-between">
                            <span className="text-xs text-muted-foreground">
                                {stat.name}
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
                    </Card>
                ))}
            </div>
        </div>
    );
}
