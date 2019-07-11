require('dotenv').config({
  path: "../config/vars.env",
  encoding: "utf8"
})
let http = require('http')
let accountSid = 'AC98a511acfd66b38faeee1474018b9fbb';
let authToken = 'ddbb55e66a0d14a3112c03ed1fe1f317';
let client = require('twilio')(accountSid, authToken);
let twilio = require('twilio')
let port = process.env.PORT
let serverURL = process.env.SERVER
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
  db.run("CREATE TABLE IF NOT EXISTS products (number TEXT,selectedProduct INT)")
  db.run("CREATE TABLE IF NOT EXISTS cache (last TEXT, number INT PRIMARY KEY,entered INT,loan INT,commitedharvest INT,publicKey TEXT, privateKey TEXT,selectedProduct INT) ");
  //@dev create table keeping track of user selected products
})



const nodeAddress = process.env.NODEADDRESS
const contractAddress = "0xAafde9db1301D4cAb521c185D35dAE9f2174ca07"
web3 = new web3(new web3.providers.HttpProvider(nodeAddress));
var shintshaContract = web3.eth.Contract([{"constant":true,"inputs":[],"name":"getFarmerRegisteredProductKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"loaninterest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"productOwner","type":"address"},{"name":"productId","type":"uint256"}],"name":"requestTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"farmname","type":"string"},{"name":"farmAddress","type":"string"},{"name":"country","type":"string"},{"name":"phoneNumber","type":"string"}],"name":"registerFarmer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRequestedProductKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"productId","type":"uint256"}],"name":"tradeProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"requiredMinProductsForLoan","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"categories","type":"string"},{"name":"expected","type":"uint256"}],"name":"requestProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"investor","type":"address"}],"name":"getFarmInvestors","outputs":[{"name":"name","type":"string"},{"name":"surname","type":"string"},{"name":"homeAddress","type":"string"},{"name":"country","type":"string"},{"name":"phoneNumber","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"productOwner","type":"address"},{"name":"productId","type":"uint256"}],"name":"checkifProductCapNotReached","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRegisteredProductsKeys","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"productId","type":"uint256"}],"name":"commitToHarvesting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"categories","type":"string"},{"name":"sellingprice","type":"uint256"},{"name":"name","type":"string"},{"name":"endHarvest","type":"uint256"},{"name":"cap","type":"uint256"}],"name":"registerProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"surname","type":"string"},{"name":"homeAddress","type":"string"},{"name":"country","type":"string"},{"name":"phoneNumber","type":"string"}],"name":"registerInvestor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"productOwner","type":"address"},{"name":"productId","type":"uint256"},{"name":"contractCut","type":"uint256"},{"name":"isfiat","type":"bool"}],"name":"buyProduct","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLoanAmountOwing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"productId","type":"uint256"}],"name":"getFarmerProducts","outputs":[{"name":"name","type":"string"},{"name":"sellingPrice","type":"uint256"},{"name":"category","type":"string"},{"name":"dueDate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"payLoan","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"productExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"productId","type":"uint256"}],"name":"getProduct","outputs":[{"name":"name","type":"string"},{"name":"sellingPrice","type":"uint256"},{"name":"category","type":"string"},{"name":"dueDate","type":"uint256"},{"name":"productowner","type":"address"},{"name":"cut","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkifQaulifyLoan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkfarmerExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalEarned","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"farmer","type":"address"}],"name":"getFarmer","outputs":[{"name":"farmName","type":"string"},{"name":"farmAddress","type":"string"},{"name":"country","type":"string"},{"name":"phoneNumber","type":"string"},{"name":"totalRegistered","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"productId","type":"uint256"}],"name":"getFarmProductInvestorKeys","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractcutPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"due","type":"uint256"},{"name":"amountafter","type":"uint256"}],"name":"applyForLoan","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"loanpaymentPenalty","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenID","type":"uint256"}],"name":"emitId","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"referenceID","type":"bytes32"}],"name":"emitProposalId","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}],contractAddress);
let api = new twilio.twiml.MessagingResponse();
let productsMain = []
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

function saveSelectedProduct(user, productId) {
  db.run("REPLACE INTO products VALUES(" + "'" + user + "'" + "," + "'" + productId + "'" + ")")
}

function resetToMainmenu(from, setToNull) {
  db.run("REPLACE INTO cache VALUES('main'," + from + ',' + '-1' + ',' + '-1' + ',' + '-1' + "," + "''" + "," + "''" + "," + '-1' + ")")
}

function responseInvest(user) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAddress = ''
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAddress = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        web3.eth.getBalance(userAddress).then((balance, err) => {
          balance = web3.utils.fromWei(balance.toString(), 'ether')
          responseMessage = "Payment Method 💸 \n1. On Delivery 🚓  \n2. From Balance:  " + balance + "💰\n 0. To go back ↩️ \n"
          completeSavingAction(responseMessage, user, 'payment', 2)
        })
      } else {
        responseMessage = "Payment Method 💸 \n1. On Delivery 🚓  \n2. From Balance:  " + balance + "💰\n 0. To go back ↩️ \n"
        completeSavingAction(responseMessage, user, 'payment', 2)
      }
    }
  }



}

function main(from) {
  responseMessage = "Welcome 🙂 how can we help you \n1. Register \n2. Register Product/s \n3. Market Place \n4. Loan Services \n5. Delivery Services \n6. View Interested Investors \n7. View Registered Products \n8. View Balance ";
  //console.log(responseMessage.split('\n').length)
  resetToMainmenu(from)
  db.each("SELECT * FROM cache", function (err, row) {
    console.log("User id : " + row.last, row.number);
  });
  sendMessage(from, responseMessage, false)
}

function replaceLastAction(from, action, option, loan, commitedharvest, privateKey, publicKey, productId) {
  if (!loan || !commitedharvest || !privateKey || !publicKey || !productId) {
    loan = -1
    commitedharvest = -1
    publicKey = ""
    privateKey = ""
  }
  console.log(from, action, option, loan, commitedharvest, privateKey, publicKey)
  db.run("REPLACE INTO cache VALUES(" + "'" + action + "'" + ',' + "'" + from + "'" + ',' + "'" + option + "'" + "," + "'" + loan + "'" + ',' + commitedharvest + "," + "'" + publicKey + "'" + "," + "'" + privateKey + "'" + "," + "'" + productId + "'" + ")")
}

