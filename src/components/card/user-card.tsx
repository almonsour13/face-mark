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
import { UserWithDetails } from "@/store/use-user-store";
import { Card } from "../ui/card";

export default function UserCard({ user, className }: { user: UserWithDetails, className?:string }) {
    const { name, studentDetails } = user;

    const studentId = studentDetails?.studentId;
    const course =
        studentDetails?.course.name + ` (${studentDetails?.course.code})`;
    const level = studentDetails && levelsValue[studentDetails?.level.name];
    return (
        <Link href={`/user/${user.id}`} className="block group">
            <Card className={`${className}`}>
                <div className="flex gap-4">
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
                                <h3 className="text-xl font-light text-foreground truncate group-hover:text-foreground transition-colors">
                                    {user.name}
                                </h3>
                                {user.studentDetails?.studentId && (
                                    <p className="text-xs font-light text-muted-foreground">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {roleValue[user.role] || user.role}
                            </Badge>
                        </div>

                        {/* Details */}
                        {user.studentDetails && (
                            <div className="">
                                <p className="text-xs font-light text-muted-foreground">
                                    {[studentDetails.studentId, course, level]
                                        .filter(Boolean)
                                        .join(" | ")}
                                </p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
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
            </Card>
        </Link>
    );
}
