/*
  Warnings:

  - You are about to drop the column `paymentType` on the `Athlete` table. All the data in the column will be lost.
  - Added the required column `membershipType` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" DROP COLUMN "paymentType",
ADD COLUMN     "membershipType" TEXT NOT NULL;
