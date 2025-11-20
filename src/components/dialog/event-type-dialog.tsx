import { useEffect, useState } from "react";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";
import { useEventTypesStore } from "@/store/use-event-types-store";

interface EventTypeDialogProps {
    children?: React.ReactNode;
    type?: "add" | "edit";
    initialData?: {
        id: string;
        name: string;
    };
    refetch?: () => void;
}
export default function EventTypeDialog({
    children,
    type = "add",
    initialData,
    refetch,
}: EventTypeDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { addNewEventType, updateEventType } = useEventTypesStore();

    useEffect(() => {
        if (type === "edit" && initialData) {
            setName(initialData.name);
        }
    }, [type, initialData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const method = type === "edit" ? "PUT" : "POST";

            const response = await fetchApi("/api/event/type/", {
                method,
                body: JSON.stringify({ id: initialData?.id, name }),
            });

            if (response.success) {
                if (type === "edit" && initialData?.id) {
                    updateEventType(initialData.id, response.eventType);
                    toast.success("Event Type updated successfully");
                } else {
                    addNewEventType(response.eventType);
                    toast.success("Event Type added successfully");
                }

                refetch && refetch();
                setOpen(false);
                setName("");
                return;
            }

            setError(response.error);
        } catch (error) {
            console.log(error);
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={children ? children : <Button>Add Course</Button>}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">
                            {type === "edit"
                                ? "Edit Event Type"
                                : "Add New Event Type"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {type === "edit"
                                ? "Update the name of the event type."
                                : "Fill in the details to create a new event type."}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ex: Meeting"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {error && (
                            <p className="text-xs text-destructive">{error}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 sticky bottom-0 bg-background">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name || isLoading}>
                            {isLoading
                                ? type === "edit"
                                    ? "Updating..."
                                    : "Adding..."
                                : type === "edit"
                                ? "Update"
                                : "Add"}
                        </Button>
                    </div>
                </div>
            </form>
        </DialogSheetWrapper>
    );
}