function updateCommitedHarvestProduct(index, user) {
  user = removeitems(user.split(""), ['+']).join("")
  console.log("user: " + user)
  db.run(`UPDATE cache SET commitedharvest=? WHERE number= ?`, [index, user], function (err) {
    if (err) {
      console.log("error: ", err)
    } else {
      console.log(`Stored harvest product index ${index}`)
      console.log(`Rows effected ${this.changes}`)
    }
  })
  db.each("SELECT * FROM cache", function (err, row) {
    console.log("User id : " + row.last, row.number);
  });
}

function removeNullorEmpty(array) {
  return array.filter((e) => {
    return e != ''
  })
}

function getProductSelected(user) {
  var responseMessage = ""
  db.each("select * from products", function (err, row) {
    console.log("Getting user interested product ", "Product id: ", row.selectedProduct)

    if (!err && row.number == user) {
      let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var req = new XMLHttpRequest();
      req.open("GET", serverURL, true);
      req.send();
      req.onreadystatechange = () => {
        console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
        if (req.readyState == 4) {
          let response = JSON.parse(req.responseText)
          console.log("response: " + response.responseText)
          let post = new XMLHttpRequest()
          post.onreadystatechange = () => {
            if (post.readyState == 4) {
              console.log("done")
              resetToMainmenu(user, true)
            }
          };
          if (response == undefined) {
            //response = keys;
            console.log("Oops no keys found!!")
          } else {
            var good = true
            var userAccount;
            for (var i = 0; i < response.length; i++) {
              if (!response[i].owned) {
                lastunused = i;
              }
              if (response[i].owner == user) {
                good = true
                userAccount = response[i].publicKey
                break
              }
            }
          }
          if (good) {
            console.log(row)
            shintshaContract.methods.getProduct(row.selectedProduct).call({
              gas: 8000000,
              from: userAccount
            }).then(function (product, error) {
              if (error) {
                //@dev do something
                console.log(error)
                resetToMainmenu(user)
                main(user)
              } else {
                cut = parseInt(new web3.utils.BN(product.cut._hex).toString())
                cut = Math.round((cut / 100) * (product.sellingPrice))
                console.log("cut: ", cut, "product")
                shintshaContract.methods.buyProduct(owner, row.selectedProduct, true).send({
                  from: userAccount,
                  gas: 8000000
                }).then(function (receipt, error) {
                  if (error) {
                    console.log(error)
                    resetToMainmenu(user)
                    main(user)
                  } else {
                    var responseMessage = "Successfully placed order ✓ please use this reference number when claiming the product \n Reference number: " + '_' + Math.random().toString(36).substr(2, 9); + "\n\nTransaction Reciept: " + receipt.transactionHash + "\n\n"
                    completeSavingAction(responseMessage, user, products, 3)
                  }
                })
              }
            })
          }

        }
      }
    }

  })
}

function generateReferenceNumber(user) {
  //@dev add user as investor for the product
  //@dev generate random reference number for buyer to use when picking up harvest save on smart contract
  //@dev call approve transfer of product from product owner to contract owner on payment recieved the product will be transfered to reciepient
  getProductSelected(user)
}

function fromBalance(from) {
  //@dev interact with user account for withdrawal
  //@dev add user as investor for the product
  var responseMessage = "Sucessfully paid for Product ✓\n Please use this reference number when claiming the product \n Reference Number: Some random reference number \n Date: Some random date \n Transaction Reciept: Some reciept"
  sendMessage(from, responseMessage)
  main(from)
}

function completeSavingAction(responseMessage, from, action, option, loan, productId) {
  sendMessage(from, responseMessage)
  replaceLastAction(from, action, option, loan, productId)
  console.log("Done saving user action")
}

function getProductsDetails(productNumber, user) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  let responseMessage = ''
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")
      } else {
        var good = true
        var userAccount;
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        productNumber = productNumber > 0 ? productNumber - 1 : productNumber
        shintshaContract.methods.productExists(productNumber).call({
          gas: 8000000,
          from: userAccount
        }).then(function (exits, error) {
          if (!exits || error) {
            responseMessage = "❌ Oops You made a mistake \nPlease ensure that you selected a product thats listed amongst the options \n"
            completeSavingAction(responseMessage, user, 'market', 3)
          } else {
            completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
            shintshaContract.methods.getProduct(productNumber).call({
              gas: 8000000
            }).then(function (product, error) {
              if (!error) {
                console.log(product)
                responseMessage = "Product Details ℹ️ \n" + product.name + " Produced by " + product.productowner + " Selling at " + product.sellingPrice + " Eth" + "\n\n"
                responseMessage += "1. Request to Trade 📋 \n 2. Invest in Product 💵 \n 0. To go back ↩️ \n"
                console.log(responseMessage)
                saveSelectedProduct(user, productNumber)
                completeSavingAction(responseMessage, user, 'productdetails', 3, -1, productNumber)
              } else {
                main(user)
              }
            })
          }
        })
      } else {
        responseMessage = "❌ Oops You made a mistake \nPlease ensure that you selected a product thats listed amongst the options \n"
        completeSavingAction(responseMessage, user, 'market', 3)
      }
    }
  }
}

