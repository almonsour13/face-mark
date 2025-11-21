import { Card } from "@/components/ui/card";
import { Award, Calendar, Users } from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";

export default function UseCases() {
    const useCases = [
        {
            title: "Universities",
            description:
                "Track thousands of students across multiple courses and sessions effortlessly",
            icon: Users,
            color: "from-blue-500/50 to-cyan-500/50",
            image: "/images/homepage/usecases/universities.jpg",
        },
        {
            title: "Corporate Training",
            description:
                "Monitor employee attendance at workshops and training programs",
            icon: Award,
            color: "from-purple-500/50 to-pink-500/50",
            image: "/images/homepage/usecases/corporate-training.jpg",
        },
        {
            title: "Events & Conferences",
            description:
                "Manage attendee check-ins with speed and precision at large-scale events",
            icon: Calendar,
            color: "from-green-500/50 to-emerald-500/50",
            image: "/images/homepage/usecases/event-conference.jpg",
        },
    ];

    return (
        <SectionWrapper id="use-cases">
            <div className="text-left space-y-3 mb-16">
                <h2 className="text-4xl lg:text-6xl font-normal">
                    Built for everyone
                </h2>
                <p className="text-muted-foreground font-light">
                    From universities to corporate training, Face Mark adapts to
                    your needs
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Card className="p-0 h-66a aspect-square border-0 rounded-2xl relative overflow-hidden transition-all group">
                            <div className={`p-6 z-10 flex items-end h-full`}>
                                <div className="space-y-2 text-white">
                                    <h3 className="text-2xl font-light">{useCase.title}</h3>
                                    <p className="text-sm font-light">
                                        {useCase.description}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={useCase.image}
                                    alt={useCase.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            </div>
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
                        </Card>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
