"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useSyncQueryParams<
    T extends Record<
        string,
        [string, React.Dispatch<React.SetStateAction<string>>]
    >
>({ params }: { params: T }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        for (const key in params) {
            const value = searchParams.get(key);
            if (value !== null) {
                const [, setValue] = params[key];
                setValue(value);
            }
        }
    }, [searchParams, params]);
}
