require("dotenv").config();
const token = process.env.MY_TOKEN;

exports.location = async(req, res, next)=>{
    const request = await fetch(`https://ipinfo.io/json?token=${token}`);
    const jsonResponse = await request.json();
    let response ={
        ip:jsonResponse.ip,
        country:jsonResponse.country,
        city:jsonResponse.city,
        state:jsonResponse.region,
        neighbour:jsonResponse.org
    }
    console.log(response)
    res.status(201).json(response)
}

// modify(productsSale);
// modify(carProducts);
// modify(productRent);
// modify(productPlots);
// modify(productOfficeAndShop);
// modify(productAccessories);
// modify(productMobile);
// modify(productTablets);




