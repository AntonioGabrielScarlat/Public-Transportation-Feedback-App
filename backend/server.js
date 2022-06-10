const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = 8000;
const app = express();
const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () => {
  console.log(`FeedBack-App is running on http://localhost:${PORT}`);
});

app.use("/api", router);
