const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Succesfully!"))
    .catch((error) => {
      console.log("DB Connection Faild");
      console.error(error);
      process.exit(1);
    });
};
