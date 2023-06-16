const accountSid = "AC9500316d1dd9b63436622d2ee812e8c0";
const authToken = "47407e30d572edcbb9e2699a36f6b43d";


exports.generateOtp = ()=> {
    var digit = "0123456789";
    let otp = "";
    for (let i = 0; i <= 4; i++) {
      otp += digit[Math.floor(Math.random() * 10)];
    }
    console.log(otp);
    return otp;
  }
  
 exports.messageOtp = (phone, otp)=> {
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: `You're otp ${otp}`,
        from: "+12543313673",
        to: phone,
      })
      .then((message) => console.log(message.sid));
  }