function requestToTrade(user) {
  //@dev link to smart contract
  db.each("select * from products", function (err, row) {
    if (row.number == user) {
      let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var req = new XMLHttpRequest();
      req.open("GET", serverURL, true);
      req.send();
      var responseMessage = ''
      req.onreadystatechange = () => {
        console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
        if (req.readyState == 4) {
          let response = JSON.parse(req.responseText)
          console.log("response: " + response.responseText)
          let post = new XMLHttpRequest()
          post.onreadystatechange = () => {
            if (post.readyState == 4) {
              console.log("done")
              resetToMainmenu(user, true)
            }
          };
          if (response == undefined) {
            //response = keys;
            console.log("Oops no keys found!!")

          } else {
            var good = false
            var userAccount = ''
            for (var i = 0; i < response.length; i++) {
              if (!response[i].owned) {
                lastunused = i;
              }
              if (response[i].owner == user) {
                good = true
                break
              }
            }
          }
          if (good) {
            shintshaContract.methods.getProduct(row.selectedProduct).call({
              gas: 8000000,
              from: userAccount
            }).then((product, err) => {
              if (err || !product.canBeTraded) {
                responseMessage = "❌ Oops the product doesnt exist or cannot be traded"
                saveUserAction('products', user, 3);
              } else {
                shintshaContract.methods.getFarmer(product.owner).call({
                  gas: 8000000,
                  from: userAccount
                }).then((farmer, err) => {
                  if (!err) {
                    shintshaContract.methods.requestTrade(product.owner, farmer.phoneNumber).send({
                      gas: 8000000,
                      from: userAccount
                    }).then(function (receipt, error) {
                      if (!error) {
                        sendMessage("Trade Request 🚨 \n the following requested for a trade on one of your products\n", farmer.phoneNumber, true)
                        sendMessage(from, "Request for trade sent ✓\n\n The owner of the product you will be notified 🛎️ once the owner of the product has made a decision\n\n Transaction Reciept: " + +"n\n  ", true)
                        resetToMainmenu(user)
                        main(user)
                      } else {
                        responseMessage = "❌ Oops the product doesnt exist or cannot be traded"
                        saveUserAction('products', user, 3);
                      }
                    })

                  } else {
                    responseMessage = "❌ Oops the product doesnt exist or cannot be traded"
                    saveUserAction('products', user, 3);
                  }
                })
              }
            })
          }
        }
      }
    }
  })
  sendMessage(from, "Request for trade sent ✓\n\n The owner of the product you will be notified 🛎️ once the owner of the product has made a decision\n\n Transaction Reciept: Some Transaction receipt \n\n  ", true)
}



function getUserBalance(user) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAddress = ''
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            break
          }
        }
      }
      if (good) {
        web3.eth.getBalance(userAddress).then((balance, err) => {
          responseMessage = `Your current balance ${balance} Eth 💰 \n\n0. To go back ↩️ \n`
          completeSavingAction(responseMessage, user, "balanceView", 9)
        })
      } else {
        responseMessage = `❌ Oops seems like your not registered please register \n\n0. To go back ↩️ \n`
        completeSavingAction(responseMessage, user, "balanceView", 9)
      }
    }
  }
}


function getRegisteredProducts(user) {
  //@dev smart contract call
  var products = []
  var responseMessage = "Registered Product/s 🌾 \n\n"
  if (products.length == 0) {
    responseMessage = "You currently have no registered Products 😔 \n💡 Please Register a product/s in the option available in the main menu options \n\n"
  } else {
    for (var i = 0, k = 1; i < products.length; i++, k++) {
      responseMessage += k + ". Name: " + products[i].name + " Selling Price: " + products[i].sellingPrice + " Producer: " + products[i].producer + "\n"
    }
  }
  responseMessage += "\n0. To go back ↩️ \n"
  completeSavingAction(responseMessage, user, "registeredproductsList", 7)
}

function getRequested(user) {
  var requestedProducts = productsRequested()
  var responseMessage = "Requested Product/s 🌾\n\n"
  if (requestedProducts.length == 0) {
    responseMessage = "There are curretly no requested products"
  } else {
    //@dev decouple tuple e.g. product name,quntity
    var name;
    var quantity;
    for (var i = 0, k = 1; i < requestedProducts.length; i++, k++) {
      responseMessage += `${k}. Name: ${requestedProducts[i].Name}  Required Quantity: ${requestedProducts[i].Quantity}  Wanted By Month: ${requestedProducts[i].DatewantedBy}  Requester: ${requestedProducts[i].Requester} \n`
    }
  }
  responseMessage += "\n0. To go back ↩️ \n"
  completeSavingAction(responseMessage, user, "requestedView", 8)
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
          responseMessage = "Registration ✍ \n1. Register as Farmer 🚜 \n2. Register as Investor 💼 \n0. To go back ↩️ \n "
          completeSavingAction(responseMessage, from, 'registeroptions', 4)
          return
        case 'products':
          responseMessage = "Product Registration ✍ \n Please send us the product/s you would like to add in the following way \n\nProduct Name,Capital required for Harvest,Selling Price, Category, delivery date \n\ne.g \nMy Product,1000,200,fruit,March 2019  \n\n if you wish to register more than 1 product please enter each product details in the following way \n\nProduct Name,  Capital required for Harvest,Selling Price, Category, delivery date \nProduct Name,  Capital required for Harvest,Selling Price, Category, delivery date \n\n0. To go back ↩️ \n "
          completeSavingAction(responseMessage, from, 'productRegistration', option)
          return
        case 'market':
          console.log(action)
          getProducts(from)
          return
        case "loan":
          console.log("in loan")
          responseMessage = "Loan Services 🏦 \nWelcome, we offer short teams loans that paid over a period of 6 months❗  \n1. Request loan 🤲\n2. Make Loan Payment \n0. To go back ↩️ \n "
          completeSavingAction(responseMessage, from, "loanoptions", 4)
          return
        case "investors":
          getInvestors(from)
          return
        case "registeredproducts":
          getRegisteredProducts(from)
          return
        case "balance":
          getUserBalance(from)
          return
      }
    }
  });
}

function getProducts(user) {
  //@dev to change and retrieve from smart contract
  var done = false
  var count = 0
  var responseMessage = ""
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount;
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      console.log("Good: ", good, " UserAccount: ", userAccount)
      if (good) {
        responseMessage = "Market Place 🛒 \n Please select the product of your interest ⭐ \n"
        shintshaContract.methods.getRegisteredProductsKeys().call({
          gas: 8000000,
          from: userAccount
        }).then(function (keys, error) {
          console.log("keys: ", keys)
          if (error || keys.length == 0) {
            responseMessage = "There are currently no products on the market place 😔\n"
            responseMessage += "\n0. To go back ↩️ \n"
            completeSavingAction(responseMessage, user, 'market', 3)
          } else if (keys.length > 0) {
            //console.log(web3.utils)
            completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
            for (var i = 0, k = 0; i < keys.length; i++, k++) {
              shintshaContract.methods.getProduct(i).call({
                gas: 8000000
              }).then(function (product, err) {
                if (!err) {
                  console.log(product)
                  console.log(product.sellingPrice._hex)
                  count++
                  productsMain.push({
                    "name": product.name,
                    "capital": 0,
                    "sellingPrice": new web3.utils.BN(product.sellingPrice._hex).toString(),
                    "category": product.category,
                    "producer": product.productowner,
                    "Due": new Date(parseInt(new web3.utils.BN(product.dueDate._hex).toString())).toDateString()
                  })
                }
                i = i - 1
                console.log("keys: ", keys.length, " count: ", count, count == keys.length)
                console.log(productsMain[i], "\ni= ", i)
                responseMessage += k + ". Name: " + productsMain[i].name + "\nSelling Price: " + productsMain[i].sellingPrice + " Eth\nProducer: " + productsMain[i].producer + "\nHarvest Ends:" + productsMain[i].Due + "\n"
                if (count == keys.length) {
                  responseMessage += "\n0. To go back ↩️ \n"
                  completeSavingAction(responseMessage, user, "market", 3)
                }
              })
            }

          }

        })
      } else {
        responseMessage = "Market Place 🛒 \n\nThere are currently no products on the market place 😔\n"
        responseMessage += "\n0. To go back ↩️ \n"
        completeSavingAction(responseMessage, user, 'market', 3)
      }
    }
  }

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

