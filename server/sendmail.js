const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

// These id's and secrets should come from .env file.
const CLIENT_ID = '675933389907-sa20j0dhd1d27lq3hpqa4skttht0bkge.apps.googleusercontent.com';
const CLEINT_SECRET ='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';
const REDIRECT_URI =  'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN ='1//04PnfJahh1kANCgYIARAAGAQSNwF-L9IrNcklAy_I0ITauIMe3IbOl2ZlD2pDWM9SFNOtIdyV3VcS7f_1WtdaCecDQfEt4HaprTM';
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (email, { gas_type, payment_method, amount }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'girishgg6363@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Gas-Booking <kumarvinayau@gmail.com>',
      to: email,
      subject: 'Gas Booking order summary',
      text: 'Your booking is confirmed',
      html: 
      `<div style="
          background-color: #ced4da;
          padding: 20px;
          border-radius: 20px;
          text-size: 20px;
          font-size: 13px;
          ">
          <h2>Thank you for booking with us</h2>
          <hr>
          <br>
          <p><b>Gas Type:</b> ${gas_type}</p>
          <p><b>Payment Method:</b> ${payment_method}</p>
          <p><b>Amount:</b> ₹${amount}</p>
          <br>
          <hr>
          <h3>Order will be delivered within 3 days</h3>
          <p>We will contact you soon</p>
      </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = sendMail;