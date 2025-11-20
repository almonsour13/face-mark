import { Award, Shield, TrendingUp, Users } from "lucide-react";
import SectionWrapper from "../section-wrapper";

export default function TrustIndicators() {
    return (
        <section className="py-12 px-6 lg:px-8 border-y border-border/30">
            <SectionWrapper className="py-0W3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-light">
                                Enterprise Grade
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                                Bank-level security
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Award className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-light">Award Winning</p>
                            <p className="text-xs text-muted-foreground font-light">
                                EdTech Innovation 2024
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-light">10,000+ Users</p>
                            <p className="text-xs text-muted-foreground font-light">
                                Trusted worldwide
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-light">99.9% Uptime</p>
                            <p className="text-xs text-muted-foreground font-light">
                                Always available
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
}
