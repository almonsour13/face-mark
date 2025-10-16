import { useEffect, useState } from "react";

export const useVideoDevices = () => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedCameraId, setSelectedCameraId] = useState<string >(
        ""
    );
    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(
                    (device) => device.kind === "videoinput"
                );
                setDevices(videoDevices);
                if (videoDevices.length > 0) {
                    setSelectedCameraId(videoDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error enumerating devices:", error);
            }
        };

        getDevices();
        navigator.mediaDevices.addEventListener("devicechange", getDevices);
        return () => {
            navigator.mediaDevices.removeEventListener(
                "devicechange",
                getDevices
            );
        };
    }, []);

    return { devices, selectedCameraId, setSelectedCameraId };
};
