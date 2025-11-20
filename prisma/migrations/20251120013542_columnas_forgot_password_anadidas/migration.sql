-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPasswordExpire" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordToken" TEXT;
