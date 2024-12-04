const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
require("./config/googleStrategy");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://final-project-smoky-theta.vercel.app",
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://final-project-smoky-theta.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

app.use((req, res, next) => {
  const originalCookie = res.cookie.bind(res);
  res.cookie = (name, value, options = {}) => {
    const defaultOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "None",
    };
    const finalOptions = { ...defaultOptions, ...options };
    originalCookie(name, value, finalOptions);
  };
  next();
});

app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(passport.initialize());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
