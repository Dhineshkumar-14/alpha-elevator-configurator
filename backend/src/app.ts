import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Alpha Elevators API is running",
  });
});

export default app;