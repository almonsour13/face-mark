
import { Attendance, Session } from "@/type";
import { create } from "zustand";
import { EventWithSessions } from "./use-event-store";
import { UserWithDetails } from "./use-user-store";

export interface AttendanceWithEventAndUser extends Attendance {
    event: EventWithSessions;
    user: UserWithDetails;
    session: Session;
}
interface AttendanceStore{
    isAttendanceLoading: boolean;
    setIsAttendanceLoading: (isAttendanceLoading: boolean) => void;
    attendances: AttendanceWithEventAndUser[];
    setAttendances: (attendances: AttendanceWithEventAndUser[]) => void
    addMoreAttendance: (attendances: AttendanceWithEventAndUser[]) => void
}

export const useAttendanceStore = create<AttendanceStore>((set, get) => ({
    isAttendanceLoading: false,
    setIsAttendanceLoading: (isAttendanceLoading) => set({ isAttendanceLoading }),
    attendances: [],
    setAttendances: (attendances) => set({ attendances }),
    addMoreAttendance: (attendance) =>
        set((state) => ({ attendances: [...state.attendances, ...attendance] })),

}))