function getInvestors(user) {
  //@dev smart contract call
  var responseMessage = "The following investors have invested in your harvest 🧑🏿‍🤝‍🧑🏿 \n\n"
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount;
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        console.log("good: ", good)
        shintshaContract.methods.getFarmerRegisteredProductKeys().call({
          from: userAccount,
          gas: 8000000
        }).then(function (keys, error) {
          console.log("error: ", error, " keys: ", keys)
          if (error) {
            responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product/s 😊 \n0. To go back ↩️\n "
            completeSavingAction(responseMessage, user, "investorsback", 6)
            return
          } else {
            var done = 0
            console.log("userAccount: 0");
            for (var i = 0, k = 1; i < keys.length; i++) {
              shintshaContract.getProduct(i).call({
                gas: 8000000,
                from: userAccount
              }).then(function (product, error) {
                if (error) {
                  responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
                  completeSavingAction(responseMessage, user, "investorsback", 6)
                  return
                }
                done++
                if (product.length == 0 || product.fiatInvestors.length == 0) {
                  responseMessage += "You currently have no investors interested in your harvest 😔 \n\n"
                  responseMessage += "\n0. To go back ↩️ \n"
                  completeSavingAction(responseMessage, user, 'investorsback', 6)
                  return
                }
                for (var a = 0; a < product.investors.length; a++, k++) {
                  responseMessage += k + ". " + product.investors[a] + "\n"
                }
                for (var a = 0; a < product.fiatInvestors.length; a++, k++) {
                  responseMessage += k + ". " + product.investors[a] + "\n"
                }
              })
              if (done == keys.length) {
                responseMessage += "\n0. To go back ↩️ \n"
                completeSavingAction(responseMessage, user, "investorsback", 6)
                return
              }
            }
          }
        })
      } else {
        responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
        completeSavingAction(responseMessage, user, "investorsback", 6)

      }
    }
  }

}

function cleanProductsValues(products) {
  var newProducts = []
  products.map((product) => {
    var name = product.name.split('')
    name = replaceItemInArraywithSpace(name, '+')
    console.log(product)
    var value = product.cap.split('')
    var sellingPrice = product.sellingPrice.split('')
    var date = product.date.split('')
    var category = product.category.split('')
    category = replaceItemInArraywithSpace(category, '+')
    value = removeitems(value, ['+', 'c'])
    sellingPrice = removeitems(sellingPrice, ['+', 'c'])
    date = replaceItemInArraywithSpace(date, '+')
    newProducts.push({
      "name": name.join(""),
      "cap": value.join(""),
      "sellingPrice": sellingPrice.join(""),
      "category": category.join(""),
      "date": date.join("")
    })
  });
  return newProducts
}

function parseProductDetails(details) {
  var products = []
  ////console.log(details)
  for (var i = 0; i < details.length; i += 5) {
    products.push({
      "name": details[i],
      "cap": details[i + 1],
      "sellingPrice": details[i + 2],
      "category": details[i + 3],
      "date": details[i + 4]
    })
  }
  var newProducts = cleanProductsValues(products)
  var ok = true
  for (var i = 0; i < newProducts.length && ok; i++) {
    if (isNaN(newProducts[i].capital) || isNaN(newProducts[i].sellingPrice)) {
      ////console.log("Not a number: "+newProducts[i].capital)
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
    var responseMessage = "❌ Oops You made a mistake \nPlease ensure that you provide the required information \n\n 💡 More specifically that the selling price and or value that you choose for the product/s is a valid number e.g. 12"
    return [], 0, responseMessage
  }
  console.log(newProducts)
  return newProducts, 1, ''
}

function requestLoan(from) {
  var responseMessage = "Loan Request 🤲 \nPlease enter the amount you wish to be loaned\n 💡 Please ensure that the number you enter is greater than 0 \n 0 to go back ↩️ \nAmount: "
  completeSavingAction(responseMessage, from, 'loanAmount', 1)
}

function getAmountOwing(from) {
  //@dev query smart contract
  return 0
}

function makeLoanPayment(user, amount) {
  var responseMessage = "Loan Payment 💳\n"
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount = ''
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        shintshaContract.methods.getLoanAmountOwing().call({
          gas: 8000000,
          from: userAccount
        }).then((amountOwning, error) => {
          if (error) {
            responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
            sendMessage(user, responseMessage, true)
          } else if (parseInt(new web3.utils.BN(amountOwning)) > 0) {
            responseMessage += "Outstanding Balance: " + owing + " 💰\n Please Enter the amount you would like to repay e.g 6 \n"
            completeSavingAction(responseMessage, user, "payloan", 4, owing)
          } else {
            responseMessage += "You currently dont have any outstanding loan/s 😊 \n0. To go back ↩️ \n"
            completeSavingAction(responseMessage, user, 'payloan', 4)
            saveUserAction('payloan', user, 4)
          }
        })
      } else {
        responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
        sendMessage(user, responseMessage)
      }
    }
  }
}

function farmerRegistration(from) {
  var responseMessage = "Farmer Registration ✍ \n Please enter the details of your farm in the following way 💡 \n farmName,farmaddress,country \n0. To go back ↩️ \n"
  completeSavingAction(responseMessage, from, 'registerfarmer')
}

