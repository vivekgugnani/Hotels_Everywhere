import redis from "redis";

const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient(redisPort);

client.connect().then(() => {
  console.log("Redis connected Successfully");
});

export default client;
