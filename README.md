# shinstha
## Available Scripts

before running the project please run  ensure you are in the directory of the project
### `npm install embark -g`
 

### `npm install`
to install all the dependencies of the project

to run the embark server run
### `embark run --nodashboard`
 if you wish to connect to the Blockchain Network the the platform runs on
### `embark run ShintshaChain --nodashboard`

### once running please check the embarkArtifacts folder contracts subfolder you will find the contracts deployed
### To access the contract in a UI component
do the following
###const BountyContract = require("../../embarkArtifacts/contracts/BountyContract").default

### note the path might need to be changed depending on where the component is located in the project
Emabrk deploys the contract for you theres no need to run truffle migrate everytime because it does that for you just make sure you ran the command
### `embark run ShintshaChain --nodashboard`
everytime you make a change to the contract it will compile it for you


###Embark has web3 intergrated 
in it just import EmbarkJS from "../../embarkArtifacts/embarkjs"; into your component and you can easily access the apis in web3 like so

var test = EmbarkJS.Utils.fromAscii("hey")
every api available in web3 is also available in Embark


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
