"use client";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { levelsValue } from "@/constant";
import { useCourses } from "@/hooks/use-courses";
import { useLevel } from "@/hooks/use-level";
import { FormData } from "../account-creation-form";

interface PersonalInformationStepsProps {
    formData: FormData;
    handleInputChange: (name: string, value: string) => void;
    onNext: () => void;
    onPrev: () => void;
}
export default function StudentDetailsSteps({
    formData,
    handleInputChange,
    onNext,
    onPrev,
}: PersonalInformationStepsProps) {
    const isValid = formData.courseId && formData.studentId && formData.levelId;
    const { data: levelsData } = useLevel();
    const { data: coursesData } = useCourses();

    return (
        <div className="w-full space-y-4">
            <CardHeader className="text-lg">
                <CardTitle>Student Details</CardTitle>
                <CardDescription>
                    Provide your academic information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="gap-4">
                    <Field className="gap-1">
                        <FieldLabel htmlFor="studentId">Student Id:</FieldLabel>
                        <Input
                            id="studentId"
                            type="text"
                            value={formData.studentId}
                            placeholder="Ex: 2025-2222"
                            required
                            onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                            }
                        />
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="course">Course</FieldLabel>
                        <Select
                            value={formData.courseId}
                            onValueChange={(value) => {
                                handleInputChange("courseId", value);
                            }}
                        >
                            <SelectTrigger className="bg-background border-input text-foreground">
                                <SelectValue placeholder="Select your course" />
                            </SelectTrigger>
                            <SelectContent>
                                {coursesData?.courses.map((course) => (
                                    <SelectItem
                                        key={course.id}
                                        value={course.id}
                                    >
                                        {course.name} ({course.code})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="course">Level/Year:</FieldLabel>
                        <Select
                            value={formData.levelId}
                            onValueChange={(value) => {
                                handleInputChange("levelId", value);
                            }}
                        >
                            <SelectTrigger className="bg-background border-input text-foreground">
                                <SelectValue placeholder="Select your year/level" />
                            </SelectTrigger>
                            <SelectContent>
                                {levelsData?.levels.map((level) => (
                                    <SelectItem key={level.id} value={level.id}>
                                        {levelsValue[level.name]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <div className="flex justify-between">
                        <Button className="w-auto" onClick={onPrev}>
                            Back
                        </Button>
                        <Button
                            disabled={!isValid}
                            className="w-auto"
                            onClick={onNext}
                        >
                            Next
                        </Button>
                    </div>
                </FieldGroup>
            </CardContent>
        </div>
    );
}
