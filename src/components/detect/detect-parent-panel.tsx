"use client";

import CameraAreaInterface from "@/components/detect/camera-area-interface";
import RecentAttendedUsersPanel from "@/components/detect/recent-attended-users-panel";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFaceDetectionContext } from "@/context/face-detect-context";
import { Attendance } from "@/hooks/event/use-event-attendace";
import { useUsers, type User } from "@/hooks/user/use-users";
import { createAttendance } from "@/lib/api/attendance";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { drawFaceBox, matchFaceWithUsers } from "@/utils/face-detection-utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
export default function DetectParentPanel() {
    const eventId = useParams().eventId as string;
    const { setTheme, theme } = useTheme();
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

    const { data } = useUsers();
    const [selectedSessionType, setSelectedSessionType] = useState("1");
    const [selectedAttendanceType, setSelectedAttendanceType] = useState("0");

    useEffect(() => {
        if (resizedDetections && detections) {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            const now = Date.now();
            const newCooldownTimers = new Map(cooldownTimers);

            for (let index = 0; index < resizedDetections.length; index++) {
                const detection = resizedDetections[index];
                const box = detection.detection.box;
                const descriptor = detections[index].descriptor;
                if(!data?.users) return;
                const matchResult = matchFaceWithUsers(
                    descriptor,
                    data.users,
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
                            cooldownRemaining = Math.ceil(remaining / 1000); // Convert to seconds
                            newCooldownTimers.set(
                                matchResult.user.id,
                                cooldownRemaining
                            );
                        } else {
                            newCooldownTimers.delete(matchResult.user.id);
                        }
                    }
                }
                if (ctx) {
                    drawFaceBox(ctx, box, {
                        isMatch: matchResult.isMatch,
                        label: matchResult.isMatch
                            ? matchResult.user?.name
                            : "Failed to recognize",
                        userStatus: attendanceStatus ?? undefined,
                        cooldownSeconds: cooldownRemaining,
                    });
                }
            }
        }
    }, [resizedDetections]);

    useEffect(() => {
        if (eventAttendance.length > 0) {
            setLastUserAttended(eventAttendance[eventAttendance.length - 1]);
        }
    }, [eventAttendance]);

    useEffect(() => {
        const cooldownInterval = setInterval(() => {
            setCooldownTimers((prev) => {
                const updated = new Map(prev);
                const now = Date.now();

                for (const [userId, cooldownSecs] of updated.entries()) {
                    const lastRecorded =
                        attendanceTrackerRef.current.get(userId);
                    if (lastRecorded) {
                        const elapsed = now - lastRecorded.timeStamp;
                        const remaining = Math.max(
                            0,
                            ATTENDANCE_COOLDOWN_MS - elapsed
                        );
                        if (remaining > 0) {
                            updated.set(userId, Math.ceil(remaining / 1000));
                        } else {
                            updated.delete(userId);
                        }
                    }
                }

                return updated;
            });
        }, 100); // Update every 100ms for smooth countdown

        return () => clearInterval(cooldownInterval);
    }, []);
    const handleAttendanceCreation = async (userId: string) => {
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
            setMessage(result.message);
        } else {
            switch (result.type) {
                case AttendanceStatusType.ALREADY_COMPLETE:
                    attendanceTrackerRef.current.set(userId, {
                        status: AttendanceStatus.COMPLETED,
                        timeStamp: now,
                    });
                    toast.success(result.message);
                    break;

                case AttendanceStatusType.ALREADY_TIME_IN:
                    attendanceTrackerRef.current.set(userId, {
                        status: AttendanceStatus.ALREADY_TIME_IN,
                        timeStamp: now,
                    });
                    toast.success(result.message);
                    break;

                case AttendanceStatusType.ALREADY_TIME_OUT:
                    attendanceTrackerRef.current.set(userId, {
                        status: AttendanceStatus.ALREADY_TIME_OUT,
                        timeStamp: now,
                    });
                    toast.success(result.message);
                    break;

                case AttendanceStatusType.TOO_EARLY_IN:
                case AttendanceStatusType.TOO_EARLY_OUT:
                case AttendanceStatusType.TOO_LATE_IN:
                case AttendanceStatusType.TOO_LATE_OUT:
                case AttendanceStatusType.NO_TIME_IN_FOUND:
                    let lastStatus: AttendanceStatus = AttendanceStatus.TIME_IN;
                    if (lastRecorded) {
                        lastStatus = lastRecorded.status;
                    } else {
                        switch (result.type) {
                            case AttendanceStatusType.TOO_EARLY_IN:
                            case AttendanceStatusType.NO_TIME_IN_FOUND:
                                lastStatus = AttendanceStatus.UNKNOWN;
                                break;
                            case AttendanceStatusType.TOO_EARLY_OUT:
                                lastStatus = AttendanceStatus.ALREADY_TIME_IN;
                                break;
                            case AttendanceStatusType.TOO_LATE_IN:
                                lastStatus = AttendanceStatus.TIME_IN;
                                break;
                            case AttendanceStatusType.TOO_LATE_OUT:
                                lastStatus = AttendanceStatus.TIME_OUT;
                                break;
                        }
                    }
                    attendanceTrackerRef.current.set(userId, {
                        status: lastStatus,
                        timeStamp: now,
                    });
                    toast.warning(result.message);
                    break;

                default:
                    toast.error(result.message);
            }
            setMessage(result.message);
        }
    };

    const toggleCamera = async () => {
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
    };

    return (
        <div className="w-full flex flex-col h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <SidebarTrigger />
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
                <CameraAreaInterface
                    message={message}
                    toggleCamera={toggleCamera}
                    selectedSessionType={selectedSessionType}
                    setSelectedSessionType={setSelectedSessionType}
                    selectedAttendanceType={selectedAttendanceType}
                    setSelectedAttendanceType={setSelectedAttendanceType}
                />
                {/* <RecentAttendedUsersPanel lastUserAttended={lastUserAttended} /> */}
            </div>
        </div>
    );
}
