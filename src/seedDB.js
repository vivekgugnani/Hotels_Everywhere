const Hotel = require("./models/hotels");

require("./db/init");
// const fs = require("fs");
// const { parse } = require("csv-parse");
// const Hotel = require("./models/hotels");
// const Room = require("./models/rooms");
// const { default: mongoose } = require("mongoose");
// // //hotel name, street address, city, state, owner name
// const hotels = [];
// fs.createReadStream("./hotel-data.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", async function (row) {
//     if (
//       row[0].length < 2 ||
//       row[1].length < 2 ||
//       row[6].length < 1 ||
//       row[22].length < 2 ||
//       row[2].length < 2 ||
//       row[26].length < 2
//     ) {
//       return;
//     }
//     // const room1 = new Room({
//     //   roomType: "Standard",
//     //   pricePerDay: 400,
//     // });
//     // const room2 = new Room({
//     //   roomType: "Deluxe",
//     //   pricePerDay: 900,
//     // });

//     // await room1.save();
//     // await room2.save();

//     // const id1 = room1._id;
//     // const id2 = room2._id;

//     const obj = {
//       street_address: row[0],
//       city: row[1],
//       stars: row[6].charAt(0),
//       hotel_name: row[22],
//       country: row[2],
//     };
//     mapping(obj);
//     hotels.push(obj);
//   })
//   .on("end", async function () {
//     await Hotel.deleteMany();
//     await Hotel.insertMany(hotels);
//     console.log("finished");
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });

// // const makeRooms = async () => {
// //   const hotels = await Hotel.find({});
// //   await Room.deleteMany();
// //   const hot = await mapping(hotels);

// //   console.log("I am here");
// //   await Hotel.deleteMany();
// //   await Hotel.insertMany(hot);
// // };
// // makeRooms();

// const mapping = async (hotel) => {
//   const room1 = new Room({
//     roomType: "Standard",
//     pricePerDay: 400,
//   });
//   const room2 = new Room({
//     roomType: "Deluxe",
//     pricePerDay: 900,
//   });
//   await room1.save();
//   await room2.save();
//   hotel.rooms = [];
//   hotel.rooms.push(await room1._id);
//   hotel.rooms.push(await room2._id);

//   return hotel;
// };

const removeNonRooms = async () => {
  const hotels = await Hotel.find({});
  const rem = hotels.filter((hot) => {
    if (hot.rooms.length > 0) {
      return true;
    }
  });

  await Hotel.deleteMany();
  await Hotel.insertMany(rem);
};

removeNonRooms();
