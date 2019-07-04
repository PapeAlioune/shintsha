This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

before running the project please run 
### `npm install embark -g`
then 

### `npm install`
In the project directory, you can run:

### `npm start`
to run the embark server run
### `embark run --nodashboard`
 if you wish to connect to the Blockchain Network the farmers will be using run
### `embark run ShintshaChain --nodashboard`

### once running please check the embarkArtifacts folder contracts subfolder you will find the contracts deployed
To access the contract in a UI component
do the following
const BountyContract = require("../../embarkArtifacts/contracts/BountyContract").default

### note the path might need to be changed depending on where the component is located in the project
Emabrk deploys the contract for you theres no need to run truffle migrate everytime because it does that for you just make sure you ran the command
### `embark run ShintshaChain --nodashboard`
everytime you make a change to the contract it will compile it for you


Embark has web3 intergrated in it just
  import EmbarkJS from "../../embarkArtifacts/embarkjs";
into your component and you can easily access the apis in web3 like so

var test = EmbarkJS.Utils.fromAscii("hey")
every api available in web3 is also available in Embark



Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
to run smart contract test run
### `npm test-contracts`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
