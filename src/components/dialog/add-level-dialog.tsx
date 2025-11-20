import { useEffect, useState } from "react";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";
import { useLevelStore } from "@/store/use-level-store";

interface LevelDialogProps {
    children?: React.ReactNode;
    type?: "add" | "edit";
    initialData?: {
        id: string;
        name: string;
    };
    refetch?: () => void;
}

export default function LevelDialog({
    children,
    type = "add",
    initialData,
    refetch,
}: LevelDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { addNewLevel, updateLevel } = useLevelStore();

    // Prefill name when editing
    useEffect(() => {
        if (type === "edit" && initialData) {
            setName(initialData.name);
        }
    }, [type, initialData, open]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError("");

            const endpoint =
                type === "edit"
                    ? `/api/level/${initialData?.id}`
                    : `/api/level`;

            const method = type === "edit" ? "PUT" : "POST";

            const response = await fetchApi(endpoint, {
                method,
                body: JSON.stringify({ name }),
            });

            if (response.success) {
                if (type === "edit" && initialData?.id) {
                    updateLevel(initialData.id, response.level);
                    toast.success("Level updated successfully");
                } else {
                    addNewLevel(response.level);
                    toast.success("Level added successfully");
                }
                setOpen(false);
                setName("");
                refetch && refetch();
                return;
            }

            setError(response.error);
        } catch (error) {
            console.error(error);
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={
                children ? children : <Button>Add Level | Year</Button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">
                            {type === "edit"
                                ? "Edit Level | Year"
                                : "Add New Level | Year"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {type === "edit"
                                ? "Update the level or year name."
                                : "Fill in the details to create a new level or year."}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ex: 1st Year"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {error && <p className="text-xs text-error">{error}</p>}
                    </div>

                    <div className="flex justify-end gap-2 sticky bottom-0 bg-background">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                (!name && type === "add") ||
                                (type === "edit" &&
                                    initialData?.name === name) ||
                                !name ||
                                isLoading
                            }
                        >
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
