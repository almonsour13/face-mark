import { Loader2 } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

interface LoadMoreWrapperProps {
    children: React.ReactNode;
    hasMore: boolean;
    loadMore: () => void;
    isLoading: boolean;
    threshold?: number;
    loadingStateMessage?: string;
    endMessage?: string;
    /** Whether to use window scroll (default) or container scroll */
    scrollTarget?: "window" | "container";
}

export default function LoadMoreWrapper({
    children,
    hasMore,
    loadMore,
    isLoading,
    threshold = 300,
    loadingStateMessage = "Loading more content...",
    endMessage = "You've reached the end",
    scrollTarget = "window",
}: LoadMoreWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef(loadMore);

    // Keep loadMore ref updated to avoid stale closures
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Detect if scroll reached end
    const handleScroll = useCallback(() => {
        if (!hasMore || isLoading) return;

        if (scrollTarget === "window") {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= docHeight - threshold) {
                loadMoreRef.current();
            }
        } else if (scrollTarget === "container") {
            const container = containerRef.current;
            if (!container) return;

            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                loadMoreRef.current();
            }
        }
    }, [hasMore, isLoading, threshold, scrollTarget]);

    useEffect(() => {
        const targetElement =
            scrollTarget === "window" ? window : containerRef.current;

        if (!targetElement) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const throttledScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 100);
        };

        targetElement.addEventListener(
            "scroll",
            throttledScroll as EventListener,
            { passive: true }
        );

        return () => {
            targetElement.removeEventListener(
                "scroll",
                throttledScroll as EventListener
            );
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [handleScroll, scrollTarget]);

    return (
        <div
            ref={scrollTarget === "container" ? containerRef : null}
            className={scrollTarget === "container" ? "overflow-auto max-h-[80vh]" : ""}
        >
            {children}

            <div className="py-8 flex items-center justify-center">
                {isLoading && hasMore && (
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium text-muted-foreground">
                            {loadingStateMessage}
                        </span>
                    </div>
                )}

                {!hasMore && (
                    <div className="text-sm font-medium text-muted-foreground">
                        {endMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
