import { EventWithSessions } from "@/store/use-event-store";
import { useEffect, useState } from "react";

export default function useResponsiveEventGrid(events: EventWithSessions[]) {
    const [columns, setColumns] = useState<Record<string, EventWithSessions[]>>(
        {
            column1: [],
            column2: [],
            column3: [],
        }
    );

    useEffect(() => {
        const updateColumns = () => {
            let numCols = 3; // default for large screens

            if (window.innerWidth < 640) numCols = 1; // mobile (sm)
            else if (window.innerWidth < 1024) numCols = 2; // tablet (md)
            else numCols = 3; // large screens

            const cols: Record<string, EventWithSessions[]> = {
                column1: [],
                column2: numCols > 1 ? [] : [],
                column3: numCols > 2 ? [] : [],
            };

            events.forEach((event, index) => {
                const colIndex = index % numCols;
                if (colIndex === 0) cols.column1.push(event);
                else if (colIndex === 1 && numCols > 1)
                    cols.column2.push(event);
                else if (colIndex === 2 && numCols > 2)
                    cols.column3.push(event);
            });

            setColumns(cols);
        };

        updateColumns(); // initial run
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, [events]);

    return columns;
}
