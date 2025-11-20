import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQ() {
    const faqs = [
        {
            question: "How accurate is the facial recognition?",
            answer: "Face Mark achieves 99.9% accuracy in optimal conditions. Our AI model is trained on diverse datasets and performs well across different lighting conditions and angles.",
            featured: true,
        },
        {
            question: "Is my students' data secure?",
            answer: "Absolutely. We use bank-level encryption (AES-256) for all data. Facial descriptors are stored securely and never shared. We're fully compliant with GDPR, FERPA, and COPPA.",
            featured: true,
        },
        {
            question: "What happens if facial recognition fails?",
            answer: "Students can use QR code backup or manual check-in as alternatives. Faculty members can also manually verify attendance when needed.",
        },
        {
            question: "Can I export attendance data?",
            answer: "Yes! Export your data anytime in Excel, PDF, or CSV formats. We also offer API access for custom integrations with your existing systems.",
        },
        {
            question: "Do you offer training for faculty?",
            answer: "Yes, all plans include onboarding training. Professional and Enterprise plans get dedicated training sessions and ongoing support.",
        },
        {
            question: "What if I need to cancel?",
            answer: "You can cancel anytime. We offer prorated refunds and will help you export all your data before closing your account.",
        },
    ];

    return (
        <section className="py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-3 mb-16">
                    <h2 className="text-3xl lg:text-6xl font-normal">
                        Frequently asked questions
                    </h2>
                    <p className="text-muted-foreground font-light">
                        Everything you need to know about Face Mark
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Card key={index} className="p-6  rounded-2xl">
                                <h3 className="text-lg font-light">
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-muted-foreground font-light">
                                    {faq.answer}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Card className="mt-12 p-6  rounded-2xl justify-center items-center">
                        <p className="text-sm font-light">
                            Still have questions?
                        </p>
                        <Button>Contact Support</Button>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
