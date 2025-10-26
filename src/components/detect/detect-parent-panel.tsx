"use client";

import CameraAreaInterface from "@/components/detect/camera-area-interface";
import RecentAttendedUsersPanel from "@/components/detect/recent-attended-users-panel";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { levelsValue } from "@/constant";
import { useFaceDetectionContext } from "@/context/face-detect-context";
import { Attendance } from "@/hooks/event/use-event-attendace";
import { useFaces } from "@/hooks/use-faces";
import { createAttendance } from "@/lib/api/attendance";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { Face, useFacesStore } from "@/store/use-faces-store";
import { drawFaceBox, matchFaceWithUsers } from "@/utils/face-detection-utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import HeaderTitle from "../nav-header-title";

export enum AttendanceStatusType {
    TIME_IN = "time-in",
    TIME_OUT = "time-out",
    TOO_EARLY_IN = "too-early-in",
    TOO_EARLY_OUT = "too-early-out",
    TOO_LATE_IN = "too-late-in",
    TOO_LATE_OUT = "too-late-out",
    ALREADY_TIME_IN = "already-time-in",
    ALREADY_TIME_OUT = "already-time-out",
    ALREADY_COMPLETE = "already-complete",
    NO_TIMEOUT_REQUIRED = "no-timeout-required",
    NO_TIME_IN_FOUND = "no-time-in-found",
}

const MATCH_THRESHOLD = 0.6;
const ATTENDANCE_COOLDOWN_MS = 10000;

export enum AttendanceStatus {
    UNKNOWN = 0,
    TIME_IN = 1,
    TIME_OUT = 2,
    COMPLETED = 3,
    ALREADY_TIME_IN = 4,
    ALREADY_TIME_OUT = 5,
}

interface UserTracker {
    status: AttendanceStatus;
    timeStamp: number;
}

// interface DetectedFacesData {
//     id: string;
//     name: string;
//     course: string;
//     level: string;
// }

