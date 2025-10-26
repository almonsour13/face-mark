import { AttendanceStatus } from "@/components/detect/detect-parent-panel";
import { Face } from "@/store/use-faces-store";
import * as faceapi from "face-api.js";



export interface MatchResult {
    isMatch: boolean;
    user: Face | null;
    distance?: number;
}
// Cache for FaceMatcher to avoid rebuilding on every frame
let faceMatcher: faceapi.FaceMatcher | null = null;
let cachedUsers: Face[] | null = null;
let matchThreshold = 0.6;

export function updateFaceMatcherCache(users: Face[], threshold: number) {
    if (cachedUsers === users && matchThreshold === threshold) {
        return;
    }

    const labeledDescriptors = users
        .filter((u) => u?.descriptor)
        .map((u) => {
            // Handle descriptor whether it's string or number[]
            let descriptor = u!.descriptor;

            if (typeof descriptor === "string") {
                try {
                    descriptor = JSON.parse(descriptor);
                } catch {
                    console.warn("Invalid descriptor for user:", u.id);
                    return null;
                }
            }

            // Ensure it's a Float32Array
            const floatDescriptor = new Float32Array(descriptor);

            return new faceapi.LabeledFaceDescriptors(u.id, [floatDescriptor]);
        })
        .filter((d): d is faceapi.LabeledFaceDescriptors => d !== null);

    if (labeledDescriptors.length === 0) {
        faceMatcher = null;
    } else {
        faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, threshold);
    }

    cachedUsers = users;
    matchThreshold = threshold;
}

export function matchFaceWithUsers(
    descriptor: Float32Array,
    users: Face[],
    threshold = 0.6
): MatchResult {
    updateFaceMatcherCache(users, threshold);

    if (!faceMatcher) {
        return { isMatch: false, user: null };
    }

    const bestMatch = faceMatcher.findBestMatch(descriptor);
    const isMatch = bestMatch.label !== "unknown";

    if (isMatch) {
        const matchedUser = users.find((u) => u.id === bestMatch.label);
        return {
            isMatch: true,
            user: matchedUser || null,
            distance: bestMatch.distance,
        };
    }

    return { isMatch: false, user: null };
}

export interface DrawFaceBoxOptions {
    isMatch: boolean;
    label?: string;
    userStatus?: AttendanceStatus;
    confidence?: string;
    cooldownSeconds?: number;
}

function getStatusInfo(status?: AttendanceStatus): {
    color: string;
    textColor: string;
    label: string;
    icon: string;
} {
    switch (status) {
        case AttendanceStatus.UNKNOWN:
            return {
                color: "#dc2626",
                textColor: "#ffffff",
                label: "",
                icon: "→",
            };
        case AttendanceStatus.TIME_IN:
            return {
                color: "#059669",
                textColor: "#ffffff",
                label: "Time In",
                icon: "→",
            };
        case AttendanceStatus.ALREADY_TIME_IN:
            return {
                color: "#059669",
                textColor: "#ffffff",
                label: "Already Time In",
                icon: "→",
            };
        case AttendanceStatus.TIME_OUT:
            return {
                color: "#2563eb",
                textColor: "#ffffff",
                label: "Time Out",
                icon: "←",
            };
        case AttendanceStatus.ALREADY_TIME_OUT:
            return {
                color: "#2563eb",
                textColor: "#ffffff",
                label: "Already Time Out",
                icon: "←",
            };
        case AttendanceStatus.COMPLETED:
            return {
                color: "#f59e0b",
                textColor: "#ffffff",
                label: "Completed",
                icon: "⏱",
            };
        default:
            return {
                color: "#dc2626",
                textColor: "#ffffff",
                label: "Failed to recognize",
                icon: "?",
            };
    }
}

export function drawFaceBox(
    ctx: CanvasRenderingContext2D,
    box: { x: number; y: number; width: number; height: number },
    options: DrawFaceBoxOptions
) {
    const { isMatch, label, userStatus, cooldownSeconds } = options;
    const statusInfo = getStatusInfo(userStatus);
    const strokeColor = isMatch ? statusInfo.color : "#dc2626";
    const strokeWidth = 2.5;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    if (label) {
        const padding = 10;
        const fontSize = 13;
        ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

        let displayText = label;
        if (userStatus !== undefined && statusInfo.label !== "") {
            displayText += ` • ${statusInfo.label}`;
        }

        const textMetrics = ctx.measureText(displayText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 2;

        const bgX = Math.max(0, box.x);
        const bgY = Math.max(0, box.y - textHeight - padding * 2);
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding * 2;

        ctx.fillStyle = statusInfo.color;
        ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        ctx.fillStyle = statusInfo.textColor;
        ctx.fillText(
            displayText,
            bgX + padding,
            bgY + textHeight + padding / 2
        );
    }

    if (cooldownSeconds !== undefined && cooldownSeconds > 0) {
        const padding = 8;
        const fontSize = 12;
        const cooldownText = `Cooldown: ${cooldownSeconds}s`;

        ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
        const textMetrics = ctx.measureText(cooldownText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 2;

        const bgX = box.x + box.width - textWidth - padding * 2 - 8;
        const bgY = box.y + 8;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding * 2;

        ctx.fillStyle = "#f59e0b";
        ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        ctx.fillStyle = "#ffffff";
        ctx.fillText(
            cooldownText,
            bgX + padding,
            bgY + textHeight + padding / 2
        );
        return;
    }

    if (userStatus !== undefined) {
        const padding = 6;
        const fontSize = 11;
        const statusText = statusInfo.label;

        ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
        const textMetrics = ctx.measureText(statusText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize + 2;

        const bgX = box.x + box.width - textWidth - padding * 2 - 8;
        const bgY = box.y + 8;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding * 2;

        ctx.fillStyle = statusInfo.color;
        ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        ctx.fillStyle = statusInfo.textColor;
        ctx.fillText(statusText, bgX + padding, bgY + textHeight + padding / 2);
    }
}
