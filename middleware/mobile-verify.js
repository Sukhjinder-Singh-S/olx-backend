require("dotenv").config();
exports.generateOtp = () => {
  var digit = "0123456789";
  let otp = "";
  for (let i = 0; i <= 4; i++) {
    otp += digit[Math.floor(Math.random() * 10)];
  }
  console.log(otp);
  return otp;
};

exports.messageOtp = (phone, otp) => {
  const client = require("twilio")(
    process.env.ACCOUNTSID,
    process.env.AUTHTOKEN
  );
  client.messages
    .create({
      body: `Dear Customer, use code ${otp} to login to your OLX account. Never share your code with anyone.`,
      from: process.env.TWILLIO_NUM,
      to: phone,
    })
    .then((message) => console.log(message.sid));
};
