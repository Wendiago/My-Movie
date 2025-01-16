const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const searchRouter = require("./routes/searchRoutes");
const castRouter = require("./routes/castRoutes");
const favoriteListRouter = require("./routes/favoriteListRoutes");
const recommandRouter = require("./routes/recommandRoute");
const watchListRouter = require("./routes/watchingListRoutes");
const ratingListRouter = require("./routes/ratingListRoutes");

require("./config/googleStrategy");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://final-project-smoky-theta.vercel.app",
      process.env.API_URL,
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "x-client-id"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(passport.initialize());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/cast", castRouter);
app.use("/api/v1/favorites", favoriteListRouter);
app.use("/api/v1/recommend", recommandRouter);
app.use("/api/v1/watchlist", watchListRouter);
app.use("/api/v1/ratings", ratingListRouter);

//Catch all undefined routes first
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

//Catch all errors
app.use((error, req, res, next) => {
  const statusCode = error?.status ?? 500;
  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Log the error with the formatted date
  console.error(`[${formattedDate}]`, error);

  return res.status(statusCode).json({
    status: statusCode,
    code: error?.code,
    message: error.message ?? "Internal Server Error",
    errorStack: process.env.NODE_ENV === "dev" ? error?.stack : undefined, //Dev mode only
  });
});

module.exports = app;
