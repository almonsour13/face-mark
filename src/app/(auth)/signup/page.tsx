"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    AlertCircle,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSignUp } from "@/hooks/auth/use-signup";

export default function Page() {
    const {
        formData,
        handleChange,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        isLoading,
        processStatus,
        statusMessage,
    } = useSignUp();

    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:max-w-sm flex flex-col gap-4 rounded-md bg-mauted"
                >
                    <div className="flex md:hidden">face Mark</div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Sign Up</h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to get started
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <InputGroup>
                            <InputGroupInput
                                type="text"
                                name="name"
                                className=""
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.name && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <InputGroup>
                            <InputGroupInput
                                type="email"
                                name="email"
                                className=""
                                placeholder="johndoe@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                required
                            />
                            <InputGroupAddon>
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.email && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroupInput
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className=""
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
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
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={isLoading}
                                >
                                    {!showPassword ? <Eye /> : <EyeOff />}
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.password && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button disabled={isLoading}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {processStatus === "validating" && "Validating..."}
                                    {processStatus === "creating" && "Creating Account..."}
                                    {processStatus === "processing" && "Processing..."}
                                    {processStatus === "redirecting" && "Redirecting..."}
                                    {processStatus === "success" && "Success!"}
                                    {!processStatus && "Loading..."}
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() =>
                                signIn("google", { callbackUrl: "/home" })
                            }
                        >
                            Continue with Google
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
            <div className="flex-1 flex p-8 max-lg:hidden">
                <div className="flex-1 w-full h-full bg-primary rounded-md p-8 border flex-col justify-center hidden lg:flex"></div>
            </div>
        </div>
    );
}