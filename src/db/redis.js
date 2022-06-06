import redis from "redis";

const redisPort = process.env.REDIS_PORT || 6379;
const url =
  process.env.REDIS_URL ||
  "redis://redis-19521.c301.ap-south-1-1.ec2.cloud.redislabs.com:19521";
const username = process.env.REDIS_USERNAME || "default";
const password =
  process.env.REDIS_PASSWORD || "PTlrrs9MvtdDrtOIELAtflKYAvnQg4oM";

const client = redis.createClient({
  url: url,
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
  await client.connect().then(() => {
    console.log("Redis connected");
  });
})();

export default client;
