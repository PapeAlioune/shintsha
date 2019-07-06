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
//console.log("Listening on Port: ", port)
let web3 = require('web3');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return //console.error(err.message);
  }
  //console.log('Connected to the in-memory SQlite database.');
});
db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS cache (last TEXT, number INT PRIMARY KEY,entered INT) ");
  //@dev create table keeping track of user selected products
})

const nodeAddress = process.env.NODEADDRESS
web3 = new web3(new web3.providers.HttpProvider(nodeAddress));
//let shintshaContract = web3.eth.Contract([{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"buyTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"acceptInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"InvestmentExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"},{"name":"farm","type":"address"}],"name":"widthdrawInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"productId","type":"uint256"}],"name":"tradeProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"farmname","type":"string"},{"name":"farmAddress","type":"string"},{"name":"country","type":"string"}],"name":"registerFarmer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"registerInvestor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"farmerExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"investorExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"productExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"},{"name":"categories","type":"string"},{"name":"sellingprice","type":"uint256"},{"name":"description","type":"string"},{"name":"name","type":"string"}],"name":"registerProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"productowner","type":"address"},{"name":"productId","type":"uint256"}],"name":"buyProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"farm","type":"address"},{"name":"proposal","type":"string"}],"name":"proposeInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"referenceid","type":"bytes32"}],"name":"rejectInvestment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"tTokenaddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenID","type":"uint256"}],"name":"emitId","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"referenceID","type":"bytes32"}],"name":"emitProposalId","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}],"0xB64a53B8F1c5d2bFA7142BAFbcACD340159aBd9e");
let api = new twilio.twiml.MessagingResponse();
//app.listen(port)

/*=========Functions sections start=========*/
function sendMessage(to, message, callMain) {
  console.log("sending: " + to + " message: ", message)
  if (to == "+undefined") {
    return
  }
  client.messages
    .create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:' + to
    })
    .then((message) => {
      //console.log(message.sid);
      if (callMain) {
        main(to)
      }
    })
    .done();
}

function resetToMainmenu(from, setToNull) {
  db.run("REPLACE INTO cache VALUES('main'," + from + ',' + '-1' + ")")
}

function main(from) {
  responseMessage = "Welcome 🙂 how can we help you \n 1. Register \n 2. Register Product/s \n 3. Market Place \n 4. Loan Services \n 5. Delivery Services \n 6. View Interested Investors \n 7. View Requested Products";
  //console.log(responseMessage.split('\n').length)
  resetToMainmenu(from)
  db.each("SELECT * FROM cache", function (err, row) {
    console.log("User id : " + row.last, row.number);
  });
  sendMessage(from, responseMessage, false)
}


function replaceLastAction(from, action, option) {
  db.run("REPLACE INTO cache (last,number,entered) VALUES(" + "'" + action + "'" + ',' + "'" + from + "'" + ',' + "'" + option + "'" + ")")
}

function removeNullorEmpty(array) {
  return array.filter((e) => {
    return e != ''
  })
}

function generateReferenceNumber(from) {
  //@dev add user as investor for the product
  //@dev generate random reference number for buyer to use when picking up harvest save on smart contract
  var responseMessage = "Successfully placed order ✓ please use this reference number when claiming the product \n Reference number: " + "some random reference number \n\n Delivery Date: Some date \n Transaction Reciept: Some reciept"
  sendMessage(from, responseMessage)
  main(from)
}

function fromBalance(from) {
  //@dev interact with user account for withdrawal
  //@dev add user as investor for the product
  var responseMessage = "Sucessfully paid for Product ✓\n Please use this reference number when claiming the product \n Reference Number: Some random reference number \n Date: Some random date \n Transaction Reciept: Some reciept"
  sendMessage(from, responseMessage)
  main(from)
}

function completeSavingAction(responseMessage, from, action, option) {
  sendMessage(from, responseMessage)
  replaceLastAction(from, action, option)
  console.log("Done saving user action")
}

function getProductsDetails(productNumber) {
  var products = getProducts()
  return products[productNumber]
}

function requestToTrade(from) {
  //@dev link to smart contract
  sendMessage(from, "Request for trade sent ✓\n\n The owner of the product you will be notified 🛎️ once the owner of the product has made a decision\n\n Transaction Reciept: Some Transaction receipt \n\n  ", true)
}



function getUserBalance(from) {
  //@dev get user balance
  return 0
}

