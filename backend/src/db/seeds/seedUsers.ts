import bcrypt from "bcrypt";
import pool from "../../config/db.js";

const seedUsers = async () => {
  try {
    const passwordHash = await bcrypt.hash("Password@123", 10);

    const users = [
      {
        name: "Arun Kumar",
        email: "arun@alphaelevators.com",
        phone: "9876543210",
      },
      {
        name: "Priya Kumar",
        email: "priya@alphaelevators.com",
        phone: "9876543211",
      },
      {
        name: "Karthik Raj",
        email: "karthik@alphaelevators.com",
        phone: "9876543212",
      },
    ];

    for (const user of users) {
      await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          phone_number,
          password_hash,
          role
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO NOTHING
        `,
        [user.name, user.email, user.phone, passwordHash, "employee"],
      );
    }

    console.log("Users seeded successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Seed failed:", error.message);
    } else {
      console.error("Seed failed:", error);
    }

    throw error;
  }
};

export default seedUsers;
