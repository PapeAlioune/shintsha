require('dotenv').config({
  path: "../config/vars.env",
  encoding: "utf8"
})
let http = require('http')
let accountSid = 'AC10d0aef5ff9646e80f4d70bd454e3abb';
let authToken = '0fdddc52e66b8bc781dc05f5472933be';
let client = require('twilio')(accountSid, authToken);
let twilio = require('twilio')
let port = process.env.PORT
console.log("Listening on Port: ", port)
let web3 = require('web3');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS cache (last TEXT, number INT PRIMARY KEY,entered INT) ");
})

const nodeAddress=process.env.NODEADDRESS
web3 = new web3(new web3.providers.HttpProvider(nodeAddress));
let shintshaContract = web3.eth.Contract([{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"buyTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"acceptInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"InvestmentExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"},{"name":"farm","type":"address"}],"name":"widthdrawInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"productId","type":"uint256"}],"name":"tradeProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"farmname","type":"string"},{"name":"farmAddress","type":"string"},{"name":"country","type":"string"}],"name":"registerFarmer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"registerInvestor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"farmerExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"investorExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"productExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"},{"name":"categories","type":"string"},{"name":"sellingprice","type":"uint256"},{"name":"description","type":"string"},{"name":"name","type":"string"}],"name":"registerProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"productowner","type":"address"},{"name":"productId","type":"uint256"}],"name":"buyProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"farm","type":"address"},{"name":"proposal","type":"string"}],"name":"proposeInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"rejectInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"tTokenaddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenID","type":"uint256"}],"name":"emitId","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"referenceID","type":"bytes32"}],"name":"emitProposalId","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}],"0xB64a53B8F1c5d2bFA7142BAFbcACD340159aBd9e");
let api = new twilio.twiml.MessagingResponse();
//app.listen(port)

/*=========Functions sections start=========*/
function sendMessage(to, message,callMain) {
  console.log("sending: "+to +" message: ",message)
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:' + to
    })
    .then((message) => {
       console.log(message.sid);
       if(callMain){
       main(to)
      }
      })
    .done();
}
function resetToMainmenu(from){
  db.run("REPLACE INTO cache VALUES('main',"+from+','+'1'+")")
}
 function main(from){
  responseMessage="Welcome 🙂 how can we help you \n 1. Register \n 2. Purchase T-Tokens \n 3. Register Product/s \n 4. View Registered Products \n 5. Trade Products \n 6. Open for Investments \n 7. View Interested Investors";
  console.log(responseMessage.split('\n').length)
  resetToMainmenu(from)
  db.each("SELECT * FROM cache", function(err, row) {
    console.log("User id : "+row.last, row.number);
});
  sendMessage(from,responseMessage)
 }



function saveUserAction(action,from){
  db.each("SELECT * FROM cache", function(err, row) {
    console.log(row)
    if(("+"+row.number ==from)&&(row.last == 'main')){
      responseMessage="Farmer "+action +" ✍ \n Please enter the details of your farm in the following way 💡 \n farmName,farmaddress,country"
      valid =true
      sendMessage(from,responseMessage)
      db.run("REPLACE INTO cache VALUES(" +"'"+action+"'"+','+from+','+'1'+")")
      return
    }
    console.log("User id : "+row.last, row.number," valid: ",valid);
  });
}

function removeCfromDetails(farmDetails){
  var tempFarmName=""
  for(var i =0; i < farmDetails[0].length;i++){
    if(farmDetails[0][i]!="+"){
      tempFarmName+=farmDetails[0][i]
    }
    else{
      tempFarmName+=" "
    }
  }
  updatedFarmdetails=[tempFarmName]
  for(var i=1; i < farmDetails.length;i++){
    var tempDets=""
    for(var k=1; k < farmDetails[i].length;k++){
      if(farmDetails[i][k]=="+"){
        tempDets+=" "
        continue
      }
      tempDets+=farmDetails[i][k]
      console.log(farmDetails[i][k])
    }
    updatedFarmdetails.push(tempDets)
  }
  return updatedFarmdetails
}
var s = http.createServer();
s.on('request', function(request, response) {
  response.writeHead(200);
  console.log(request.method);
  console.log(request.headers);
  console.log(request.url);

  var data = '';
  var from='';
  responseMessage="";
  request.on('data', function(chunk) {
    data =chunk.toString().split('&')
    from = "+"+data[data.length-2].split("=")[1].split("B")[1]
    console.log(from)
    db.all("SELECT * FROM cache",[],(err,rows)=>{ 
      var messageRequest=data[4].split("=")[1].toLowerCase()
    if(rows.length==0 && messageRequest != "menu"){
      responseMessage="Oops thats an invalid command ⚠️  Please use the 'menu' command to view menu"
      sendMessage(from,responseMessage)
      return
    }
    switch(messageRequest.toLowerCase()){
      case "menu":
        console.log("hey")
        main(from)
        break;
      case "1":
      responseMessage="here"
      let valid = false
      saveUserAction('registration',from)
      console.log("valid: ",valid)
      break;
      case "2":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;
        case "3":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;
        case "4":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;
        case "5":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;
        case "6":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;
        case "7":
        sendMessage(from,"Oops command not impleme️nted yet!! ⚠️ ")
        break;

      default:
        db.all("SELECT * FROM cache",[],(err,rows)=>{
          if(rows.length ==0){
            responseMessage="Oops thats an invalid command ⚠️"
            sendMessage(from,responseMessage)
            return
          }
        db.each("SELECT * FROM cache", function(err, row) {
          if(("+"+row.number ==from)){
            switch(row.last){
              case "registration":
                let farmDetails = messageRequest.split('%2')
                if(farmDetails.length != 3){
                  sendMessage(from,"❌ Opps You made a mistake \nPlease ensure that you provide the required information in the following way \n FarmName,FarmAddress,Country \n 💡 Please note each detail is to be seperated by a comma (,)")
                  return
                }
                console.log(farmDetails)
                farmDetails=removeCfromDetails(farmDetails)
                responseMessage ="Succesfully registered farm ✓ \n" + "FarmName: "+farmDetails[0] +"\nFarmAddress: "+farmDetails[1]+"\nCountry: "+farmDetails[2]+"\nThe next step ⏩ would be to purchase T-Tokens 💰"
              resetToMainmenu(from)
                sendMessage(from,responseMessage,true)
                break
                default:
                   responseMessage="Oops thats an invalid command ⚠️"
                   sendMessage(from,responseMessage)
                   break
            }
          }
          console.log("User id : "+row.last, row.number);
        })
      })
      break
    }
  })
    });
  /*request.on('end', function() {
    sendMessage(from,responseMessage)
   });*/

});
s.listen(port);
