"use client";

import { useUsers } from "@/hooks/use-users";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "./ui/item";
import Image from "next/image";

export default function UserList() {
    const { isUsersLoading, users } = useUsers();

    return (
        <div className="w-full">
            <ItemGroup className="gap-2">
                {users.map((user) => {
                    const { course, level, studentId } =
                        user.studentDetails || {};
                    return (
                        <Item key={user.id} variant="outline">
                            <ItemMedia
                                variant="image"
                                className="h-12 w-12 overflow-hidden"
                            >
                                <Image
                                    src={user.faceImages.imageUrl}
                                    width={100}
                                    height={100}
                                    alt="face"
                                    className="aspect-square object-cover"
                                />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{user.name}</ItemTitle>
                                <ItemDescription>
                                    {studentId} | {course} | {level}
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    );
                })}
            </ItemGroup>
        </div>
    );
}
