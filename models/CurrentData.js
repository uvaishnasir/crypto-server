import mongoose from "mongoose";

const currentDataSchema = new mongoose.Schema({
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date,
});

const CurrentData = mongoose.model("CurrentData", currentDataSchema);
export default CurrentData;
