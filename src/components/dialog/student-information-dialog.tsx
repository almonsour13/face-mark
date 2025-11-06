"use client";

import DialogSheetWrapper from "@/components/dialog/dialog-sheet-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { levelsValue } from "@/constant";
import { useCourses } from "@/hooks/query/use-courses";
import { useLevel } from "@/hooks/query/use-level";
import { useFaceModel } from "@/hooks/use-face-model";
import { checkProfileInfo, updateStudentInfo } from "@/lib/api/profile";
import * as faceapi from "face-api.js";
import { ImagePlus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserWithDetails } from "@/store/use-user-store";
interface StudentInformationDialogProps {
    profileInfo: UserWithDetails | null;
}
export default function StudentInformationDialog({
    profileInfo,
}: StudentInformationDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        studentId: "2021-3481",
        courseId: "",
        levelId: "",
        image: "",
    });

    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<"forward" | "backward">(
        "forward"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: levelsData, isPending: isLevelLoading } = useLevel();
    useFaceModel();
    const { data: coursesData, isPending: isCourseLoading } = useCourses();

    useEffect(() => {
        if (profileInfo) {
            const { name, studentDetails } = profileInfo;

            setFormData((prev) => ({
                ...prev,
                name,
                ...(studentDetails?.studentId
                    ? { studentId: studentDetails.studentId }
                    : {}),
                ...(studentDetails?.course
                    ? { courseId: studentDetails.course.id }
                    : {}),
                ...(studentDetails?.level
                    ? { levelId: studentDetails.level.id }
                    : {}),
            }));

            setOpen(true);
        }
    }, [profileInfo]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData({ ...formData, image: result });
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        } catch (error) {
            console.error("Error reading file:", error);
            toast.error("Failed to read image file");
        }
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const goToStep = (step: number, dir: "forward" | "backward") => {
        setDirection(dir);
        setStep(step);
    };

    const handleNext = () => {
        if (step === 1) {
            if (
                !formData.name ||
                !formData.studentId ||
                !formData.courseId ||
                !formData.levelId
            ) {
                toast.error("Please fill in all fields");
                return;
            }
            goToStep(2, "forward");
        }
    };

    const handleBack = () => {
        if (step > 1) goToStep(step - 1, "backward");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error("Please upload a profile image");
            return;
        }
        if (!formData.image || !selectedFile) {
            toast.error("Please upload a profile image");
            return;
        }
        setIsLoading(true);

        try {
            const img = await faceapi.bufferToImage(selectedFile);

            const detection = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                toast.error(
                    "No face detected in the image. Please upload a clear photo of your face."
                );
                setIsLoading(false);
                return;
            }

            const response = await updateStudentInfo({
                name: formData.name,
                studentId: formData.studentId,
                courseId: formData.courseId,
                levelId: formData.levelId,
                image: formData.image,
                descriptor: Array.from(detection.descriptor),
            });

            console.log("Student info update response:", response);
            if (response.success) {
                toast.success("Student information saved successfully!");
                setOpen(false);
            } else {
                toast.error(response.message || "Failed to save information");
            }
        } catch (error: any) {
            console.error("Error saving student info:", error);
            toast.error(error.message || "Failed to save information");
        } finally {
            setIsLoading(false);
        }
    };

    const isStep1Valid =
        formData.name &&
        formData.studentId &&
        formData.courseId &&
        formData.levelId;
    const isStep2Valid = formData.image;

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen && (!isStep1Valid || !isStep2Valid)) {
                    toast.warning("Please complete your student information");
                    return;
                }
                setOpen(isOpen);
            }}
        >
            <form
                key={step}
                className={`space-y-8 animate-in fade-in ${
                    direction === "forward"
                        ? "slide-in-from-right"
                        : "slide-in-from-left"
                } duration-300`}
                onSubmit={handleSubmit}
            >
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold">
                            Student Information
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Step {step} of 2:{" "}
                            {step === 1
                                ? "Basic Information"
                                : "Profile Picture"}
                        </p>
                    </div>
                    {step === 1 && (
                        <div className="flex flex-col gap-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Event Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e.target.name,
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="studentId">Student Id</Label>
                                <Input
                                    id="studentId"
                                    name="studentId"
                                    placeholder="Event Name"
                                    value={formData.studentId}
                                    onChange={(e) =>
                                        handleInputChange(
                                            e.target.name,
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course">Course</Label>
                                <Select
                                    value={formData.courseId}
                                    onValueChange={(value) => {
                                        handleInputChange("courseId", value);
                                    }}
                                    required
                                >
                                    <SelectTrigger className="bg-background border-input text-foreground w-full">
                                        <SelectValue placeholder="Select your course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {isCourseLoading ? (
                                            <div className="w-full text-center">
                                                <p>loading</p>
                                            </div>
                                        ) : (
                                            coursesData?.courses.map(
                                                (course) => (
                                                    <SelectItem
                                                        key={course.id}
                                                        value={course.id}
                                                    >
                                                        {course.name} (
                                                        {course.code})
                                                    </SelectItem>
                                                )
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="levelId">Level</Label>
                                <Select
                                    value={formData.levelId}
                                    onValueChange={(value) => {
                                        handleInputChange("levelId", value);
                                    }}
                                    required
                                >
                                    <SelectTrigger className="bg-background border-input text-foreground w-full">
                                        <SelectValue placeholder="Select your year/level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {isLevelLoading ? (
                                            <div className="w-full text-center">
                                                <p>loading</p>
                                            </div>
                                        ) : (
                                            levelsData?.levels.map((level) => (
                                                <SelectItem
                                                    key={level.id}
                                                    value={level.id}
                                                >
                                                    {levelsValue[level.name]}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full flex justify-end pt-2">
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!isStep1Valid}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div
                                        className="relative bg-muted w-54 h-54 rounded-full border-2 border-dashed border-border overflow-hidden cursor-pointer hover:border-primary transition-colors"
                                        onClick={() =>
                                            !formData.image &&
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        {formData.image ? (
                                            <Avatar className="h-full w-full">
                                                <AvatarImage
                                                    src={formData.image}
                                                    alt="Profile preview"
                                                    className="object-cover"
                                                />
                                            </Avatar>
                                        ) : (
                                            <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
                                                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    Upload Photo
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {formData.image && !isLoading && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    image: "",
                                                }));
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value =
                                                        "";
                                                }
                                            }}
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>

                                {!formData.image && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <ImagePlus className="h-4 w-4 mr-2" />
                                        Choose Image
                                    </Button>
                                )}

                                <p className="text-xs text-muted-foreground text-center max-w-xs">
                                    Upload a clear photo of yourself.
                                </p>
                            </div>

                            <div className="flex justify-between pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!isStep2Valid || isLoading}
                                >
                                    {isLoading ? "Saving..." : "Complete Setup"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </DialogSheetWrapper>
    );
}
