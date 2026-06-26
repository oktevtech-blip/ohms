import db from "../config/db.js";

// GET ALL BILLS

export const getBills = async (req, res) => {
  try {

    const [bills] = await db.query(`
      SELECT
        b.*,
        CONCAT(
          p.first_name,
          ' ',
          p.last_name
        ) AS patient_name
      FROM billing b
      JOIN patients p
      ON b.patient_id = p.patient_id
      ORDER BY b.bill_id DESC
    `);

    res.json(bills);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bills",
    });
  }
};

// CREATE BILL

export const addBill = async (req, res) => {
  try {

    const {
      patient_id,
      service_name,
      amount,
      billing_date,
    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO billing
      (
        patient_id,
        service_name,
        amount,
        billing_date
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        patient_id,
        service_name,
        amount,
        billing_date,
      ]
    );

    res.status(201).json({
      message: "Bill created",
      id: result.insertId,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create bill",
    });
  }
};

// MARK AS PAID

export const markPaid = async (req, res) => {
  try {

    await db.query(
      `
      UPDATE billing
      SET payment_status = 'Paid'
      WHERE bill_id = ?
      `,
      [req.params.id]
    );

    res.json({
      message: "Payment received",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update payment",
    });
  }
};

// DELETE BILL

export const deleteBill = async (req, res) => {
  try {

    await db.query(
      `
      DELETE FROM billing
      WHERE bill_id = ?
      `,
      [req.params.id]
    );

    res.json({
      message: "Bill deleted",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete bill",
    });
  }
};