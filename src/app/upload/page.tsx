"use client";
import React, { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import { useUsers } from "@/hooks/use-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Upload,
    UserCheck,
    UserX,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Camera,
    Users,
    Scan,
} from "lucide-react";
import { useFaceModel } from "@/hooks/use-face-model";

interface MatchResult {
    isMatch: boolean;
    matchedUser: any | null;
    confidence: number;
    distance: number;
    label: string;
}

export default function FaceCompare() {
    const [modelsLoaded, setModelsLoaded] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
    const [faceDetected, setFaceDetected] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { users, isUsersLoading } = useUsers();
    useFaceModel();
    // useEffect(() => {
    //     const loadModels = async () => {
    //         try {
    //             await Promise.all([
    //                 faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    //                 faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    //                 faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    //             ]);
    //             setModelsLoaded(true);
    //             console.log("✅ Face recognition models loaded successfully!");
    //         } catch (err) {
    //             console.error("❌ Error loading models:", err);
    //             setError("Failed to load face recognition models");
    //         }
    //     };
    //     loadModels();
    // }, []);

    async function handleCompare(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset states
        setIsProcessing(true);
        setError(null);
        setFaceDetected(null);
        setMatchResult(null);

        try {
            // Create preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Process face detection
            const uploadedImg = await faceapi.bufferToImage(file);
            const uploadedDesc = await faceapi
                .detectSingleFace(uploadedImg)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!uploadedDesc) {
                setFaceDetected(false);
                setError(
                    "No face detected in the uploaded image. Please upload a clear photo showing your face."
                );
                setIsProcessing(false);
                return;
            }

            setFaceDetected(true);

            // Check if there are any registered users
            if (users.length === 0) {
                setError("No registered users found in the system.");
                setIsProcessing(false);
                return;
            }

            // Convert descriptors for comparison
            const labeledDescriptors = users
                .map((u) => {
                    const descriptor = u.faceImages?.descriptor
                        ? typeof u.faceImages.descriptor === "string"
                            ? JSON.parse(u.faceImages.descriptor)
                            : u.faceImages.descriptor
                        : null;

                    if (!descriptor) {
                        console.warn(`User ${u.name} has no face descriptor`);
                        return null;
                    }

                    return new faceapi.LabeledFaceDescriptors(
                        u.id, // Use ID as label for matching
                        [new Float32Array(descriptor)]
                    );
                })
                .filter(Boolean);

            if (labeledDescriptors.length === 0) {
                setError(
                    "No valid face descriptors found in registered users."
                );
                setIsProcessing(false);
                return;
            }

            // Perform face matching
            const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
            const bestMatch = matcher.findBestMatch(uploadedDesc.descriptor);

            console.log("Best match result:", bestMatch);

            const isMatch = bestMatch.label !== "unknown";
            const matchedUser = isMatch
                ? users.find((u) => u.id === bestMatch.label)
                : null;

            setMatchResult({
                isMatch,
                matchedUser,
                confidence: Math.round((1 - bestMatch.distance) * 100),
                distance: bestMatch.distance,
                label: bestMatch.label,
            });
        } catch (err) {
            console.error("Error during face comparison:", err);
            setError(
                "An error occurred during face recognition. Please try again."
            );
        } finally {
            setIsProcessing(false);
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleReset = () => {
        setUploadedImage(null);
        setMatchResult(null);
        setFaceDetected(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 80) return "text-green-600 bg-green-50";
        if (confidence >= 60) return "text-yellow-600 bg-yellow-50";
        return "text-orange-600 bg-orange-50";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Face Recognition System
                    </h1>
                    <p className="text-gray-600">
                        Upload a photo to verify identity against registered
                        users
                    </p>
                    {!modelsLoaded && (
                        <div className="mt-4 flex items-center gap-2 text-amber-600">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">
                                Loading recognition models...
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left side - Face upload & result */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Upload Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Camera className="h-5 w-5" />
                                    Upload Face Image
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center justify-center">
                                    {uploadedImage ? (
                                        <div className="relative">
                                            <img
                                                src={uploadedImage}
                                                alt="Uploaded face"
                                                className="w-64 h-64 object-cover rounded-lg shadow-lg"
                                            />
                                            {isProcessing && (
                                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={handleUploadClick}
                                            className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                                        >
                                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                            <p className="text-gray-600 font-medium">
                                                Click to upload
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                or drag and drop
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCompare}
                                    className="hidden"
                                    disabled={!modelsLoaded || isProcessing}
                                />

                                <div className="flex gap-2 justify-center">
                                    <Button
                                        onClick={handleUploadClick}
                                        disabled={!modelsLoaded || isProcessing}
                                        className="gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4" />
                                                {uploadedImage
                                                    ? "Upload New Image"
                                                    : "Upload Image"}
                                            </>
                                        )}
                                    </Button>
                                    {uploadedImage && (
                                        <Button
                                            onClick={handleReset}
                                            variant="outline"
                                            disabled={isProcessing}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Face Detection Status */}
                        {faceDetected !== null && (
                            <Card
                                className={
                                    faceDetected
                                        ? "border-green-200 bg-green-50"
                                        : "border-red-200 bg-red-50"
                                }
                            >
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3">
                                        {faceDetected ? (
                                            <>
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                <div>
                                                    <p className="font-semibold text-green-900">
                                                        Face Detected
                                                    </p>
                                                    <p className="text-sm text-green-700">
                                                        Face landmarks and
                                                        features extracted
                                                        successfully
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-6 w-6 text-red-600" />
                                                <div>
                                                    <p className="font-semibold text-red-900">
                                                        No Face Detected
                                                    </p>
                                                    <p className="text-sm text-red-700">
                                                        Please upload an image
                                                        with a clear, visible
                                                        face
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Error Display */}
                        {error && (
                            <Card className="border-red-200 bg-red-50">
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-red-900">
                                                Error
                                            </p>
                                            <p className="text-sm text-red-700">
                                                {error}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Match Result Card */}
                        {matchResult && (
                            <Card
                                className={
                                    matchResult.isMatch
                                        ? "border-green-200 bg-green-50"
                                        : "border-amber-200 bg-amber-50"
                                }
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Scan className="h-5 w-5" />
                                        Recognition Result
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        {matchResult.isMatch ? (
                                            <UserCheck className="h-12 w-12 text-green-600" />
                                        ) : (
                                            <UserX className="h-12 w-12 text-amber-600" />
                                        )}
                                        <div className="flex-1">
                                            <p
                                                className={`text-xl font-bold ${
                                                    matchResult.isMatch
                                                        ? "text-green-900"
                                                        : "text-amber-900"
                                                }`}
                                            >
                                                {matchResult.isMatch
                                                    ? "✓ Identity Verified"
                                                    : "⚠ No Match Found"}
                                            </p>
                                            <p
                                                className={`text-sm ${
                                                    matchResult.isMatch
                                                        ? "text-green-700"
                                                        : "text-amber-700"
                                                }`}
                                            >
                                                {matchResult.isMatch
                                                    ? "Face matched with registered user"
                                                    : "Face does not match any registered user"}
                                            </p>
                                        </div>
                                    </div>

                                    {matchResult.isMatch &&
                                        matchResult.matchedUser && (
                                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                                <p className="text-sm text-gray-600 mb-3">
                                                    Matched User Details:
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <Avatar className="h-16 w-16">
                                                        <AvatarImage
                                                            src={
                                                                matchResult
                                                                    .matchedUser
                                                                    .faceImages
                                                                    ?.imageUrl
                                                                    ? `data:image/jpeg;base64,${matchResult.matchedUser.faceImages.imageUrl}`
                                                                    : undefined
                                                            }
                                                        />
                                                        <AvatarFallback className="text-lg">
                                                            {matchResult.matchedUser.name
                                                                .split(" ")
                                                                .map(
                                                                    (
                                                                        n: string
                                                                    ) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold text-lg">
                                                            {
                                                                matchResult
                                                                    .matchedUser
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {
                                                                matchResult
                                                                    .matchedUser
                                                                    .studentDetails
                                                                    ?.studentId
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                matchResult
                                                                    .matchedUser
                                                                    .studentDetails
                                                                    ?.course
                                                            }{" "}
                                                            - Level{" "}
                                                            {
                                                                matchResult
                                                                    .matchedUser
                                                                    .studentDetails
                                                                    ?.level
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className={`p-3 rounded-lg ${getConfidenceColor(
                                                matchResult.confidence
                                            )}`}
                                        >
                                            <p className="text-xs font-medium mb-1">
                                                Confidence Score
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {matchResult.confidence}%
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <p className="text-xs font-medium text-gray-600 mb-1">
                                                Distance Metric
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {matchResult.distance.toFixed(
                                                    3
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-xs text-blue-900 font-medium mb-1">
                                            About Confidence Score:
                                        </p>
                                        <p className="text-xs text-blue-700">
                                            {matchResult.confidence >= 80
                                                ? "High confidence - Strong match detected"
                                                : matchResult.confidence >= 60
                                                ? "Moderate confidence - Possible match"
                                                : "Low confidence - Weak or no match"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right side - Users list */}
                    <div className="lg:col-span-1">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Registered Users
                                    <Badge
                                        variant="secondary"
                                        className="ml-auto"
                                    >
                                        {users.length}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isUsersLoading ? (
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">
                                            Loading users...
                                        </p>
                                    </div>
                                ) : users.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Users className="h-12 w-12 text-gray-300 mb-2" />
                                        <p className="text-gray-500 font-medium">
                                            No users registered
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Register users to enable face
                                            recognition
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                                        {users.map((u) => (
                                            <div
                                                key={u.id}
                                                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                                                    matchResult?.matchedUser
                                                        ?.id === u.id
                                                        ? "bg-green-100 border-2 border-green-400 shadow-md"
                                                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow"
                                                }`}
                                            >
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage
                                                        src={
                                                            u.faceImages
                                                                ?.imageUrl
                                                                ? `data:image/jpeg;base64,${u.faceImages.imageUrl}`
                                                                : undefined
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {u.name
                                                            .split(" ")
                                                            .map(
                                                                (n: string) =>
                                                                    n[0]
                                                            )
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">
                                                        {u.name}
                                                        {matchResult
                                                            ?.matchedUser
                                                            ?.id === u.id && (
                                                            <CheckCircle2 className="inline-block h-4 w-4 text-green-600 ml-1" />
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {
                                                            u.studentDetails
                                                                ?.studentId
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {
                                                            u.studentDetails
                                                                ?.course
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
