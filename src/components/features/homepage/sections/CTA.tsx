import { CheckCircle2 } from "lucide-react";
import SectionWrapper from "../section-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
    return (
        <SectionWrapper className="bg-primary text-white">
            <div className="relative rounded-3xl overflow-hidden">
                <div className="relative z-10 text-center space-y-8 py-8 px-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl lg:text-5xl font-light">
                            Ready to transform attendance?
                        </h2>
                        <p className="font-light max-w-2xl mx-auto opacity-90 text-lg">
                            Join thousands of institutions using Face Mark to
                            save time, reduce fraud, and improve accuracy. Start
                            your free trial today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#contact">
                            <Button size="lg" className="bg-white text-black">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