function investorRegistration(from) {
  var responseMessage = "Investor Registration ✍ \n Please enter your details in the following way 💡 \n Name,surname,home address,country \n0. To go back ↩️ \n"
  completeSavingAction(responseMessage, from, 'registerinvestor')
}

function splitbyLine(string) {
  var separators = ['\\\%2c', '\\\%0'];
  //console.log(separators.join('|'));
  var tokens = string.split(new RegExp(separators.join('|'), 'g'));
  //console.log(tokens);
  return tokens
}

function getFarmerDetails(from) {
  //@dev call smart contract
}

function getDate() {
  const date1 = new Date();
  var newDate = new Date(date1.setMonth(date1.getMonth() + 8));
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]
  var cleandate = newDate.getDate() + " " + monthNames[newDate.getMonth()] + " " + newDate.getFullYear()
  console.log(cleandate)
  return cleandate
}

function checkifQaulify(user, amount, fromVerify) {
  //@dev check if user has any outstanding loans from smart contract
  console.log("checking if qaulify..")
  var responseMessage = ''
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount = ''
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        shintshaContract.methods.checkifQaulifyLoan().call({
          gas: 8000000,
          from: userAccount
        }).then((qaulify, error) => {
          if (error) {
            responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
            sendMessage(user, responseMessage)
          }
          if (qaulify) {
            responseMessage = `Loan Agreement 🤝 \n\nI, undersigned *${userAccount}* (Name of Debtor) hereby confirm and acknowledge to *Project Shinstha* (Name of Creditor), hereinafter called Creditor, that I am indebted to said Creditor in the amount of *${amount} Eth* as of date set forth below. The amount includes any and all legally permitted charges, such as accrued interest, up to and dated set forth below. I document in a court of law as a confession of judgment on my part (where legally permissible). I have promised and agreed to pay the entire amount by *${getDate()}* \n\n\n 💡 If you agree to the terms and conditions please respond with *agree*  \n\n0. To go back ↩️ \n`
            completeSavingAction(responseMessage, from, "agree", 4, amount)
          } else {
            sendMessage(from, "You currently do not qaulify for any loan 😥\n Please see option on how to improve your chances of getting a loan approval on the main menu 😥\n0. To go back ↩️")
          }
        })
      } else {
        responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
        sendMessage(user, responseMessage)
      }
    }
  }
}



function submitLoan(user) {
  //@dev submit to contract
  var responseMessage = '';
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount;
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = response[i].publicKey
            break
          }
        }
      }
      if (good) {
        var today = new Date()
        var due = new Date()
        due.setMonth(today.getMonth() + 5)
        var after = parseInt(amount + (amount * .07))
        console.log("due: ", due, " after: ", after)
        due = due.getTime()
        shintshaContract.methods.applyForLoan(amount, due, after).send({
          gas: 8000000,
          from: userAccount
        }).then((receipt, error) => {
          if (error) {
            console.log(errror)
            responseMessage = "❌ Oops seems like  dont qaulify for a loan"
            sendMessage(user, responseMessage, true)
          } else {
            web3.sendTransaction({
              to: userAccount,
              from: process.env.DEFAULTACCOUNT,
              value: web3.toWei(amount, "ether")
            })
            responseMessage = "Succesfully applied for a loan ✓ please check your balance 💰 \nTransactionHash: " + receipt.transactionHash + "\n"
            sendMessage(user, responseMessage, true);
          }
        })
      } else {
        responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
        main(user)
      }
    }
  }
}

function registerInvestor(user, investorDetails) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  //completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var lastunused = -1
        var good = true
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = false
            break
          }
        }
        replaceLastAction(user, "register", 1, -1, -1, response[lastunused].privateKey, response[lastunused].publicKey)
        if (good) {
          console.log("assigning address: ", response[lastunused].publicKey)
          response[lastunused].owned = true
          response[lastunused].owner = user
          let userAddress = response[lastunused].publicKey
          console.log("registered: ", registered)
          console.log("error checking user exits: ", err)
          completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
          console.log("user address: ", userAddress)
          var name = replaceItemInArraywithSpace(investorDetails[0].split(''), '+').join("").replace("%27")
          var surname = replaceItemInArraywithSpace(investorDetails[1].split(''), '+').join("").replace("%27")
          var address = replaceItemInArraywithSpace(investorDetails[2].split(''), '+').join("").replace("%27")
          var country = replaceItemInArraywithSpace(investorDetails[3].split(''), '+').join("").replace("%27")
          shintshaContract.methods.registerInvestor(name, surname, address, country, user).send({
            gas: 8000000,
            from: userAddress
          }).then((receipt, error) => {
            var responseMessage = ""
            console.log("receipt: ", receipt)
            console.log("error: ", error)
            console.log("name: ", name, " surname: ", surname, " country: ", country, " phoneno: ", user)
            if (receipt) {
              responseMessage = "Succesfully Registered Investor ✓ \n" + "Name: " + name + "\nSurname: " + surname + "\nAddress: " + address + "\nCountry: " + country + "\n\n"
              responseMessage += "\nTransaction Receipt: " + receipt.transactionHash + "\n\n"
              resetToMainmenu(user)
              sendMessage(user, responseMessage, true)
              main(user)
              console.log(response[lastunused], "\n\n")
              post.open("PUT", serverURL, true)
              post.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
              response = JSON.stringify(response)
              console.log(response)
              post.send(response);
            } else {
              responseMessage = "❌ Oops You made a mistake\nSeems like you alreay registered"
              sendMessage(responseMessage, user, true)
            }
          })
        } else {
          console.log("error assigning ethereum address")
          responseMessage = "❌ Oops You made a mistake\nSeems like you alreay registered"
          sendMessage(responseMessage, user, true)
        }
      }
    }
  }
}

