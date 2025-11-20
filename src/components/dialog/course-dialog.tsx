import { useCallback, useEffect, useState } from "react";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { fetchApi } from "@/lib/api";
import { useCoursesStore } from "@/store/use-course-store";
import { toast } from "sonner";

interface AddCourseDialogProps {
    children?: React.ReactNode;
    type?: "add" | "edit";
    initialData?: {
        id: string;
        name: string;
        code: string;
    };
     refetch?: () => void
}
interface FormData {
    id?: string;
    name: string;
    code: string;
}
export default function CourseDialog({
    children,
    type = "add",
    initialData,
    refetch
}: AddCourseDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        code: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        code: "",
    });
    const [error, setError] = useState("");

    const { addNewCourse, updateCourse } = useCoursesStore();

    useEffect(() => {
        if (type === "edit" && initialData) {
            setFormData({
                id: initialData.id,
                name: initialData.name,
                code: initialData.code,
            });
        }
    }, [type, initialData]);

    const automateCourseCode = useCallback((name: string) => {
        setTimeout(() => {
            const cleaned = name
                .replace(/\b(of|and|or|the|in|on|at|for)\b/gi, "")
                .replace(/[^a-zA-Z\s]/g, "")
                .replace(/\s+/g, " ")
                .trim();

            const words = cleaned.split(" ");
            const abbv = words.map((w) => w[0]?.toUpperCase()).join("");

            setFormData((prev) => ({
                ...prev,
                code: abbv,
            }));
        }, 300);
    }, []);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "name") automateCourseCode(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError("");
            setErrors({ name: "", code: "" });


            const method = type === "edit" ? "PUT" : "POST";

            const response = await fetchApi('/api/course', {
                method,
                body: JSON.stringify(formData),
            });

            if (response.success) {
                setOpen(false);
                setFormData({ name: "", code: "" });

                if (type === "edit" && formData.id) {
                    updateCourse(formData.id, response.course);
                    toast.success("Course updated successfully");
                } else {
                    addNewCourse(response.course);
                    toast.success("Course added successfully");
                }
                refetch && refetch()
                return;
            }

            setErrors(response.errors);
        } catch (error: any) {
            console.log(error);
            setError(error.message || String(error));
        } finally {
            setIsLoading(false);
        }
    };

    const isValid =
        (type === "add" && !formData.name && !formData.code) ||
        (type === "edit" &&
            formData.name === initialData?.name &&
            formData.code === initialData?.code) ||
        (!formData.code && !formData.name);

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={
                children ? (
                    children
                ) : (
                    <Button>
                        {type === "edit" ? "Edit Course" : "Add Course"}
                    </Button>
                )
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">
                            {type === "edit" ? "Edit Course" : "Add New Course"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {type === "edit"
                                ? "Update the details of this course."
                                : "Fill in the details to create a new course."}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ex: Bachelor of Science in Computer Science"
                            value={formData.name}
                            onChange={handleChangeInput}
                            required
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="code">Code:</Label>
                        <Input
                            id="code"
                            name="code"
                            placeholder="Ex: BSCS"
                            value={formData.code}
                            onChange={handleChangeInput}
                            required
                        />
                        {errors.code && (
                            <p className="text-xs text-red-500">
                                {errors.code}
                            </p>
                        )}
                        {error && (
                            <p className="text-xs text-red-500">{error}</p>
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
                        <Button type="submit" disabled={isValid || isLoading}>
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
