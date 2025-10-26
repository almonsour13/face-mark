
export const convertToBase64 = (
    imageUrl: Uint8Array<ArrayBufferLike> | null
) => {
    if (!imageUrl) return null;
    return `data:image/jpeg;base64,${Buffer.from(imageUrl).toString("base64")}`;
};
