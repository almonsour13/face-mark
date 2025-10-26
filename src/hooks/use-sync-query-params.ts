"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * A reusable hook that syncs multiple query params with their respective state.
 * Each param can have its own type.
 */
export function useSyncQueryParams<
    T extends Record<string, [any, React.Dispatch<React.SetStateAction<any>>]>
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
}
