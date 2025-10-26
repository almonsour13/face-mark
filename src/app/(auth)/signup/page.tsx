"use client";
import AccountCreationForm from "@/components/auth/account-creation-form";
import { Suspense } from "react";

export default function SignUpPage() {
    return (
        <Suspense>
            <div className="w-full min-h-screen flex">
                <div className="flex-1 flex items-center justify-center">
                    <AccountCreationForm />
                </div>
                <div className="flex-1"></div>
            </div>
        </Suspense>
    );
}
