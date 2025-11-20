"use client";

import Footer from "./footer";
import NavHeader from "./nav-header";
import AppShowCase from "./sections/app-show-case";
import Comparison from "./sections/comparison";
import Contact from "./sections/contact";
import CTA from "./sections/CTA";
import FAQ from "./sections/FAQ";
import Features from "./sections/features";
import Hero from "./sections/hero";
import HowItWorks from "./sections/how-it-works";
import ScreenshotsSection from "./sections/screenshot";
import Testimonials from "./sections/testimonials";
import TrustIndicators from "./sections/trust-indicators";
import UseCases from "./sections/use-cases";

export default function HomePage() {
    
    return (
        <div className="flex flex-col min-h-screen gap-20">
            <NavHeader />
            <Hero />
            <div className="flex flex-col gap-20 bg-muted rounded-t-4xl">
                <Features />
                <HowItWorks />
                <AppShowCase />
                <UseCases />
                <ScreenshotsSection/>
                <Comparison />
                <Testimonials />
                <FAQ />
                <CTA />
                <Contact/>
                <Footer />
            </div>
        </div>
    );
}
