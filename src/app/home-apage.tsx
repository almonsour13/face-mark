"use client";
import { useState, useEffect } from "react";
import {
    Scan,
    Users,
    Calendar,
    Shield,
    Clock,
    CheckCircle2,
    ArrowRight,
    Menu,
    X,
    ChevronRight,
    BarChart3,
    Zap,
    Lock,
    Camera,
    FileCheck,
    TrendingUp,
    Bell,
    Download,
    Star,
    Activity,
    Target,
    Sparkles,
    Eye,
    UserCheck,
    QrCode,
    Database,
    RefreshCw,
    AlertCircle,
    Award,
} from "lucide-react";

export default function FaceMarkHomepage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const features = [
        {
            icon: Scan,
            title: "Facial Recognition",
            description:
                "Advanced AI-powered face detection ensures accurate and fraud-proof attendance tracking",
        },
        {
            icon: Users,
            title: "Role-Based Access",
            description:
                "Secure user management with distinct permissions for admins, faculty, and students",
        },
        {
            icon: Calendar,
            title: "Event Management",
            description:
                "Create and organize events with multiple sessions, grace periods, and flexible schedules",
        },
        {
            icon: Shield,
            title: "Secure Authentication",
            description:
                "Email verification, password recovery, and encrypted data storage for complete security",
        },
        {
            icon: Clock,
            title: "Real-Time Tracking",
            description:
                "Instant attendance logging with time-in and time-out records for every session",
        },
        {
            icon: BarChart3,
            title: "Smart Reporting",
            description:
                "Comprehensive attendance reports filtered by student, event, or session",
        },
    ];

    const stats = [
        { value: "99.9%", label: "Accuracy", icon: Target },
        { value: "<2s", label: "Recognition", icon: Zap },
        { value: "100%", label: "Fraud Prevention", icon: Shield },
        { value: "24/7", label: "Availability", icon: Clock },
    ];

    const useCases = [
        {
            title: "Universities",
            description:
                "Track thousands of students across multiple courses and sessions effortlessly",
            icon: Users,
            color: "from-blue-500/10 to-cyan-500/10",
        },
        {
            title: "Corporate Training",
            description:
                "Monitor employee attendance at workshops and training programs",
            icon: Award,
            color: "from-purple-500/10 to-pink-500/10",
        },
        {
            title: "Events & Conferences",
            description:
                "Manage attendee check-ins with speed and precision at large-scale events",
            icon: Calendar,
            color: "from-green-500/10 to-emerald-500/10",
        },
        {
            title: "Hybrid Learning",
            description:
                "Seamlessly track both in-person and virtual attendance in one platform",
            icon: Activity,
            color: "from-orange-500/10 to-yellow-500/10",
        },
    ];

    const testimonials = [
        {
            quote: "Face Mark reduced our attendance processing time by 85%. It's been transformative for our institution.",
            author: "Dr. Sarah Chen",
            role: "Dean of Student Affairs",
            institution: "Pacific University",
        },
        {
            quote: "The accuracy is remarkable. We've completely eliminated attendance fraud since implementing Face Mark.",
            author: "Prof. Michael Rodriguez",
            role: "Department Head",
            institution: "Tech Institute",
        },
        {
            quote: "Simple, elegant, and powerful. Exactly what we needed for our growing campus.",
            author: "Jennifer Park",
            role: "IT Director",
            institution: "Metro College",
        },
    ];

    const comparisonData = [
        {
            feature: "Setup Time",
            traditional: "2-3 hours",
            facemark: "<10 minutes",
        },
        { feature: "Fraud Risk", traditional: "High", facemark: "Zero" },
        {
            feature: "Processing Speed",
            traditional: "5-10 min/class",
            facemark: "<2 seconds",
        },
        { feature: "Accuracy Rate", traditional: "~85%", facemark: "99.9%" },
        { feature: "Manual Work", traditional: "Heavy", facemark: "Automated" },
    ];

    const workflowSteps = [
        {
            title: "Student Registration",
            description: "One-time facial data capture during enrollment",
            icon: UserCheck,
            details: [
                "Secure data encryption",
                "Privacy compliant",
                "Quick 30-second process",
            ],
        },
        {
            title: "Event Creation",
            description: "Faculty creates sessions with flexible parameters",
            icon: Calendar,
            details: [
                "Multiple sessions support",
                "Grace period options",
                "Custom schedules",
            ],
        },
        {
            title: "Attendance Marking",
            description: "Students check in using face recognition",
            icon: Camera,
            details: [
                "Instant verification",
                "Photo timestamp",
                "GPS location (optional)",
            ],
        },
        {
            title: "Real-Time Reports",
            description: "View comprehensive analytics and attendance data",
            icon: BarChart3,
            details: [
                "Export to Excel/PDF",
                "Absence notifications",
                "Trend analysis",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            {/* <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-b border-border/30"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                                <Scan className="h-5 w-5 text-background" />
                            </div>
                            <span className="text-xl font-light">
                                Face Mark
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a
                                href="#features"
                                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                How It Works
                            </a>
                            <a
                                href="#use-cases"
                                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Use Cases
                            </a>
                            <a
                                href="#pricing"
                                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Pricing
                            </a>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 text-sm font-light text-foreground hover:text-muted-foreground transition-colors">
                                    Sign In
                                </button>
                                <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-light hover:bg-foreground/90 transition-colors">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-background border-t border-border/30">
                        <div className="px-6 py-4 space-y-3">
                            <a
                                href="#features"
                                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                How It Works
                            </a>
                            <a
                                href="#use-cases"
                                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Use Cases
                            </a>
                            <a
                                href="#pricing"
                                className="block text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Pricing
                            </a>
                            <div className="pt-3 space-y-2">
                                <button className="w-full px-4 py-2 text-sm font-light border border-border/30 rounded-lg hover:border-border/50 transition-colors">
                                    Sign In
                                </button>
                                <button className="w-full px-4 py-2 bg-foreground text-background rounded-lg text-sm font-light hover:bg-foreground/90 transition-colors">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav> */}

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                                <Sparkles className="h-3 w-3" />
                                AI-Powered Attendance
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-light leading-tight">
                                    Attendance tracking
                                    <span className="block text-muted-foreground">
                                        reimagined
                                    </span>
                                </h1>
                                <p className="text-lg text-muted-foreground font-light max-w-lg">
                                    Facial recognition technology meets elegant
                                    design. Automate attendance, prevent fraud,
                                    and focus on what matters.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="px-6 py-3 bg-foreground text-background rounded-lg font-light hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
                                    Get Started Free
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <button className="px-6 py-3 border border-border/30 rounded-lg font-light hover:border-border/50 transition-colors">
                                    Watch Demo
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-border/30">
                                {stats.map((stat, index) => (
                                    <div key={index} className="space-y-2">
                                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                                        <p className="text-2xl font-light">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light uppercase tracking-wide">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-2xl border border-border/30 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="h-48 w-48 rounded-full border-2 border-dashed border-border/30 animate-pulse" />
                                            <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-muted-foreground/20" />
                                            <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-foreground/20 rounded-tl-lg" />
                                    <div className="absolute top-0 right-0 h-16 w-16 border-t-2 border-r-2 border-foreground/20 rounded-tr-lg" />
                                    <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-foreground/20 rounded-bl-lg" />
                                    <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-foreground/20 rounded-br-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-12 px-6 lg:px-8 border-y border-border/30">
                <div className="max-w-7xl mx-auto">
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
                                <p className="text-sm font-light">
                                    Award Winning
                                </p>
                                <p className="text-xs text-muted-foreground font-light">
                                    EdTech Innovation 2024
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-light">
                                    10,000+ Users
                                </p>
                                <p className="text-xs text-muted-foreground font-light">
                                    Trusted worldwide
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-light">
                                    99.9% Uptime
                                </p>
                                <p className="text-xs text-muted-foreground font-light">
                                    Always available
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - Bento Grid */}
            <section id="features" className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Powerful features
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            Everything you need to manage attendance with
                            precision and ease
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg space-y-4 bg-card group ${
                                    index === 0
                                        ? "lg:col-span-2 lg:row-span-2"
                                        : ""
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="h-12 w-12 rounded-lg border border-border/30 flex items-center justify-center group-hover:border-border/50 transition-colors">
                                        <feature.icon className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    {index === 0 && (
                                        <span className="px-2 py-1 bg-foreground text-background text-xs font-light rounded">
                                            Core Feature
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-light">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-light">
                                        {feature.description}
                                    </p>
                                </div>
                                {index === 0 && (
                                    <div className="pt-4 space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>99.9% accuracy rate</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Sub-second recognition</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-light">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>
                                                Fraud prevention built-in
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section - Horizontal Timeline */}
            <section
                id="how-it-works"
                className="py-20 px-6 lg:px-8 bg-muted/20"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            How it works
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            From registration to reporting in four simple steps
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-border/30" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {workflowSteps.map((step, index) => (
                                <div key={index} className="relative space-y-4">
                                    {/* Step Number */}
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 rounded-full border-2 border-border/30 bg-background flex items-center justify-center z-10">
                                            <step.icon className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div className="text-4xl font-light text-muted-foreground/20">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-light">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-light">
                                            {step.description}
                                        </p>
                                        <ul className="space-y-1">
                                            {step.details.map((detail, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-center gap-2 text-xs text-muted-foreground font-light"
                                                >
                                                    <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section - Split Design */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Why Face Mark?
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            See how we compare to traditional attendance methods
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Traditional Method */}
                        <div className="space-y-6 p-8 border border-border/30 rounded-lg bg-card">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-6 w-6 text-muted-foreground" />
                                    <h3 className="text-xl font-light">
                                        Traditional Methods
                                    </h3>
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
                        </div>

                        {/* Face Mark */}
                        <div className="space-y-6 p-8 border-2 border-foreground/20 rounded-lg bg-primary/5">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-6 w-6" />
                                    <h3 className="text-xl font-light">
                                        Face Mark
                                    </h3>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section - Card Carousel */}
            <section id="use-cases" className="py-20 px-6 lg:px-8 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Built for everyone
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            From universities to corporate training, Face Mark
                            adapts to your needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-lg border border-border/30 bg-card hover:border-border/50 transition-all space-y-4 group`}
                            >
                                <div
                                    className={`h-14 w-14 rounded-lg border border-border/30 bg-gradient-to-br ${useCase.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                >
                                    <useCase.icon className="h-7 w-7 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-light">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-light">
                                        {useCase.description}
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 text-sm font-light hover:gap-3 transition-all">
                                    Learn more
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Slider Design */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Trusted by educators
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            See what institutions are saying about Face Mark
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-6 border border-border/30 rounded-lg space-y-4 hover:border-border/50 transition-colors bg-card"
                            >
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                                        />
                                    ))}
                                </div>
                                <p className="text-sm font-light italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="pt-4 border-t border-border/20">
                                    <p className="text-sm font-light">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        {testimonial.institution}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-20 px-6 lg:px-8 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl lg:text-4xl font-light">
                                Seamless integration
                            </h2>
                            <p className="text-muted-foreground font-light">
                                Face Mark works with your existing systems.
                                Export data, sync with student databases, and
                                integrate with your LMS effortlessly.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center">
                                        <Database className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-light">
                                            Student Information Systems
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            Automatic data sync
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center">
                                        <Download className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-light">
                                            Export & Reports
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            Excel, PDF, CSV formats
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center">
                                        <RefreshCw className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-light">
                                            Real-Time Sync
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            Instant data updates
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: "Google Workspace", icon: Users },
                                { name: "Microsoft 365", icon: Users },
                                { name: "Canvas LMS", icon: Calendar },
                                { name: "Moodle", icon: Calendar },
                                { name: "Blackboard", icon: FileCheck },
                                { name: "REST API", icon: Database },
                            ].map((integration, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-border/30 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-border/50 transition-colors bg-card"
                                >
                                    <integration.icon className="h-8 w-8 text-muted-foreground" />
                                    <span className="text-xs font-light text-center">
                                        {integration.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section - Split Visual */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Visual Side */}
                        <div className="order-2 lg:order-1">
                            <div className="relative aspect-square rounded-2xl border border-border/30 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950 p-8">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <Shield className="h-32 w-32 text-muted-foreground/10" />
                                        <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-muted-foreground/30" />
                                    </div>
                                </div>
                                {/* Security Badges */}
                                <div className="absolute top-6 left-6 px-3 py-2 bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg">
                                    <p className="text-xs font-light">
                                        256-bit Encryption
                                    </p>
                                </div>
                                <div className="absolute bottom-6 right-6 px-3 py-2 bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg">
                                    <p className="text-xs font-light">
                                        GDPR Compliant
                                    </p>
                                </div>
                                <div className="absolute top-1/2 right-6 px-3 py-2 bg-background/80 backdrop-blur-sm border border-border/30 rounded-lg">
                                    <p className="text-xs font-light">
                                        ISO 27001
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                                <Shield className="h-3 w-3" />
                                Enterprise Security
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-light">
                                Your data is safe with us
                            </h2>

                            <p className="text-muted-foreground font-light">
                                Face Mark is built with security at its core. We
                                use industry-leading encryption, comply with
                                global privacy regulations, and never share your
                                data with third parties.
                            </p>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center flex-shrink-0">
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-light">
                                            End-to-End Encryption
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            All facial data is encrypted at rest
                                            and in transit using AES-256
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center flex-shrink-0">
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-light">
                                            Privacy First
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            GDPR, FERPA, and COPPA compliant
                                            with full data control
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg border border-border/30 flex items-center justify-center flex-shrink-0">
                                        <Shield className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-light">
                                            Regular Audits
                                        </p>
                                        <p className="text-xs text-muted-foreground font-light">
                                            Third-party security audits and
                                            penetration testing
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - Card Layout */}
            <section id="pricing" className="py-20 px-6 lg:px-8 bg-muted/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                            Choose the plan that fits your institution's needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Starter */}
                        <div className="p-8 border border-border/30 rounded-lg space-y-6 hover:border-border/50 transition-colors bg-card">
                            <div className="space-y-2">
                                <h3 className="text-xl font-light">Starter</h3>
                                <p className="text-xs text-muted-foreground font-light uppercase tracking-wide">
                                    For small classes
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-light">
                                        $49
                                    </span>
                                    <span className="text-sm text-muted-foreground font-light">
                                        /month
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-light">
                                    Up to 100 students
                                </p>
                            </div>

                            <button className="w-full px-4 py-3 border border-border/30 rounded-lg font-light hover:border-border/50 transition-colors">
                                Get Started
                            </button>

                            <div className="space-y-3 pt-4 border-t border-border/20">
                                {[
                                    "Facial recognition",
                                    "Up to 5 events/month",
                                    "Basic reporting",
                                    "Email support",
                                    "Mobile app access",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm font-light"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Professional - Featured */}
                        <div className="p-8 border-2 border-primary/50 rounded-lg space-y-6 bg-primary/5 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-light rounded-full">
                                Most Popular
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-light">
                                    Professional
                                </h3>
                                <p className="text-xs text-muted-foreground font-light uppercase tracking-wide">
                                    For institutions
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-light">
                                        $149
                                    </span>
                                    <span className="text-sm text-muted-foreground font-light">
                                        /month
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-light">
                                    Up to 500 students
                                </p>
                            </div>

                            <button className="w-full px-4 py-3 bg-foreground text-background rounded-lg font-light hover:bg-foreground/90 transition-colors">
                                Get Started
                            </button>

                            <div className="space-y-3 pt-4 border-t border-border/20">
                                {[
                                    "Everything in Starter",
                                    "Unlimited events",
                                    "Advanced analytics",
                                    "Priority support",
                                    "QR code backup",
                                    "Custom branding",
                                    "API access",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm font-light"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enterprise */}
                        <div className="p-8 border border-border/30 rounded-lg space-y-6 hover:border-border/50 transition-colors bg-card">
                            <div className="space-y-2">
                                <h3 className="text-xl font-light">
                                    Enterprise
                                </h3>
                                <p className="text-xs text-muted-foreground font-light uppercase tracking-wide">
                                    For universities
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-light">
                                        Custom
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-light">
                                    Unlimited students
                                </p>
                            </div>

                            <button className="w-full px-4 py-3 border border-border/30 rounded-lg font-light hover:border-border/50 transition-colors">
                                Contact Sales
                            </button>

                            <div className="space-y-3 pt-4 border-t border-border/20">
                                {[
                                    "Everything in Professional",
                                    "Unlimited everything",
                                    "Dedicated account manager",
                                    "24/7 phone support",
                                    "Custom integrations",
                                    "SLA guarantee",
                                    "On-premise deployment",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-sm font-light"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground font-light mt-8">
                        All plans include a 14-day free trial. No credit card
                        required.
                    </p>
                </div>
            </section>

            {/* FAQ Section - Accordion Style */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center space-y-3 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Frequently asked questions
                        </h2>
                        <p className="text-muted-foreground font-light">
                            Everything you need to know about Face Mark
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question:
                                    "How accurate is the facial recognition?",
                                answer: "Face Mark achieves 99.9% accuracy in optimal conditions. Our AI model is trained on diverse datasets and performs well across different lighting conditions and angles.",
                            },
                            {
                                question: "Is my students' data secure?",
                                answer: "Absolutely. We use bank-level encryption (AES-256) for all data. Facial descriptors are stored securely and never shared. We're fully compliant with GDPR, FERPA, and COPPA.",
                            },
                            {
                                question:
                                    "What happens if facial recognition fails?",
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
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-colors space-y-3 bg-card"
                            >
                                <h3 className="text-lg font-light">
                                    {faq.question}
                                </h3>
                                <p className="text-sm text-muted-foreground font-light">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 border border-border/30 rounded-lg text-center space-y-4 bg-muted">
                        <p className="text-sm font-light">
                            Still have questions?
                        </p>
                        <button className="px-6 py-2 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 transition-colors bg-background">
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>

            {/* Final CTA Section - Full Width */}
            <section className="py-20 px-6 lg:px-8 bg-primary text-primary-foreground">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-light">
                            Ready to transform attendance?
                        </h2>
                        <p className="font-light max-w-2xl mx-auto opacity-90">
                            Join thousands of institutions using Face Mark to
                            save time, reduce fraud, and improve accuracy. Start
                            your free trial today.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-background text-foreground rounded-lg font-light hover:bg-background/90 transition-colors">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-3 border border-primary-foreground/30 rounded-lg font-light hover:border-primary-foreground/50 transition-colors">
                            Schedule Demo
                        </button>
                    </div>

                    <p className="text-xs font-light opacity-70">
                        14-day free trial • No credit card required • Cancel
                        anytime
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/30 py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                                    <Scan className="h-5 w-5 text-background" />
                                </div>
                                <span className="text-lg font-light">
                                    Face Mark
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground font-light">
                                AI-powered attendance management for modern
                                institutions
                            </p>
                        </div>

                        {[
                            {
                                title: "Product",
                                links: [
                                    "Features",
                                    "Pricing",
                                    "Security",
                                    "Updates",
                                    "Integrations",
                                ],
                            },
                            {
                                title: "Company",
                                links: [
                                    "About",
                                    "Blog",
                                    "Careers",
                                    "Contact",
                                    "Press Kit",
                                ],
                            },
                            {
                                title: "Legal",
                                links: [
                                    "Privacy",
                                    "Terms",
                                    "Security",
                                    "Compliance",
                                    "Cookies",
                                ],
                            },
                        ].map((group, index) => (
                            <div key={index} className="space-y-4">
                                <h4 className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                    {group.title}
                                </h4>
                                <ul className="space-y-2">
                                    {group.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href="#"
                                                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <p className="text-xs text-muted-foreground font-light">
                                © 2025 Face Mark. All rights reserved.
                            </p>
                            <p className="text-xs text-muted-foreground font-light flex items-center gap-2">
                                Developed by
                                <a
                                    href="https://github.com/almonsour13"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors font-medium"
                                >
                                    Al-Monsour Salida
                                </a>
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-light"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-light"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-light"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
