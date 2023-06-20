const Item = require("../modules/cars");
const Sell = require("../modules/category");
const Brand = require("../modules/brandModel");
const SaleHsA = require("../propertiesModule/forSaleHsA");
const Rent = require("../propertiesModule/forRentHsA");
const Plots = require("../propertiesModule/landsAndPlots");
const OfficeAndShop = require("../propertiesModule/forRentSsO");
const Accessories = require("../mobile/accessories");
const Mobile = require("../mobile/mobile-phones");
const Tablets = require("../mobile/tablets");
const User = require("../modules/user");
const { generateOtp, messageOtp } = require("../middleware/mobile-verify");

let newOtp;
// TO FETCH HOME PAGE PRODUCTS
exports.getProductsCar = async (req, res) => {
  try {
    const carProducts = await Item.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          price: 1,
          brand: 1,
          location: 1,
          imageUrl: 1,
          adTitle: 1,
          description: 1,
        },
      },
    ]);

    const productsSale = await SaleHsA.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          type: 1,
          bedroom: 1,
          bathrooms: 1,
          furnishing: 1,
          constructionStatus: 1,
          listedBy: 1,
          superBuiltupArea: 1,
          carpetArea: 1,
          maintenance: 1,
          totalfloors: 1,
          floorNo: 1,
          carParking: 1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          imageUrl: 1,
          state: 1,
          city: 1,
          neighbour: 1,
          user: 1,
        },
      },
    ]);

    const productRent = await Rent.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          price: 1,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          furnishing: 1,
          listedBy: 1,
          superBuiltupArea: 1,
          carpetArea: 1,
          bachelorsAllowed: 1,
          maintenance: 1,
          totalFloors: 1,
          floorNo: 1,
          carParking: 1,
          facing: 1,
          projectName: 1,
          adtitle: 1,
          description: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbourhood: 1,
          user: 1,
        },
      },
    ]);

    const productPlots = await Plots.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$date" },
          type: 1,
          listedBy: 1,
          plotArea: 1,
          length: 1,
          breadth: 1,
          facing: 1,
          projectName: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbourhood: 1,
          user: 1,
        },
      },
    ]);

    const productOfficeAndShop = await OfficeAndShop.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          furnishing: 1,
          listedBy: 1,
          superBuiltupArea: 1,
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
          neighbourhood: 1,
          user: 1,
        },
      },
    ]);

    // const userAgg = await User.aggregate([
    //   {
    //     $lookup:{
    //       from:'accessories',
    //       localField:'items',
    //       foreignField:'_id',
    //       as:'field'
    //     }
    //   },
    // ]);

    const productAccessories = await Accessories.aggregate([
      {
        $project: {
          day: { $dayOfMonth: "$day" },
          type: 1,
          adTitle: 1,
          description: 1,
          price: 1,
          images: 1,
          state: 1,
          city: 1,
          neighbourhood: 1,
          user: 1,
        },
      },
      {
        $setFields: {
          $authorObjectId: { $toObjectId: '$_id' },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userStrId",
          foreignField: "user",
          as: "user",
        },
      },
    ]);

    modify(productsSale);
    modify(carProducts);
    modify(productRent);
    modify(productPlots);
    modify(productOfficeAndShop);

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

    res.status(200).json({
      // carProducts,
      // productsSale,
      // productRent,
      // productPlots,
      // productOfficeAndShop,
      productAccessories,
      // userAgg
    });
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};

// TO DISPLAY THE SELL SECTION

exports.getAdCategory = async (req, res) => {
  try {
    const adCategory = await Sell.findOne({ _id: "645cc5ec97f9ed0c0522c3e5" });
    res.status(200).json({ adCategory });
  } catch (err) {
    res.status(401).json({ err });
    console.log(err);
  }
};

// TO POST THE CAR ITEM

exports.postProduct = async (req, res) => {
  const product = new Item({
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
  });
  try {
    await product
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post saved successfully!",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(401).json({ error: "Post Product failed" });
    console.log(err);
  }
};

//TO SHOW FORM CAR'S DROPDOWN DATA
exports.getFormData = async (req, res) => {
  try {
    const formData = await Brand.find({});
    res.status(200).json({ formData });
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

//TO SHOW AND UPDATE USER INFORMATION
exports.getUserData = async (req, res, next) => {
  const userId = req.userId;
  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      const error = new Error(
        "Something went wrong, Try to login/signup again"
      );
      error.statusCode = 401;
      throw error;
    }
    res.status(201).json({ user: findUser });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    const error = new Error("User id is missing");
    error.statusCode = 401;
    throw error;
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
      const error = new Error("No User found");
      error.statusCode = 401;
      throw error;
    }
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
