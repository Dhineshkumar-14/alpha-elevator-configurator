import "dotenv/config";

import app from "./src/app.js";
import pool from "./src/config/db.js";
import migrate from "./src/db/migrate.js";
import seedUsers from "./src/db/seeds/seedUsers.js";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Check database
    await pool.query("SELECT 1");

    // 2. Create/update tables
    await migrate();

    // 3. Insert initial data
    await seedUsers();

    // 4. Start API server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
