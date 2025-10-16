"use client";

import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/use-events";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
export default function Page() {
    const { events, setEvents, isEventsLoading } = useEvent();
    return (
        <div className="w-full flex flex-col h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Detect</h1>
                </div>
            </div>
            <div className="p-4">
                {!isEventsLoading && events.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                        {events.map((event) => (
                            <Link key={event.id} href={`/event/${event.id}`}>
                                <Item key={event.id} variant="outline" className="hover:bg-muted">
                                    <ItemHeader>
                                        <div className="flex gap-2">
                                            <ItemTitle>{event.name}</ItemTitle>
                                            <Badge className="ml-auto">
                                                {event.eventType.name}
                                            </Badge>
                                        </div>
                                        <ItemActions>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontal />
                                            </Button>
                                        </ItemActions>
                                    </ItemHeader>
                                    <ItemContent>
                                        <ItemDescription>
                                            {event.description}.
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemFooter className="text-xs text-muted-foreground">
                                        <div className="flex gap-2">
                                            <span>
                                                {format(
                                                    event.startTime,
                                                    "MMM dd, yyyy"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="">
                                                {format(
                                                    event.startTime,
                                                    "h:mm aa"
                                                )}
                                            </span>
                                            -
                                            <span>
                                                {format(
                                                    event.endTime,
                                                    "h:mm aa"
                                                )}
                                            </span>
                                        </div>
                                    </ItemFooter>
                                </Item>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
