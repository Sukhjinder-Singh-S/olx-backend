const Product = require("../model/products");

const { ERROR_MESSAGE, STATUSCODE, CATEGORY } = require("../helper/constants");
const { default: mongoose } = require("mongoose");

const errorMessage = (STATUS_CODE, ERROR_MESSAGE) => {
  if (ERROR_MESSAGE) {
    const error = new Error(ERROR_MESSAGE);
    error.statusCode = STATUS_CODE;
    throw error;
  } else {
    const error = new Error();
    error.statusCode = STATUS_CODE;
  }
};

exports.search = async (req, res, next) => {
  const word = req.body.word;
  try {
    const output = await Product.aggregate([
      {
        $match: {
          $or: [
            { adTitle: { $regex: word, $options: "xi" } },
            { description: { $regex: word, $options: "xi" } },
          ],
        },
      },
    ]);
    res
      .status(STATUSCODE.OKEY)
      .json({ message: `Search Complete`, Products: output });
  } catch (error) {
    errorMessage(STATUSCODE.NO_CODE);
    next(error);
  }
};

exports.filter = async (req, res, next) => {
  try {
    let input = req.body.input;
    input = input.replace(/\s/g, "").toLowerCase();

    let catRef = new mongoose.Types.ObjectId(req.params.catRef);

    const pipeline = [];

    if (catRef) {
      pipeline.push({ $match: { catRef: catRef } });
    }

    if (input === "date") {
      pipeline.push({ $sort: { day: 1 } });
    } else if (input === "relavance") {
      pipeline.push({
        $match: {
          $or: [
            { adTitle: { $regex: word, $options: "xi" } },
            { description: { $regex: word, $options: "xi" } },
          ],
        },
      });
    } else if (input === "lowtohigh") {
      pipeline.push({ $sort: { price: 1 } });
    } else if (input === "hightolow") {
      pipeline.push({ $sort: { price: -1 } });
    } else if (input === "distance") {
      pipeline.push({ $sort: { distance: 1 } });
    }

    const result = await Product.aggregate(pipeline);

    res.status(STATUSCODE.OKEY).json({ message: "Okay", Posts: result });
  } catch (error) {
    errorMessage(STATUSCODE.NO_CODE);
    next(error);
  }
};

