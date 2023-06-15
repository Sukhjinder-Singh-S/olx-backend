const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  adType: [
    {
      name: {
        type: String,
      },
      autos: [
        {
          cars: {
            type: String,
          },
           tempId: {
            type: String,
          },
        },
      ],
      icon: {
        type: String,
      },
    },

    {
      name: {
        type: String,
      },
      properties: [
        {
          forSaleHousesApartments: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          forRentHousesApartments: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          landsPlots: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          forRentShopsOffices: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          forsaleShopsOffices: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          pgGuestHouses: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
      ],
      icon: {
        type: String,
      },
    },
    {
      name: {
        type: String,
      },
      mobiles: [
        {
          mobilePhones: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          accessories: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          tablets: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
      ],
      icon: {
        type: String,
      },
    },
    {
      name: {
        type: String,
      },
      fashion: [
        {
          mens: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          womens: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
        {
          kids: {
            type: String,
          },
          tempId: {
            type: String,
          },
        },
      ],
      icon: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Sell", categorySchema);
