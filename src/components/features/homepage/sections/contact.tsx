import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    Globe,
    Users,
    CheckCircle2,
} from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
    const features = [
        { icon: Clock, label: "24-hour response", value: "Fast replies" },
        { icon: Users, label: "Dedicated support", value: "Expert team" },
        { icon: MapPin, label: "Global reach", value: "15+ countries" },
    ];

    return (
        <SectionWrapper id="contact">
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Get in touch
                </h2>
                <p className="text-muted-foreground font-light text-lg">
                    Have questions? We'd love to hear from you. Send us a
                    message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="md:col-span-2 lg:col-span-7"
                >
                    <Card className="rounded-3xl p-8 space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-light">
                                Send us a message
                            </h3>
                            <p className="text-sm text-muted-foreground font-light">
                                Fill out the form below and we'll get back to
                                you shortly
                            </p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-muted-foreground">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        className="bg-background"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-light text-muted-foreground">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="bg-background"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-light text-muted-foreground">
                                    Subject
                                </label>
                                <Input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="bg-background"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-light text-muted-foreground">
                                    Message
                                </label>
                                <Textarea
                                    rows={5}
                                    placeholder="Tell us more..."
                                    className="border resize-none min-h-24 max-h-48 bg-background"
                                />
                            </div>

                            <Button
                                size="lg"
                                className="w-full px-6 py-6 text-base group"
                            >
                                Send Message
                                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>

                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <p className="text-xs text-muted-foreground font-light">
                                We respect your privacy and will never share
                                your information
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Features */}
                <div className="md:col-span-2 lg:col-span-5 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <Card className="rounded-2xl p-6 space-y-3 group">
                                    <div className="h-10 w-10 rounded-xl border border-border/20 bg-muted/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground font-light">
                                            {feature.label}
                                        </p>
                                        <p className="text-sm font-light">
                                            {feature.value}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Support Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Card className="rounded-2xl p-6 space-y-3">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <h4 className="font-light">
                                    Need immediate help?
                                </h4>
                            </div>
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                Check out our comprehensive documentation and
                                FAQ section for instant answers.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
