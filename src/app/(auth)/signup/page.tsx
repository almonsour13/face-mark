"use client"
import AccountCreationForm from "@/components/auth/account-creation-form";

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
