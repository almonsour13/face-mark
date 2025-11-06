import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { eventSessionType, eventStatus } from "@/constant";
import { useEventTypes } from "@/hooks/query/event/use-event-type";
import { CalendarIcon, Plus, Settings, Trash } from "lucide-react";
import { useState } from "react";
import { TimePicker } from "../ui/time-picker";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import DialogSheetWrapper from "./dialog-sheet-wrapper";
import AlertMessageDialog from "./alert-message-dialog";
import { useCreateEvents } from "@/hooks/use-create-event";
import { toast } from "sonner";

export type SessionType = "Morning" | "Afternoon" | "Evening";
interface CreateEventDialogProps {
    children?: React.ReactNode;
}
export default function CreateEventDialog({
    children,
}: CreateEventDialogProps) {
    const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
    const {
        open,
        setOpen,
        formData,
        setFormData,
        eventSessions,
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
    } = useCreateEvents();

    const { data: eventTypesData, isPending: isEventTypesLoading } =
        useEventTypes();

    const handleDiscard = () => {
        setFormData({
            name: "",
            description: "",
            location: "",
            eventTypeId: "",
            status: 1,
            eventDate: new Date(),
        });
        setOpen(false);
        toast.success("Changes discarded");
    };

    const isValid =
        formData.name.trim() !== "" &&
        formData.eventDate instanceof Date &&
        eventSessions.length > 0 &&
        eventSessions.every(
            (session) =>
                session.startTime.trim() !== "" && session.endTime.trim() !== ""
        );

    const isFormDirty =
        formData.name.trim() !== "" ||
        formData.description.trim() !== "" ||
        formData.location.trim() !== "" ||
        (eventSessions.length >= 1 &&
            eventSessions.some(
                (session) =>
                    session.startTime.trim() !== "09:00 AM" || // or your default
                    session.endTime.trim() !== "12:00 PM" ||
                    session.requiresTimeOut !== 1 ||
                    session.allowEarlyTimeIn !== 1 ||
                    session.allowEarlyTimeOut !== 1 ||
                    session.gracePeriod !== 30
            ));

    return (
        <>
            <DialogSheetWrapper
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen && isFormDirty) {
                        setAlertDialogOpen(true);
                        return;
                    }
                    setOpen(isOpen);
                }}
                triggerButton={
                    children ? (
                        children
                    ) : (
                        <Button size="sm" className="gap-2">
                            Create Event
                        </Button>
                    )
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 p-4 md:p-6 pb-0">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold">
                                Create New Event
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Fill in the details to create a new event. All
                                fields are required.
                            </p>
                        </div>
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
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {formData.eventTypeId}
                        <div className="flex flex-wrap gap-2">
                            <div className="flex-1">
                                <Label htmlFor="type" className="mb-2">
                                    Type
                                </Label>
                                <Select
                                    value={
                                        formData.eventTypeId ||
                                        (eventTypesData &&
                                            eventTypesData.eventTypes[0].id)
                                    }
                                    onValueChange={(value) => {
                                        handleSelectChange(
                                            "eventTypeId",
                                            value
                                        );
                                    }}
                                    disabled={isEventTypesLoading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {eventTypesData &&
                                            eventTypesData.eventTypes.map(
                                                (type) => (
                                                    <SelectItem
                                                        key={type.id}
                                                        value={type.id}
                                                    >
                                                        {type.name}
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
                                                <SelectItem
                                                    key={key}
                                                    value={key}
                                                >
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
                                                    new Date().setHours(
                                                        0,
                                                        0,
                                                        0,
                                                        0
                                                    )
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
                                                            eventSessionType[
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
                                                                    eventSessionType[
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
                                                                    e.target
                                                                        .value
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
                        <Button
                            type="submit"
                            disabled={isCreateEventLoading || !isValid}
                        >
                            {isCreateEventLoading ? "creating..." : "create"}
                        </Button>
                    </div>
                </form>
            </DialogSheetWrapper>
            <AlertMessageDialog
                description="You have unsaved changes. Are you sure you want to discard them?"
                open={isAlertDialogOpen}
                setOpen={setAlertDialogOpen}
                onDiscard={handleDiscard}
            />
        </>
    );
}
