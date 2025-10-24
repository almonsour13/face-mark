import DetectParentPanel from "@/components/detect/detect-parent-panel";
import { FaceDetectionProvider } from "@/context/face-detect-context";

export default function Page() {
    return (
        <FaceDetectionProvider>
            <DetectParentPanel />
        </FaceDetectionProvider>
    );
}
