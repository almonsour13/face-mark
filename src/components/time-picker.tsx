import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { SessionType } from "./dialog/create-event-dialog";
import { time } from "console";

interface TimePickerProps {
    sessionType?: number;
    timeType?: "start" | "end";
    startTime?: string;
    endTime?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function TimePicker({
    value,
    onChange,
    placeholder = "Pick a time",
    className,
    sessionType,
    timeType,
    startTime,
    endTime,
}: TimePickerProps) {
    const [hour, setHour] = useState<string>("12");
    const [minute, setMinute] = useState<string>("00");
    const [period, setPeriod] = useState<string>("AM");

    useEffect(() => {
        if (value) {
            const [time, meridiem] = value.split(" ");
            const [h, m] = time.split(":");
            let hourNum = parseInt(h);
            let displayHour =
                hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;

            setHour(displayHour.toString().padStart(2, "0"));
            setMinute(m);
            setPeriod(meridiem.toUpperCase());
        }
    }, [value]);

    const handleTimeChange = (
        newHour: string,
        newMinute: string,
        newPeriod: string
    ) => {
        let hour24 = parseInt(newHour);

        if (timeType === "start") {
        }

        if (newPeriod === "PM" && hour24 !== 12) {
            hour24 += 12;
        } else if (newPeriod === "AM" && hour24 === 12) {
            hour24 = 0;
        }

        const timeString = `${hour24.toString().padStart(2, "0")}:${newMinute}`;
        onChange?.(timeString);
    };
    const isHourValid = (h: string): boolean => {
        const hourNum = parseInt(h);
        // start time should be less than end time
        if (timeType === "start") {
            if (endTime) {
                const [time, meridiem] = endTime.split(" ");
                const [h, m] = time.split(":");
                const hourNumEnd = parseInt(h);
                if (hourNum >= hourNumEnd) {
                    return false;
                }
            }
        } else if (timeType === "end") {
            if (startTime) {
                const [time, meridiem] = startTime.split(" ");
                const [h, m] = time.split(":");
                const hourNumStart = parseInt(h);
                if (hourNum <= hourNumStart) {
                    return false;
                }
            }
        }
        return true;
    };
    const getAllowedPeriods = () => {
        if (sessionType === 1 && timeType === "start") {
            return ["AM"];
        }
        if (sessionType === 1 && timeType === "end") {
            return ["AM", "PM"];
        }
        if (sessionType === 2) {
            return ["PM"];
        }
        if (sessionType === 3 && timeType === "end") {
            return ["AM","PM"];
        }
        return ["PM"];
    };
    const allowedPeriods = getAllowedPeriods();

    const hours = Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, "0")
    );
    const validHours = hours.filter((h) => isHourValid(h));

    const displayTime = value ? `${hour}:${minute} ${period}` : null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <Clock/>
                    {displayTime || placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-4 pointer-events-auto"
                align="start"
            >
                <div className="flex gap-2 items-center">
                    <Select
                        value={hour}
                        onValueChange={(val) => {
                            setHour(val);
                            handleTimeChange(val, minute, period);
                        }}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="HH" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                            {validHours.map((h) => (
                                <SelectItem key={h} value={h}>
                                    {h}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <span className="text-lg font-semibold">:</span>

                    <Select
                        value={minute}
                        onValueChange={(val) => {
                            setMinute(val);
                            handleTimeChange(hour, val, period);
                        }}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                            {minutes.map((m) => (
                                <SelectItem key={m} value={m}>
                                    {m}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={period}
                        onValueChange={(val) => {
                            setPeriod(val);
                            handleTimeChange(hour, minute, val);
                        }}
                    >
                        <SelectTrigger className="w-[70px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {allowedPeriods.map((p) => (
                                <SelectItem key={p} value={p}>
                                    {p}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
