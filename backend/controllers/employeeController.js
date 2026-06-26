import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// =============================
// Get Employees
// =============================
export const getEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query(`
      SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.created_at,
        r.role_id,
        r.role_name
      FROM users u
      INNER JOIN roles r
        ON u.role_id = r.role_id
      WHERE u.role_id IN (3,4)
      ORDER BY u.user_id DESC
    `);

    res.json(employees);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

// =============================
// Add Employee
// =============================
export const addEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      role_id,
    } = req.body;

    const password =
      `${first_name}@123`;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const [result] = await pool.query(
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
      VALUES
      (?, ?, ?, ?, ?, ?)
      `,
      [
        role_id,
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
      ]
    );

    res.status(201).json({
      message: "Employee added successfully",
      password,
      user_id: result.insertId,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add employee",
    });
  }
};

// =============================
// Update Employee
// =============================
export const updateEmployee = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      first_name,
      last_name,
      email,
      phone,
      role_id,
    } = req.body;

    await pool.query(
      `
      UPDATE users
      SET
        first_name=?,
        last_name=?,
        email=?,
        phone=?,
        role_id=?
      WHERE user_id=?
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        role_id,
        id,
      ]
    );

    res.json({
      message: "Employee updated successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update employee",
    });
  }
};

// =============================
// Delete Employee
// =============================
export const deleteEmployee = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE user_id=?",
      [id]
    );

    res.json({
      message: "Employee deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to delete employee",
    });

  }

};