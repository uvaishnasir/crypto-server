import cron from "node-cron";
import axios from "axios";
import HistoryData from "../models/HistoryData.js";
import CurrentData from "../models/CurrentData.js";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

const runCronJob = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("⏰ Cron Job: Fetching data from CoinGecko...");

      const { data } = await axios.get(COINGECKO_URL);

      const formattedData = data.map((coin) => ({
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        lastUpdated: coin.last_updated,
      }));

      // 👉 Overwrite CurrentData collection
      await CurrentData.deleteMany({});
      await CurrentData.insertMany(formattedData);
      console.log("🔁 CurrentData updated");

      // 👉 Append to HistoryData collection
      const historyRecords = formattedData.map(({ lastUpdated, ...rest }) => ({
        ...rest,
        timestamp: new Date(), // custom timestamp
      }));

      await HistoryData.insertMany(historyRecords);
      console.log("📈 HistoryData appended");

      console.log("✅ Cron job completed successfully");
    } catch (err) {
      console.error("❌ Cron job failed:", err.message);
    }
  });
};

export default runCronJob;
