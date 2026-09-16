import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

interface JwtPayload {
  id: number;
  phoneNumber: string;
  role: string;
}

interface User {
  id: number;
  name: string;
  phone_number: string;
  password_hash: string;
  role: string;
}

// Login
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { phoneNumber, password } = req.body as {
      phoneNumber?: string;
      password?: string;
    };

    if (!phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone number and password are required",
      });
    }

    const result = await pool.query<User>(
      `
      SELECT id, name, phone_number, password_hash, role
      FROM users
      WHERE phone_number = $1
      `,
      [phoneNumber],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        phoneNumber: user.phone_number,
        role: user.role,
      } satisfies JwtPayload,
      JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phone_number,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout
export const logout = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get current user
export const getMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const result = await pool.query<Omit<User, "password_hash">>(
      `
      SELECT id, name, phone_number, role
      FROM users
      WHERE id = $1
      `,
      [decoded.id],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phone_number,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
    });
  }
};
