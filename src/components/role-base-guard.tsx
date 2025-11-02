"use client";

import { NotFound } from "@/app/unauthorized";
import { roleValue } from "@/constant";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface RBACGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export default function RBACGuard({ children, allowedRoles }: RBACGuardProps) {
    const { data: session, status } = useSession();
    const [authorized, setAuthorized] = useState(false);
    const [checked, setChecked] = useState(false); // to know when check is done

    useEffect(() => {
        if (status === "loading") return;
        
        if(!session?.user?.role) return; 

        const userRole = roleValue[parseInt(session.user.role)]

        if (!session || !userRole || !allowedRoles.includes(userRole)) {
            setAuthorized(false);
        } else {
            setAuthorized(true);
        }
        console.log(userRole);
        setChecked(true);
    }, [session, status, allowedRoles]);

    

    if (!authorized) {
        return <NotFound />;
    }

    return <>{children}</>;
}
