// const fs = require("fs");
// const { parse } = require("csv-parse");
// const Hotel = require("./models/hotels");
// const Room = require("./models/rooms");
// //hotel name, street address, city, state, owner name
// const hotels = [];
// fs.createReadStream("./hotel-data.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", async function (row) {
//       await Room.deleteMany();
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
//     const room1 = new Room({
//       roomType: row[26],
//       status: false,
//     });
//     await room1.save();
//     const id1 = room1._id;

//     const room2 = new Room({
//       roomType: row[26],
//       status: false,
//     });
//     await room2.save();
//     const id2 = room2._id;
//     const room3 = new Room({
//       roomType: row[26],
//       status: false,
//     });
//     await room3.save();
//     const id3 = room3._id;

//     const obj = {
//       street_address: row[0],
//       city: row[1],
//       stars: row[6].charAt(0),
//       hotel_name: row[22],
//       country: row[2],
//       rooms: [id1, id2, id3],
//     };
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

// const hotelsData = [
//   {
//     hotel_name: "Pink City",
//     street_address: "jallianwala bagh",
//     city: "Amritsar",
//   },
//   {
//     hotel_name: "",
//     street_address: "jallianwala bagh",
//     city: "Amritsar",
//     state: "Punjab",
//     owner_name: "Pink Lal",
//   },
// ];

// const uploadHotels = async () => {
//   console.log("DB Seeded");
// };

// module.exports = uploadHotels;
