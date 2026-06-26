import express from "express";

import {
  getRecords,
  addRecord,
  deleteRecord,
} from "../controllers/medicalRecordController.js";

const router = express.Router();

router.get("/", getRecords);

router.post("/", addRecord);

router.delete("/:id", deleteRecord);

export default router;