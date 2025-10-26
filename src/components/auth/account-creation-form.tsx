"use client";
import { Card } from "@/components/ui/card";
import { useFaceModel } from "@/hooks/use-face-model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PersonalInformationSteps from "./steps/personal-info-step";
import StudentDetailsSteps from "./steps/student-details-step";
import { FaceCaptureStep } from "./steps/upload-image";

export type FormData = {
    name: string;
    email: string;
    password: string;
    studentId: string;
    courseId: string;
    levelId: string;
    faceImage: File | null;
};

const TOTAL_STEPS = 4;
export default function AccountCreationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryStep = Number(searchParams.get("s")) || 1;
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState<"forward" | "backward">(
        "forward"
    );
    const [formData, setFormData] = useState<FormData>({
        name: "SAlida Monsour",
        email: "monsour@gmail",
        password: "monsour13",
        studentId: "2021-3482",
        courseId: "",
        levelId: "",
        faceImage: null,
    });

    useFaceModel();
    
    useEffect(() => {
        if (queryStep) {
            setCurrentStep(queryStep);
        }
    }, [queryStep]);

    const handleNext = () => {
        if (currentStep < TOTAL_STEPS) {
            const nextStep = currentStep + 1;
            setDirection("forward");
            setCurrentStep(nextStep);
            router.replace(`?s=${nextStep}`); // ✅ update query param
        }
    };
    const handleBack = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setDirection("backward");
            setCurrentStep(prevStep);
            router.replace(`?s=${prevStep}`); // ✅ update query param
        }
    };
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    return (
        <div className="flex-1">
            <Card className="max-w-lg overflow-hidden w-full m-auto">
                <div
                    key={currentStep}
                    className={`space-y-8 animate-in fade-in ${
                        direction === "forward"
                            ? "slide-in-from-right"
                            : "slide-in-from-left"
                    } duration-300`}
                >
                    {currentStep === 1 && (
                        <PersonalInformationSteps
                            formData={formData}
                            handleInputChange={handleInputChange}
                            onNext={handleNext}
                        />
                    )}
                    {currentStep === 2 && (
                        <StudentDetailsSteps
                            formData={formData}
                            handleInputChange={handleInputChange}
                            onNext={handleNext}
                            onPrev={handleBack}
                        />
                    )}
                    {currentStep === 3 && (
                        <FaceCaptureStep
                            formData={formData}
                            setFormData={setFormData}
                            onNext={handleNext}
                            onPrev={handleBack}
                        />
                    )}
                </div>
            </Card>
        </div>
    );
}
