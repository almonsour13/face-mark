import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
interface DialogSheetWrapperProps extends React.ComponentProps<"div"> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    triggerButton?: React.ReactNode;
}
export default function DialogSheetWrapper({
    open = false,
    onOpenChange,
    children,
    triggerButton,
}: DialogSheetWrapperProps) {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetTrigger asChild>{triggerButton}</SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="h-[90vh] overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle className="text-2xl">
                            Create New Event
                        </SheetTitle>
                        <SheetDescription>
                            Fill in the details to create a new event. All
                            fields are required.
                        </SheetDescription>
                    </SheetHeader>
                    <div>{children}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="p-0 w-full">
                <ScrollArea className="p-0 max-h-[90vh] w-full">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl">
                            Create New Event
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new event. All
                            fields are required.
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
