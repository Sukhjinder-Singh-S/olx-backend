const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoute = require("./routes/product");
const Property = require("./routes/property")
const Upload = require("./middleware/multer");
const Handler = require("./middleware/error-handler");
const auth = require('./routes/auth')


app.use("/images", express.static(path.join(__dirname, "uploades")));
app.use(bodyParser.json());
app.use(Upload);
app.use(cors());
app.use(morgan("dev"));
app.use("/car", productRoute);
app.use('/property', Property)
app.use("/auth",auth)
app.use(Handler.errorHandler);



const MONGODB_URI =
  "mongodb+srv://sukhi:Parm0310@cluster0.uvgtkel.mongodb.net/shopOlx";

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

