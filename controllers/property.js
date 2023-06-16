const path = require("path");
const fs = require("fs");

const forRent = require("../propertiesModule/forRentHsA");
const forSale = require("../propertiesModule/forSaleHsA");
const landsAndPlots = require("../propertiesModule/landsAndPlots");
const forRentOfficeShops = require("../propertiesModule/forRentSsO");
const User = require("../modules/user");

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (error) => console.log(error));
};

exports.postRent = async (req, res, next) => {
  const rent = new forRent({
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
    const user = await User.findById(req.userId);
    await user.items.push(rent);
    await user.save();
    // user.items.push(rent);
    console.log(user);
    res.status(201).json({
      message: "Post Saved",
      postRent: postRent,
      userSave: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateRent = async (req, res, next) => {
  const postId = req.params._id;

  if (!postId) {
    const error = new Error("Post ID is missing");
    error.statusCode = 401;
    throw error;
  }
  //CODE HERE TO CHECK THE USER CAN UPDATE THE POST WHICH HE/SHE CREATE

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
    const error = new Error("No file Selected");
    error.statusCode = 401;
    throw error;
  }
  try {
    const check = await forRent.findById(postId);
    console.log(check)
    if (check.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    const rentPost = await forRent.findByIdAndUpdate(postId, payload);
    if (!rentPost) {
      const error = new Error("No Post Found");
      error.statusCode = 401;
      throw error;
    }
    //CODE HERE TO CHECK USER THAT CREATE THE POST HAS THE RIGHT TO DELETE IT
    if (images !== rentPost.images) {
      rentPost.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteRent = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("Post Id is Missing");
    error.statusCode = 422;
    throw error;
  }
  try {
    const fetchPost = await forRent.findById(postId);
    if (!fetchPost) {
      const error = new Error("No Post Found");
      error.statusCode = 401;
      throw error;
    }

    //CODE HERE TO CHECK THE USER WHICH CREATE THE POST HAS ONLY RIGHT TO DELETE IT

    if (fetchPost.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    fetchPost.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });

    await forRent.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.items.pull(postId);
    user.save();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//forSale

exports.postSale = async (req, res) => {
  console.log("Top");
  console.log(req.files);
  const sale = new forSale({
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
    imageUrl: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
    day: req.body.day,
    user: req.userId,
  });
  try {
    const saved = await sale.save();
    const user = await User.findById(req.userId);
    await user.items.push(sale);
    await user.save();
    res.status(201).json({ message: "Post Saved successfully", post: saved });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
  }
};

exports.updateSalePost = async (req, res, next) => {
  const postId = req.params._id;
  console.log(postId);
  if (!postId) {
    const error = new Error("Can't Get the ID from params");
    error.statusCode = 422;
    throw error;
  }
  //CODE HERE TO CHECK THE USER CAN UPDATE THE POST WHICH HE/SHE CREATE

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
    imageUrl: req.files,
    state: req.body.state,
    city: req.body.city,
    neighbour: req.body.neighbour,
    day: req.body.day,
  };

  if (req.files) {
    imageUrl = req.files;
  }
  if (!imageUrl) {
    const error = new Error("No File Selected");
    error.statusCode = 422;
    throw error;
  }
  try {
    const check = await forSale.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    let salePost = await forSale.findByIdAndUpdate(postId, payload);
    if (!salePost) {
      const error = new Error("No Post Found");
      error.statusCode = 422;
      throw error;
    }
    if (imageUrl !== salePost.imageUrl) {
      salePost.imageUrl.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteSalePost = async (req, res, next) => {
  const postId = req.params._id;
  console.log(postId, ">>>>>>>>>>>>>");
  if (!postId) {
    const error = new Error("Can't Get the ID from params");
    error.statusCode = 422;
    throw error;
  }
  try {
    const findPost = await forSale.findById(postId);
    if (!findPost) {
      const error = new Error("Could not found the post ");
      error.statusCode = 422;
      throw error;
    }
    //CODE HERE TO CHECK THE USER WHICH CREATE THE POST HAS ONLY RIGHT TO DELETE IT
    if (findPost.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't Delete the Post");
      error.statusCode = 403;
      throw error;
    }

    findPost.imageUrl.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });

    await forSale.findByIdAndDelete(postId);
    res.status(200).json({ message: "The Post is Deleted Successfully :(" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// landsAndPlots

exports.postPlots = async (req, res, next) => {
  // res.json({message:"postPlots"})
  const newPost = new landsAndPlots({
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
    const user = await User.findById(req.userId);
    await user.items.push(newPost);
    await user.save();
    res.status(200).json({ message: "Post Saved Successfully", Post: onGo });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updatePlot = async (req, res, next) => {
  const postId = req.params._id;
  if (!postId) {
    const error = new Error("Enter a Post Id");
    error.statusCode = 401;
    throw error;
  }
  //CODE HERE TO CHECK THE USER AUTHORIZATION
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
    const error = new Error("No File Selected");
    error.statusCode = 402;
    throw error;
  }
  try {
    const check = await landsAndPlots.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    const updtePlot = await landsAndPlots.findByIdAndUpdate(postId, payload);
    if (!updtePlot) {
      const error = new Error("No Post Found With this Id");
      error.statusCode = 402;
      throw error;
    }
    if (images !== updtePlot.images) {
      updtePlot.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(200).json({ message: "Post updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deletePlot = async (req, res, next) => {
  const prodId = req.params._id;
  if (!prodId) {
    const error = new Error("No Id Provided");
    error.statusCode = 422;
    throw error;
  }
  try {
    const fetchPlot = await landsAndPlots.findById(prodId);
    if (!fetchPlot) {
      const error = new Error("No post found");
      error.statusCode = 422;
      throw error;
    }
    //CODE HERE TO CHECK USER AUTHORIZATION TO DELETE POST

    if (fetchPlot.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    fetchPlot.images.forEach((obj) => {
      const extract = obj.path.replace("\\", "/");
      clearImage(extract);
    });
    await landsAndPlots.findOneAndDelete(prodId);
    res.status(200).json({ message: "Post deleted successfuly" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//forRentOfficeShops

exports.postAdd = async (req, res, next) => {
  // res.json({ message: "Testin" });
  const postProd = new forRentOfficeShops({
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
    const user = await User.findById(req.userId);
    await user.items.push(postProd);
    await user.save();
    res
      .status(200)
      .json({ message: "Post added successfully", post: post, user: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.UpdateAddShopOffice = async (req, res, next) => {
  const prodId = req.params._id;
  if (!prodId) {
    const error = new Error("ID is missing");
    error.statusCode = 422;
    throw error;
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
    const error = new Error("No file selected");
    error.statusCode = 401;
    throw error;
  }
  try {
    const check = await forRentOfficeShops.findById(postId);
    if (check.user.toString() !== req.userId) {
      const error = new Error("Current Login user Can't update the Post");
      error.statusCode = 403;
      throw error;
    }
    const updateAdd = await forRentOfficeShops.findByIdAndUpdate(
      prodId,
      payload
    );
    if (!updateAdd) {
      const error = new Error("No Post Found");
      error.statusCode = 401;
      throw error;
    }
    if (images !== updateAdd.images) {
      updateAdd.images.forEach((obj) => {
        const extract = obj.path.replace("\\", "/");
        clearImage(extract);
      });
    }
    res.status(200).json({ message: "Post Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
