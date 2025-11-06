export interface User{
    id:string;
    name:string;
    email:string;
    image?:string;
    role:number;
    status:number;
    createdAt:Date;
    updatedAt:Date;
}
export interface StudentDetails{
    id:string;
    studentId:string;
    userId:string;
    courseId:string;
    levelId:string;
    createdAt:Date;
    updatedAt:Date;
}
export interface Level{
    id:string;
    name:string;
    createdAt:Date;
}
export interface Course{
    id:string;
    name:string;
    code:string;
    createdAt:Date;
}
export interface Face{
    id:string;
    imageUrl:string;
    descriptor:number[];
    createdAt:Date;
    updatedAt:Date;
}
export interface Event {
    id?: string;
    eventTypeId: string;
    createdByid:string;
    name: string;
    description?: string;
    location: string | null;
    eventDate: Date;
    status: number;
    createtedAt: Date;
    updatedAt: Date;
}
export interface EventType {
    id: string;
    name: string;
    createdAt: Date;
}
export interface Session {
    id?: string;
    eventId?: string;
    type: number;
    startTime: string;
    endTime: string;
    requiresTimeOut: number;
    allowEarlyTimeIn: number;
    allowEarlyTimeOut: number;
    gracePeriod?: number;
}
export interface Attendance {
    id: string;
    userId: string;
    sessionId: string;
    eventId: string;
    status: number;
    type: number;
    method: number;
    createdAt: Date;
}
