/*
  Warnings:

  - You are about to drop the column `course` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `StudentDetails` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StudentDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentDetails_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StudentDetails_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StudentDetails" ("createdAt", "id", "studentId", "updatedAt", "userId") SELECT "createdAt", "id", "studentId", "updatedAt", "userId" FROM "StudentDetails";
DROP TABLE "StudentDetails";
ALTER TABLE "new_StudentDetails" RENAME TO "StudentDetails";
CREATE UNIQUE INDEX "StudentDetails_studentId_key" ON "StudentDetails"("studentId");
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "StudentDetails"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");
