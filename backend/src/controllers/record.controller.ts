import type { Request, Response } from "express";
import { recordService } from "../services/record.service.js";

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
    const image = req.file;
    const employeeId: string = req.body.employeeId;

    const record = {
      imageUrl: image!.path,
      employee: {
        connect: { id: employeeId },
      },
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
