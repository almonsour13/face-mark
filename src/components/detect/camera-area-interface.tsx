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
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { Camera, CameraOff, ScanFace, SwitchCamera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";
import { EventSession } from "@/hooks/event/use-events";
import { toast } from "sonner";

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
        environment,
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
    }, [selectedSessionType]);
    const onSelectAttendanceType = (attendanceType: string) => {
        setSelectedAttendanceType(attendanceType);
        // minutes
        const gracePeriod = selectedSession?.gracePeriod || 0;

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
                        <p className="text-muted-foreground">Camera is off</p>
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
            {!isEventDetailsLoading && eventDetails && (
                <div className="absolute top-0 left-0 right-0 p-4">
                    <div className="w-full flex items-start justify-between">
                        <div className="">
                            <h1 className="text-xl leading-relaxed font-medium">
                                {eventDetails?.name || "Unknown"}
                            </h1>
                        </div>
                        <div className="flex items-start gap-4 ">
                            <div className="">
                                <div className="flex w-full gap-2 items-center border h-9 px-4 rounded-md bg-muted/50 text-xs">
                                    <ScanFace className="h-4 w-4 text-white" />
                                    <p className="text-white font-medium ">
                                        {faceCount}
                                    </p>
                                </div>
                                <Label className="text-xs mt-1">Faces</Label>
                            </div>
                            <div className="">
                                <div className="flex w-full gap-2 items-center border h-9 px-4 rounded-md bg-muted/50 text-xs">
                                    {eventStatusValue[eventDetails.status]}
                                </div>
                                <Label className="text-xs mt-1">Status</Label>
                            </div>
                            <div className="">
                                <Select
                                    value={selectedSessionType}
                                    onValueChange={(value) =>
                                        onSelectSessionType(value)
                                    }
                                >
                                    <SelectTrigger className="w-full bg-muted/50 dark:bg-muted/50 text-xs">
                                        <SelectValue placeholder="Select Session" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventDetails.eventSessions.map(
                                            (session) => (
                                                <SelectItem
                                                    key={session.id}
                                                    value={session.type.toString()}
                                                    className="text-xs"
                                                >
                                                    {
                                                        eventSessionTypeValue[
                                                            session.type
                                                        ]
                                                    }
                                                    {" | "}
                                                    <div className="">
                                                        <span>
                                                            {session.startTime}{" "}
                                                        </span>
                                                        {/* add dot character between start time and end time */}

                                                        <span>
                                                            {" - "}
                                                            {session.endTime}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <Label className="text-xs mt-1">
                                    Session Type
                                </Label>
                            </div>
                            <div>
                                <Select
                                    value={selectedAttendanceType}
                                    onValueChange={(value) =>
                                        onSelectAttendanceType(value)
                                    }
                                >
                                    <SelectTrigger className="w-full bg-muted/50 dark:bg-muted/50 text-xs">
                                        <SelectValue placeholder="Select Attendance Type" />
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
                                <Label className="text-xs mt-1">
                                    Attendance Type
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 left-0 p-4 lg:p-8">
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
    );
}
