import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/db.js";

export const employeeService = {
  async getEmployeeById(id: string) {
    return await prisma.employee.findUnique({
      where: { id: id },
    });
  },

  async getEmployees() {
    return await prisma.employee.findMany();
  },

  async createEmployee(employee: Prisma.EmployeeCreateInput) {
    return await prisma.employee.create({
      data: employee,
    });
  },

  async updateEmployee(id: string, employee: Prisma.EmployeeUpdateInput) {
    return await prisma.employee.update({
      where: { id: id },
      data: employee,
    });
  },

  async deleteEmployee(id: string) {
    return await prisma.employee.delete({
      where: { id: id },
    });
  },

  async getAttendanceRecords(id: string) {
    return await prisma.attendanceRecord.findMany({
      where: { employeeId: id },
    });
  },
};
