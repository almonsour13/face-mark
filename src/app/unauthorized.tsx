import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";

export function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Empty className="h-full w-full">
                <EmptyHeader>
                    <EmptyTitle>404 - Not Found</EmptyTitle>
                    <EmptyDescription>
                        The page you&apos;re looking for doesn&apos;t exist.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    );
}
