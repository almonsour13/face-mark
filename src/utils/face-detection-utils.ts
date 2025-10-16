import * as faceapi from "face-api.js";

export interface User {
    id: string;
    name: string;
    faceImages?: {
        descriptor: number[];
    };
}

export interface MatchResult {
    isMatch: boolean;
    user: User | null;
    distance?: number;
}

export function matchFaceWithUsers(
    descriptor: Float32Array,
    users: User[],
    threshold = 0.6
): MatchResult {
    const labeledDescriptors = users
        .filter((u) => u.faceImages?.descriptor)
        .map((u) => {
            return new faceapi.LabeledFaceDescriptors(u.id, [
                new Float32Array(u.faceImages!.descriptor),
            ]);
        });

    if (labeledDescriptors.length === 0) {
        return { isMatch: false, user: null };
    }

    const matcher = new faceapi.FaceMatcher(labeledDescriptors, threshold);
    const bestMatch = matcher.findBestMatch(descriptor);
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

/**
 * Draw a bounding box and optional label on canvas
 */
export interface DrawFaceBoxOptions {
    isMatch: boolean;
    label?: string;
    hasAttended?: boolean;
}
export function drawFaceBox(
    ctx: CanvasRenderingContext2D,
    box: { x: number; y: number; width: number; height: number },
    options: DrawFaceBoxOptions
) {
    const { isMatch, label, hasAttended } = options;

    if (hasAttended) {
        ctx.strokeStyle = "#10b981"; // green for attended
        ctx.fillStyle = "#10b981";
    } else if (isMatch) {
        ctx.strokeStyle = "#3b82f6"; // blue for matched
        ctx.fillStyle = "#3b82f6";
    } else {
        ctx.strokeStyle = "#ef4444"; // red for unmatched
        ctx.fillStyle = "#ef4444";
    }

    ctx.lineWidth = 3;

    // Draw the bounding box
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    if (label || hasAttended) {
        const padding = 8;
        const fontSize = 16;
        ctx.font = `bold ${fontSize}px sans-serif`;

        // Prepare text
        let displayText = label || "Unknown";
        if (hasAttended) {
            displayText += " ✓";
        }

        const textWidth = ctx.measureText(displayText).width;
        const textHeight = fontSize;

        // Draw background for text
        const bgX = box.x;
        const bgY = box.y - textHeight - padding * 2;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = textHeight + padding * 2;

        ctx.fillRect(bgX, bgY, bgWidth, bgHeight);

        // Draw text
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
            displayText,
            bgX + padding,
            bgY + textHeight + padding / 2
        );
    }

    if (hasAttended) {
        const badgeSize = 24;
        const badgeX = box.x + box.width - badgeSize - 8;
        const badgeY = box.y + 8;

        // Draw green circle badge
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(
            badgeX + badgeSize / 2,
            badgeY + badgeSize / 2,
            badgeSize / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw checkmark
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(badgeX + 6, badgeY + 12);
        ctx.lineTo(badgeX + 10, badgeY + 16);
        ctx.lineTo(badgeX + 18, badgeY + 8);
        ctx.stroke();
    }
}
