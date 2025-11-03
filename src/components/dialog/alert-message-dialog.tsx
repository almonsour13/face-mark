"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UnsavedChangesAlertProps {
    open: boolean;
    setOpen: (boolean: boolean) => void;
    onDiscard: () => void;
    description?: string;
    title?: string;
}

export default function AlertMessageDialog({
    open,
    setOpen,
    onDiscard,
    title = "Unsaved Changes",
    description = "You have unsaved changes. If you close this form, all data will be lost. Do you really want to exit?",
}: UnsavedChangesAlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)} >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onDiscard}>
                        Discard Changes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
