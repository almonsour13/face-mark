import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, Plus, Settings, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { eventStatus } from "@/constant";
import { TimePicker } from "../time-picker";
import { Switch } from "../ui/switch";
import { ScrollArea } from "../ui/scroll-area";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import { tr } from "date-fns/locale";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import {
    defaultTimeForSession,
    eventSessionTypeValue,
} from "@/utils/event-utils";
import { EventSession, useCreateEvent } from "@/hooks/event/use-events";
import { useEventStore } from "@/store/use-event-store";

export type SessionType = "Morning" | "Afternoon" | "Evening";

export default function CreateEventDialog() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "sadasdasdas",
        description: "",
        location: "",
        eventTypeId: "",
        eventDate: new Date(),
        status: 1,
    });
    const [eventSessions, setEventSessions] = useState<EventSession[]>([
        {
            type: 1,
            startTime: "09:00 AM",
            endTime: "12:00 PM",
            requiresTimeOut: 1,
            allowEarlyTimeIn: 1,
            allowEarlyTimeOut: 1,
        },
    ]);

    const { mutate: createEvent, isPending: isCreateEventLoading } =
        useCreateEvent();
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const eventData = {
            ...formData,
            eventSessions: eventSessions,
        };

        createEvent(eventData, {
            onSuccess: (data) => {
                if (data.success && data.newEvent) {
                    addNewEvent(data.newEvent);
                    setFormData({
                        name: "",
                        description: "",
                        location: "",
                        eventTypeId: "",
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
                        },
                    ]);

                    setOpen(false);
                    toast.success("Event created successfully!");
                }
            },
        });
        // Reset form

        // Show success message (you can replace with toast notification)
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const availableSessionTypes = getAvailableSessionTypes();

    return (
        <DialogSheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={
                <Button size="sm" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Event
                </Button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 p-4 md:p-6 pb-0">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Event Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Event Description"
                            rows={4}
                            className="resize-none"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="Event Location"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="flex-1">
                            <Label htmlFor="type" className="mb-2">
                                Type
                            </Label>
                            <Select
                                value={formData.eventTypeId}
                                onValueChange={(value) =>
                                    handleSelectChange("type", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(eventStatus).map(
                                        ([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="status" className="mb-2">
                                Status
                            </Label>
                            <Select
                                value={formData.status.toString()}
                                onValueChange={(value) =>
                                    handleSelectChange("status", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(eventStatus).map(
                                        ([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                {value}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="start-date" className="mb-2">
                                Event Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="text-muted-foreground font-normal w-full flex items-center justify-start"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.eventDate
                                            ? formatDate(formData.eventDate)
                                            : "Select Date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={formData.eventDate}
                                        onSelect={handleDateChange}
                                        className="p-3 pointer-events-auto"
                                        disabled={(date) =>
                                            date <
                                            new Date(
                                                new Date().setHours(0, 0, 0, 0)
                                            )
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Event Sessions</Label>
                        </div>
                        <div className="space-y-2 rounded-md">
                            {eventSessions.map((session, index) => (
                                <div
                                    className="p-2 border rounded-md flex flex-wrap gap-2 items-end"
                                    key={index}
                                >
                                    <div className="flex-1">
                                        <Label className="mb-2">Type</Label>
                                        <Select
                                            value={session.type.toString()}
                                            onValueChange={(value) =>
                                                handleSessionTypeChange(
                                                    index,
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Session Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem
                                                    value={session.type.toString()}
                                                >
                                                    {
                                                        eventSessionTypeValue[
                                                            session.type
                                                        ]
                                                    }
                                                </SelectItem>
                                                {availableSessionTypes.map(
                                                    (type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type.toString()}
                                                        >
                                                            {
                                                                eventSessionTypeValue[
                                                                    type
                                                                ]
                                                            }
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label>Start Time</Label>
                                        <TimePicker
                                            value={session.startTime}
                                            onChange={(value) =>
                                                handleSessionTimeChange(
                                                    index,
                                                    "startTime",
                                                    value
                                                )
                                            }
                                            placeholder="Start time"
                                            sessionType={session.type}
                                            timeType="start"
                                            endTime={session.endTime}
                                        />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label>End Time</Label>
                                        <TimePicker
                                            value={session.endTime}
                                            onChange={(value) =>
                                                handleSessionTimeChange(
                                                    index,
                                                    "endTime",
                                                    value
                                                )
                                            }
                                            placeholder="End time"
                                            sessionType={session.type}
                                            timeType="end"
                                            startTime={session.startTime}
                                        />
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                size="icon"
                                                type="button"
                                                variant="outline"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div className="grid gap-4">
                                                <div className="flex w-full justify-between">
                                                    <Label>
                                                        Requires Time Out
                                                    </Label>
                                                    <Switch
                                                        checked={
                                                            session.requiresTimeOut ===
                                                            1
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleSessionSwitchChange(
                                                                index,
                                                                "requiresTimeOut",
                                                                checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex w-full justify-between">
                                                    <Label>
                                                        Allow Early Time In
                                                    </Label>
                                                    <Switch
                                                        checked={
                                                            session.allowEarlyTimeIn ===
                                                            1
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleSessionSwitchChange(
                                                                index,
                                                                "allowEarlyTimeIn",
                                                                checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex w-full justify-between">
                                                    <Label>
                                                        Allow Early Time Out
                                                    </Label>
                                                    <Switch
                                                        checked={
                                                            session.allowEarlyTimeOut ===
                                                            1
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleSessionSwitchChange(
                                                                index,
                                                                "allowEarlyTimeOut",
                                                                checked
                                                            )
                                                        }
                                                        disabled={
                                                            session.requiresTimeOut ===
                                                            0
                                                        }
                                                    />
                                                </div>
                                                <div className="flex w-full justify-between items-center">
                                                    <Label>
                                                        Grace Period (mins)
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        value={
                                                            session.gracePeriod ||
                                                            30
                                                        }
                                                        onChange={(e) =>
                                                            handleGracePeriodChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-16 h-8"
                                                        min={30}
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveSession(index)
                                        }
                                        title={
                                            eventSessions.length === 1
                                                ? "Cannot delete the last session"
                                                : "Delete Session"
                                        }
                                        size="icon"
                                        variant="outline"
                                        disabled={index === 0}
                                    >
                                        <Trash className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <div className="w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-xs w-full"
                                    onClick={handleAddSession}
                                    disabled={
                                        availableSessionTypes.length === 0
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Session
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 sticky bottom-0 bg-background p-4 md:px-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isCreateEventLoading}>
                        {isCreateEventLoading ? "creating..." : "create"}
                    </Button>
                </div>
            </form>
        </DialogSheetWrapper>
    );
}
