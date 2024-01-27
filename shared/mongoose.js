// const mongoose = require("mongoose");

// // Replace 'your_mongodb_uri' with your actual MongoDB URI
// const uri =
//   //   "mongodb+srv://tamilkani56:sEeC9KVyhpco0UoN@cluster0.d6mrjuo.mongodb.net/?retryWrites=true&w=majority";
//   "mongodb+srv://tamilkani56:sEeC9KVyhpco0UoN@cluster0.d6mrjuo.mongodb.net/";
// // k0hmls0CbTspNqYs\
// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     // Your code here
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error.message);
//   });

// module.exports.connect;

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ticket", {
});
console.log("Connected to mongodb");
// module.exports.mongooseConnect;
