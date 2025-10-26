"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useSignUpUser } from "@/hooks/use-auth";
import { ImagePlus, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FormData } from "../account-creation-form";

interface FaceCaptureStepProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onNext: () => void;
    onPrev: () => void;
}

export function FaceCaptureStep({
    formData,
    setFormData,
    onPrev,
}: FaceCaptureStepProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: signUp, isPending: isLoading } = useSignUpUser();

    useEffect(() => {
        if (formData.faceImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
            };
            reader.readAsDataURL(formData.faceImage);
        }
    }, [formData.faceImage]);

    const handleSubmit = async () => {
        try {
            signUp(formData);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, faceImage: file });
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
    };

    const isValid = formData.faceImage !== null;

    return (
        <div className="w-full space-y-4">
            <CardHeader className="text-lg">
                <CardTitle>Upload an Image</CardTitle>
                <CardDescription>
                    Upload a clear photo of your face for attendance recognition
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="gap-4">
                    <Field className="gap-1">
                        <div className="">
                            <div className="relative bg-muted w-32 h-32 rounded-full border">
                                {imagePreview ? (
                                    <Avatar className="h-full w-full">
                                        <AvatarImage
                                            src={imagePreview}
                                            alt="Chat avatar"
                                            className="object-cover"
                                        />
                                    </Avatar>
                                ) : (
                                    <div
                                        className="w-full h-full  flex flex-col gap-1 items-center justify-center cursor-pointer"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <ImagePlus className="h-6 w-6 text-primary" />
                                    </div>
                                )}
                                {imagePreview && (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage();
                                        }}
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-1 -right-4 h-5 w-5 rounded-full shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />{" "}
                            </div>
                        </div>
                    </Field>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <h3 className="font-medium text-card-foreground mb-2 flex items-center gap-2">
                            Photo Guidelines
                        </h3>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                            <li>
                                Ensure good lighting without shadows on your
                                face
                            </li>
                            <li>
                                Remove glasses, hats, or anything covering your
                                face
                            </li>
                            <li>Use a plain background if possible</li>
                        </ul>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            className="w-auto bg-transparent"
                            onClick={onPrev}
                            variant="outline"
                        >
                            Back
                        </Button>
                        <Button
                            disabled={!isValid}
                            className="w-auto"
                            onClick={handleSubmit}
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </FieldGroup>
            </CardContent>
        </div>
    );
}
