import db from "../config/db.js";
import bcrypt from "bcrypt";

// Get Settings
export const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM settings LIMIT 1"
    );

    res.json(rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch settings",
    });

  }
};

// Update Hospital Information
export const updateSettings = async (req, res) => {
  try {

    const {
      hospital_name,
      registration_number,
      hospital_email,
      hospital_phone,
      hospital_address,
      website,
    } = req.body;

    await db.query(
      `
      UPDATE settings
      SET
        hospital_name=?,
        registration_number=?,
        hospital_email=?,
        hospital_phone=?,
        hospital_address=?,
        website=?
      WHERE setting_id=1
      `,
      [
        hospital_name,
        registration_number,
        hospital_email,
        hospital_phone,
        hospital_address,
        website,
      ]
    );

    res.json({
      message: "Hospital information updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update settings",
    });

  }
};

// Update Preferences
export const updatePreferences = async (req, res) => {

  try {

    const {
      currency,
      timezone,
      language,
      email_notifications,
      sms_notifications,
      appointment_reminders,
      billing_reminders,
    } = req.body;

    await db.query(
      `
      UPDATE settings
      SET
      currency=?,
      timezone=?,
      language=?,
      email_notifications=?,
      sms_notifications=?,
      appointment_reminders=?,
      billing_reminders=?
      WHERE setting_id=1
      `,
      [
        currency,
        timezone,
        language,
        email_notifications,
        sms_notifications,
        appointment_reminders,
        billing_reminders,
      ]
    );

    res.json({
      message: "Preferences updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update preferences",
    });

  }

};

// Update Administrator Profile
export const updateProfile = async (req, res) => {

  try {

    const {
      first_name,
      last_name,
      email,
      phone,
    } = req.body;

    // Assuming Admin user has user_id = 1
    await db.query(
      `
      UPDATE users
      SET
      first_name=?,
      last_name=?,
      email=?,
      phone=?
      WHERE user_id=1
      `,
      [
        first_name,
        last_name,
        email,
        phone,
      ]
    );

    res.json({
      message: "Profile updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });

  }

};

// Change Password
export const changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE user_id=1"
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.query(
      "UPDATE users SET password=? WHERE user_id=1",
      [hashedPassword]
    );

    res.json({
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to change password",
    });

  }

};