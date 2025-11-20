import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

interface SheetWrapperProps extends React.ComponentProps<"div"> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    triggerButton?: React.ReactNode;
    side?: "right" | "top" | "bottom" | "left";
}
export default function SheetWrapper({
    open = false,
    onOpenChange,
    children,
    triggerButton,
    side = "right",
}: SheetWrapperProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {triggerButton && (
                <SheetTrigger asChild>{triggerButton}</SheetTrigger>
            )}
            <SheetContent side={side} >
                <ScrollArea className="flex max-h-screen">
                    {children}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
