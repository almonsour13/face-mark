import { createEvent } from "@/lib/api/event";
import { useEventStore } from "@/store/use-event-store";
import { defaultTimeForSession } from "@/utils/event-utils";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateEvents = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        eventType: "Meeting",
        eventDate: new Date(),
        status: 2,
    });
    const [eventSessions, setEventSessions] = useState([
        {
            type: 1,
            startTime: "09:00 AM",
            endTime: "12:00 PM",
            requiresTimeOut: 1,
            allowEarlyTimeIn: 1,
            allowEarlyTimeOut: 1,
            gracePeriod: 30,
        },
    ]);
    const [isCreateEventLoading, setIsCreateEventLoading] = useState(false);
    // const { mutate: createEvent, isPending: isCreateEventLoading } =
    //     useCreateEvent();
    const { addNewEvent } = useEventStore();

    const handleSessionTypeChange = (index: number, newType: string) => {
        const type = Number(newType);
        const defaultTimes = defaultTimeForSession[type];
        const updated = [...eventSessions];
        updated[index] = {
            ...updated[index],
            type: type,
            startTime: defaultTimes.start,
            endTime: defaultTimes.end,
        };
        setEventSessions(updated);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as
            | HTMLInputElement
            | HTMLTextAreaElement;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData((prev) => ({ ...prev, eventDate: date }));
        }
    };

    const getAvailableSessionTypes = (): number[] => {
        const allTypes = [1, 2, 3];
        const usedTypes = eventSessions.map((session) => session.type);
        return allTypes.filter((type) => !usedTypes.includes(type));
    };

    const handleAddSession = () => {
        const availableTypes = getAvailableSessionTypes();
        if (availableTypes.length === 0) return;

        const newType = availableTypes[0];
        const defaultTimes = defaultTimeForSession[newType];

        setEventSessions([
            ...eventSessions,
            {
                type: newType,
                startTime: defaultTimes.start,
                endTime: defaultTimes.end,
                requiresTimeOut: 0,
                allowEarlyTimeIn: 0,
                allowEarlyTimeOut: 0,
                gracePeriod: 30,
            },
        ]);
    };

    const handleRemoveSession = (index: number) => {
        if (eventSessions.length <= 1) return;
        setEventSessions(eventSessions.filter((_, i) => i !== index));
    };

    const handleSessionTimeChange = (
        index: number,
        field: "startTime" | "endTime",
        value: string
    ) => {
        const updated = [...eventSessions];
        updated[index][field] = value;
        setEventSessions(updated);
    };

    const handleSessionSwitchChange = (
        index: number,
        field: "requiresTimeOut" | "allowEarlyTimeIn" | "allowEarlyTimeOut",
        checked: boolean
    ) => {
        const updated = [...eventSessions];
        updated[index][field] = checked ? 1 : 0;

        // If requiresTimeOut is disabled, also disable allowEarlyTimeOut
        if (field === "requiresTimeOut" && !checked) {
            updated[index].allowEarlyTimeOut = 0;
        }

        setEventSessions(updated);
    };

    const handleGracePeriodChange = (index: number, value: string) => {
        const updated = [...eventSessions];
        const numValue = parseInt(value) || 30;
        updated[index].gracePeriod = Math.max(30, numValue);
        setEventSessions(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const eventData = {
            ...formData,
            eventSessions: eventSessions,
        };
        try {
            setIsCreateEventLoading(true);
            const response = await createEvent(eventData);
            if (response.success && response.newEvent) {
                addNewEvent(response.newEvent);
                setFormData({
                    name: "",
                    description: "",
                    location: "",
                    eventType: "",
                    eventDate: new Date(),
                    status: 1,
                });
                setEventSessions([
                    {
                        type: 1,
                        startTime: "09:00 AM",
                        endTime: "12:00 PM",
                        requiresTimeOut: 1,
                        allowEarlyTimeIn: 1,
                        allowEarlyTimeOut: 1,
                        gracePeriod: 30,
                    },
                ]);

                setOpen(false);
                toast.success("Event created successfully!");
            }
            setIsCreateEventLoading(false);
        } catch (error) {}
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const availableSessionTypes = getAvailableSessionTypes();

    return {
        open,
        setOpen,
        formData,
        setFormData,
        eventSessions,
        setEventSessions,
        handleSessionTypeChange,
        handleChange,
        handleSelectChange,
        handleDateChange,
        handleAddSession,
        handleRemoveSession,
        handleSessionTimeChange,
        handleSessionSwitchChange,
        handleGracePeriodChange,
        handleSubmit,
        formatDate,
        availableSessionTypes,
        isCreateEventLoading,
    };
};
