export const fetchApi = async (url: string, options?: RequestInit) => {
    const response = await fetch(`${url}`, options);
    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.error || "Request failed");
    }
    return result;
};