export default function DetectParentPanel() {
    const eventId = useParams().eventId as string;
    const { setTheme, theme } = useTheme();
    const { eventDetails } = useEventDetailsStore();

    // const [detectedFacesData, setDetectedFacesData] = useState<Map<string, DetectedFacesData>>(
    //      new Map()
    // );

    const {
        canvasRef,
        startCamera,
        stopCamera,
        isCameraOn,
        resizedDetections,
        detections,
    } = useFaceDetectionContext();

    const animationFrameRef = useRef<number | null>(null);
    const isDetectingRef = useRef(false);
    const attendanceTrackerRef = useRef<Map<string, UserTracker>>(new Map());

    const [cooldownTimers, setCooldownTimers] = useState<Map<string, number>>(
        new Map()
    );
    const [lastUserAttended, setLastUserAttended] = useState<Attendance | null>(
        null
    );
    const { addEventAttendance, eventAttendance } = useEventAttendanceStore();
    const [message, setMessage] = useState<string | null>(null);

    const [selectedSessionType, setSelectedSessionType] = useState("1");
    const [selectedAttendanceType, setSelectedAttendanceType] = useState("0");

    const { data: facesData, isLoading: isFacesLoading } = useFaces();
    const { setFacesLoading, setFaces, faces } = useFacesStore();

    // 🚀 Memoize faces to prevent unnecessary re-renders
    const memoizedFaces = useMemo(() => faces, [faces]);

    // 🚀 Create label cache to avoid repeated string concatenation
    const labelCache = useRef<Map<string, string>>(new Map());

    const getUserLabel = useCallback((user: Face) => {
        const cacheKey = `${user.id}-${user.name}-${user.code}-${user.level}`;
        if (labelCache.current.has(cacheKey)) {
            return labelCache.current.get(cacheKey)!;
        }
        const label = `${user.name} - ${user.code} - ${
            levelsValue[user.level]
        }`;
        labelCache.current.set(cacheKey, label);
        return label;
    }, []);

    useEffect(() => {
        setFacesLoading(isFacesLoading);
        if (facesData?.faces) {
            setFaces(facesData.faces);
            labelCache.current.clear(); // Clear cache when faces update
        }
    }, [isFacesLoading, facesData, setFacesLoading, setFaces]);

    // 🚀 Memoize handleAttendanceCreation to prevent recreating on every render
    const handleAttendanceCreation = useCallback(
        async (userId: string) => {
            const now = Date.now();
            const lastRecorded = attendanceTrackerRef.current.get(userId);

            if (
                lastRecorded &&
                now - lastRecorded.timeStamp < ATTENDANCE_COOLDOWN_MS
            ) {
                return;
            }

            const result = await createAttendance({
                userId,
                eventId,
                sessionType: selectedSessionType,
                attendanceType: selectedAttendanceType,
            });

            if (result.success) {
                const attendanceRecord = result.attendance;
                if (attendanceRecord) {
                    addEventAttendance(attendanceRecord);
                    setLastUserAttended(attendanceRecord);
                    toast.success(result.message);
                }

                const status =
                    result.type === AttendanceStatusType.TIME_IN
                        ? AttendanceStatus.TIME_IN
                        : AttendanceStatus.TIME_OUT;

                attendanceTrackerRef.current.set(userId, {
                    status,
                    timeStamp: now,
                });
                if (!result.message) return;
                setMessage(result.message);
            } else {
                // 🚀 Simplified status handling with lookup table using string keys
                const statusMap: Record<string, AttendanceStatus> = {
                    "already-complete": AttendanceStatus.COMPLETED,
                    "already-time-in": AttendanceStatus.ALREADY_TIME_IN,
                    "already-time-out": AttendanceStatus.ALREADY_TIME_OUT,
                    "too-early-in": AttendanceStatus.UNKNOWN,
                    "no-time-in-found": AttendanceStatus.UNKNOWN,
                    "too-early-out": AttendanceStatus.ALREADY_TIME_IN,
                    "too-late-in": AttendanceStatus.TIME_IN,
                    "too-late-out": AttendanceStatus.TIME_OUT,
                    "time-in": AttendanceStatus.TIME_IN,
                    "time-out": AttendanceStatus.TIME_OUT,
                    "no-timeout-required": AttendanceStatus.UNKNOWN,
                };
                if (!result.type) {
                    return;
                }
                const newStatus =
                    statusMap[result.type] ??
                    (lastRecorded?.status || AttendanceStatus.UNKNOWN);
                attendanceTrackerRef.current.set(userId, {
                    status: newStatus,
                    timeStamp: now,
                });

                // 🚀 Show appropriate toast based on result type
                const successTypes = [
                    "already-complete",
                    "already-time-in",
                    "already-time-out",
                ];
                const warningTypes = [
                    "too-early-in",
                    "too-early-out",
                    "too-late-in",
                    "too-late-out",
                    "no-time-in-found",
                ];

                if (successTypes.includes(result.type)) {
                    toast.success(result.message);
                } else if (warningTypes.includes(result.type)) {
                    toast.warning(result.message);
                } else {
                    toast.error(result.message);
                }

                if (!result.message) return;
                setMessage(result.message);
            }
        },
        [
            eventId,
            selectedSessionType,
            selectedAttendanceType,
            addEventAttendance,
        ]
    );
    // 🚀 Optimize drawing with useMemo and reduce re-renders
    useEffect(() => {
        if (
            !resizedDetections ||
            !detections ||
            !canvasRef.current ||
            !memoizedFaces
        )
            return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = Date.now();
        const newCooldownTimers = new Map(cooldownTimers);

        // 🚀 Process all detections in a single loop
        for (let i = 0; i < resizedDetections.length; i++) {
            const detection = resizedDetections[i];
            const box = detection.detection.box;
            const descriptor = detections[i].descriptor;

            const matchResult = matchFaceWithUsers(
                descriptor,
                memoizedFaces,
                MATCH_THRESHOLD
            );

            let attendanceStatus: AttendanceStatus | null = null;
            let cooldownRemaining: number | undefined = undefined;

            if (matchResult.isMatch && matchResult.user) {
                handleAttendanceCreation(matchResult.user.id);
                attendanceStatus =
                    attendanceTrackerRef.current.get(matchResult.user.id)
                        ?.status ?? null;

                const lastRecorded = attendanceTrackerRef.current.get(
                    matchResult.user.id
                );
                if (lastRecorded) {
                    const elapsed = now - lastRecorded.timeStamp;
                    const remaining = Math.max(
                        0,
                        ATTENDANCE_COOLDOWN_MS - elapsed
                    );
                    if (remaining > 0) {
                        cooldownRemaining = Math.ceil(remaining / 1000);
                        newCooldownTimers.set(
                            matchResult.user.id,
                            cooldownRemaining
                        );
                    } else {
                        newCooldownTimers.delete(matchResult.user.id);
                    }
                }
            }

            drawFaceBox(ctx, box, {
                isMatch: matchResult.isMatch,
                label:
                    matchResult.isMatch && matchResult.user
                        ? getUserLabel(matchResult.user)
                        : "Failed to recognize",
                userStatus: attendanceStatus ?? undefined,
                cooldownSeconds: cooldownRemaining,
            });
        }

        setCooldownTimers(newCooldownTimers);
    }, [
        resizedDetections,
        memoizedFaces,
        getUserLabel,
        detections,
        canvasRef,
        cooldownTimers,
        handleAttendanceCreation,
    ]);

    useEffect(() => {
        if (eventAttendance.length > 0) {
            setLastUserAttended(eventAttendance[eventAttendance.length - 1]);
        }
    }, [eventAttendance]);

    // 🚀 Optimize cooldown interval with reduced frequency
    useEffect(() => {
        const cooldownInterval = setInterval(() => {
            const now = Date.now();
            setCooldownTimers((prev) => {
                const updated = new Map<string, number>();
                let hasChanges = false;

                for (const [userId] of prev.entries()) {
                    const lastRecorded =
                        attendanceTrackerRef.current.get(userId);
                    if (lastRecorded) {
                        const elapsed = now - lastRecorded.timeStamp;
                        const remaining = Math.max(
                            0,
                            ATTENDANCE_COOLDOWN_MS - elapsed
                        );
                        if (remaining > 0) {
                            const newValue = Math.ceil(remaining / 1000);
                            if (prev.get(userId) !== newValue) {
                                hasChanges = true;
                            }
                            updated.set(userId, newValue);
                        } else {
                            hasChanges = true;
                        }
                    }
                }

                return hasChanges ? updated : prev;
            });
        }, 500); // 🚀 Reduced from 100ms to 500ms for better performance

        return () => clearInterval(cooldownInterval);
    }, []);

    const toggleCamera = useCallback(async () => {
        if (isCameraOn) {
            stopCamera();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            isDetectingRef.current = false;
        } else {
            await startCamera();
        }
    }, [isCameraOn, startCamera, stopCamera]);

    return (
        <div className="w-full flex flex-col min-h-screen lg:h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <HeaderTitle>
                            {eventDetails?.name || "Unknown"}
                        </HeaderTitle>
                    </div>
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
                <CameraAreaInterface
                    message={message}
                    toggleCamera={toggleCamera}
                    selectedSessionType={selectedSessionType}
                    setSelectedSessionType={setSelectedSessionType}
                    selectedAttendanceType={selectedAttendanceType}
                    setSelectedAttendanceType={setSelectedAttendanceType}
                />
                <RecentAttendedUsersPanel lastUserAttended={lastUserAttended} />
            </div>
        </div>
    );
}
