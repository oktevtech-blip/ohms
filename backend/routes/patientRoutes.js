// import express from "express";

// import {
//   getPatients,
//   addPatient,
//   deletePatient,
//   getPatientCount,
// } from "../controllers/patientController.js";

// const router = express.Router();

// // GET PATIENT COUNT
// router.get("/count", getPatientCount);

// // GET ALL PATIENTS
// router.get("/", getPatients);

// // ADD PATIENT
// router.post("/", addPatient);

// // DELETE PATIENT
// router.delete("/:id", deletePatient);

// export default router;

import express from "express";

import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientCount,
} from "../controllers/patientController.js";

const router = express.Router();

// Dashboard Statistics
router.get("/count", getPatientCount);

// CRUD Operations
router.get("/", getPatients);

router.post("/", addPatient);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;