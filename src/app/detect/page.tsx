"use client";

import { Button } from "@/components/ui/button";
import { useCamera } from "@/hooks/use-camera";
import {
    Camera,
    CameraOff,
    ScanFace,
    Sun,
    Moon,
    Car,
    EyeOff,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useFaceModel } from "@/hooks/use-face-model";
import * as faceapi from "face-api.js";
import { useUsers, type User } from "@/hooks/use-users";
import { matchFaceWithUsers, drawFaceBox } from "@/utils/face-detection-utils";
import { createAttendance } from "@/lib/api/attendance";
import AttendedUsers from "@/components/attended-users";
import { useEventAttendance } from "@/hooks/use-event-attendace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVideoDevices } from "@/hooks/use-video-devices";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { isMobileDevice } from "@/lib/is-mobile";

const MATCH_THRESHOLD = 0.6;
const ATTENDANCE_COOLDOWN_MS = 5000;

export interface Attendance {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    user: User;
}

export default function Page() {
    const eventId = "cmgryhyv00002hsr41x0abppt";
    const { setTheme, theme } = useTheme();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [faceCount, setFaceCount] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const isDetectingRef = useRef(false);
    const attendanceTrackerRef = useRef<Map<string, number>>(new Map());
    const [lastUserAttended, setLastUserAttended] = useState<Attendance | null>(
        null
    );
    const [showLastAttendee, setShowLastAttendee] = useState(true);

    const [cameraError, setCameraError] = useState<string | null>(null);
    const { devices, selectedCameraId, setSelectedCameraId } =
        useVideoDevices();
    const isMobile = isMobileDevice();

    const { isUsersLoading, users } = useUsers();

    const { isFaceModelLoading, isFaceModelLoaded } = useFaceModel();

    const { startCamera, stopCamera, isCameraLoading, isCameraOn } = useCamera({
        videoRef,
        canvasRef,
        streamRef,
    });

    const { eventAttendance, setEventAttendance, isEvenAttendanceLoading } =
        useEventAttendance(eventId);

    useEffect(() => {
        if (eventAttendance.length > 0) {
            setLastUserAttended(eventAttendance[eventAttendance.length - 1]);
        }
    }, [eventAttendance]);

    useEffect(() => {
        if (isFaceModelLoaded && isCameraOn) {
            startDetection();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            isDetectingRef.current = false;
        };
    }, [isFaceModelLoaded, isCameraOn]);

    const startDetection = async () => {
        if (
            !videoRef.current ||
            !canvasRef.current ||
            !isFaceModelLoaded ||
            !isCameraOn ||
            isDetectingRef.current
        ) {
            return;
        }

        isDetectingRef.current = true;

        const detectFaces = async () => {
            if (!videoRef.current || !canvasRef.current || !isCameraOn) {
                isDetectingRef.current = false;
                return;
            }

            try {
                const video = videoRef.current;
                const canvas = canvasRef.current;

                const detections = await faceapi
                    .detectAllFaces(
                        video,
                        new faceapi.TinyFaceDetectorOptions({
                            inputSize: 224,
                            scoreThreshold: 0.5,
                        })
                    )
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                const displaySize = {
                    width: video.videoWidth,
                    height: video.videoHeight,
                };
                faceapi.matchDimensions(canvas, displaySize);

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );

                for (let index = 0; index < resizedDetections.length; index++) {
                    const detection = resizedDetections[index];
                    const box = detection.detection.box;
                    const descriptor = detections[index].descriptor;
                    const matchResult = matchFaceWithUsers(
                        descriptor,
                        users,
                        MATCH_THRESHOLD
                    );

                    let hasAttended = false;
                    if (matchResult.isMatch && matchResult.user) {
                        console.log(
                            "[v0] Matched user:",
                            matchResult.user.name,
                            "Distance:",
                            matchResult.distance,
                            "Has attended:",
                            hasAttended
                        );

                        hasAttended = await handleAttendanceCreation(
                            matchResult.user.id
                        );
                    }

                    if (ctx) {
                        drawFaceBox(ctx, box, {
                            isMatch: matchResult.isMatch,
                            label: matchResult.user?.name,
                            hasAttended,
                        });
                    }
                }

                setFaceCount(detections.length);
            } catch (error) {
                console.error("Detection error:", error);
            }

            animationFrameRef.current = requestAnimationFrame(detectFaces);
        };

        detectFaces();
    };

    const handleAttendanceCreation = async (
        userId: string
    ): Promise<boolean> => {
        const now = Date.now();
        const lastRecorded = attendanceTrackerRef.current.get(userId);
        const alreadyAttended = eventAttendance.some(
            (a) => a.userId === userId
        );

        if (
            (lastRecorded && now - lastRecorded < ATTENDANCE_COOLDOWN_MS) ||
            alreadyAttended
        ) {
            console.log("[v0] Attendance cooldown active for:", userId);
            return true;
        }

        const result = await createAttendance({
            userId,
            eventId: "cmgryhyv00002hsr41x0abppt",
        });

        if (result.success) {
            const attendanceRecord = result.attendance;
            if (attendanceRecord) {
                setEventAttendance((prevAttendance) => [
                    ...prevAttendance,
                    attendanceRecord,
                ]);
                setLastUserAttended(attendanceRecord);
            }
            attendanceTrackerRef.current.set(userId, now);
            console.log("[v0] ✓", result.message);
            return true;
        } else if (result.alreadyAttended) {
            const attendanceRecord = result.attendance;
            if (attendanceRecord) {
                setEventAttendance((prevAttendance) => {
                    const exists = prevAttendance.some(
                        (a) => a.id === attendanceRecord.id
                    );
                    if (!exists) {
                        return [...prevAttendance, attendanceRecord];
                    }
                    return prevAttendance;
                });
                setLastUserAttended(attendanceRecord);
            }
            console.log("[v0] ⚠", result.message);
            attendanceTrackerRef.current.set(userId, now);
            return true;
        }
        return false;
    };

    const toggleCamera = async () => {
        if (isCameraOn) {
            stopCamera();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            isDetectingRef.current = false;
            setCameraError(null);
        } else {
            try {
                await startCamera();
                setCameraError(null);
            } catch (error) {
                setCameraError(
                    "Failed to access camera. Please check permissions."
                );
                console.error("Camera error:", error);
            }
        }
    };

    return (
        <div className="w-full flex flex-col h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Detect</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
            <div className="flex-1 w-full mx-auto flex flex-col lg:flex-row gap-4 p-4 min-h-0">
                <div className="border flex-1 bg-muted rounded-md w-full relative min-h-0 overflow-hidden">
                    {isFaceModelLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                            <div className="text-center">
                                <Spinner className="h-12 w-12 mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    Loading face detection model...
                                </p>
                            </div>
                        </div>
                    )}
                    {!isCameraOn && !isCameraLoading && !isFaceModelLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <CameraOff className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    Camera is off
                                </p>
                                {cameraError && (
                                    <p className="text-destructive text-sm mt-2">
                                        {cameraError}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    {isCameraLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Spinner className="h-12 w-12 mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    Starting camera...
                                </p>
                            </div>
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        className={`h-full w-full object-cover ${
                            !isCameraOn ? "hidden" : ""
                        }`}
                        playsInline
                        muted
                        autoPlay
                    />
                    <canvas
                        ref={canvasRef}
                        className={`absolute top-0 left-0 w-full h-full ${
                            !isCameraOn ? "hidden" : ""
                        }`}
                    />
                    <div className="absolute top-0 left-0 p-4 lg:p-8">
                        <div className="bg-black/50 backdrop-blur-sm flex items-center gap-2 rounded-full px-4 py-2">
                            <ScanFace className="h-4 w-4 text-white" />
                            <p className="text-white font-medium">
                                {faceCount}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 lg:p-8 flex gap-2">
                        <Button
                            variant={isCameraOn ? "destructive" : "default"}
                            className="rounded-full w-14 h-14"
                            onClick={toggleCamera}
                            disabled={isFaceModelLoading || isCameraLoading}
                        >
                            {isCameraLoading ? (
                                <Spinner className="h-5 w-5" />
                            ) : isCameraOn ? (
                                <CameraOff />
                            ) : (
                                <Camera />
                            )}
                        </Button>
                        {devices.length > 1 && !isMobile && (
                            <Select
                                value={selectedCameraId || ""}
                                onValueChange={async (value) => {
                                    setSelectedCameraId(value);
                                    if (isCameraOn) {
                                        stopCamera();
                                        await startCamera(value);
                                    }
                                }}
                            >
                                <SelectTrigger className="flex-1 min-w-[180px]">
                                    <SelectValue placeholder="Select camera" />
                                </SelectTrigger>
                                <SelectContent>
                                    {devices.map((device) => (
                                        <SelectItem
                                            key={device.deviceId}
                                            value={device.deviceId}
                                        >
                                            {device.label ||
                                                `Camera ${
                                                    devices.indexOf(device) + 1
                                                }`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-sm bg-card border rounded-md p-4 py-2 flex flex-col gap-4 lg:max-h-full overflow-y-auto relative">
                    {showLastAttendee && (
                        <div className="flex flex-col w-full gap-2 shrink-0 relative">
                            <div className="flex h-9 items-center justify-between">
                                <h2 className="font-semibold">Last Attendee</h2>
                            </div>
                            <Card className="py-4 gap-2 bg-muted">
                                {isEvenAttendanceLoading ? (
                                    <CardContent className="flex gap-4 px-4  py-0">
                                        <Skeleton className="h-24 w-24 rounded" />
                                    </CardContent>
                                ) : (
                                    <CardContent className="flex gap-4 px-4  py-0">
                                        {lastUserAttended ? (
                                            <>
                                                <Avatar className="h-24 w-24 shrink-0 rounded">
                                                    <AvatarImage
                                                        className="object-cover rounded"
                                                        src={
                                                            lastUserAttended
                                                                .user.faceImages
                                                                .imageUrl ||
                                                            "/placeholder.svg" ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={
                                                            lastUserAttended
                                                                .user.name
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {lastUserAttended.user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col justify-center min-w-0 gap-1">
                                                    <CardTitle className="text-lg truncate">
                                                        {
                                                            lastUserAttended
                                                                .user.name
                                                        }
                                                    </CardTitle>
                                                    <p className="text-sm text-muted-foreground">
                                                        {format(
                                                            lastUserAttended.createdAt,
                                                            "hh:mm aa"
                                                        )}
                                                    </p>
                                                    {lastUserAttended.user
                                                        .studentDetails && (
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {[
                                                                lastUserAttended
                                                                    .user
                                                                    .studentDetails
                                                                    .course,
                                                                lastUserAttended
                                                                    .user
                                                                    .studentDetails
                                                                    .level,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(" | ")}
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center w-full py-4">
                                                <p className="text-sm text-muted-foreground">
                                                    No attendance yet
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowLastAttendee(!showLastAttendee)}
                        title={
                            showLastAttendee
                                ? "Hide Last Attendee"
                                : "Show Last Attendee"
                        }
                        className="absolute  top-2 right-4"
                    >
                        {showLastAttendee ? <ArrowUp /> : <ArrowDown />}
                    </Button>
                    <div className="flex flex-col gap-2 min-h-0 flex-1">
                        <div className="flex h-9 items-center justify-between">
                            <h2 className="font-semibold shrink-0">
                                Recent Attendance
                            </h2>
                        </div>
                        <ScrollArea className="flex-1 min-h-0">
                            <AttendedUsers
                                attendance={eventAttendance}
                                isEvenAttendanceLoading={
                                    isEvenAttendanceLoading
                                }
                            />
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
