import db from "../config/db.js";

// GET ALL APPOINTMENTS

export const getAppointments = async (req, res) => {
  try {
    const [appointments] = await db.query(`
      SELECT
        a.appointment_id,
        a.patient_id,
        a.doctor_id,
        CONCAT(p.first_name,' ',p.last_name) AS patient_name,
        CONCAT(d.first_name,' ',d.last_name) AS doctor_name,
        a.appointment_date,
        a.appointment_time,
        a.reason,
        a.status
      FROM appointments a
      JOIN patients p
        ON a.patient_id = p.patient_id
      JOIN doctors d
        ON a.doctor_id = d.doctor_id
      ORDER BY a.appointment_date DESC
    `);

    res.json(appointments);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};

// CREATE APPOINTMENT

export const addAppointment = async (req, res) => {
  try {

    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
    } = req.body;

    await db.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason,
      ]
    );

    res.status(201).json({
      message: "Appointment created successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create appointment",
    });
  }
};

// UPDATE STATUS

export const updateAppointment = async (req, res) => {
  try {

    const { status } = req.body;

    await db.query(
      `
      UPDATE appointments
      SET status = ?
      WHERE appointment_id = ?
      `,
      [status, req.params.id]
    );

    res.json({
      message: "Appointment updated",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update appointment",
    });
  }
};

// DELETE APPOINTMENT

export const deleteAppointment = async (req, res) => {
  try {

    await db.query(
      "DELETE FROM appointments WHERE appointment_id = ?",
      [req.params.id]
    );

    res.json({
      message: "Appointment deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete appointment",
    });
  }
};