function assignEthereumAccountFarmer(user, farmDetails) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  saveUserAction
  req.send();
  //completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
          main(user)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var lastunused = -1
        var good = true
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = false
            break
          }
        }
        replaceLastAction(user, "register", 1, -1, -1, response[lastunused].privateKey, response[lastunused].publicKey)
        if (good) {
          console.log("assigning address: ", response[lastunused].publicKey)
          response[lastunused].owned = true
          response[lastunused].owner = user
          let userAddress = response[lastunused].publicKey
          shintshaContract.methods.checkfarmerExist().call({
            gas: 8000000,
            from: userAddress
          }).then((registered, err) => {
            console.log("registered: ", registered)
            if (!registered) {
              completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 1)
              console.log("user address: ", userAddress)
              var name = replaceItemInArraywithSpace(farmDetails[0].split(''), '+').join("").replace("%27")
              var address = replaceItemInArraywithSpace(farmDetails[1].split(''), '+').join("").replace("%27")
              var country = replaceItemInArraywithSpace(farmDetails[2].split(''), '+').join("").replace("%27")
              shintshaContract.methods.registerFarmer(name, address, country, user).send({
                gas: 8000000,
                from: userAddress
              }).then((receipt, error) => {
                var responseMessage = ""
                console.log("receipt: ", receipt)
                console.log("error: ", error)
                console.log("name: ", name, " address: ", address, " country: ", country, " phoneno: ", user)
                if (receipt) {
                  responseMessage = "Succesfully Registered Farm ✓ \n" + "FarmName: " + name + "\nFarmAddress: " + address + "\nCountry: " + country
                  responseMessage += "\nTransaction Receipt: " + receipt.transactionHash + "\n\n"
                  sendMessage(user, responseMessage, false)
                  console.log(response[lastunused], "\n\n")
                  post.open("PUT", serverURL, true)
                  post.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                  response = JSON.stringify(response)
                  console.log(response)
                  post.send(response);
                } else {
                  responseMessage = "❌ Oops You made a mistake\nSeems like you alreay registered"
                  completeSavingAction(responseMessage, user, "registerfarmer", "1")
                }
              })
            } else {
              responseMessage = "❌ Oops You made a mistake\nSeems like you alreay registered"
              completeSavingAction(responseMessage, user, "registerfarmer", "1")

            }
          })
        } else {
          console.log("error assigning ethereum address")
          responseMessage = "❌ Oops You made a mistake\nSeems like you alreay registered"
          completeSavingAction(responseMessage, user, "registerfarmer", "1")
        }
      }

    }
  }
}

function getCommitedProduct(user) {

}

function commitHarvestRequest(user) {
  db.each("select * from cache", function (err, row) {
    console.log(row)
    if (user == row.number) {
      var products = productsRequested()
      console.log(products)
      var selected = products[row.commitedharvest].Name
      console.log("selected: " + selected, " commited ", row.commitedharvest)
      var responseMessage = `Succesfully commited to harvesting ${selected}`
      //@dev smart contract call
      sendMessage(user, responseMessage)
      saveUserAction('requested', user, 8)
    }
  })

}

function getUserAccount(user) {
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    //console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      //console.log("response: " + response.responseText)
      if (response == undefined) {
        response = keys;
        console.log("oops no keys found!!")

      } else {
        for (var i = 0; i < response.length; i++) {
          if (response[i].number == user) {
            return response.number
          }
        }
      }
      //console.log(response)

    }
  }
}

function payLoan(user, amount) {
  //@dev call smart contract 
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  var responseMessage = ''
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      let post = new XMLHttpRequest()
      post.onreadystatechange = () => {
        if (post.readyState == 4) {
          console.log("done")
          resetToMainmenu(user, true)
        }
      };
      if (response == undefined) {
        //response = keys;
        console.log("Oops no keys found!!")

      } else {
        var good = false
        var userAccount;
        for (var i = 0; i < response.length; i++) {
          if (!response[i].owned) {
            lastunused = i;
          }
          if (response[i].owner == user) {
            good = true
            userAccount = true
            break
          }
        }
      }
      if (good) {
        shintshaContract.methods.getLoanAmountOwing().call({
          gas: 8000000,
          from: userAccount
        }).then((amountOwning, error) => {
          if (error) {
            responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
            sendMessage(user, responseMessage, true)
          } else if (parseInt(new web3.utils.BN(amountOwning)) > 0) {
            shintshaContract.methods.payLoan(amount).send({
              gas: 8000000,
              from: userAccount
            }).then((receipt, error) => {
              if (error) {
                responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \nOr you currently have no outstanding Loans \n0. To go back ↩️\n "
                sendMessage(user, responseMessage, true)
              } else {
                web3.sendTransaction({
                  to: process.env.DEFAULTACCOUNT,
                  from: userAccount,
                  value: web3.toWei(amount, "ether")
                })
                var responseMessage = `Succesfully registered paid loan amount ${amount} Eth  ✓ \n\nTransaction hash: ${receipt.transactionHash}`
                completeSavingAction(responseMessage, user, "loan", 4)
              }
            })

          } else {
            responseMessage += "You currently dont have any outstanding loan/s 😊 \n0. To go back ↩️ \n"
            completeSavingAction(responseMessage, from, 'payloan', 4)
            saveUserAction('payloan', from, 4)
          }
        })

      } else {
        responseMessage = "❌ Oops seems like your not registered please register as a farmer and thereafter register your product 😊 \n0. To go back ↩️\n "
        sendMessage(user, responseMessage, true)
      }
    }
  }

  //@dev call smart contract
}

function getMonthIndex(month) {
  switch (month) {
    case "january":
      return 0
    case "february":
      return 1
    case "march":
      return 2
    case "april":
      return 3
    case "may":
      return 4
    case "june":
      return 5
    case "july":
      return 6
    case "august":
      return 7
    case "september":
      return 8
    case "october":
      return 9
    case "november":
      return 10
    case "december":
      return 11
    default:
      return -1
  }
}

