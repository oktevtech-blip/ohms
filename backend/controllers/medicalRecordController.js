import db from "../config/db.js";

// GET ALL RECORDS

export const getRecords = async (req, res) => {
  try {
    const [records] = await db.query(`
      SELECT
        mr.*,

        CONCAT(
          p.first_name,
          ' ',
          p.last_name
        ) AS patient_name,

        CONCAT(
          d.first_name,
          ' ',
          d.last_name
        ) AS doctor_name

      FROM medical_records mr

      JOIN patients p
      ON mr.patient_id = p.patient_id

      JOIN doctors d
      ON mr.doctor_id = d.doctor_id

      ORDER BY mr.record_id DESC
    `);

    res.json(records);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch records",
    });
  }
};

// CREATE RECORD

export const addRecord = async (req, res) => {
  try {

    const {
      patient_id,
      doctor_id,
      diagnosis,
      treatment,
      prescription,
      notes,
      visit_date,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO medical_records
      (
        patient_id,
        doctor_id,
        diagnosis,
        treatment,
        prescription,
        notes,
        visit_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        patient_id,
        doctor_id,
        diagnosis,
        treatment,
        prescription,
        notes,
        visit_date,
      ]
    );

    res.status(201).json({
      message: "Medical record created",
      id: result.insertId,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create record",
    });
  }
};

// DELETE RECORD

export const deleteRecord = async (req, res) => {
  try {

    await db.query(
      `
      DELETE FROM medical_records
      WHERE record_id = ?
      `,
      [req.params.id]
    );

    res.json({
      message: "Record deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete record",
    });
  }
};