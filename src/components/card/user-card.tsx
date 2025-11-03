import { User } from "@/hooks/query/user/use-users";
import { format } from "date-fns";
import {
    Calendar,
    ChevronRight,
    Filter,
    ListFilter,
    Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { levelsValue, roleValue } from "@/constant";
import { Badge } from "../ui/badge";

export default function UserCard({ user }: { user: User }) {
    return (
        <Link href={`/user/${user.id}`} className="block group">
            <div className="p-4 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card">
                <div className="flex gap-6">
                    {/* Profile Image */}
                    <div className="h-28 w-28 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/30 relative">
                        <Image
                            alt={`${user.name}'s profile`}
                            src={user.face?.imageUrl || "/placeholder.svg"}
                            width={96}
                            height={96}
                            className="aspect-square object-cover w-full h-full"
                        />
                        {user.face && (
                            <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500/90 flex items-center justify-center">
                                <Shield className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="text-lg font-light text-foreground truncate group-hover:text-foreground transition-colors">
                                    {user.name}
                                </h3>
                                {user.studentDetails?.studentId && (
                                    <p className="text-xs font-light text-muted-foreground">
                                        {user.studentDetails.studentId}
                                    </p>
                                )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {roleValue[user.role] || user.role}
                            </Badge>
                            <span className="px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide shrink-0">
                                {roleValue[user.role] || user.role}
                            </span>
                        </div>

                        {/* Details */}
                        {user.studentDetails && (
                            <div className="space-y-1">
                                <p className="text-sm font-light text-foreground">
                                    {user.studentDetails.course.name}
                                </p>
                                <p className="text-xs font-light text-muted-foreground">
                                    {levelsValue[
                                        user.studentDetails.level.name
                                    ] || user.studentDetails.level.name}
                                </p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/20 mt-auto">
                            <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>
                                    Joined{" "}
                                    {format(user.createdAt, "MMM dd, yyyy")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors">
                                <span>View profile</span>
                                <ChevronRight className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
