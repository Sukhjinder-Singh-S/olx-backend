const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//variant1
const variant1 = new Schema({
  //variant 1
  vname1: { type: String, default: "AC" },

  //variant 2
  vname2: { type: String, default: "STD" },
});

//variant2
const variant2 = new Schema({
  //variant 1
  vname1: { type: String, default: "AC" },

  //variant 2
  vname2: { type: String, default: "AC BSII" },

});

//variant3
const variant3 = new Schema({
  //variant 1
  vname1: { type: String, default: "AT VXI" },

  //variant 2
  vname2: { type: String, default: "AT LXI" },
});

//variant4
const variant4 = new Schema({
  //variant 1
  vname1: { type: String, default: "X FUN" },

  //variant 2
  vname2: { type: String, default: "STD CNG" },
});

//variant5
const variant5 = new Schema({
  //variant 1
  vname1: { type: String, default: "VXI(O)" },

  //variant 2
  vname2: { type: String, default: "STD CNG" },
});

//sub-Brand list for Maruti suzuki


const subBrand1 = new Schema({
  //sub-brand 1
  name1: { type: String, default: "1000" },

  sb1: [variant1],

  //sub-brand 2
  name2: { type: String, default: "800" },

  sb2: [variant2],

  //sub-brand 3
  name3: { type: String, default: "A-Star" },

  sb3: [variant3],

  //sub-brand 4
  name4: { type: String, default: "Alto" },

  sb4: [variant4],

  //sub-brand 5
  name5: { type: String, default: "Alto 800" },

  sb5: [variant5],
});


//sub-Brand list for Hyundai

const subBrand2 = new Schema({
  //sub-brand 1
  name1: { type: String, default: "Aura" },

  sb1: variant1,

  //sub-brand 2
  name2: { type: String, default: "Alcazar" },

  sb2: variant2,

  //sub-brand 3
  name3: { type: String, default: "i20 N Line" },

  sb3: variant3,

  //sub-brand 4
  name4: { type: String, default: "Accent Hatchback" },

  sb4: variant4,

  //sub-brand 5
  name5: { type: String, default: "Grand i10 Prime" },

  sb5: variant5,
});


//sub-Brand list for Tata
const subBrand3 = new Schema({
  //sub-brand 1
  name1: { type: String, default: "Nexon EV Max" },
  sb1: variant1,

  //sub-brand 2
  name2: { type: String, default: "Altroz" },
  sb2: variant2,

  //sub-brand 3
  name3: { type: String, default: "Aria" },
  sb3: variant3,

  //sub-brand 4
  name4: { type: String, default: "Bolt" },
  sb4: variant4,

  //sub-brand 5
  name5: { type: String, default: "Estate" },
  sb5: variant5,
});


//sub-Brand list for Mahindra
const subBrand4 = new Schema({
  //sub-brand 1
  name1: { type: String, default: "XUV700" },
  sb1: variant1,

  //sub-brand 2
  name2: { type: String, default: "KUV100 NXT" },
  sb2: variant2,

  //sub-brand 3
  name3: { type: String, default: "Bolero Neo" },
  sb3: variant3,

  //sub-brand 4
  name4: { type: String, default: "Scorpio-N" },
  sb4: variant4,

  //sub-brand 5
  name5: { type: String, default: "Imperio" },
  sb5: variant5,
});


//sub-Brand list for Toyota
const subBrand5 = new Schema({
  //sub-brand 1
  name1: { type: String, default: "Urban Cruiser" },
  sb1: variant1,

  //sub-brand 2
  name2: { type: String, default: "Hilux" },
  sb2: variant2,

  //sub-brand 3
  name3: { type: String, default: "Ventury" },
  sb3: variant3,

  //sub-brand 4
  name4: { type: String, default: "VELLFIRE" },
  sb4: variant4,

  //sub-brand 5
  name5: { type: String, default: "YARIS HATCHBACK" },
  sb5: variant5,
});


const brandModel = new Schema({
  name: { type: String, default: "Popular Brands" },
  brand:
   [
    {
      name: { type: String, default: "Maruti Suzuki" },
      subBrand: subBrand1,
    },
    {
      name: { type: String, default: "Hyundai" },
        subBrand: subBrand2
    },
    {
      name: { type: String, default: "Tata" },
        subBrand: subBrand3
    },
    {
      name: { type: String, default: "Mahindra" },
        subBrand: subBrand4
    },
    {
      name: { type: String, default: "Toyota" },
        subBrand: subBrand5
    },
  ],
});


module.exports = mongoose.model("Brand", brandModel);
