// import pool from "../config/db.js";

// // GET ALL PATIENTS
// export const getPatients = async (req, res) => {
//   try {
//     const [patients] = await pool.query(
//       "SELECT * FROM patients ORDER BY patient_id DESC"
//     );

//     res.json(patients);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Error fetching patients",
//     });
//   }
// };

// // ADD PATIENT
// export const addPatient = async (req, res) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone,
//       gender,
//     } = req.body;

//     const [result] = await pool.query(
//       `
//       INSERT INTO patients
//       (
//         first_name,
//         last_name,
//         email,
//         phone,
//         gender
//       )
//       VALUES (?, ?, ?, ?, ?)
//       `,
//       [
//         first_name,
//         last_name,
//         email,
//         phone,
//         gender,
//       ]
//     );

//     res.status(201).json({
//       message: "Patient added successfully",
//       patient_id: result.insertId,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Error adding patient",
//     });
//   }
// };

// // DELETE PATIENT
// export const deletePatient = async (req, res) => {
//   try {
//     await pool.query(
//       "DELETE FROM patients WHERE patient_id = ?",
//       [req.params.id]
//     );

//     res.json({
//       message: "Patient deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Error deleting patient",
//     });
//   }
// };

// // GET TOTAL PATIENT COUNT
// export const getPatientCount = async (req, res) => {
//   try {
//     const [result] = await pool.query(
//       `
//       SELECT COUNT(*) AS total
//       FROM patients
//       `
//     );

//     res.json(result[0]);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Error fetching patient count",
//     });
//   }
// };

import pool from "../config/db.js";

// GET ALL PATIENTS
export const getPatients = async (req, res) => {
  try {
    const [patients] = await pool.query(
      "SELECT * FROM patients ORDER BY patient_id DESC"
    );

    res.json(patients);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching patients",
    });
  }
};

// ADD PATIENT
export const addPatient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
    } = req.body;

    const [result] = await pool.query(
      `
      INSERT INTO patients
      (
        first_name,
        last_name,
        email,
        phone,
        gender
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        gender,
      ]
    );

    res.status(201).json({
      message: "Patient added successfully",
      patient_id: result.insertId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error adding patient",
    });
  }
};

// UPDATE PATIENT
export const updatePatient = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      gender,
    } = req.body;

    await pool.query(
      `
      UPDATE patients
      SET
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        gender = ?
      WHERE patient_id = ?
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        gender,
        req.params.id,
      ]
    );

    res.json({
      message: "Patient updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating patient",
    });
  }
};

// DELETE PATIENT
export const deletePatient = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM patients WHERE patient_id = ?",
      [req.params.id]
    );

    res.json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting patient",
    });
  }
};

// GET TOTAL PATIENT COUNT
export const getPatientCount = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT COUNT(*) AS total FROM patients"
    );

    res.json(result[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching patient count",
    });
  }
};