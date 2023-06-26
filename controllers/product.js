const User = require("../model/user");
const Product = require("../model/products");
const Category = require("../model/category");

const path = require("path");
const fs = require("fs");

const { generateOtp, messageOtp } = require("../middleware/mobile-verify");
const { ERROR_MESSAGE, STATUSCODE, CATEGORY } = require("../helper/constants");

//TO SHOW FORM CAR'S DROPDOWN DATA
// exports.getFormData = async (req, res) => {
//   try {
//     const formData = await Brand.find({});
//     res.status(200).json({ formData });
//   } catch (error) {
//     res.status(401).send(error);
//     console.log(error);
//   }
// };

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
};

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

//TO SHOW AND UPDATE USER INFORMATION
exports.getUserData = async (req, res, next) => {
  const userId = req.userId;
  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      errorMessage(ERROR_MESSAGE.WENT_WRONG, STATUSCODE.NOT_AUTHORIZED);
    }
    res.status(STATUSCODE.OKEY).json({ user: findUser });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.NOT_AUTHORIZED);
  }
  const phone = req.body.contact;
  if (phone) {
    newOtp = generateOtp();
    await messageOtp(phone, newOtp);
  }
  const payload = {
    name: req.body.name,
    about: req.body.about,
    contact: phone,
    email: req.body.email,
    link: req.body.link,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, payload);
    if (!updatedUser) {
      errorMessage(ERROR_MESSAGE.NO_USER_FOUND, STATUSCODE.NOT_FOUND);
    }
    res.status(STATUSCODE.OKEY).json({ message: "User updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

// TO DISPLAY THE SELL SECTION
exports.postCategory = async (req, res, next) => {
  try {
    const create = await Category.create({ name: req.body.name });
    res.status(201).json({ message: "Post saved", Post: create });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//COMMON API TO DELETE THE PRODUCT ITEM
exports.deleteProduct = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (req.userId !== check.user.toString()) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_DELETE, STATUSCODE.NOT_ALLOW);
    }
    check.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    await Product.findByIdAndDelete(postId);
    res
      .status(STATUSCODE.OKEY)
      .json({ message: `Product deleted successfully` });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

// TO POST THE CAR ITEM

exports.postProduct = async (req, res) => {
  const productCar = new Product({
    catRef: CATEGORY.CAR,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    fuel: req.body.fuel,
    transmission: req.body.transmission,
    kmDriven: req.body.kmDriven,
    owners: req.body.owners,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
    day: req.body.day,
    user: req.userId,
  });
  try {
    await productCar.save();
    res.status(STATUSCODE.OKEY).json({
      message: "Post saved successfully!",
    });
  } catch (err) {
    res.status(401).json({ error: "Post Product failed" });
    console.log(err);
  }
};

exports.updateCar = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.NOT_FOUND);
  }
  const payload = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    fuel: req.body.fuel,
    transmission: req.body.transmission,
    kmDriven: req.body.kmDriven,
    owners: req.body.owners,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
    day: req.body.day,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const findCar = await Product.findById(postId);
    if (req.userId !== findCar.user.toString()) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.NOT_ALLOW);
    }
    const updateCar = await Product.findByIdAndUpdate(postId, payload);
    if (!updateCar) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updateCar.images) {
      updateCar.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({
      message: `You're post updated successfully for user ${req.userId}`,
      updatedPost: updateCar,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//PROPERTY FOR RENT
exports.postRent = async (req, res, next) => {
  const rent = new Product({
    catRef: CATEGORY.FOR_RENT_HOUSE_APARTMENT,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    furnishing: req.body.furnishing,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    bachelorsAllowed: req.body.bachelorsAllowed,
    maintenance: req.body.maintenance,
    totalFloors: req.body.totalFloors,
    floorNo: req.body.floorNo,
    carParking: req.body.carParking,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adtitle: req.body.adtitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const postRent = await rent.save();
    res.status(STATUSCODE.OKEY).json({
      message: "Post Saved",
      postRent: postRent,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateRent = async (req, res, next) => {
  const postId = req.params._id;

  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.NO_CODE);
  }

  const payload = {
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    furnishing: req.body.furnishing,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    bachelorsAllowed: req.body.bachelorsAllowed,
    maintenance: req.body.maintenance,
    totalFloors: req.body.totalFloors,
    floorNo: req.body.floorNo,
    carParking: req.body.carParking,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adtitle: req.body.adtitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };

  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(
        ERROR_MESSAGE.NOT_ALLOW_MODICFICATION,
        STATUSCODE.NOT_AUTHORIZED
      );
    }
    const rentPost = await Product.findByIdAndUpdate(postId, payload);
    if (!rentPost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== rentPost.images) {
      rentPost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({ message: "Post updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//PROPERTY FOR SELL

exports.postSale = async (req, res) => {
  const sale = new Product({
    catRef: CATEGORY.FOR_SALE_HOUSE_APARTMENT,
    type: req.body.type,
    bedroom: req.body.bedroom,
    bathrooms: req.body.bathrooms,
    furnishing: req.body.furnishing,
    constructionStatus: req.body.constructionStatus,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    maintenance: req.body.maintenance,
    totalfloors: req.body.totalfloors,
    floorNo: req.body.floorNo,
    carParking: req.body.carParking,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
    day: req.body.day,
    user: req.userId,
  });
  try {
    const saved = await sale.save();
    res
      .status(STATUSCODE.OKEY)
      .json({ message: "Post Saved successfully", post: saved });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
  }
};

exports.updateSalePost = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    type: req.body.type,
    bedroom: req.body.bedroom,
    bathrooms: req.body.bathrooms,
    furnishing: req.body.furnishing,
    constructionStatus: req.body.constructionStatus,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    maintenance: req.body.maintenance,
    totalfloors: req.body.totalfloors,
    floorNo: req.body.floorNo,
    carParking: req.body.carParking,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
  };

  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    let salePost = await Product.findByIdAndUpdate(postId, payload);
    if (!salePost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== salePost.images) {
      salePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({ message: "Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//LANDS AND PLOT
exports.postPlots = async (req, res, next) => {
  const newPost = new Product({
    catRef: CATEGORY.LANDS_AND_PLOTS,
    type: req.body.type,
    listedBy: req.body.listedBy,
    plotArea: req.body.plotArea,
    length: req.body.length,
    breadth: req.body.breadth,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const onGo = await newPost.save();
    res
      .status(STATUSCODE.OKEY)
      .json({ message: "Post Saved Successfully", Post: onGo });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updatePlot = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    type: req.body.type,
    listedBy: req.body.listedBy,
    plotArea: req.body.plotArea,
    length: req.body.length,
    breadth: req.body.breadth,
    facing: req.body.facing,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }

  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const updtePlot = await Product.findByIdAndUpdate(postId, payload);
    if (!updtePlot) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updtePlot.images) {
      updtePlot.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({ message: "Post updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//forRentOfficeShops

exports.postAdd = async (req, res, next) => {
  const postProd = new Product({
    catRef: CATEGORY.FOR_RENT_SHOP_OFFICE,
    furnishing: req.body.furnishing,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    maintenance: req.body.maintenance,
    carParking: req.body.carParking,
    washrooms: req.body.washrooms,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const post = await postProd.save();
    res
      .status(STATUSCODE.OKEY)
      .json({ message: "Post added successfully", post: post, user: user });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.UpdateAddShopOffice = async (req, res, next) => {
  const prodId = req.params._id;
  if (!prodId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    furnishing: req.body.furnishing,
    listedBy: req.body.listedBy,
    superBuiltupArea: req.body.superBuiltupArea,
    carpetArea: req.body.carpetArea,
    maintenance: req.body.maintenance,
    carParking: req.body.carParking,
    washrooms: req.body.washrooms,
    projectName: req.body.projectName,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const updateAdd = await Product.findByIdAndUpdate(prodId, payload);
    if (!updateAdd) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updateAdd.images) {
      updateAdd.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({ message: "Post Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//  MOBILE CONTROLLER
exports.postMobile = async (req, res, next) => {
  const postMobile = new Product({
    catRef: CATEGORY.MOBILE_PHONES,
    brand: req.body.brand,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const mobilePost = await postMobile.save();
    res
      .status(STATUSCODE.OKEY)
      .json({ message: "Mobile Post Saved Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateMobile = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    brand: req.body.brand,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const postUpdate = await Product.findByIdAndUpdate(postId, payload);
    if (!postUpdate) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }

    if (images !== postUpdate.images) {
      postUpdate.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(STATUSCODE.OKEY)
      .json({ message: "Post updated successfully", user: req.userId });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

// ACCESSORIES CONTROLLER
exports.postAccessories = async (req, res, next) => {
  const postAd = new Product({
    catRef: CATEGORY.ACCESSORIES,
    type: req.body.type,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const savePost = await postAd.save();
    res
      .status(STATUSCODE.OKEY)
      .json({ message: `Post saved successfull for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateAccessories = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    type: req.body.type,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };

  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }

  try {
    const check = await Accessories.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const findPost = await Accessories.findByIdAndUpdate(postId, payload);
    if (!findPost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== findPost.images) {
      findPost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }

    res
      .status(STATUSCODE.OKEY)
      .json({ message: `Post updated successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

// TABLETS CONTROLLER

exports.postTablet = async (req, res, next) => {
  const post = new Product({
    catRef: CATEGORY.TABLETS,
    types: req.body.types,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const savePost = await post.save();
    res.status(STATUSCODE.OKEY).json({
      message: `Post saved successfully for user ${req.userId}`,
      Post: savePost,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateTablet = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    types: req.body.types,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Tablets.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const updatePost = await Tablets.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({
      message: `Post updated successfully for user ${req.userId}`,
      Post: updatePost,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//Mens Fashion
exports.postMens = async (req, res, next) => {
  const postMen = new Product({
    catRef: CATEGORY.MEN,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  try {
    const post = await postMen.save();
    res.status(STATUSCODE.OKEY).json({
      message: `Post save successfully for user ${req.userId}`,
      Post: post,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateMens = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const findPost = await Product.findById(postId);
    console.log(findPost.user.toString());
    if (findPost.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const updatePost = await Product.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(STATUSCODE.OKEY)
      .json({ message: `you're post updated successfully`, Post: updatePost });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//WOMENS CONTROLLER

exports.postWomen = async (req, res, next) => {
  const postWomen = new Product({
    catRef: CATEGORY.WOMEN,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  if (!req.files) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const savePost = await postWomen.save();

    res.status(STATUSCODE.OKEY).json({
      message: `Post saved successfully for user ${req.userId}`,
      Post: savePost,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateWomen = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }
    const updateWomen = await Product.findByIdAndUpdate(postId, payload);
    if (!updateWomen) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updateWomen.images) {
      updateWomen.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(STATUSCODE.OKEY).json({
      message: `Post updated successfully for user ${req.userId}`,
      Post: updateWomen,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

//KIDS CONTROLLER

exports.postKid = async (req, res, next) => {
  const postKid = new Product({
    catRef: CATEGORY.KIDS,
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    user: req.userId,
  });
  if (!req.files) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const createPost = await postKid.save();
    res.status(STATUSCODE.OKEY).json({
      message: `Post saved successfully for user ${req.userId}`,
      Post: createPost,
    });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};

exports.updateKid = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    errorMessage(ERROR_MESSAGE.ID_NOT_FOUND, STATUSCODE.INVALID_DATA);
  }
  const payload = {
    adTitle: req.body.adTitle,
    description: req.body.description,
    price: req.body.price,
    images: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
  };
  if (req.files) {
    images = req.files;
  }
  if (!images) {
    errorMessage(ERROR_MESSAGE.NO_FILE_FOUND, STATUSCODE.NOT_FOUND);
  }
  try {
    const check = await Product.findById(postId);
    if (check.user.toString() !== req.userId) {
      errorMessage(ERROR_MESSAGE.NOT_ALLOW_MODICFICATION, STATUSCODE.FORBIDDEN);
    }

    const updatePost = await Product.findByIdAndUpdate(postId, payload);
    if (!updatePost) {
      errorMessage(ERROR_MESSAGE.NO_POST_FOUND, STATUSCODE.NOT_FOUND);
    }
    if (images !== updatePost.images) {
      updatePost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res
      .status(STATUSCODE.OKEY)
      .json({ message: `Post updated successfully for user ${req.userId}` });
  } catch (error) {
    if (!error.statusCode) {
      errorMessage(STATUSCODE.NO_CODE);
    }
    next(error);
  }
};
