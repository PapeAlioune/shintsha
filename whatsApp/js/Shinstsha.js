require('dotenv').config({
  path: "../config/vars.env",
  encoding: "utf8"
})
const https = require('https')
var keythereum = require("keythereum");
const accountSid = 'AC10d0aef5ff9646e80f4d70bd454e3abb';
const authToken = '0fdddc52e66b8bc781dc05f5472933be';
const client = require('twilio')(accountSid, authToken);
const express = require("express")
const app = express()
const request = require('request')
const port = process.env.PORT
const MessagingResponse = require('twilio').twiml.MessagingResponse;
console.log(MessagingResponse)
client.messages
  .create({
    body: 'Hello! This is an editable text message. You are free to change it and write whatever you like.',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+27625960761'
  })
  .then(message => console.log(message.sid))
  .done();
console.log("Listening on Port: ", port)
//app.listen(port, "0.0.0.0")
//generate private key    
let keys = []
for (var i = 0; i < 100; i++) {
  var dk = keythereum.create();
  var readableAddress = keythereum.privateKeyToAddress(dk.privateKey);
  console.log("public address:" + readableAddress);
  console.log("private key in hex:" + dk.privateKey.toString('hex'))
  var data = {
    privateKey: dk.privateKey.toString('hex'),
    publicKey: readableAddress,
    owned: false
  }
  keys.push(data)

}
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.open("GET", "https://api.myjson.com/bins/jm0zr", true);
req.send();
req.onreadystatechange = () => {
  console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
  if (req.readyState == 4) {
    let response = JSON.parse(req.responseText)
    console.log("response: " + response.responseText)
    let post = new XMLHttpRequest()
    post.onreadystatechange = () => {
      if (post.readyState == 4) {console.log("done")}
    };
    if (response ==undefined) {
      response = keys;
      console.log("here")

    } else {
      for (var i = 0; i < keys.length; i++) {
        response.push(keys[i])
      }
    }
    console.log(response)
    post.open("PUT", "https://api.myjson.com/bins/jm0zr", true)
    post.setRequestHeader("Content-type", "application/json")
    post.send(JSON.stringify(response));
  }
}