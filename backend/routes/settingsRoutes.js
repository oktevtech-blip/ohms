import express from "express";

import {
  getSettings,
  updateSettings,
  updatePreferences,
  updateProfile,
  changePassword,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSettings);

router.put("/", updateSettings);

router.put("/preferences", updatePreferences);

router.put("/profile", updateProfile);

router.put("/password", changePassword);

export default router;