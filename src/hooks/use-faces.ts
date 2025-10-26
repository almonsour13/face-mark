import { Face } from "@/store/use-faces-store";
import { useQuery } from "@tanstack/react-query";
interface Response {
    success: boolean;
    faces: Face[];
}
export const useFaces = () => {
    return useQuery<Response, Error>({
        queryKey: ["faces"],
        queryFn: async () => {
            const response = await fetch("/api/face");
            return await response.json();
        },
    });
};
