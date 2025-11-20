import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { levelsValue } from "@/constant";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LevelDialog from "../dialog/add-level-dialog";
import CourseDialog from "../dialog/course-dialog";
import { Button } from "../ui/button";
import SheetWrapper from "./sheet-wrapper";
import { Card } from "../ui/card";

interface CourseSheetProps {
    children?: React.ReactNode;
    levelStats?: {
        levelId: string;
        name: string;
        totalStudents: number;
    }[];
    refetch?: () => void;
}
export default function LevelSheet({
    children,
    levelStats,
    refetch,
}: CourseSheetProps) {
    const [open, setOpen] = useState(false);
    const totalStudents =
        levelStats?.reduce((total, item) => total + item.totalStudents, 0) || 0;

    return (
        <SheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={children ? children : <Button>Expand Course</Button>}
        >
            <div className="flex p-4 sticky top-0 bg-background">
                <h2 className="text-xl font-light">Level Stats</h2>
            </div>
            <div className="grid gap-2 p-4">
                <div className="grid gap-2 max-h-96 md:h-96">
                    {levelStats &&
                        levelStats.map((item, index) => {
                            const percentage = (
                                (item.totalStudents / totalStudents) *
                                100
                            ).toFixed(1);

                            return (
                                <Card key={index} className="flex-row  items-center h-auto ">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between text-sm font-light">
                                            <span className="text-muted-foreground">
                                                {levelsValue[item.name]}
                                            </span>
                                            <span className="text-foreground">
                                                {item.totalStudents} (
                                                {percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-500"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                            >
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {/* view student */}
                                            <Link
                                                href={`/user?course=${item.name}`}
                                            >
                                                <DropdownMenuItem>
                                                    View Students
                                                </DropdownMenuItem>
                                            </Link>
                                            <LevelDialog
                                                type="edit"
                                                initialData={{
                                                    id: item.levelId,
                                                    name: item.name,
                                                }}
                                            >
                                                <DropdownMenuItem
                                                    onSelect={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                            </LevelDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Card>
                            );
                        })}
                </div>
            </div>
            <div className="bg-background p-4 sticky bottom-0">
                <LevelDialog refetch={refetch}>
                    <Button className="w-full border-t">Add New Level</Button>
                </LevelDialog>
            </div>
        </SheetWrapper>
    );
}
