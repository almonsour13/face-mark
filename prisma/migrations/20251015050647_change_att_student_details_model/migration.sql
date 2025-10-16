/*
  Warnings:

  - Added the required column `studentId` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StudentDetails" ("course", "createdAt", "id", "level", "updatedAt", "userId") SELECT "course", "createdAt", "id", "level", "updatedAt", "userId" FROM "StudentDetails";
DROP TABLE "StudentDetails";
ALTER TABLE "new_StudentDetails" RENAME TO "StudentDetails";
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "StudentDetails"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
