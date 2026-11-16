/*
  Warnings:

  - You are about to drop the column `url` on the `ProfileLink` table. All the data in the column will be lost.
  - Added the required column `value` to the `ProfileLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileLink" RENAME COLUMN "url" TO "value";
