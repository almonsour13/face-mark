"use client";

import { useUsers } from "@/hooks/user/use-users";
import { userUserStore } from "@/store/use-user-store";
import { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Page() {
    const { data, isPending } = useUsers();
    const { users, setUsers, isUsersLoading, setUsersLoading } = userUserStore();

    useEffect(() => {
        setUsersLoading(isPending);
        console.log(data);
        if (data?.success) {
            setUsers(data.users);
        }
    }, [data, isPending, setUsers, setUsersLoading]);

    return (
        <div className="w-full flex flex-col h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">User</h1>
                </div>
            </div>
            <div className="p-4">
                {isUsersLoading ? (
                    <div className="">loading</div>
                ) : users && users.length > 0 ? (
                    <div className="rounded border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID:</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {user.studentDetails?.studentId}
                                        </TableCell>
                                        <TableCell>
                                            <Image
                                                alt="profile"
                                                src={user.faceImages.imageUrl}
                                                width={200}
                                                height={200}
                                                className="aspect-square h-14 w-14 rounded object-cover"
                                            />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            {user.studentDetails?.course}
                                        </TableCell>
                                        <TableCell>
                                            {user.studentDetails?.level}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                user.createdAt,
                                                "MMM dd, yyyy h:mm aa"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Link
                                                        href={`/user/${user.id}`}
                                                    >
                                                        <DropdownMenuItem>
                                                            View Profile
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-white w-full h-full">
                        No Attendance
                    </div>
                )}
            </div>
        </div>
    );
}
