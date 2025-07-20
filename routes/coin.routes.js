import express from "express";
import {
  getCoins,
  saveHistory,
  getCoinHistory,
} from "../controllers/coin.controller.js";

const router = express.Router();

router.get("/coins", getCoins);
router.post("/history", saveHistory);
router.get("/history/:coinId", getCoinHistory);

export default router;
