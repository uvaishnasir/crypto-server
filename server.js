import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import coinRoutes from "./routes/coin.routes.js";
import runCronJob from "./utils/cronJob.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", coinRoutes);

// Error Middleware
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

  // Start Cron
  runCronJob();
});
