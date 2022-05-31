import client from "../db/redis.js";

const caching = (req, res, next) => {
  const { city, checkIn, checkOut } = req.body;
  try {
    client
      .get(`${city} ${checkIn} ${checkOut}`)
      .then((data) => {
        if (data !== null) {
          res.status(200).send(JSON.parse(data));
        } else {
          next();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
};

export default caching;
