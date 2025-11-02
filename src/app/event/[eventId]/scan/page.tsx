import DetectParentPanel from "@/components/detect/detect-parent-panel";
import RBACGuard from "@/components/rbac-guard";
import { FaceDetectionProvider } from "@/context/face-detect-context";

export default function Page() {
    return (
        <RBACGuard allowedRoles={["admin"]} >
            <FaceDetectionProvider>
                <DetectParentPanel />
            </FaceDetectionProvider>
        </RBACGuard>
    );
}
