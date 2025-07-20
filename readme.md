# 🛠️ Crypto Tracker API — Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Crypto Tracker app, built with **Express.js**, **MongoDB Atlas**, and the **CoinGecko API**.

🔗 **Live API**: [https://crypto-tracker-server-3omc.onrender.com/api](https://crypto-tracker-server-3omc.onrender.com/api)

---

## 🔧 API Endpoints

| Method | Endpoint                 | Description                      |
|--------|--------------------------|----------------------------------|
| `GET`  | `/api/coins`             | Get top 10 coins from DB         |
| `POST` | `/api/history`           | Save CoinGecko snapshot to DB    |
| `GET`  | `/api/history/:coinId`   | Get historical data for a coin   |

> 📡 Data Source: [CoinGecko API Docs](https://www.coingecko.com/en/api/documentation)

---

## ⏱️ Cron Job

- Runs every **1 hour** using `node-cron`
- Fetches top 10 coins from CoinGecko
- 🔁 Overwrites `CurrentData` collection
- 📊 Appends to `HistoryData` for charting

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas** with **Mongoose**
- **Axios**
- **node-cron**
- **dotenv**
- **cors**
- **express-async-handler**

---

## 🌍 Environment Variables

Create a `.env` file in `/server`:

```env
PORT=8000
MONGO_URI=mongodb+srv://<your-mongo-uri>

📁 Folder Structure


/server
├── controllers/
├── models/
├── routes/
├── utils/
├── config/
├── middlewares/
├── .env
└── server.js


🚀 Run Locally

git clone https://github.com/your-name/crypto-tracker-backend.git
cd server
npm install
npm start


🤝 Author
Made with ❤️ by UVAISH NASIR

Frontend Live: https://crypto-tracker-dun-gamma.vercel.app