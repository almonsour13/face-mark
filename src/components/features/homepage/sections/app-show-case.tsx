import { Card } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AppShowCase() {
    return (
        <SectionWrapper>
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Available everywhere
                </h2>
                <p className="text-muted-foreground font-light">
                    Access Face Mark on any device, anytime, anywhere
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {" "}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 * 0.15 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex-2"
                >
                    <Card className="flex-2  border-0 justify-center p-6 rounded-2xl group relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50       transition-all duration-300" />
                        <div className="relative flex flex-col justify-center z-10 space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card  text-blue-600 dark:text-blue-400 text-xs font-medium">
                                    <Monitor className="h-3 w-3" />
                                    Desktop Application
                                </div>
                            </div>

                            {/* Desktop Mockup */}
                            <div className="md:h-74 rounded-xl border-4 border-zinc-900 bg-black relative overflow-hidden group-hover:scale-[1.02] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                                <div className=" mt-1 ml-2 mb-1 flex gap-1">
                                    <div className="h-1 w-1 rounded-full bg-red-500" />
                                    <div className="h-1 w-1 rounded-full bg-yellow-500" />
                                    <div className="h-1 w-1 rounded-full bg-green-500" />
                                </div>
                                <div className="flex-1">
                                    <Image
                                        src="/images/homepage/appshowcase/desktop.png"
                                        alt="desktop app showcase"
                                        width={1000}
                                        height={1000}
                                        className="object-contain h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 * 0.15 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex-1"
                >
                    <Card className="flex-1  border-0 justify-center items-center  p-6 rounded-2xl group relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-pink-500/50" />
                        <div className="relative z-10 h-full flex flex-col space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  bg-card text-purple-600 dark:text-purple-400 text-xs font-medium">
                                    <Tablet className="h-3 w-3" />
                                    Tablet Optimized
                                </div>
                            </div>
                            <div className="max-h-74 w-56 aspect-[9/19] rounded-2xl border-4 border-zinc-900 bg-black  overflow-hidden relative group-hover:scale-105 transition-all duration-300 shadow-2xl group-hover:shadow-3xl">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground/30 rounded-full" />

                                <div className="flex-1  ">
                                    <Image
                                        src="/images/homepage/appshowcase/tablet.png"
                                        alt="desktop app showcase"
                                        width={1000}
                                        height={1000}
                                        className="object-contain h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 3 * 0.15 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex-1"
                >
                    <Card className="justify-center border-0 items-center  p-6 rounded-2xl group relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/50 to-emerald-500/50 transition-all duration-300" />

                        <div className="relative z-10 h-full flex flex-col space-y-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  bg-card text-green-600 dark:text-green-400 text-xs font-medium">
                                    <Smartphone className="h-3 w-3" />
                                    Mobile App
                                </div>
                            </div>

                            <div className="max-h-74 w-40 aspect-[9/19] rounded-2xl border-4 border-zinc-900 bg-black  overflow-hidden relative group-hover:scale-105 transition-all duration-300 shadow-2xl group-hover:shadow-3xl">
                                {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl flex items-center justify-center"></div> */}
                                <div className="flex-1">
                                    <Image
                                        src="/images/homepage/appshowcase/mobile.png"
                                        alt="desktop app showcase"
                                        width={1000}
                                        height={1000}
                                        className="object-contain h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
                {/* Desktop App - Large Hero */}
                {/* Mobile App - Tall */}
            </div>
        </SectionWrapper>
    );
}
