"use client";

import Link from "next/link";

export default function AccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <h1 className="text-3xl font-bold mb-4 text-red-600">
                Access Restricted
            </h1>

            <p className="text-gray-600 mb-6 max-w-md">
                You need to sign in to access this page.
            </p>

            <Link
                href="/signin"
                className="bg-prmary text-white px-4 py-2 rounded-md transition"
            >
                Go to Sign In
            </Link>
        </div>
    );
}
