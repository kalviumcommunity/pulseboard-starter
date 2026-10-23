// TASK 3 - Cache-aside with stampede protection.
//
// Implement cached(key, ttl, fetcher):
//   1. HIT:    const hit = await redis.get(key); if (hit) return JSON.parse(hit);
//   2. WINNER: try a short lock with redis.set("lock:" + key, "1", "NX", "EX", 5).
//              If you get the lock, run fetcher(), SET the result with "EX", ttl,
//              release the lock with redis.del, and return the data.
//   3. WAITER: if you did NOT get the lock, wait ~50ms, then re-read the cache and
//              return the winner's value (fall back to fetcher() if still empty).
//
// fetcher is an async function that returns the fresh data on a real miss.
import { redis } from "../redis/client.js";

export async function cached(key, ttl, fetcher) {
  // TODO: implement the three paths described above.
  // (For now this just calls the fetcher every time, with no caching.)
  return fetcher();
}
