const mongoose = require("mongoose");
const BrandModel = require("../modules/brandModel"); // Import the BrandModel schema

// Create a new brand instance
const brandData = {
  name: "Popular Brands",
  brand: [
    {
      name: "Maruti Suzuki",
      subBrand: {
        name1: "1000",
        sb1: {
          vname1: "AC",
          vname2: "STD",
        },
        name2: "800",
        sb2: {
          vname1: "AC",
          vname2: "AC BSII",
        },
        name3: "A-Star",
        sb3: {
          vname1: "AT VXI",
          vname2: "AT LXI",
        },
        name4: "Alto",
        sb4: {
          vname1: "X FUN",
          vname2: "STD CNG",
        },
        name5: "Alto 800",
        sb5: {
          vname1: "VXI(O)",
          vname2: "STD CNG",
        },
      },
    },

    {
      name: "Hyundai",
      subBrand: {
        name1: "Aura",
        sb1: {
          vname1: "AC",
          vname2: "STD",
        },
        name2: "Alcazar",
        sb2: {
          vname1: "AC",
          vname2: "AC BSII",
        },
        name3: "i20 N Line",
        sb3: {
          vname1: "AT VXI",
          vname2: "AT LXI",
        },
        name4: "Accent Hatchback",
        sb4: {
          vname1: "X FUN",
          vname2: "STD CNG",
        },
        name5: "Grand i10 Prime",
        sb5: {
          vname1: "VXI(O)",
          vname2: "STD CNG",
        },
      },
    },

    {
      name: "Tata",
      subBrand: {
        name1: "Nexon EV Max",
        sb1: {
          vname1: "AC",
          vname2: "STD",
        },
        name2: "Altroz",
        sb2: {
          vname1: "AC",
          vname2: "AC BSII",
        },
        name3: "Aria",
        sb3: {
          vname1: "AT VXI",
          vname2: "AT LXI",
        },
        name4: "Bolt",
        sb4: {
          vname1: "X FUN",
          vname2: "STD CNG",
        },
        name5: "Estate",
        sb5: {
          vname1: "VXI(O)",
          vname2: "STD CNG",
        },
      },
    },

    {
      name: "Mahindra",
      subBrand: {
        name1: "XUV700",
        sb1: {
          vname1: "AC",
          vname2: "STD",
        },
        name2: "KUV100 NXT",
        sb2: {
          vname1: "AC",
          vname2: "AC BSII",
        },
        name3: "Bolero Neo",
        sb3: {
          vname1: "AT VXI",
          vname2: "AT LXI",
        },
        name4: "Scorpio-N",
        sb4: {
          vname1: "X FUN",
          vname2: "STD CNG",
        },
        name5: "Imperio",
        sb5: {
          vname1: "VXI(O)",
          vname2: "STD CNG",
        },
      },
    },

    {
      name: "Toyota",
      subBrand: {
        name1: "Urban Cruiser",
        sb1: {
          vname1: "AC",
          vname2: "STD",
        },
        name2: "Hilux",
        sb2: {
          vname1: "AC",
          vname2: "AC BSII",
        },
        name3: "Ventury ",
        sb3: {
          vname1: "AT VXI",
          vname2: "AT LXI",
        },
        name4: "VELLFIRE",
        sb4: {
          vname1: "X FUN",
          vname2: "STD CNG",
        },
        name5: "YARIS HATCHBACK",
        sb5: {
          vname1: "VXI(O)",
          vname2: "STD CNG",
        },
      },
    },
  ],
};

// BrandModel.create(brandData)
//   .then((savedBrand) => {
//     console.log("Brand inserted into the database:", savedBrand);
//   })
//   .catch((error) => {
//     console.error("Failed to insert brand into the database:", error);
//   });

exports.postCarForm = async (req, res) => {
  try {
    const send = BrandModel.create(brandData);
    res.status(200).json({ send });
  } catch (error) {
    res.status(401).json({ error });
    console.log(error);
  }
};
