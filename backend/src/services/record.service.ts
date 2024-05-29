import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db.js";

export const recordService = {
  async getRecordById(id: string) {
    return await prisma.attendanceRecord.findUnique({
      where: { id: id },
    });
  },

  async getRecords() {
    return await prisma.attendanceRecord.findMany();
  },

  async createRecord(record: Prisma.AttendanceRecordCreateInput) {
    return await prisma.attendanceRecord.create({
      data: record,
    });
  },

  async updateRecord(id: string, record: Prisma.AttendanceRecordUpdateInput) {
    return await prisma.attendanceRecord.update({
      where: { id: id },
      data: record,
    });
  },

  async deleteRecord(id: string) {
    return await prisma.attendanceRecord.delete({
      where: { id: id },
    });
  },
};
