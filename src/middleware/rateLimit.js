// TASK 4 - Sliding-window rate limiter with MULTI/EXEC.
//
// Return an Express middleware (req, res, next) that:
//   - builds a key from who you are limiting:  "ratelimit:" + (req.user?.id ?? req.ip)
//   - records this request in a sorted set and counts requests in the last windowMs,
//     running ALL of these in one redis.multi()....exec() transaction:
//         .zadd(key, now, member)                    // member = unique, e.g. now + "-" + Math.random()
//         .zremrangebyscore(key, 0, now - windowMs)   // drop entries older than the window
//         .zcard(key)                                 // count what's left
//         .expire(key, Math.ceil(windowMs / 1000))    // auto-clean when quiet
//   - reads the count from the zcard result (results[2][1] with ioredis)
//   - if count > max: respond 429 with a Retry-After header; otherwise call next().
import { redis } from "../redis/client.js";

export function rateLimit(max, windowMs) {
  return async (req, res, next) => {
    // TODO: implement the sliding-window check described above.
    // (For now this lets every request through.)
    next();
  };
}
