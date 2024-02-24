const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const dbConnection = require("./database/connection");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const cronjob = require("./cronjobs");

dotEnv.config();
// Connect to the database
dbConnection();

// Create a app
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
  },
});
global.io = io; //added

// router middleware
app.use(cors());
app.use(bodyParser.json());

io.on("connection", (socket) => {
  // console.log("A user connected");
  // Handle socket events here
  socket.on("disconnect", () => {
    // console.log("User disconnected");
  });
});

// Contents
app.use("/api/v1/privacyPolicy", require("./routes/privacyPolicyRouter"));
app.use("/api/v1/termsConditions", require("./routes/termsConditionsRouter"));
app.use("/api/v1/contactUs", require("./routes/contactUsRouter"));
app.use("/api/v1/aboutUs", require("./routes/aboutUsRouter"));
app.use("/api/v1/settings", require("./routes/settingRouter"));

app.use("/api/v1/newsletters", require("./routes/newsletterRouter"));
app.use("/api/v1/testimonials", require("./routes/testimonialRouter"));
app.use("/api/v1/mainMenus", require("./routes/mainMenuRouter"));
app.use("/api/v1/inquires", require("./routes/inquiryRouter"));

app.use("/api/v1/customers", require("./routes/customerRouter"));

app.use("/api/v1/wallets", require("./routes/walletRouter"));

app.use(
  "/api/v1/walletTransactions",
  require("./routes/walletTransactionHistoryRouter")
);

app.use("/api/v1/coupons", require("./routes/couponRouter"));
app.use("/api/v1/coinGames", require("./routes/coinGameRouter"));
app.use("/api/v1/coinGameBettings", require("./routes/coinGameBettingRouter"));

// Admin Routes
app.use(require("./routes/adminMasterRouter"));

// Cron Job
cronjob.createCoinGame();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start listening the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
