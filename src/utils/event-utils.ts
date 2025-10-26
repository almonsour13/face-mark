export const eventStatusValue: Record<number, string> = {
    1: "Draft",
    2: "Upcoming",
    3: "Ongoing",
    4: "Completed",
};
export const defaultTimeForSession: Record<number, { start: string; end: string }> = {
    1: { start: "09:00 AM", end: "12:00 PM" },
    2: { start: "01:00 PM", end: "04:00 PM" },
    3: { start: "05:00 PM", end: "08:00 PM" },
};
export const eventSessionTypeValue: Record<number, string> = {
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
};
