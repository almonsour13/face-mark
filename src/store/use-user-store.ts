
import { Course, Face, Level, StudentDetails, User } from "@/type";
import { create } from "zustand";

interface StudentDetailsWithLevelAndCourse extends StudentDetails{
    level:Level;
    course:Course;
}
export interface UserWithDetails extends User{
    studentDetails:StudentDetailsWithLevelAndCourse;
    face?:Face
}
interface UserStore {
    isUsersLoading: boolean;
    setUsersLoading: (isUsersLoading: boolean) => void
    users: UserWithDetails[];
    setUsers: (user: UserWithDetails[]) => void
}
export const userUserStore = create<UserStore>((set) => ({
    isUsersLoading: true,
    setUsersLoading: (isUsersLoading: boolean) => set({ isUsersLoading }),
    users: [],
    setUsers: (users: UserWithDetails[]) => set({ users }),
}));