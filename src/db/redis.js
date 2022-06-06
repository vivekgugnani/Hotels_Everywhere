import redis from "redis";

const redisPort = process.env.REDIS_PORT || 6379;
const url = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;

const client = redis.createClient({
  url: url,
  username: username,
  password: password,
});

try {
  (async () => {
    // Connect to redis server
    await client.connect().then(() => {
      console.log("Redis connected");
    });
  })();
} catch (e) {}

export default client;
