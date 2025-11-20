import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { roleValue } from "@/constant";
import { useCourses } from "@/hooks/query/use-courses";
import { Plus, User } from "lucide-react";
import { useState } from "react";
import { Switch } from "../ui/switch";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import AlertMessageDialog from "./alert-message-dialog";
import { toast } from "sonner";
import CourseDialog from "./course-dialog";
import LevelDialog from "./add-level-dialog";
import { useLevel } from "@/hooks/query/use-level";

interface CreateUserDialogProps {
    children?: React.ReactNode;
}

interface UserFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number;
    status: number;
    studentId: string;
    courseId: string;
    levelId: string;
    emailVerified: number;
}

export default function CreateUserDialog({ children }: CreateUserDialogProps) {
    const [open, setOpen] = useState(false);
    const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: 1, // Default to user role
        status: 1, // Default to active
        studentId: "",
        courseId: "",
        levelId: "",
        emailVerified: 0,
    });

    const {
        data: coursesData,
        isPending: isCoursesLoading,
        refetch: refetchCourses,
    } = useCourses();

    const {
        data: levelsData,
        isPending: isLevelsLoading,
        refetch: refetchLevels,
    } = useLevel();

    const isStudent = formData.role === 1;
    const isFormDirty = Object.values(formData).some((value) => value !== "" && value !== 1);
    
    const isValid =
        formData.name &&
        formData.email &&
        formData.password &&
        formData.password === formData.confirmPassword &&
        (!isStudent || (formData.studentId && formData.courseId && formData.levelId));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof UserFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: keyof UserFormData, checked: boolean) => {
        setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            // API call to create user
            // const response = await createUser(formData);
            
            toast.success("User created successfully");
            handleReset();
            setOpen(false);
        } catch (error) {
            toast.error("Failed to create user");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: 1,
            status: 1,
            studentId: "",
            courseId: "",
            levelId: "",
            emailVerified: 0,
        });
    };

    const handleDiscard = () => {
        handleReset();
        setOpen(false);
        toast.success("Changes discarded");
    };

    return (
        <>
            <DialogSheetWrapper
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen && isFormDirty) {
                        setAlertDialogOpen(true);
                        return;
                    }
                    setOpen(isOpen);
                }}
                triggerButton={
                    children ? (
                        children
                    ) : (
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add User
                        </Button>
                    )
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 p-4 md:p-6 pb-0">
                        {/* Header */}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold">Create New User</h1>
                            <p className="text-sm text-muted-foreground">
                                Fill in the details to create a new user account. Required fields
                                are marked with *.
                            </p>
                        </div>

                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formData.confirmPassword &&
                                        formData.password !== formData.confirmPassword && (
                                            <p className="text-xs text-red-500">
                                                Passwords do not match
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="space-y-4 pt-4 border-t border-border/30">
                            <h3 className="text-sm font-medium">Account Settings</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="role">
                                        Role <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.role.toString()}
                                        onValueChange={(value) =>
                                            handleSelectChange("role", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(roleValue).map(([key, value]) => (
                                                <SelectItem key={key} value={key}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Account Status</Label>
                                    <div className="flex items-center justify-between h-10 px-3 border rounded-md">
                                        <span className="text-sm">
                                            {formData.status === 1 ? "Active" : "Inactive"}
                                        </span>
                                        <Switch
                                            checked={formData.status === 1}
                                            onCheckedChange={(checked) =>
                                                handleSwitchChange("status", checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="emailVerified">Email Verification</Label>
                                    <div className="flex items-center justify-between h-10 px-3 border rounded-md">
                                        <span className="text-sm">
                                            {formData.emailVerified === 1 ? "Verified" : "Not Verified"}
                                        </span>
                                        <Switch
                                            checked={formData.emailVerified === 1}
                                            onCheckedChange={(checked) =>
                                                handleSwitchChange("emailVerified", checked)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <p className="text-xs text-muted-foreground pb-3">
                                        Toggle to mark email as verified without sending verification email
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Student Information (Only for Students) */}
                        {isStudent && (
                            <div className="space-y-4 pt-4 border-t border-border/30">
                                <h3 className="text-sm font-medium">Student Information</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="studentId">
                                        Student ID <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="studentId"
                                        name="studentId"
                                        placeholder="2024-00001"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        required={isStudent}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="course">
                                            Course <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex gap-2">
                                            <Select
                                                value={formData.courseId}
                                                onValueChange={(value) =>
                                                    handleSelectChange("courseId", value)
                                                }
                                                disabled={isCoursesLoading}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue placeholder="Select Course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {coursesData?.courses?.map((course) => (
                                                        <SelectItem
                                                            key={course.id}
                                                            value={course.id}
                                                        >
                                                            {course.name} ({course.code})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <CourseDialog refetch={refetchCourses}>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    type="button"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </CourseDialog>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="level">
                                            Year Level <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="flex gap-2">
                                            <Select
                                                value={formData.levelId}
                                                onValueChange={(value) =>
                                                    handleSelectChange("levelId", value)
                                                }
                                                disabled={isLevelsLoading}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue placeholder="Select Level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {levelsData?.levels?.map((level) => (
                                                        <SelectItem
                                                            key={level.id}
                                                            value={level.id}
                                                        >
                                                            {level.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <LevelDialog refetch={refetchLevels}>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    type="button"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </LevelDialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 sticky bottom-0 bg-background p-4 md:px-6 border-t border-border/30">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || !isValid}>
                            {isLoading ? "Creating..." : "Create User"}
                        </Button>
                    </div>
                </form>
            </DialogSheetWrapper>

            <AlertMessageDialog
                description="You have unsaved changes. Are you sure you want to discard them?"
                open={isAlertDialogOpen}
                setOpen={setAlertDialogOpen}
                onDiscard={handleDiscard}
            />
        </>
    );
}