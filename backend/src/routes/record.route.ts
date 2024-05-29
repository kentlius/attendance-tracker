import { Router } from "express";
import multer from "multer";
import path from "path";
import { recordController } from "../controllers/record.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });

router.get("/", recordController.getRecords);
router.get("/:id", recordController.getRecordById);
router.post("/", upload.single("image"), recordController.createRecord);
router.put("/:id", recordController.updateRecord);
router.delete("/:id", recordController.deleteRecord);

export default router;
