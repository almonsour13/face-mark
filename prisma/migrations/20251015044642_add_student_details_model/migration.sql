/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `FaceImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "StudentDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FaceImage_userId_key" ON "FaceImage"("userId");
