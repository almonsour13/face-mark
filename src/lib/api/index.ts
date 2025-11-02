export const fetchApi = async <T = any>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "Request failed");
    }

    return result as T;
};
