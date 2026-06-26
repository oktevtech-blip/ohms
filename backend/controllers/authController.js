import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role_id,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `
      INSERT INTO users
      (
        role_id,
        first_name,
        last_name,
        email,
        password
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        role_id,
        first_name,
        last_name,
        email,
        hashedPassword,
      ]
    );

    res.status(201).json({
      message: "User registered",
      userId: result.insertId,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      `
      SELECT
        u.user_id,
        u.role_id,
        u.first_name,
        u.last_name,
        u.email,
        u.password,
        r.role_name
      FROM users u
      INNER JOIN roles r
      ON u.role_id = r.role_id
      WHERE u.email = ?
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        role_id: user.role_id,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role_id,
        role: user.role_name,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};