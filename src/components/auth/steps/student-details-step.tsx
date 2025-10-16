"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormData } from "../account-creation-form";
import { on } from "events";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const courses = [
    "Computer Science",
    "Information Technology",
    "Business Administration",
    "Engineering",
    "Education",
    "Nursing",
    "Psychology",
    "Accountancy",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

interface PersonalInformationStepsProps {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
    onPrev: () => void;
}
export default function StudentDetailsSteps({
    formData,
    handleInputChange,
    onNext,
    onPrev,
}: PersonalInformationStepsProps) {
    const isValid = formData.course && formData.studentId && formData.year;

    return (
        <div className="w-full space-y-4">
            <CardHeader  className="text-lg">
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
                            onChange={handleInputChange}
                        />
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="course">Course</FieldLabel>
                        <Select value={formData.course}>
                            <SelectTrigger className="bg-background border-input text-foreground">
                                <SelectValue placeholder="Select your course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course} value={course}>
                                        {course}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="course">Course</FieldLabel>
                        <Select value={formData.year}>
                            <SelectTrigger className="bg-background border-input text-foreground">
                                <SelectValue placeholder="Select your year level" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
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
                            // disabled={!isValid}
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
