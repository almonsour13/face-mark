import { fetchApi } from "@/lib/api";
import { Course } from "@/type";
import { useQuery } from "@tanstack/react-query"

interface Response {
    success : boolean;
    courses: Course[]
}
export const useCourses = () => {
    return useQuery<Response, Error>({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await fetchApi("/api/course");
            return response;
        },
    });

}