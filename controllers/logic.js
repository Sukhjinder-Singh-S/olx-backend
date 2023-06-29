const Product = require("../model/products");
const Fav = require("../model/favourite");

const { ERROR_MESSAGE, STATUSCODE, CATEGORY } = require("../helper/constants");
const { default: mongoose, Schema, Mongoose } = require("mongoose");

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

let word;

exports.search = async (req, res, next) => {
  word = req.body.word;
  let searchLoc = req.body.location;
  try {
    const output = await Product.aggregate([
      {
        $match: {
          $or: [
            { adTitle: { $regex: word, $options: "xi" } },
            { description: { $regex: word, $options: "xi" } },
            { city: { $regex: searchLoc, $options: "xi" } },
            { neighbour: { $regex: searchLoc, $options: "xi" } },
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

exports.like = async (req, res, next) => {
  try {
    const { postId, like } = req.body;
    console.log(postId, like);
    if (like === true) {
      console.log("1");
      const result = await Fav.create({
        postId: postId,
        like: like,
        userId: req.userId,
      });
      res.status(201).json({ result });
    } else if (like === false) {
      console.log("2");
      let remove = await Fav.aggregate([
        { $match: { postId: new mongoose.Types.ObjectId(postId) } },
      ]);
      remove = await Fav.deleteOne(remove.postId);
      res.status(201).json({ remove });
    }
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};
