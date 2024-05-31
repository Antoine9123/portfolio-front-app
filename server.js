const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

require('dotenv').config();


app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/dist/portfolio/browser'));


app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
  
    console.log('Received request to send email:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  
    const transporter = nodemailer.createTransport({
        host: 'mail.gandi.net',
        port: 587, 
        secure: false, 
        auth: {
          user: 'contact@antoine-leytens.dev', 
          pass: process.env.EMAIL_PASSWORD 
        }
      });
  
      const mailOptions = {
        from: 'contact@antoine-leytens.dev',
        to: process.env.EMAIL, 
        subject: `Message received from ${name}`,
        text: String.raw`
          Message received from ${name} (${email}):
      
          Name: ${name}
          Email: ${email}
          Message:
          ${message}
        `
      };
  
    try {
      console.log('Sending email...');
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).send('Error sending email: ' + error.message);
    }
  });
  

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/portfolio/browser/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});