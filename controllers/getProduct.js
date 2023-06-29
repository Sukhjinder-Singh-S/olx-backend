//API'S TO GET SINGLE AND HOME PAGE PRODUCTS IN SINGLE SHOT
const { default: mongoose } = require("mongoose");
const { ERROR_MESSAGE, STATUSCODE, CATEGORY } = require("../helper/constants");
const products = require("../model/products");

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

function modify(data) {
  data.forEach((object) => {
    let dayNow = new Date().getDate();
    let dayData = object.day;
    let newDay = dayNow - dayData;
    if (newDay === 0) {
      object.day = "TODAY";
    } else if (newDay === 1) {
      object.day = "YESTERDAY";
    } else {
      object.day = `${newDay} DAYS AGO`;
    }
  });
  return data;
}

exports.getProducts = async (req, res, next) => {
  try {
    const getProd = await products.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: 1,
          brand: 1,
          model: 1,
          variant: 1,
          year: 1,
          fuel: 1,
          transmission: 1,
          kmDriven: 1,
          owners: 1,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          furnishing: 1,
          constructionStatus: 1,
          listedBy: 1,
          plotArea: 1,
          length: 1,
          breadth: 1,
          superBuiltupArea: 1,
          carpetArea: 1,
          bachelorsAllowed: 1,
          maintenance: 1,
          totalFloors: 1,
          floorNo: 1,
          carParking: 1,
          washrooms: 1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);

    res.status(STATUSCODE.OKEY).json(modify(getProd));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};

exports.getCar = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const arrayData = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: 1,
          brand: 1,
          model: 1,
          variant: 1,
          year: 1,
          fuel: 1,
          transmission: 1,
          kmDriven: 1,
          owners: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    res.status(STATUSCODE.OKEY).json(modify(arrayData));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};

exports.getRent = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          furnishing: 1,
          listedBy: 1,
          carpetArea: 1,
          bachelorsAllowed: 1,
          maintenance: 1,
          totalFloors: 1,
          floorNo: 1,
          carParking: 1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};


exports.getSell = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          furnishing: 1,
          constructionStatus:1,
          listedBy: 1,
          superBuiltupArea:1,
          carpetArea: 1,
          maintenance: 1,
          totalFloors: 1,
          floorNo: 1,
          carParking: 1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};


exports.getLandAndPlots = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          type: 1,
          listedBy: 1,
          plotArea: 1,
          length:1,
          breadth:1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};


exports.mobileProducts = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          brand:1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};

exports.getOfficeShopsRent = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          furnishing: 1,
          listedBy: 1,
          superBuiltupArea:1,
          carpetArea: 1,
          maintenance: 1,
          carParking: 1,
          washrooms: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};


exports.fashionProducts = async (req, res, next) => {
  const refId = req.params.refId;
  try {
    const getProds = await products.aggregate([
      {
        $match: {
          catRef: new mongoose.Types.ObjectId(refId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);
    if (!getProds) {
      errorMessage(STATUSCODE.NOT_FOUND, ERROR_MESSAGE.NO_POST_FOUND);
    }
    res.status(STATUSCODE.OKEY).json(modify(getProds));
  } catch (error) {
    next(errorMessage(STATUSCODE.NO_CODE));
  }
};

