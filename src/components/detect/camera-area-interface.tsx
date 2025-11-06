"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFaceDetectionContext } from "@/context/face-detect-context";
import { useVideoDevices } from "@/hooks/use-video-devices";
import { isMobileDevice } from "@/lib/is-mobile";
import { useEventDetailsStore } from "@/store/use-event-details-store";
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
import { Session } from "@/type";
import { eventSessionType, eventStatus } from "@/constant";

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
    const [selectedSession, setSelectedSession] = useState<Session | null>(
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
            <div className="bg-card flex-1 rounded-md aspect-square md:aspect-video w-full relative min-h-0 overflow-hidden">
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
                                        {eventStatus[eventDetails.status]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="min-h-20 bg-card w-full flex items-center rounded-md p-3 sm:p-4">
                {/* Camera Controls Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                    <Button
                        variant={isCameraOn ? "destructive" : "default"}
                        className="w-full sm:h-14 sm:w-14 rounded-md sm:rounded-full"
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
                                    className="w-full sm:h-14 sm:w-14 rounded-md sm:rounded-full"
                                >
                                    <SwitchCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {devices.map((device) => (
                                    <DropdownMenuCheckboxItem
                                        key={device.deviceId}
                                        checked={
                                            selectedCameraId === device.deviceId
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
                            className="w-full sm:h-14 sm:w-14 rounded-md sm:rounded-full"
                            onClick={toggleSwitchCamera}
                        >
                            <SwitchCamera className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    )}

                    {/* Session/Attendance Selects - Show inline on larger screens */}
                    {eventDetails && (
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <Select
                                value={selectedSessionType}
                                onValueChange={(value) =>
                                    onSelectSessionType(value)
                                }
                            >
                                <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs  w-full sm:w-auto min-w-0 h-14">
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
                                                {eventSessionType[session.type]}
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
                                <SelectTrigger className="bg-muted/30 dark:bg-muted/30 text-xs  w-full sm:w-auto min-w-0 h-14">
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
