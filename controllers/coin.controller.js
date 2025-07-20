import axios from "axios";
import asyncHandler from "express-async-handler";
import CurrentData from "../models/CurrentData.js";
import HistoryData from "../models/HistoryData.js";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

/**
 * GET /api/coins
 * Now serves from MongoDB (cached) instead of hitting CoinGecko directly.
 */
export const getCoins = asyncHandler(async (req, res) => {
  const cachedData = await CurrentData.find({});
  if (!cachedData || cachedData.length === 0) {
    res.status(503).json({
      message: "No coin data available. Please wait for the next sync.",
    });
  } else {
    res.status(200).json(cachedData);
  }
});

/**
 * POST /api/history
 * Fetches from CoinGecko, saves snapshot to HistoryData
 */
export const saveHistory = asyncHandler(async (req, res) => {
  const { data } = await axios.get(COINGECKO_URL);

  const historyData = data.map((coin) => ({
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: coin.current_price,
    marketCap: coin.market_cap,
    change24h: coin.price_change_percentage_24h,
  }));

  await HistoryData.insertMany(historyData);

  res.status(200).json({ message: "✅ History saved" });
});

/**
 * GET /api/history/:coinId
 */
export const getCoinHistory = asyncHandler(async (req, res) => {
  const { coinId } = req.params;
  const data = await HistoryData.find({ coinId }).sort({ timestamp: 1 });
  res.status(200).json(data);
});
