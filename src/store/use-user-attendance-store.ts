
import { Attendance, Event, Session } from "@/type";
import {create} from "zustand";

export interface UserAttendances extends Attendance{
    session: Session;
    event: Event
}
interface UserAttendanceProps {
    isUserAttendanceLoading: boolean;
    setUserAttendanceLoading: (isUserAttendanceLoading: boolean) => void;
    userAttendances: UserAttendances[];
    setUserAttendances: (userAttendances: UserAttendances[]) => void;
    addMoreUserAttendances: (userAttendances: UserAttendances[]) => void;
}
export const useUserAttendanceStore  = create<UserAttendanceProps>((set) => ({
    isUserAttendanceLoading: false,
    userAttendances: [],
    setUserAttendanceLoading: (isUserAttendanceLoading: boolean) => set({isUserAttendanceLoading}),
    setUserAttendances: (userAttendances: UserAttendances[]) => set({userAttendances}),
    addMoreUserAttendances: (userAttendances: UserAttendances[]) =>
        set((state) => ({ userAttendances: [...state.userAttendances, ...userAttendances] })),

}))