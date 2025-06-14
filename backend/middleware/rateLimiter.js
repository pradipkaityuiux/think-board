import RateLimitObj from "../config/upstash.js";

const rateLimiter = async(req, res, next) => {
    try {
        const { success } = await RateLimitObj.limit("my-limit-key"); // Unique identifier to keep like userID, or IP address
        if (!success) {
            return res.status(429).json({
                message: "Too many requests",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
        next(error);
    }
}

export default rateLimiter;