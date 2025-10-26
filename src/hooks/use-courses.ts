import { useQuery } from "@tanstack/react-query"

interface Course {
    id: string;
    name: string;
    code: string;
}
interface Response {
    success : boolean;
    courses: Course[]
}
export const useCourses = () => {
    return useQuery<Response, Error>({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await fetch("/api/course");
            return await response.json();
        },
    });

}