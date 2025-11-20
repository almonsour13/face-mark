"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce"; 

interface UseUrlFilterProps {
  defaultValue?: Record<string, string>;
}

export function useUrlFilter({ defaultValue = {} }: UseUrlFilterProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<Record<string, string>>(defaultValue);
    const [searchValue, setSearchValue] = useState("");

    const debouncedSearch = useDebounce(searchValue, 500); // ⏳ delay in ms


    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setFilters(params);
        setSearchValue(params.search || "");
    }, [searchParams]);

    const setFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };

        Object.keys(newFilters).forEach((k) => {
            if (
                newFilters[k] === "" ||
                newFilters[k] === "all" ||
                newFilters[k] === "0" ||
                newFilters[k] === "false"
            ) {
                delete newFilters[k];
            }
        });

        const params = new URLSearchParams(newFilters);
        router.replace(`?${params.toString()}`, { scroll: false });
        setFilters(newFilters);
    };

    // 🔹 Only apply search when debounced value changes
    // useEffect(() => {
    //     if (debouncedSearch) {
    //         setFilter("search", debouncedSearch);
    //     }
    // }, [debouncedSearch]);

    // 🔹 Count active filters (excluding defaults)
    const hasActiveFilters = useMemo(
        () =>
            Object.entries(filters).filter(
                ([key, value]) =>
                    key !== "isPriority" &&
                    key !== "search" &&
                    key !== "sortBy" &&
                    value !== "all" &&
                    value !== "0"
            ).length,
        [filters]
    );


    return {
        filters,
        setFilter,
        searchValue,
        setSearchValue,
        hasActiveFilters,
    };
}
