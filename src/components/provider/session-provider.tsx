"use client";

import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export  function AuthSessionProvider({ children }: Props) {

    return (
        <SessionProvider
        >
            {children}
        </SessionProvider>
    );
}