function registerProducts(user, productDetails) {
  //@dev call smartContract
  var responseMessage = ''
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var req = new XMLHttpRequest();
  req.open("GET", serverURL, true);
  req.send();
  req.onreadystatechange = () => {
    console.log(req.readyState == XMLHttpRequest.DONE, XMLHttpRequest.DONE)
    if (req.readyState == 4) {
      let response = JSON.parse(req.responseText)
      console.log("response: " + response.responseText)
      if (response == undefined) {
        console.log("Oops no keys found!!")
      } else {
        var good = false
        var userAddress = ""
        for (var i = 0; i < response.length; i++) {
          if (response[i].owner == user) {
            good = true
            userAddress = response[i].publicKey;
            break
          }
        }
        if (good) {
          var done = 0
          for (var i = 0, k = 0; i < productDetails.length; i += 5, k++) {
            var name = replaceItemInArraywithSpace(productDetails[i].split(''), '+').join("")
            var cap = parseInt(replaceItemInArraywithSpace(productDetails[i + 1].split(''), '+').join(""))
            var sellingPrice = parseInt(replaceItemInArraywithSpace(productDetails[i + 2].split(''), '+').join(""))
            var category = replaceItemInArraywithSpace(productDetails[i + 3].split(''), '+').join("")
            var dateMonth = replaceItemInArraywithSpace(productDetails[i + 4].split('+'), '+')
            console.log("dateMonth: ", dateMonth)
            var month = getMonthIndex(dateMonth[0])
            var year = parseInt(dateMonth[1])
            var newDate = new Date(year, month, 0, 0, 0, 0, 0).getTime()
            var thisYear = new Date().getTime()
            console.log(newDate, "thisYear: ", thisYear, thisYear > newDate)
            if (dateMonth.length != 2 || month == -1 || thisYear > newDate) {
              responseMessage = "❌ Oops You made a mistake \nPlease ensure that the anticipated delivery date or end of the harvesting season is entered correctly and is a later date from today \n\ne.g *March 2025* \n\n"
              completeSavingAction(responseMessage, user, "products", 2)
              saveUserAction("products", user, 2)
              return
            }
            console.log("name: ", name)
            console.log("cap: ", cap)
            console.log("sellingPrice: ", sellingPrice)
            console.log("category: ", category)
            console.log("dateMonth: ", dateMonth)
            console.log("Month Index: ", month)
            console.log("Year: ", year)
            console.log("newDate: " + newDate)
            completeSavingAction("Please wait processing this could take some time⌛.... ", user, "processing", 2)
            shintshaContract.methods.registerProduct(category, sellingPrice, name, newDate, cap).send({
              from: userAddress,
              gas: 8000000
            }).then(function (receipt, error) {
              if (error) {
                console.log("error registereding product: ", error)
                responseMessage = "❌ Oops You made a mistake\nSeems like your not registered"
                sendMessage(user, responseMessage, true)
              } else {
                done++;
                responseMessage += k + ". Name: " + name + "\nCap: " + cap + "\nSellingPrice: " + sellingPrice + "\nCategory: " + category + "\nExpected Harvest End: " + dateMonth[0] + " " + dateMonth[1] + "\nTransaction Hash: " + receipt.transactionHash + "\n"
                console.log(responseMessage)
                console.log(done == productDetails.length / 5)
                console.log("Done: ", done, " productDetails.length/5: ", productDetails.length / 5)
                if (done == productDetails.length / 5) {
                  responseMessage += "\n\nSuccesfully registered product/s ✓ \n"
                  sendMessage(user, responseMessage, true)
                }
              }
            })
          }


        } else {
          responseMessage = "❌ Oops You made a mistake\nSeems like your not registered"
          sendMessage(user, responseMessage, true)
        }
      }
    }
  }
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
            case "processing":
              submenu = true
              responseMessage = "❌ Oops You still processing last transaction please wait till it completes😃"
              completeSavingAction(responseMessage, from, "processing", row.entered)
              return
            case "productRegistration":
              submenu = true
              console.log("In Product registration\n", messageRequest)
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  main(from)
                  return
                default:
                  let productDetails = removeNullorEmpty(splitbyLine(messageRequest))
                  if (productDetails.length % 5 >= 1) {
                    responseMessage = "❌ Oops You made a mistake \nPlease ensure that you provide the required information in the following way \n\n Product Name, Capital required for harvest, Selling Price, Category,delivery date \ne.g.\nMy product,1000,200,fruit,March 2019 \n\n if you wish to register more than 1 product please enter each product details in the following way \n\nName, Capital required for harvest, Selling Price, Category,delivery date \nName, Capital required for harvest, Selling Price, Category,delivery date  \n\n 💡 Please note each detail is to be seperated by a comma (,) \n0. To go back ↩️ \n"
                    completeSavingAction(responseMessage, from, "products", 2)
                  } else {
                    var response;
                    var success;
                    productDetails, success, response = parseProductDetails(productDetails)
                    if (success == 0) {
                      // sendMessage(from, response, false)
                      completeSavingAction(response, from, "products", 2)

                    } else {
                      console.log("dets prod: ", productDetails)
                      registerProducts(from, productDetails)
                    }
                  }
                  break
              }
              break
            case "productdetails":
              switch (messageRequest) {
                case "0":
                  saveUserAction('market', from, 3)
                  submenu = true
                  return
                case "1":
                  requestToTrade(from)
                case "2":
                  responseInvest(from)
                  break
                default:
                  console.log("In product dets")
                  responseMessage = "❌ Oops You made a mistake \nPlease ensure that you selected an option that is listed"
                  completeSavingAction(responseMessage, from, 'productdetails', messageRequest)
                  break
              }
              console.log("prod details")
              submenu = true
              break
            case "market":
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  submenu = false
                  break
                default:
                  var index = parseInt(messageRequest)
                  getProductsDetails(index, from)
                  submenu = true
                  break
              }
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
                  submenu = false
                  break
              }
              break
            case "loanoptions":
              console.log(messageRequest, "loanoptions")
              switch (messageRequest) {
                case "1":
                  requestLoan(from)
                  break
                case "2":
                  makeLoanPayment(from)
                  break
                case "0":
                  main(from)
                  return
                default:
                  responseMessage = "❌ Oops You made a mistake \nPlease ensure that you selected  an option that is listed"
                  completeSavingAction(responseMessage, from, 'loanoptions', messageRequest)
                  break
              }
              console.log("submenu: " + submenu)
              submenu = true
              break
            case "registeroptions":
              console.log(messageRequest == "0")
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  return
                case "1":
                  farmerRegistration(from)
                  break
                case "2":
                  investorRegistration(from)
                  break
                default:
                  responseMessage = "❌ Oops You made a mistake \nPlease ensure that you selected  an option that is listed"
                  completeSavingAction(responseMessage, from, 'registeroptions', messageRequest)
                  break
              }
              submenu = true
              break
            case "loanAmount":
              var validAmount = !isNaN(messageRequest) && parseInt(messageRequest) >= 1
              console.log("valid: ", validAmount, messageRequest)
              if (messageRequest == "0") {
                saveUserAction('loan', from, 4)
              } else if (validAmount) {
                checkifQaulify(from, parseInt(messageRequest))
              } else {
                responseMessage = "❌ Oops You made a mistake \nPlease ensure that you enter a number greater than 0 and is a valid number \n\n"
                completeSavingAction(responseMessage, from, "loanAmount", 4)
              }
              submenu = true
              break
            case "payloan":

              var validAmount = !isNaN(messageRequest) && parseInt(messageRequest) >= 1
              if (messageRequest == "0") {
                saveUserAction('loan', from, 4)
                break
              } else if (validAmount) {
                payLoan(from, parseInt(messageRequest))
              } else {
                responseMessage = "❌ Oops You made a mistake \nPlease ensure that you enter a number greater than 0 \n\n"
                completeSavingAction(responseMessage, from, "loanoptions", 4)
              }
              submenu = true
              break
            case "agree":
              switch (messageRequest) {
                case "0":
                  saveUserAction('loan', from, 4)
                  break
                case "agree":
                  submitLoan(from)
                  break
                default:
                  responseMessage = "❌ Oops You made a mistake \n💡If you wish to cancel the loan please reply with *0* otherwise please reply with *agree* \n\n"
                  completeSavingAction(responseMessage, from, "agree", 4)
              }
              break
            case "investorsback":
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  break
                default:
                  responseMessage = "❌ Oops You made a mistake \nPlease press *0* to return to the main menu \n\n"
                  completeSavingAction(responseMessage, from, "investorsback", 6)
                  break
              }
              break
            case "registeredproductsList":
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  return
                default:
                  if (isNaN(messageRequest)) {
                    responseMessage = "❌ Oops You made a mistake \nPlease ensure that you select a product thats listed  or reply with *0* to return to the main menu option\n\n"
                    completeSavingAction(responseMessage, from, "registeredproductsList", 7)
                    // sendMessage(from, responseMessage)
                    // saveUserAction("registeredproducts", from, 6)
                    return
                  } else {
                    getRegisteredProducts(from)
                    submenu = true;
                  }
              }
              return
            case "requestedView":
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  return
                default:
                  var index = parseInt(messageRequest)
                  submenu = true
                  var requestedProduct = productsRequested()
                  if (index > requestedProduct.length || index < 0 || isNaN(messageRequest)) {
                    responseMessage = "❌ Oops You made a mistake \nPlease ensure that you select a product request thats listed \n"
                    completeSavingAction(responseMessage, from, "requestedView", 8)
                  } else {
                    index = index > 0 ? index - 1 : index
                    var selectedProduct = requestedProduct[index]
                    //updateCommitedHarvestProduct(index, from)
                    responseMessage = `Commitment Page ✍️\n🚨 Are you sure you want to commit to harvesting ${selectedProduct.Name} \nFailure to fullfilling the commitment may result in a ban ✖️✖️✖️ \nreply with *yes* or *0* to cancel\n\n`
                    completeSavingAction(responseMessage, from, "requestedViewAnswer", 8)
                    console.log("index: " + index, " selected: ", selectedProduct)
                    replaceLastAction(from, 'requestedViewAnswer', 8, -1, index)
                    break
                  }
              }
              break
            case "requestedViewAnswer":
              switch (messageRequest) {
                case "0":
                  saveUserAction('requested', from, 8)
                  break
                case "yes":
                  commitHarvestRequest(from)
                  break
                default:
                  responseMessage = "❌ Oops You made a mistake \nPlease reply with *yes* or *0* to cancel the commitment\n\n"
                  completeSavingAction(responseMessage, from, 'requestedViewAnswer', 8)
                  break
              }
              break
            case "balanceView":
              switch (messageRequest) {
                case "0":
                  resetToMainmenu(from, true)
                  return
                default:
                  responseMessage = "❌ Oops You made a mistake \nPlease reply with *0* to return to the main menu options\n\n"
                  completeSavingAction(responseMessage, from, 'balanceView', 8)
                  break
              }
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
          //saveUserAction('delivery', from, 5)
          sendMessage(from, "⚠️Oops not yet implemented")
          break;
        case "6":
          saveUserAction('investors', from, 6)
          break;
        case "7":
          saveUserAction('registeredproducts', from, 7)
          break;
        case "8":
          saveUserAction('balance', from, 8)
          break;
        default:
          db.all("SELECT * FROM cache", [], (err, rows) => {
            if (rows.length == 0) {
              responseMessage = "Oops thats an invalid command ⚠️"
              console.log("here")
              sendMessage(from, responseMessage)
              return
            }
            db.each("SELECT * FROM cache", function (err, row) {
              if (("+" + row.number == from)) {
                switch (row.last) {
                  case "main":
                    main(from)
                    break
                  case "registerfarmer":
                    if (messageRequest == "0") {
                      saveUserAction('register', from, 4)
                    } else {
                      let farmDetails = splitbyLine(messageRequest)
                      if (farmDetails.length != 3) {
                        sendMessage(from, "❌ Oops You made a mistake \nPlease ensure that you provide the required information in the following way \n FarmName,FarmAddress,Country \n 💡 Please note each detail is to be seperated by a comma (,)")
                      } else {
                        console.log(farmDetails)
                        //@dev call smart contract function
                        assignEthereumAccountFarmer(from, farmDetails)

                      }
                    }
                    break
                  case "registerinvestor":
                    if (messageRequest == "0") {
                      saveUserAction('register', from, 4)
                    } else {
                      let investorDetails = splitbyLine(messageRequest)
                      if (investorDetails.length != 4) {
                        sendMessage(from, "❌ Oops You made a mistake \nPlease ensure that you provide the required information in the following way \n Your Name,Your Surname,Your address,Country \n 💡 Please note each detail is to be seperated by a comma (,)")
                      } else {
                        console.log(investorDetails)
                        //@dev call smart contract function
                        registerInvestor(from, investorDetails)
                      }
                    }
                    break
                  default:
                    if (row.entered == -1 && responseMessage == "menu") {
                      return
                    }
                    responseMessage = "Oops thats an invalid command ⚠️"
                    sendMessage(from, responseMessage)
                    console.log("here after product")
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