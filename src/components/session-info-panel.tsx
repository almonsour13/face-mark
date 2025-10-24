import type { EventSession } from "@/hooks/event/use-events"
import { eventSessionTypeValue } from "@/utils/event-utils"
import { Clock } from "lucide-react"

interface SessionInfoPanelProps {
  session: EventSession | null
}

export function SessionInfoPanel({ session }: SessionInfoPanelProps) {
  if (!session) return null

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-black/60 backdrop-blur-sm border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-6">Session Details</h2>

        {/* Session Type */}
        <div className="mb-6">
          <p className="text-xs text-white/50 uppercase tracking-wide mb-2">Session Type</p>
          <p className="text-lg font-semibold text-white">{eventSessionTypeValue[session.type] || "Unknown"}</p>
        </div>

        {/* Timing Information */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-white/60" />
              <p className="text-xs text-white/50 uppercase tracking-wide">Timing</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-white/40">Start Time</p>
                <p className="text-sm font-medium text-white">{session.startTime}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">End Time</p>
                <p className="text-sm font-medium text-white">{session.endTime}</p>
              </div>
            </div>
          </div>

          {/* Grace Period */}
          {session.gracePeriod && session.gracePeriod > 0 && (
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <p className="text-xs text-blue-300/70 uppercase tracking-wide mb-1">Grace Period</p>
              <p className="text-sm font-semibold text-blue-300">{session.gracePeriod} minutes</p>
            </div>
          )}
        </div>

        {/* Requirements */}
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wide mb-3">Requirements</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${session.requiresTimeOut ? "bg-green-500" : "bg-white/20"}`} />
              <span className="text-sm text-white/70">Requires Time Out</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${session.allowEarlyTimeIn ? "bg-green-500" : "bg-white/20"}`} />
              <span className="text-sm text-white/70">Allow Early Time In</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${session.allowEarlyTimeOut ? "bg-green-500" : "bg-white/20"}`} />
              <span className="text-sm text-white/70">Allow Early Time Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-white/40">
          Session ID: <span className="text-white/60">{session.id}</span>
        </p>
      </div>
    </div>
  )
}
