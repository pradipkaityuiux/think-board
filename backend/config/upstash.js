import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import dotenv from "dotenv";
dotenv.config();

// Rate limit for 10 requests per 20 seconds
const RateLimitObj = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "20s")
})

export default RateLimitObj;