function saveUserAction(action, from, option) {
  console.log("user selected: ", action, "\n", "number: ", from)
  db.each("SELECT * FROM cache", function (err, row) {
    //console.log(row)
    var number = "+" + row.number
    let responseMessage = ''
    if ((number == from)) {
      switch (action) {
        case 'register':
          responseMessage = "Farmer Registration ✍ \n Please enter the details of your farm in the following way 💡 \n farmName,farmaddress,country"
          completeSavingAction(responseMessage, from, action, option)
          return
        case 'products':
          responseMessage = "Product Registration ✍ \n Please send us the product/s you would like to add in the following way \n\nProduct Name, Product Value, Selling Price, Category \n\n if you wish to register more than 1 product please enter each product details in the following way \n\nName, Product Value, Selling Price, Category \nName, Product Value, Selling Price, Category \n"
          completeSavingAction(responseMessage, from, action, option)
          return
        case 'market':
          console.log(action)
          responseMessage = "Market Place 🛒 \n Please select the product of your interest ⭐ \n"
          var products = getProducts()
          for (var i = 0, k = 1; i < products.length; i++, k++) {
            responseMessage += k + ". Name: " + products[i].name + " Selling Price: " + products[i].sellingPrice + " Producer: " + products[i].producer + "\n"
          }
          completeSavingAction(responseMessage, from, action, option)
          return
        case "loan":
          console.log("in loan")
          responseMessage = "Loans Services 🏦 \n1. Request loan 🤲\n2. Make Loan Payment \n0. To go back ↩️ \n "
          completeSavingAction(responseMessage, from, "loanoptions", 4)
          return

      }
    }
  });
}

function getProducts() {
  //@dev to change and retrieve from smart contract
  var products = []
  for (var i = 0; i < 10; i++) {
    products.push({
      "name": "Product" + i,
      "value": 200,
      "sellingPrice": 300,
      "category": "fruit",
      "producer": "some farm name"
    })
  }
  return products
}

function removeitems(from, toRemove) {
  return from.filter((e) => {
    return !toRemove.includes(e)
  })
}

function replaceItemInArraywithSpace(array, item) {
  //console.log(array)
  return array.map(function (e) {
    ////console.log(e)
    return e == item ? " " : e
  })
}

function cleanProductsValues(products) {
  var newProducts = []
  products.map((product) => {
    var name = product.name.split('')
    name = replaceItemInArraywithSpace(name, '+')
    console.log(name)
    var value = product.value.split('')
    var sellingPrice = product.sellingPrice.split('')
    var category = product.category.split('')
    category = replaceItemInArraywithSpace(category, '+')
    value = removeitems(value, ['+', 'c'])
    sellingPrice = removeitems(sellingPrice, ['+', 'c'])
    newProducts.push({
      "name": name.join(""),
      "value": value.join(""),
      "sellingPrice": sellingPrice.join(""),
      "category": category.join("")
    })
  });
  return newProducts
}

function parseProductDetails(details) {
  var products = []
  ////console.log(details)
  for (var i = 0; i < details.length; i += 4) {
    products.push({
      "name": details[i],
      "value": details[i + 1],
      "sellingPrice": details[i + 2],
      "category": details[i + 3]
    })
  }
  var newProducts = cleanProductsValues(products)
  var ok = true
  for (var i = 0; i < newProducts.length && ok; i++) {
    if (isNaN(newProducts[i].value) || isNaN(newProducts[i].sellingPrice)) {
      ////console.log("Not a number: "+newProducts[i].value)
      ok = false
      break
    }
  }
  for (var i = 0; i < newProducts.length; i++) {
    console.log(newProducts[i].name.indexOf('+'))
    if (newProducts[i].name.indexOf('+') !== -1) {
      newProducts[i].name[newProducts[i].name.indexOf('+')] = " "
    }
  }
  //console.log("OK: ", ok)
  if (!ok) {
    var responseMessage = "❌ Opps You made a mistake \nPlease ensure that you provide the required information \n\n 💡 More specifically that the selling price and or value that you choose for the product/s is a valid number e.g. 12"
    return [], 0, responseMessage
  }
  console.log(newProducts)
  return newProducts, 1, ''
}

