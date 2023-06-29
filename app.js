require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoute = require("./routes/product");
const Upload = require("./middleware/multer");
const Handler = require("./middleware/error-handler");
const auth = require("./routes/auth");
const filter = require("./routes/filter");
const home = require("./routes/get");

app.use("/images", express.static(path.join(__dirname, "uploades")));
app.use(bodyParser.json());
app.use(Upload);
app.use(cors());
app.use(morgan("dev"));
app.use("/product", productRoute);
app.use("/auth", auth);
app.use("/filter", filter);
app.use("/home", home);
app.use(Handler.errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
