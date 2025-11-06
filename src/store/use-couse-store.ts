import { Course, Level } from "@/type";
import { create } from "zustand";

interface CoursesProps {
    courses: Course[];
    setCourses: (course: Course[]) => void;
}

export const useCoursesStore = create<CoursesProps>((set) => ({
    courses: [],
    setCourses: (courses) => set({ courses }),
}));
