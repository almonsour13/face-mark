"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFaceDetectionContext } from "@/context/face-detect-context";
import { EventSession } from "@/hooks/event/use-events";
import { useVideoDevices } from "@/hooks/use-video-devices";
import { isMobileDevice } from "@/lib/is-mobile";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { Camera, CameraOff, ScanFace, SwitchCamera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

interface CameraInterfaceAreaProps {
    message: string | null;
    toggleCamera: () => void;
    selectedSessionType: string;
    setSelectedSessionType: React.Dispatch<React.SetStateAction<string>>;
    selectedAttendanceType: string;
    setSelectedAttendanceType: React.Dispatch<React.SetStateAction<string>>;
}
export default function CameraAreaInterface({
    toggleCamera,
    selectedSessionType,
    setSelectedSessionType,
    selectedAttendanceType,
    setSelectedAttendanceType,
}: CameraInterfaceAreaProps) {
    const {
        videoRef,
        canvasRef,
        isCameraOn,
        isCameraLoading,
        isFaceModelLoading,
        cameraError,
        faceCount,
        startCamera,
        stopCamera,
        setEnvironment,
    } = useFaceDetectionContext();
    const isMobile = isMobileDevice();
    const { devices, selectedCameraId, setSelectedCameraId } =
        useVideoDevices();
    const { eventDetails, isEventDetailsLoading } = useEventDetailsStore();
    const [selectedSession, setSelectedSession] = useState<EventSession | null>(
        null
    );
    useEffect(() => {
        const session = eventDetails?.eventSessions.find(
            (session) => session.type === Number(selectedSessionType)
        );
        setSelectedSession(session || null);
    }, [selectedSessionType, eventDetails]);
    const onSelectAttendanceType = (attendanceType: string) => {
        setSelectedAttendanceType(attendanceType);
        // minutes
        // const gracePeriod = selectedSession?.gracePeriod || 0;

        switch (attendanceType) {
            case "0":
                toast.success(`Auto attendance enabled!`);
                break;
            case "1":
                toast.success(
                    `Time in enabled, time in will start at ${selectedSession?.startTime}!`
                );
                break;
            case "2":
                toast.success(
                    `Time out enabled, time out will end at ${selectedSession?.endTime}!`
                );
                break;
        }
    };
    const onSelectSessionType = (sessionType: string) => {
        setSelectedSessionType(sessionType);
    };
    const onSelectCamera = async (deviceId: string) => {
        setSelectedCameraId(deviceId);
        if (isCameraOn) {
            stopCamera();
            await startCamera(deviceId);
        }
    };
    const toggleSwitchCamera = () => {
        setEnvironment((prev) => (prev === "user" ? "environment" : "user"));
    };

    return (
        <div className="flex flex-col gap-4 flex-1">
            <div className="border flex-1 bg-muted/30 rounded-md aspect-square md:aspect-auto w-full relative min-h-0 overflow-hidden">
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
                            <div className="p-8 rounded-full bg-primary/10 inline-block">
                                <CameraOff className="h-12 w-12 text-primary opacity" />
                            </div>
                            <p className="text-lg font-medium text-foreground mb-2">
                                Camera is off
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Click the button below to start
                            </p>
                            {cameraError && (
                                <p className="text-destructive text-sm mt-4 max-w-xs mx-auto">
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
                {!isEventDetailsLoading && eventDetails && (
                    <div className="absolute top-0 left-0 right-0 p-4">
                        <div className="w-full flex items-start justify-between">
                            <div className="flex items-start gap-4 ">
                                <div className="">
                                    <div className="flex w-full gap-2 items-center border h-9 px-4 rounded-md bg-muted/30 text-xs">
                                        <Label className="text-xs">
                                            Faces:
                                        </Label>
                                        <ScanFace className="h-4 w-4" />
                                        <p className="font-medium ">
                                            {faceCount}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-full gap-2 items-center border h-9 px-4 rounded-md bg-muted/30 text-xs">
                                    <Label className="text-xs">Status:</Label>
                                    <span>
                                        {eventStatusValue[eventDetails.status]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="hidden absolute bottom-0 left-0 p-4 lg:p-8">
                    <div className="flex items-center gap-2">
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
                        {isMobile && (
                            <Button
                                variant="outline"
                                className="rounded-full w-14 h-14"
                                onClick={toggleSwitchCamera}
                            >
                                <SwitchCamera />
                            </Button>
                        )}
                        {devices.length > 1 && !isMobile && (
                            <Select
                                value={selectedCameraId || ""}
                                onValueChange={async (value) =>
                                    onSelectCamera(value)
                                }
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
            </div>
            <div className="min-h-20 w-full flex items-center rounded-md border p-3 sm:p-4">
                <div className="w-full flex flex-col gap-3 sm:gap-4">
                    {/* Camera Controls Row */}
                    <div className="flex items-center gap-2 sm:gap-4 w-full">
                        <Button
                            variant={isCameraOn ? "destructive" : "default"}
                            className="flex-1 h-12 sm:rounded-full sm:w-14 sm:h-14 sm:flex-none"
                            onClick={toggleCamera}
                            disabled={isFaceModelLoading || isCameraLoading}
                        >
                            {isCameraLoading ? (
                                <Spinner className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : isCameraOn ? (
                                <CameraOff className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                        </Button>

                        {/* Desktop: Dropdown Menu, Mobile: Switch Button */}
                        {devices.length > 1 && !isMobile && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 sm:rounded-full sm:w-14 sm:h-14 sm:flex-none"
                                    >
                                        <SwitchCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {devices.map((device) => (
                                        <DropdownMenuCheckboxItem
                                            key={device.deviceId}
                                            checked={
                                                selectedCameraId ===
                                                device.deviceId
                                            }
                                            onCheckedChange={() => {
                                                onSelectCamera(device.deviceId);
                                            }}
                                        >
                                            {device.label ||
                                                `Camera ${
                                                    devices.indexOf(device) + 1
                                                }`}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {isMobile && (
                            <Button
                                variant="outline"
                                className="flex-1 h-12 sm:rounded-full sm:w-14 sm:h-14 sm:flex-none"
                                onClick={toggleSwitchCamera}
                            >
                                <SwitchCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        )}

                        {/* Session/Attendance Selects - Show inline on larger screens */}
                        {eventDetails && (
                            <div className="hidden lg:flex gap-3 flex-1 min-w-0">
                                <Select
                                    value={selectedSessionType}
                                    onValueChange={(value) =>
                                        onSelectSessionType(value)
                                    }
                                >
                                    <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs min-w-0 h-14">
                                        <Label className="text-xs whitespace-nowrap mr-1">
                                            Session:
                                        </Label>
                                        <SelectValue placeholder="Select Session" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventDetails.eventSessions.map(
                                            (session) => (
                                                <SelectItem
                                                    key={session.id}
                                                    value={session.type.toString()}
                                                >
                                                    {
                                                        eventSessionTypeValue[
                                                            session.type
                                                        ]
                                                    }
                                                    {" | "}
                                                    <span>
                                                        {session.startTime}{" "}
                                                        {" - "}{" "}
                                                        {session.endTime}
                                                    </span>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={selectedAttendanceType}
                                    onValueChange={(value) =>
                                        onSelectAttendanceType(value)
                                    }
                                >
                                    <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs min-w-0 h-24">
                                        <Label className="text-xs whitespace-nowrap mr-1">
                                            Type:
                                        </Label>
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Auto</SelectItem>
                                        <SelectItem value="1">
                                            Time-In
                                        </SelectItem>
                                        <SelectItem
                                            value="2"
                                            disabled={
                                                selectedSession?.requiresTimeOut ===
                                                0
                                            }
                                            title={
                                                selectedSession?.requiresTimeOut ===
                                                0
                                                    ? "Time-out is not required for this session"
                                                    : ""
                                            }
                                        >
                                            Time-Out
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Session/Attendance Selects - Stack below on smaller screens */}
                    {eventDetails && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:hidden">
                            <Select
                                value={selectedSessionType}
                                onValueChange={(value) =>
                                    onSelectSessionType(value)
                                }
                            >
                                <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs w-full">
                                    <Label className="text-xs whitespace-nowrap mr-1">
                                        Session:
                                    </Label>
                                    <SelectValue placeholder="Select Session" />
                                </SelectTrigger>
                                <SelectContent>
                                    {eventDetails.eventSessions.map(
                                        (session) => (
                                            <SelectItem
                                                key={session.id}
                                                value={session.type.toString()}
                                            >
                                                {
                                                    eventSessionTypeValue[
                                                        session.type
                                                    ]
                                                }
                                                {" | "}
                                                <span>
                                                    {session.startTime} {" - "}{" "}
                                                    {session.endTime}
                                                </span>
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedAttendanceType}
                                onValueChange={(value) =>
                                    onSelectAttendanceType(value)
                                }
                            >
                                <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs w-full">
                                    <Label className="text-xs whitespace-nowrap mr-1">
                                        Type:
                                    </Label>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Auto</SelectItem>
                                    <SelectItem value="1">Time-In</SelectItem>
                                    <SelectItem
                                        value="2"
                                        disabled={
                                            selectedSession?.requiresTimeOut ===
                                            0
                                        }
                                        title={
                                            selectedSession?.requiresTimeOut ===
                                            0
                                                ? "Time-out is not required for this session"
                                                : ""
                                        }
                                    >
                                        Time-Out
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
