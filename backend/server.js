const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: process.env.FRONTNED_URL,
    credentials: true,
  })
);


app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server running on port ${PORT}`);
});