"use client"
import AccountCreationForm from "@/components/auth/account-creation-form";
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
import { useSignUpUser } from "@/hooks/use-auth";
import { useState } from "react";

export default function SignUpPage() {
    return (
        <div className="w-full min-h-screen flex">
            <div className="flex-1 flex items-center justify-center">
                <AccountCreationForm />
            </div>
            <div className="flex-1">

            </div>
        </div>
    );
}
