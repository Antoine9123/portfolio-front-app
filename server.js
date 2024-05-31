const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/dist/portfolio/browser'));


app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  console.log('Received request to send email:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL, 
    subject: `Contact form submission from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/portfolio/browser/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});