function requestLoan(from) {
  var responseMessage = "Loan Request 🤲 \nPlease enter the amount you wish to be loaned\n 💡 Please ensure that the number you enter is greater than 0 \n 0 to go back ↩️ \nAmount: "
  completeSavingAction(responseMessage, from, 'loanAmount', 1)
}
function getAmountOwing(from){
  //@dev query smart contract
  return 0
}
function makeLoanPayment(from) {
  var responseMessage = "Loan Payment 💳\n"
  var owing = getAmountOwing(from)
  if (owing > 0) {
    responseMessage += "Outstanding Balance: " + owing + " 💰\n Please Enter the amount you would like to repay e.g 6 \n"
    completeSavingAction(responseMessage, from, "verifyloan", 4)
  } else {
    responseMessage += "You currently dont have any outstanding loan/s 😊 \n0. To go back ↩️ \n"
    completeSavingAction(responseMessage,from,'verifyloan',4)
    saveUserAction('verifyloan', from, 4)

  }

}

function splitbyLine(string) {
  var separators = ['\\\%2c', '\\\%0'];
  //console.log(separators.join('|'));
  var tokens = string.split(new RegExp(separators.join('|'), 'g'));
  //console.log(tokens);
  return tokens
}

function checkifQaulify(from) {
  //@dev check if user has any outstanding loans
  sendMessage(from, "You currently do not qaulify for any loan 😥\n Please see option on how to improve your chances of getting a loan approval on the main menu 😥")
  resetToMainmenu(from, true)
}

