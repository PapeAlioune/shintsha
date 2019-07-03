import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { loadWeb3, loadAccount } from '../store/interactions'
import { contractsLoadedSelector } from '../store/selectors'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    await loadAccount(web3, dispatch)
  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App)