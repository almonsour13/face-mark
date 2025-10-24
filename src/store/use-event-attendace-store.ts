
import { User } from '@/hooks/user/use-users';
import { create } from 'zustand';

interface session {
    type: number;
}
interface Attendance {
    userId: string;
    id: string;
    status: number;
    type: number;
    method: number;
    createdAt: Date;
    user: User;
    session?: session
}

interface EventAttendanceProps {
    isEventAttendanceLoading: boolean;
    setEventAttendanceLoading: (isEventAttendanceLoading: boolean) => void;    
    eventAttendance:  Attendance[];
    setEventAttendance: (eventAttendance: Attendance[]) => void;
    addEventAttendance: (eventAttendance: Attendance) => void;
    removeEventAttendance:(id:string) => void
}
export const useEventAttendanceStore = create<EventAttendanceProps>((set) => ({
    isEventAttendanceLoading: false,
    setEventAttendanceLoading: (isEventAttendanceLoading) => set(() => ({ isEventAttendanceLoading })),
    eventAttendance: [],
    setEventAttendance: (eventAttendance) =>
        set(() => ({ eventAttendance })),
    addEventAttendance: (eventAttendance: Attendance) =>
        set((state) => ({
            eventAttendance: [...state.eventAttendance, eventAttendance]
        })),    
    removeEventAttendance:(id:string) =>
        set((state) => ({
            eventAttendance: state.eventAttendance.filter(att => att.id !== id)
        })),
}));