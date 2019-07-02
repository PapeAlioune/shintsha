require('dotenv').config({
    path: "../config/vars.env",
    encoding: "utf8"
})
const accountSid = 'AC10d0aef5ff9646e80f4d70bd454e3abb';
const authToken = '0fdddc52e66b8bc781dc05f5472933be';
var twillio = require("twilio");
const client = twillio(accountSid, authToken);
let twiml = twillio.twiml.MessagingResponse();
const express = require("express")
const app = express()
const port = process.env.PORT
console.log(twiml)
client.messages
    .create({
        from: 'whatsapp:+1415523886',
        body: 'Hello there!',
        to: 'whatsapp:+270625960761'
    })
    .then(message => console.log(message.sid));
console.log("Listening on Port: ", port) 
//app.listen(port, "0.0.0.0")