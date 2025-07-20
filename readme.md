
```md
# 🛠️ Crypto Tracker API — Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Crypto Tracker app, built with **Express.js**, **MongoDB Atlas**, and **CoinGecko API**.

🔗 **Live API URL**: [https://crypto-tracker-server-3omc.onrender.com/api](https://crypto-tracker-server-3omc.onrender.com/api)

---

## 🔧 API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/api/coins`              | Get top 10 coins from DB           |
| POST   | `/api/history`            | Save CoinGecko snapshot to DB      |
| GET    | `/api/history/:coinId`    | Get historical data (for charts)   |

> Data source: [CoinGecko API](https://www.coingecko.com/en/api/documentation)

---

## 🧠 Cron Job

- Runs every hour using `node-cron`
- Fetches CoinGecko data
- Overwrites `CurrentData` collection
- Appends to `HistoryData` collection

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Axios
- node-cron
- express-async-handler
- dotenv + cors

---

## 🌍 Environment Variables

Create a `.env` file in `/server`:

```env
PORT=8000
MONGO_URI=mongodb+srv://<your-mongo-uri>
