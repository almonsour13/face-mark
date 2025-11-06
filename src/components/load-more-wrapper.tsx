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
}

/**
 * LoadMoreWrapper Component
 *
 * A professional infinite scroll wrapper that automatically loads more content
 * when the user scrolls near the bottom of the page.
 *
 * @param children - The content to be displayed
 * @param hasMore - Whether there is more content to load
 * @param loadMore - Callback function to load more content
 * @param isLoading - Whether content is currently being loaded
 * @param threshold - Distance from bottom (in pixels) to trigger load
 * @param loadingStateMessage - Message displayed while loading
 * @param endMessage - Message displayed when all content is loaded
 */
export default function LoadMoreWrapper({
    children,
    hasMore,
    loadMore,
    isLoading,
    threshold = 300,
    loadingStateMessage = "Loading more content...",
    endMessage = "You've reached the end",
}: LoadMoreWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef(loadMore);

    // Keep loadMore ref updated to avoid stale closures
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Memoized scroll handler with proper cleanup
    const handleScroll = useCallback(() => {
        if (!hasMore || isLoading) return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= docHeight - threshold) {
            loadMoreRef.current();
        }
    }, [hasMore, isLoading, threshold]);

    useEffect(() => {
        // Throttle scroll events for better performance
        let timeoutId: NodeJS.Timeout | null = null;

        const throttledScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 100);
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [handleScroll]);

    return (
        <div ref={containerRef} className="relative w-full">
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
                        <span>{endMessage}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
