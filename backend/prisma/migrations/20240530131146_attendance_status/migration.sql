/*
  Warnings:

  - Added the required column `status` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('EARLY', 'ON_TIME', 'LATE', 'ABSENT');

-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "status" "AttendanceStatus" NOT NULL;