function registerProducts(from) {
  //@dev call smartContract
}
var s = http.createServer();
s.on('request', function (request, response) {
  response.writeHead(200);
  ////console.log(request.method);
  // //console.log(request.headers);
  ////console.log(request.url);
  ////console.log(request)
  var data = '';
  var from = '';
  responseMessage = "";
  request.on('data', function (chunk) {
    data = chunk.toString().split('&')
    from = "+" + data[data.length - 2].split("=")[1].split("B")[1]
    //console.log(from)
    db.all("SELECT * FROM cache", [], (err, rows) => {
      var messageRequest = data[4].split("=")[1].toLowerCase()
      if (rows.length == 0 && messageRequest != "menu") {
        responseMessage = "Oops thats an invalid command ⚠️  Please use the 'menu' command to view menu"
        sendMessage(from, responseMessage)
        return
      }
      let submenu = false
      rows.forEach((row) => {
        console.log(row)
        if (row.number == from) {
          switch (row.last) {
            case "productdetails":
              switch (messageRequest) {
                case "0":
                  saveUserAction('market', from, 3)
                  return
                case "1":
                  requestToTrade(from)
                case "2":
                  responseMessage = "Payment Method 💸 \n1. On Delivery 🚓  \n2. From Balance:  " + getUserBalance(from) + "💰\n 0. To go back ↩️ \n"
                  completeSavingAction(responseMessage, from, 'payment', messageRequest)
                  break
              }
              console.log("prod details")
              submenu = true
              break
            case "market":
              console.log("in market")
              var productDets = getProductsDetails(parseInt(messageRequest))
              responseMessage = "Product Details ℹ️ \n" + productDets.name + " Produced by " + productDets.producer + " Selling at " + productDets.sellingPrice + "\n\n"
              responseMessage += "1. Request to Trade 📋 \n 2. Purchase Product 💵 \n 0. To go back ↩️ \n"
              completeSavingAction(responseMessage, from, 'productdetails', messageRequest)
              submenu = true
              break
            case "payment":
              submenu = true
              switch (messageRequest) {
                case "1":
                  generateReferenceNumber(from)
                  break
                case "2":
                  fromBalance(from)
                  break
                case "0":
                  saveUserAction('productdetails', from, 3)
                  break
              }
              break
            case "loanoptions":
              console.log(messageRequest,"loanoptions")
              switch (messageRequest) {
                case "1":
                  requestLoan(from)
                  break
                case "2":
                  makeLoanPayment(from)
                  break
                case "0":
                  main(from)
                  break
              }
              submenu = true
              break
          }
        }
      })
      if (submenu) {
        return
      }
      console.log(messageRequest)
      switch (messageRequest.toLowerCase()) {
        case "menu":
          main(from)
          break;
        case "1":
          saveUserAction('register', from, 1)
          break;
        case "2":
          saveUserAction('products', from, 2)
          break;
        case "3":
          saveUserAction('market', from, 3)
          break;
        case "4":
          saveUserAction('loan', from, 4)
          break;
        case "5":
          saveUserAction('delivery', from, 5)
          break;
        case "6":
          saveUserAction('investors', from, 6)
          break;
        case "7":
          saveUserAction('requested', from, 7)
          break;

        default:
          db.all("SELECT * FROM cache", [], (err, rows) => {
            if (rows.length == 0) {
              responseMessage = "Oops thats an invalid command ⚠️"
              sendMessage(from, responseMessage)
              return
            }
            db.each("SELECT * FROM cache", function (err, row) {
              if (("+" + row.number == from)) {
                switch (row.last) {
                  case "main":
                    main(from)
                    break
                  case "register":
                    let farmDetails = splitbyLine(messageRequest)
                    if (farmDetails.length != 3) {
                      sendMessage(from, "❌ Opps You made a mistake \nPlease ensure that you provide the required information in the following way \n FarmName,FarmAddress,Country \n 💡 Please note each detail is to be seperated by a comma (,)")
                      return
                    }
                    console.log(farmDetails)
                    //@dev call smart contract function
                    responseMessage = "Succesfully registered farm ✓ \n" + "FarmName: " + replaceItemInArraywithSpace(farmDetails[0].split(''), '+').join("") + "\nFarmAddress: " + replaceItemInArraywithSpace(farmDetails[1].split(''), '+').join("") + "\nCountry: " + replaceItemInArraywithSpace(farmDetails[2].split(''), '+').join("") + "\n"
                    sendMessage(from, responseMessage, true)
                    break
                  case "products":
                    let productDetails = removeNullorEmpty(splitbyLine(messageRequest))

                    if (productDetails.length % 4 >= 1) {
                      responseMessage = "❌ Opps You made a mistake \nPlease ensure that you provide the required information in the following way \n FarmName,FarmAddress,Country \n\n Product Name, Product Value, Selling Price, Category \n\n if you wish to register more than 1 product please enter each product details in the following way \n\nName, Product Value, Selling Price, Category \nName, Product Value, Selling Price, Category  \n\n 💡 Please note each detail is to be seperated by a comma (,)"
                      sendMessage(from, responseMessage, false)
                      return
                    }
                    var response;
                    var success;
                    productDetails, success, response = parseProductDetails(productDetails)
                    if (success == 0) {
                      sendMessage(from, response, false)
                      main(from)
                      return
                    }
                    console.log(productDetails)
                    responseMessage = "Succesfully registered product/s ✓ \n"
                    for (var i = 0, k = 1; i < productDetails.length; i++, k++) {
                      responseMessage += k + ". Name: " + replaceItemInArraywithSpace(productDetails[0].split(''), '+').join("") + " Value: " + productDetails[1] + " SellingPrice: " + productDetails[2] + " Category: " + replaceItemInArraywithSpace(productDetails[3].split(''), '+').join("") + "\n"
                    }
                    responseMessage += "\n\nTransaction Receipt: Some transaction reciept"
                    sendMessage(from, responseMessage)
                    main(from)
                    break;

                  case "loanAmount":
                    var validAmount = isNaN(messageRequest) && parseInt(messageRequest) >= 1
                    if (messageRequest == "0") {
                      saveUserAction('loan', from, 4)
                  
                    }
                     else if (validAmount) {
                      checkifQaulify(from)
                    } else {
                      responseMessage = "❌ Opps You made a mistake \nPlease ensure that you enter a number greater than 0 \n 0 to go back ↩️ \n"
                      sendMessage(from, responseMessage, false)
                      completeSavingAction(responseMessage, from, "loanoptions", 4)
                    }
                    break
                  case "verifyloan":
                    var validAmount = isNaN(messageRequest) && parseInt(messageRequest) >= 1
                    if (messageRequest == "0") {
                      saveUserAction('loan', from,  4)
                      break
                    }
                    if (validAmount) {
                      checkifQaulify(from)
                    } else {
                      responseMessage = "❌ Opps You made a mistake \nPlease ensure that you enter a number greater than 0 \n 0 to go back ↩️ \n"
                      sendMessage(from, responseMessage, false)
                      completeSavingAction(responseMessage, from, "loanoptions", 4)
                    }
                    break
                  default:
                    responseMessage = "Oops thats an invalid command ⚠️"
                    sendMessage(from, responseMessage)
                    break
                }
              }
              //console.log("User id : " + row.last, row.number);
            })
          })
          break
      }
    })
    request.on('error', (err) => {
      sendMessage(from, "Soemthing went wrong!! ⚠️ ")
    })
  });
  /*request.on('end', function() {
    sendMessage(from,responseMessage)
   });*/

});
s.listen(port);