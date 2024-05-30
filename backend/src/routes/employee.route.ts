import { Router } from "express";
import { employeeController } from "../controllers/employee.controller.js";

const router = Router();

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

router.get("/:id/records", employeeController.getAttendanceRecords);

export default router;
