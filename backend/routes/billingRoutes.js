import express from "express";

import {
  getBills,
  addBill,
  markPaid,
  deleteBill,
} from "../controllers/billingController.js";

const router = express.Router();

router.get("/", getBills);

router.post("/", addBill);

router.put("/:id/pay", markPaid);

router.delete("/:id", deleteBill);

export default router;