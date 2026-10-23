import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const authRouter = Router();

// POST /login  { "username": "alice" }
// TASK 5: look up the user, set req.session.userId, and SAVE before responding.
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: "unknown user" });

    // TODO (Task 5):
    //   req.session.userId = user.id;
    //   req.session.save(() => res.json({ userId: user.id }));
    res.status(501).json({ error: "not implemented" });
  } catch (err) {
    next(err);
  }
});

// GET /me - return the logged-in user id, or 401 if there is no session.
authRouter.get("/me", (req, res) => {
  // TODO (Task 5): if (!req.session.userId) return res.status(401)...; else return the id.
  res.status(501).json({ error: "not implemented" });
});

// POST /logout - destroy the session so the session:<sid> key is removed from Redis.
authRouter.post("/logout", (req, res) => {
  // TODO (Task 5): req.session.destroy(() => res.json({ ok: true }));
  res.status(501).json({ error: "not implemented" });
});
