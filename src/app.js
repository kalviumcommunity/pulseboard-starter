import express from "express";
// TASK 5: you will import and wire express-session + connect-redis here.
// import session from "express-session";
// import { RedisStore } from "connect-redis";
// import { redis } from "./redis/client.js";
import { postsRouter } from "./routes/posts.js";
import { authRouter } from "./routes/auth.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  // TASK 5: configure sessions stored in Redis with sliding expiry.
  //   app.use(session({
  //     store: new RedisStore({ client: redis }),
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     rolling: true,                       // slide the TTL on every request
  //     cookie: { maxAge: 30 * 60 * 1000, httpOnly: true },
  //   }));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/", authRouter);
  app.use("/posts", postsRouter);

  // Central error handler.
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "internal error" });
  });

  return app;
}
