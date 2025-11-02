"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { resetPassowrd, verifyEmailToken } from "@/lib/api/auth";
import { ResetPasswordFormData, resetPasswordSchema } from "@/zod/schema";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<
        Partial<Record<keyof ResetPasswordFormData, string>>
    >({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isVerifyingToken, setIsVerifyingToken] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push("/signin");
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await verifyEmailToken(token);
                setIsVerifyingToken(true);

                if (response.valid) {
                    setEmail(response.decoded.email);
                    setIsTokenValid(true);
                    console.log("Token is valid");
                } else {
                    router.push("/signin");
                }
            } catch (error) {
                console.error("Token verification error:", error);
                router.push("/");
            } finally {
                setIsVerifyingToken(false);
            }
        };

        verifyToken();
    }, [token, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (errors[name as keyof ResetPasswordFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = resetPasswordSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<
                Record<keyof ResetPasswordFormData, string>
            > = {};
            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof ResetPasswordFormData;
                fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setIsLoading(true);

        try {
            const response = await resetPassowrd({
                email,
                password: formData.password,
            });

            if (response.success) {
                setMessage(response.message);
                toast.success(response.message);
                setTimeout(() => {
                    router.push("/signin");
                }, 3000);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 flex flex-col items-center justify-center">
                <form
                    className="w-full md:max-w-sm flex  flex-col gap-4 rounded-md bg-mauted"
                    onClick={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Reset Password</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your new password below
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroupInput
                                type={
                                    showPassword.password ? "text" : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className=""
                                required
                            />
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                    aria-label="Show password"
                                    title="Show password"
                                    size="icon-xs"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            password: !showPassword.password,
                                        })
                                    }
                                >
                                    {!showPassword.password ? (
                                        <Eye />
                                    ) : (
                                        <EyeOff />
                                    )}
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Confirm Password</Label>
                        <InputGroup>
                            <InputGroupInput
                                type={
                                    showPassword.confirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                className=""
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <InputGroupAddon>
                                <Lock />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                    aria-label="Show password"
                                    title="Show password"
                                    size="icon-xs"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            confirmPassword:
                                                !showPassword.confirmPassword,
                                        })
                                    }
                                >
                                    {!showPassword.confirmPassword ? (
                                        <Eye />
                                    ) : (
                                        <EyeOff />
                                    )}
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                        {message && (
                            <p className="text-sm text-green-500">{message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            disabled={
                                !formData.password ||
                                !formData.confirmPassword ||
                                formData.password !==
                                    formData.confirmPassword ||
                                isLoading
                            }
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
