import db from "../config/db.js";
import bcrypt from "bcryptjs";

export const getDoctors = async (req, res) => {
  try {
    const [doctors] = await db.query(`
      SELECT *
      FROM doctors
      ORDER BY doctor_id DESC
    `);

    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      specialization,
      department,
      status,
    } = req.body;

    const defaultPassword = await bcrypt.hash("doctor123", 10);

    // Create user account first
    const [userResult] = await db.query(
      `
      INSERT INTO users
      (
        role_id,
        first_name,
        last_name,
        email,
        password,
        phone
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        2, // Doctor Role
        first_name,
        last_name,
        email,
        defaultPassword,
        phone,
      ]
    );

    const userId = userResult.insertId;

    // Create doctor profile
    const [doctorResult] = await db.query(
      `
      INSERT INTO doctors
      (
        first_name,
        last_name,
        email,
        phone,
        user_id,
        specialization,
        department,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        userId,
        specialization,
        department,
        status || "Available",
      ]
    );

    res.status(201).json({
      message: "Doctor created successfully",
      doctorId: doctorResult.insertId,
      loginEmail: email,
      temporaryPassword: "doctor123",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create doctor",
    });
  }
};