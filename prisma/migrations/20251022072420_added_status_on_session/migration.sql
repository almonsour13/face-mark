-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "requiresTimeOut" INTEGER NOT NULL DEFAULT 1,
    "gracePeriod" INTEGER NOT NULL DEFAULT 40,
    "allowEarlyIn" INTEGER NOT NULL DEFAULT 1,
    "allowEarlyOut" INTEGER NOT NULL DEFAULT 1,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("allowEarlyIn", "allowEarlyOut", "createdAt", "endTime", "eventId", "gracePeriod", "id", "requiresTimeOut", "startTime", "type") SELECT "allowEarlyIn", "allowEarlyOut", "createdAt", "endTime", "eventId", "gracePeriod", "id", "requiresTimeOut", "startTime", "type" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
