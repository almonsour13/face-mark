// UserCard.tsx
import { format } from "date-fns";
import { Calendar, ChevronRight, Shield, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { levelsValue, roleValue } from "@/constant";
import { Badge } from "../ui/badge";
import { UserWithDetails } from "@/store/use-user-store";
import { Card } from "../ui/card";

export default function UserCard({ user, className }: { user: UserWithDetails; className?: string }) {
    const { name, studentDetails } = user;
    const studentId = studentDetails?.studentId;
    const course = studentDetails?.course
        ? `${studentDetails.course.name} (${studentDetails.course.code})`
        : null;
    const level = studentDetails?.level ? levelsValue[studentDetails.level.name] : null;

    return (
        <Link href={`/user/${user.id}`} className="block group">
            <Card className={`hover:border-border/50 transition-all ${className}`}>
                <div className="flex gap-4">
                    {/* Profile Image */}
                    <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/30 relative">
                        {user.face?.imageUrl ? (
                            <Image
                                alt={`${user.name}'s profile`}
                                src={user.face.imageUrl}
                                width={96}
                                height={96}
                                className="aspect-square object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                                <User className="h-10 w-10 text-muted-foreground/20" />
                            </div>
                        )}
                        {user.face && (
                            <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                                <Shield className="h-3 w-3 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-1">
                                <h3 className="text-lg font-light text-foreground truncate group-hover:text-foreground/80 transition-colors">
                                    {user.name}
                                </h3>
                                <p className="text-xs font-light text-muted-foreground truncate">
                                    {user.email}
                                </p>
                            </div>
                            <Badge variant="outline" className="text-xs font-light shrink-0">
                                {roleValue[user.role] || user.role}
                            </Badge>
                        </div>

                        {/* Details */}
                        {user.studentDetails && (
                            <div className="flex flex-wrap gap-2 text-xs font-light text-muted-foreground">
                                {studentId && (
                                    <span className="px-2 py-1 rounded-md bg-muted/30">
                                        {studentId}
                                    </span>
                                )}
                                {course && (
                                    <span className="px-2 py-1 rounded-md bg-muted/30">
                                        {course}
                                    </span>
                                )}
                                {level && (
                                    <span className="px-2 py-1 rounded-md bg-muted/30">
                                        {level}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border/30">
                            <div className="flex items-center gap-1.5 text-xs font-light text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>Joined {format(user.createdAt, "MMM dd, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors">
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