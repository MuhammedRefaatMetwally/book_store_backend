const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis...");
  } catch (err) {
    console.error("❌ Redis connection error:", err);
  }
})();

redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

module.exports = redisClient;
