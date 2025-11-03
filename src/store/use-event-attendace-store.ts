
import { Attendance, Course, Face, Level, Session, StudentDetails, User } from '@/type';
import { create } from 'zustand';
import { UserWithDetails } from './use-user-store';


export interface EventAttendance extends Attendance{
    session:Session;
    user:UserWithDetails
}

interface EventAttendanceProps {
    isEventAttendanceLoading: boolean;
    setEventAttendanceLoading: (isEventAttendanceLoading: boolean) => void;    
    eventAttendance:  EventAttendance[];
    setEventAttendance: (eventAttendance: EventAttendance[]) => void;
    addEventAttendance: (eventAttendance: EventAttendance) => void;
    removeEventAttendance:(id:string) => void
}
export const useEventAttendanceStore = create<EventAttendanceProps>((set) => ({
    isEventAttendanceLoading: false,
    setEventAttendanceLoading: (isEventAttendanceLoading) => set(() => ({ isEventAttendanceLoading })),
    eventAttendance: [],
    setEventAttendance: (eventAttendance) =>
        set(() => ({ eventAttendance })),
    addEventAttendance: (eventAttendance: EventAttendance) =>
        set((state) => ({
            eventAttendance: [...state.eventAttendance, eventAttendance]
        })),    
    removeEventAttendance:(id:string) =>
        set((state) => ({
            eventAttendance: state.eventAttendance.filter(att => att.id !== id)
        })),
}));