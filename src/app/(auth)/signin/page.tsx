"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignInUser } from "@/hooks/use-auth";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
    const [form, setForm] = useState({
        name: "almonsour",
        email: "almonsoursalida@gmail.com",
        password: "almonsour13",
    });

    const { mutate: signIn, isPending: isLoading, error } = useSignInUser();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn(form, {
            onError: (error) => console.log("error:", error),
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
    return (
        <div className="w-full min-h-screen flex  items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="max-w-7xl w-full flex z-10">
                <div className="flex-1 flex items-center justify-center">
                    <Card className="max-w-lg w-full mx-auto">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">
                                Sign In
                            </CardTitle>
                            <CardDescription>
                                Enter your credentials to access your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <FieldGroup className="gap-4">
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={form.email}
                                                className="pl-10 h-10"
                                                placeholder="m@example.com"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Field>
                                    <Field className="gap-1">
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                                            <Input
                                                id="password"
                                                type="password"
                                                className="pl-10 h-10"
                                                value={form.password}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {error && (
                                            <span className="text-red-500 text-sm">
                                                {error.message}
                                            </span>
                                        )}
                                    </Field>

                                    <FieldGroup>
                                        <Field>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className=" h-10"
                                            >
                                                Sign In
                                            </Button>
                                            <FieldDescription className="px-6 text-center">
                                                Don't have an account?{" "}
                                                <a href="signup">Sign Up</a>
                                            </FieldDescription>
                                        </Field>
                                    </FieldGroup>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-lg space-y-4">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-bold leading-tight">
                                Welcome back to
                                <br />
                                <span className="text-primary">Face Mark</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Your intelligent face recognition attendance
                                system. Sign in to access your dashboard and
                                manage attendance records effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
