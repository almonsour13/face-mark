import { UserAttendances } from "@/hooks/user/use-user-attendances";
import {create} from "zustand";


interface UserAttendanceProps {
    isUserAttendanceLoading: boolean;
    setUserAttendanceLoading: (isUserAttendanceLoading: boolean) => void
    userAttendances: UserAttendances[]
    setUserAttendances: (userAttendances: UserAttendances[]) => void
}
export const useUserAttendanceStore  = create<UserAttendanceProps>((set) => ({
    isUserAttendanceLoading: false,
    userAttendances: [],
    setUserAttendanceLoading: (isUserAttendanceLoading: boolean) => set({isUserAttendanceLoading}),
    setUserAttendances: (userAttendances: UserAttendances[]) => set({userAttendances})
}))