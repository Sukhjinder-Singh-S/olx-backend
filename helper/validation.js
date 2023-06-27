const { body, check } = require("express-validator");

const MESSAGE = {
  FIELD_NAME: "This field name is required",
  FILES: "Files are missing",
  PHONE: "Please enter a contact number",
  EMAIL: "Please enter a valid email",
};

const required = [
  body("adTitle", MESSAGE.FIELD_NAME).exists(),
  body("description", MESSAGE.FIELD_NAME).exists(),
  body("price", MESSAGE.FIELD_NAME).exists().isNumeric(),
  body("images", MESSAGE.FILES).exists(),
  body("state", MESSAGE.FIELD_NAME).exists(),
  body("city", MESSAGE.FIELD_NAME).exists(),
  body("neighbour", MESSAGE.FIELD_NAME).exists(),
];

exports.VALIDATOR = {
  POST_CAR: [
    body("brand", MESSAGE.FIELD_NAME).exists().isString(),
    body("model", MESSAGE.FIELD_NAME).exists().isString(),
    body("variant", MESSAGE.FIELD_NAME).exists().isString(),
    body("year", MESSAGE.FIELD_NAME).exists().isNumeric(),
    body("fuel", MESSAGE.FIELD_NAME)
      .exists()
      .default(["CNG & Hybrids", "Diesel", "Electric", "LPG", "Petrol"]),
    body("transmission", MESSAGE.FIELD_NAME)
      .exists()
      .default(["Automatic", "Manual"]),
    body("kmDriven", MESSAGE.FIELD_NAME).exists().isNumeric(),
    body("owners", MESSAGE.FIELD_NAME)
      .exists()
      .default(["1st", "2nd", "3rd", "4th", "4+"]),
    ...required,
  ],
  POST_RENT: [
    body("type", MESSAGE.FIELD_NAME)
      .exists()
      .default([
        "Apartments",
        "Builder Floors",
        "Farm Houses",
        " Houses & Villas",
      ]),
    body("bedrooms", MESSAGE.FIELD_NAME).default([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4+",
    ]),
    body("bathrooms", MESSAGE.FIELD_NAME).default([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4+",
    ]),
    body("furnishing", MESSAGE.FIELD_NAME).default([
      "Furnished",
      "Semi-Furnished",
      "Unfurnished",
    ]),
    body("listedBy", MESSAGE.FIELD_NAME).default([
      "Builder",
      "Dealer",
      "Owner",
    ]),
    body("carpetArea", MESSAGE.FIELD_NAME).exists().isNumeric(),
    ...required,
  ],
  POST_SELL: [
    body("type", MESSAGE.FIELD_NAME)
      .exists()
      .default([
        "Apartments",
        "Builder Floors",
        "Farm Houses",
        " Houses & Villas",
      ]),
    body("bedrooms", MESSAGE.FIELD_NAME).default([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4+",
    ]),
    body("bathrooms", MESSAGE.FIELD_NAME).default([
      "1st",
      "2nd",
      "3rd",
      "4th",
      "4+",
    ]),
    body("furnishing", MESSAGE.FIELD_NAME).default([
      "Furnished",
      "Semi-Furnished",
      "Unfurnished",
    ]),
    body("listedBy", MESSAGE.FIELD_NAME).default([
      "Builder",
      "Dealer",
      "Owner",
    ]),
    body("carpetArea", MESSAGE.FIELD_NAME).exists().isNumeric(),
    body("superBuiltupArea", MESSAGE.FIELD_NAME).exists(),
    ...required,
  ],
  POST_PLOTLAND: [
    body("type", MESSAGE.FIELD_NAME).exists().default(["For Rent", "For Sell"]),
    body("plotArea").exists().isNumeric(),
    ...required,
  ],
  POST_RNTOFFSHP: [
    body("superBuiltupArea", MESSAGE.FIELD_NAME).exists().isNumeric(),
    body("carpetArea", MESSAGE.FIELD_NAME).exists().isNumeric(),
    ...required,
  ],
  POST_MOBILE: [body("brand", MESSAGE.FIELD_NAME).exists(), ...required],
  POST_ACCESSORIES: [body("type", MESSAGE.FIELD_NAME).exists(), ...required],
  POST_TABLET: [body("type", MESSAGE.FIELD_NAME).exists(), ...required],
  POST_MENS: [...required],
  POST_WOMEN: [...required],
  POST_KID: [...required],
  USER: [body("phone", MESSAGE.PHONE).exists()],
};
