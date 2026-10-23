import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { redis } from "../redis/client.js";
import { cached } from "../cache/cached.js";
import { rateLimit } from "../middleware/rateLimit.js";

export const postsRouter = Router();

// GET /posts - the newest-first feed.
// TASK 3: serve this through cached("homepage:feed", 60, fetcher) so repeated
// reads come from Redis and a stampede collapses to a single DB query.
postsRouter.get("/", async (req, res, next) => {
  try {
    const fetcher = () =>
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { author: { select: { id: true, username: true } } },
      });

    // TODO (Task 3): replace this direct call with cached("homepage:feed", 60, fetcher)
    const feed = await fetcher();

    res.json(feed);
  } catch (err) {
    next(err);
  }
});

// POST /posts/:id/vote - one user upvotes one post.
// TASK 1: do the two writes (Vote receipt + score increment) in one $transaction.
// TASK 4: protect this route with the rateLimit middleware (e.g. rateLimit(5, 10000)).
postsRouter.post("/:id/vote", /* TODO (Task 4): add rateLimit(5, 10000) here, */ async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    // A logged-in user id would come from the session; the body is a simple fallback for testing.
    const userId = req.session?.userId ?? Number(req.body.userId);
    if (!userId) return res.status(401).json({ error: "not logged in" });

    // TODO (Task 1):
    //   const [, post] = await prisma.$transaction([
    //     prisma.vote.create({ data: { userId, postId } }),
    //     prisma.post.update({ where: { id: postId }, data: { score: { increment: 1 } } }),
    //   ]);
    //   await redis.del("homepage:feed");   // invalidate the cached feed (Task 3)
    //   return res.json({ id: post.id, score: post.score });
    // Catch Prisma error code "P2002" (duplicate vote) and return 409.

    res.status(501).json({ error: "not implemented" });
  } catch (err) {
    next(err);
  }
});

// POST /posts - create a post (used to show cache invalidation on writes).
postsRouter.post("/", async (req, res, next) => {
  try {
    const userId = req.session?.userId ?? Number(req.body.userId);
    if (!userId) return res.status(401).json({ error: "not logged in" });
    const { title, url } = req.body;
    const post = await prisma.post.create({ data: { title, url, authorId: userId } });
    await redis.del("homepage:feed"); // keep the cached feed honest
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});
