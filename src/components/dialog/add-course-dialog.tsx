import { useState } from "react";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddCourseDialogProps {
    children?: React.ReactNode;
}
export default function AddCourseDialog({ children }: AddCourseDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={children ? children : <Button>Add Course</Button>}
        >
            <form action="">
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">
                            Add New Course
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Fill in the details to create a new course. All
                            fields are required.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ex: Bachelor of Science in Computer Science"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Code:</Label>
                        <Input
                            id="code"
                            name="code"
                            placeholder="Ex: BsCs"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2 sticky bottom-0 bg-background">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Add</Button>
                    </div>
                </div>
            </form>
        </DialogSheetWrapper>
    );
}
