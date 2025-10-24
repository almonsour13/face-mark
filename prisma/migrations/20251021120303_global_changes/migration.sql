/*
  Warnings:

  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `requiresTimeOut` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `StudentDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT,
    "requiresTimeOut" INTEGER NOT NULL DEFAULT 1,
    "gracePeriod" INTEGER NOT NULL DEFAULT 40,
    "allowEarlyIn" INTEGER NOT NULL DEFAULT 1,
    "allowEarlyOut" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "eventId" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "type" INTEGER NOT NULL DEFAULT 1,
    "method" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attendance_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attendance" ("createdAt", "eventId", "id", "method", "status", "type", "userId") SELECT "createdAt", "eventId", "id", "method", "status", "type", "userId" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventTypeId" TEXT,
    "createdById" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "eventDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "createdById", "description", "eventTypeId", "id", "name", "status", "updatedAt") SELECT "createdAt", "createdById", "description", "eventTypeId", "id", "name", "status", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_studentId_key" ON "StudentDetails"("studentId");
