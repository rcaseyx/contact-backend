require('dotenv').load();
const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN, PORT, GMAIL_USER, GMAIL_PASS} = require('./config');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(express.json());
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(morgan('common'));

app.post('/contact', jsonParser, (req, res) => {
    let mailOpts;
    let smtpTrans;
    smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });
    mailOpts = {
        from: req.body.name + ' &lt;' + req.body.email + '&gt;',
        to: GMAIL_USER,
        subject: 'New message from rcaseyx contact form',
        text: `${req.body.name} (${req.body.email}): ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(204).send("Message sent successfully");
        }
        smtpTrans.close();
    });
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Something went wrong', err);
    }
    console.log(`App is running on port ${PORT}`);
});
