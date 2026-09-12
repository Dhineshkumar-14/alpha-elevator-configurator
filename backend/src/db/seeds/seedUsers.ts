import bcrypt from "bcrypt";
import pool from "../../config/db.js";

const seedUsers = async () => {
  try {
    const passwordHash = await bcrypt.hash("Password@123", 10);

    const users = [
      {
        name: "Arun Kumar",
        email: "arun@alphaelevators.com",
      },
      {
        name: "Priya Kumar",
        email: "priya@alphaelevators.com",
      },
      {
        name: "Karthik Raj",
        email: "karthik@alphaelevators.com",
      },
    ];

    for (const user of users) {
      await pool.query(
        `
        INSERT INTO users (
          name,
          email,
          password_hash,
          role
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        `,
        [user.name, user.email, passwordHash, "employee"],
      );
    }

    console.log("Users seeded successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Seed failed:", error.message);
    } else {
      console.error("Seed failed:", error);
    }

    throw error; // important if startup should stop when seed fails
  }
};

export default seedUsers;
