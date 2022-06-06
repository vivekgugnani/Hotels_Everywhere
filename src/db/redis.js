import redis from "redis";

const redisPort = process.env.REDIS_PORT || 6379;
const url = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;

const client = redis.createClient({
  socket: {
    port: 19521,
    host: "redis-19521.c301.ap-south-1-1.ec2.cloud.redislabs.com",
  },
  username: username,
  password: password,
  retry_strategy: (options) => {
    const { error, total_retry_time, attempt } = options;
    if (error?.code === "ECONNREFUSED" || error?.code === "NR_CLOSED") {
      return 5000;
    }
    if (total_retry_time > 1000 * 15) {
      return undefined;
    }
    if (attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 1000, 5000); //in ms
  },
  lazyConnect: true,
});

(async () => {
  // Connect to redis server
  await client.connect();
})();

console.log("Attempting to connect to redis");
client.on("connect", () => {
  console.log("Redis Connected!");
});

client.on("error", (err) => {
  console.log(`Error:${err}`);
});

export default client;
