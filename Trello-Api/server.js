import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import authRouter from "./routes/auth.js";
import passport from "./lib/passport/passport.js";
import session from "cookie-session";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import userRouter from "./routes/user.js";
import searchRouter from "./routes/search.js";
import teamRouter from "./routes/team.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB"));

app.use(
  cors({
    origin: "*",
  })
);

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(limiter);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  session({
    name: "session",
    keys: [
      process.env.SESSION_KEY1,
      process.env.SESSION_KEY2,
      process.env.SESSION_KEY3,
      process.env.SESSION_KEY4,
      process.env.SESSION_KEY5,
      process.env.SESSION_KEY6,
      process.env.SESSION_KEY7,
    ],
    resave: false,
    saveUninitialized: true,
    sameSite: "lax",
    maxAge: null,
  })
);

app.use(express.json({ limit: "25mb" }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", passport.authenticate("jwt", { session: false }));
app.use("/api/search", passport.authenticate("jwt", { session: false }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/team", teamRouter);

app.listen(PORT, () => console.log("Server Started!"));
