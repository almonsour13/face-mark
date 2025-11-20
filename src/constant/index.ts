export const eventStatus: Record<number, string> = {
    1: "Draft",
    2: "Upcoming",
    3: "Ongoing",
    4: "Completed",
    5: "Cancelled",
};
export const eventStatusColor: Record<number, { color: string; bg: string }> = {
    1: {
        color: "text-gray-600 dark:text-gray-400",
        bg: "bg-gray-100 dark:bg-gray-900",
    },
    2: {
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950",
    },
    3: {
        color: "text-yellow-foreground",
        bg: "bg-muted/20",
    },
    4: {
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-950",
    },
    5: {
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-950",
    },
};

export const levelsValue: Record<string, string> = {
    "1": "1st Year",
    "2": "2nd Year",
    "3": "3rd Year",
    "4": "4th Year",
    "5": "5th Year",
    "6": "6th Year",
    "7": "7th Year",
    "8": "8th Year",
};
export const roleValue: Record<number, string> = {
    1: "user",
    2: "admin",
};
export const eventSessionType: Record<number, string> = {
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
};
export const sortBy: Record<string, string> = {
    "date-desc": "Date (Newest First)",
    "date-asc": "Date (Oldest First)",
    "name-asc": "Name (A-Z)",
    "name-desc": "Name (Z-A)",
};
export const attendanceType: Record<number, string> = {
    1: "Time in",
    2: "Time out",
};
export const attendanceStatus: Record<number, string> = {
    1: "On time",
    2: "Late",
};
