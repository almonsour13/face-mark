import { AlertCircle, Sparkles } from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Comparison() {
    const comparisonData = [
        { feature: "Setup Time", traditional: "2-3 hours", facemark: "<10 minutes" },
        { feature: "Fraud Risk", traditional: "High", facemark: "Zero" },
        { feature: "Processing Speed", traditional: "5-10 min/class", facemark: "<2 seconds" },
        { feature: "Accuracy Rate", traditional: "~85%", facemark: "99.9%" },
        { feature: "Manual Work", traditional: "Heavy", facemark: "Automated" },
    ];

    return (
        <SectionWrapper>
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Why Face Mark?
                </h2>
                <p className="text-muted-foreground font-light">
                    See how we compare to traditional attendance methods
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Traditional Method */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Card className="rounded-2xl p-8 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-6 w-6 text-muted-foreground" />
                                <h3 className="text-xl font-light">Traditional Methods</h3>
                            </div>
                            <p className="text-sm text-muted-foreground font-light">
                                Manual sheets, card scanners, or basic apps
                            </p>
                        </div>

                        <div className="space-y-4">
                            {comparisonData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-3 border-b border-border/20"
                                >
                                    <span className="text-sm font-light text-muted-foreground">
                                        {item.feature}
                                    </span>
                                    <span className="text-sm font-light text-red-600 dark:text-red-400">
                                        {item.traditional}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* Face Mark */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Card className="rounded-2xl p-8 gap-6 bg-primary/5 hover:bg-primary/5">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-6 w-6" />
                                <h3 className="text-xl font-light">Face Mark</h3>
                            </div>
                            <p className="text-sm text-muted-foreground font-light">
                                AI-powered facial recognition system
                            </p>
                        </div>

                        <div className="space-y-4">
                            {comparisonData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center py-3 border-b border-border/20"
                                >
                                    <span className="text-sm font-light text-muted-foreground">
                                        {item.feature}
                                    </span>
                                    <span className="text-sm font-light text-green-600 dark:text-green-400">
                                        {item.facemark}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
