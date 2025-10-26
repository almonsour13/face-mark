"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook for managing query params, skipping default values.
 *
 * @param basePath - The base path (e.g., '/event')
 * @param params - The actual current param values
 * @param defaults - Default param values to skip if unchanged
 * @param options - Optional settings (replace vs push)
 */
export function useUpdateQueryParams(
    basePath: string,
    params: Record<string, string | number | boolean | null | undefined>,
    defaults: Record<string, string | number | boolean | null | undefined> = {},
    options?: { replace?: boolean }
) {
    const router = useRouter();

    useEffect(() => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            const defaultValue = defaults[key];
            if (
                value !== undefined &&
                value !== null &&
                value !== "" &&
                value !== defaultValue
            ) {
                searchParams.set(key, String(value));
            }
        });

        const query = searchParams.toString();
        const url = query ? `${basePath}?${query}` : basePath;

        if (options?.replace) {
            router.replace(url);
        } else {
            router.push(url);
        }
    }, [
        basePath,
        options?.replace,
        router,
        defaults,
        params
    ]);
}
