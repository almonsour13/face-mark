"use client"

import type { EventSession } from "@/hooks/event/use-events"
import { eventSessionTypeValue } from "@/utils/event-utils"
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SessionDetailsPanelProps {
  session: EventSession | null
  isLoading: boolean
}

export default function SessionDetailsPanel({ session, isLoading }: SessionDetailsPanelProps) {
  if (isLoading || !session) {
    return null
  }

  const formatTime = (time: string) => {
    try {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } catch {
      return time
    }
  }

  return (
    <div className="absolute bottom-0 right-0 p-4 lg:p-6 bg-background/95 backdrop-blur-sm border-l border-t border-border rounded-tl-lg max-w-sm">
      <div className="space-y-4">
        {/* Session Type Header */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Session Type</h3>
          <Badge variant="secondary" className="text-xs">
            {eventSessionTypeValue[session.type] || "Unknown"}
          </Badge>
        </div>

        {/* Time Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Timing</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Start Time</p>
                <p className="text-sm font-medium">{formatTime(session.startTime)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">End Time</p>
                <p className="text-sm font-medium">{formatTime(session.endTime)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grace Period */}
        {session.gracePeriod && session.gracePeriod > 0 && (
          <div className="flex items-center gap-3 p-2 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-blue-600 dark:text-blue-400">Grace Period</p>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{session.gracePeriod} minutes</p>
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Requirements</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              {session.requiresTimeOut ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-muted-foreground flex-shrink-0" />
              )}
              <span className="text-muted-foreground">Requires Time Out</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {session.allowEarlyTimeIn ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-muted-foreground flex-shrink-0" />
              )}
              <span className="text-muted-foreground">Allow Early Time In</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {session.allowEarlyTimeOut ? (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-muted-foreground flex-shrink-0" />
              )}
              <span className="text-muted-foreground">Allow Early Time Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
