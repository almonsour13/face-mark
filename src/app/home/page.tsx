"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
    const { data: session } = useSession();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">
                Home {session?.user?.name}
                role:{session?.user?.role}
            </h1>
            <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Sign Out
            </button>
        </div>
    );
}
