import type { Request, Response } from "express";
import { recordService } from "../services/record.service.js";
import { AttendanceStatus } from "@prisma/client";

export const recordController = {
  async getRecordById(req: Request, res: Response) {
    const { id } = req.params;
    const record = await recordService.getRecordById(id);
    res.json(record);
  },

  async getRecords(req: Request, res: Response) {
    const records = await recordService.getRecords();
    res.json(records);
  },

  async createRecord(req: Request, res: Response) {
    const { employeeId } = req.body;

    // const existingRecord = await recordService.checkTodayAttendance(employeeId);
    // if (existingRecord) {
    //   return res.status(400).send("Attendance already recorded for today.");
    // }

    // const scheduledStartTime = new Date("2024-05-01T09:00:00Z");
    // const attendanceTime = new Date();

    // const diff = attendanceTime - scheduledStartTime;

    // const earlyThreshold = -15 * 60 * 1000; // 15 minutes early
    // const onTimeThreshold = 5 * 60 * 1000; // 5 minutes late

    // let status;
    // if (diff < earlyThreshold) {
    //   status = "EARLY";
    // } else if (diff <= onTimeThreshold) {
    //   status = "ON_TIME";
    // } else {
    //   status = "LATE";
    // }

    const image = req.file;
    const record = {
      imageUrl: image!.path,
      employee: {
        connect: { id: employeeId },
      },
      // loggedAt: attendanceTime,
      status: AttendanceStatus.ON_TIME,
    };

    const newRecord = await recordService.createRecord(record);
    res.json(newRecord);
  },

  async updateRecord(req: Request, res: Response) {
    const { id } = req.params;
    const record = req.body;
    const updatedRecord = await recordService.updateRecord(id, record);
    res.json(updatedRecord);
  },

  async deleteRecord(req: Request, res: Response) {
    const { id } = req.params;
    const deletedRecord = await recordService.deleteRecord(id);
    res.json(deletedRecord);
  },
};
