import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query"

interface Level {
    id: string;
    name: string;
}
interface Response {
    success : boolean;
    levels: Level[]
}
export const useLevel = () => {
    return useQuery<Response, Error>({
        queryKey: ["level"],
        queryFn: async () => {
            const response = await fetchApi("/api/level");
            return response;
        },
    });

}