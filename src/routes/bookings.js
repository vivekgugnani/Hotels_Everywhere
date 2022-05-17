const { Router } = require("express");

const routes = new Router();

routes.post("/api/v1/booking", auth, (req, res) => {
  const user = req.user.id;
  const room = req.body.roomid;
  const checkInDate = new Date(req.body.checkInDate);
  const checkOutDate = new Date(req.body.checkOutDate);

  const amountPaid = req.body.amountPaid;
  const daysOfStay = req.body.daysOfStay;
  const paidAt = new Date(req.body.paidAt);

  const bookRoom = {
    user,
    room,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paidAt,
  };
  bookRoom(bookRoom, (e) => {
    res.send(e);
  });

  res.send({
    bookRoom,
  });
});
