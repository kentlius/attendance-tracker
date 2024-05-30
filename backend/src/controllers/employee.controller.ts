import type { Request, Response } from "express";
import { employeeService } from "../services/employee.service.js";

export const employeeController = {
  async getEmployeeById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const employee = await employeeService.getEmployeeById(id);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Error getting employee" });
    }
  },

  async getEmployees(req: Request, res: Response) {
    try {
      const employees = await employeeService.getEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Error getting employees" });
    }
  },

  async createEmployee(req: Request, res: Response) {
    const employee = req.body;
    try {
      const newEmployee = await employeeService.createEmployee(employee);
      res.json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: "Error creating employee" });
    }
  },

  async updateEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const employee = req.body;
    try {
      const updatedEmployee = await employeeService.updateEmployee(
        id,
        employee
      );
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: "Error updating employee" });
    }
  },

  async deleteEmployee(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await employeeService.deleteEmployee(id);
      res.json({ message: "Employee deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting employee" });
    }
  },

  async getAttendanceRecords(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const attendanceRecords = await employeeService.getAttendanceRecords(id);
      res.json(attendanceRecords);
    } catch (error) {
      res.status(500).json({ error: "Error getting attendance records" });
    }
  },
};
