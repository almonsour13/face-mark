import { Course, Level } from "@/type";
import { create } from "zustand";

interface CoursesProps {
    courses: Course[];
    setCourses: (course: Course[]) => void;
    addNewCourse: (course: Course) => void;
    updateCourse: (id: string, course: Course) => void;
}

export const useCoursesStore = create<CoursesProps>((set) => ({
    courses: [],
    setCourses: (courses) => set({ courses }),
    addNewCourse: (course: Course) =>
        set((state) => ({ courses: [...state.courses, course] })),
    updateCourse: (id, course) =>
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? course : c)),
        })),
}));
