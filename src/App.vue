<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense >
         <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="white darken-3" light app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Shinstha</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon large>
        <v-avatar size="32px" tile @click="toHomepage()">
          <img src="./images/exchange.svg">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-btn fab bottom right color="skyblue" dark fixed @click="logOut()">
      <v-icon>lock_open</v-icon>
    </v-btn>
    <v-btn fab bottom left color="skyblue" dark fixed @click="logIn()">
      <v-icon>lock</v-icon>
    </v-btn>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage">
    </loading>
  </v-app>
</template>

<script>
  import EmbarkJS from "../embarkArtifacts/embarkjs";
  import Swal from 'sweetalert2'
  import SecureLS from 'secure-ls'
  import Vue from 'vue'
  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Snotify from 'vue-snotify'; // 1. Import Snotify
  Vue.use(Snotify)

  export default {
    name: 'app',
    components: {
      Loading
    },
    data: () => ({
      dialog: false,
      drawer: null,
      web3: null,
      isLoading: false,
      fullPage: true,
      BountyContract: null,
      items: [{
          text: 'Shinstha',
          render: true
        },
        {
          icon: 'add_shopping_cart',
          text: 'Market Place',
          to: "/MarketView",
          render: true

        }

      ],
      loggedIn: false,
      SecureLS: new SecureLS(),
      canLogin: false
    }),
    beforeMount() {},
    mounted() {

      this.init();
    },
    watch: {
      loggedIn: function () {
        this.$forceUpdate()
      }
    },
    methods: {
      toHomepage() {
        location.replace("/")
      },
      error(message) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: message,
          allowOutsideClick: true
        })
      },
      success(message) {
        this.$snotify.success(message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        })
      },
      logOutMessage(message) {
        this.$snotify.info(message, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true
        })
      },
      init: async function () {
        EmbarkJS.onReady((err) => {
          if (err) {
            this.errorWithFooter(
              "<a href='https://metamask.io/;';>Please visit their website for instructions of how to download it</a>",
              'MetaMask is not installed!'
            )
            this.setLoggedIn(false, null)
          } else {
            this.canLogin = true
            this.web3 = EmbarkJS;
            if (this.getLoggedIn()) {
              this.initialiseUserData()
            }
            this.watchForAccountChanges()
          }
        })

      },
      watchForAccountChanges() {
        let tempThis = this
        window.ethereum.on('accountsChanged', function (accounts) {
          tempThis.logOut()
        })
        window.ethereum.on('networkChanged', function (netId) {
          tempThis.logOut()
        })
        window.ethereum.on('networkChanged', function (netId) {
          tempThis.logOut()
        })
      },
      errorWithFooter(footerMessage, text) {
        Swal.fire({
          type: 'error',
          title: 'OH Noo',
          text: text,
          footer: footerMessage
        })
      },
      setDefualt() {

        this.items.push({
          icon: 'time_to_leave',
          text: 'Delivery Service',
          to: "/DeliveryServiceView",
          render: this.getLoggedIn(),
        })
        this.items.push({
          icon: 'book',
          text: 'Registered Farms',
          to: "/FarmsView",
          render: this.getLoggedIn(),
        })

        this.items.push({
          divider: true
        })
        this.items.push({
          heading: 'Personal',
          render: this.getLoggedIn()

        })
        this.items.push({
          icon: 'compare_arrows',
          text: 'Loan Services',
          to: "/LoansView",
          render: this.getLoggedIn(),
        })
        this.items.push({
          icon: 'attach_money',
          text: 'Purchase Tokens',
          to: "/purchasetokensview",
          render: this.getLoggedIn(),
        })
      },
      registerUser() {

      },
      initialiseUserData() {
        if (!this.getLoggedIn()) {
          this.setLoggedIn(true, web3.eth.defaultAccount)
        }
        this.setDefualt()
      },
      registerNewUser() {

      },
      resetItems() {
        this.SecureLS.removeAll()
        this.items = []
        this.items.push({
            text: 'Shinstha',
            render: true
          }, {
            icon: 'add_shopping_cart',
            text: 'Market Place',
            to: "/MarketView",
            render: true

          }

        )
        this.loggedIn = false
        location.replace("/")
      },
      setLoggedIn(bool, address) {
        this.SecureLS.set('loggedIn', bool);
        this.SecureLS.set('address', address)
      },
      getLoggedIn() {
        return this.SecureLS.get("loggedIn")
      },
      getAddress() {
        return this.SecureLS.get("address")
      },
      logOut() {
        this.resetItems()
      },
      logIn() {
        if (!this.getLoggedIn() && this.canLogin) {
          this.registerUser()
        }
      },
      rerender() {}
    },
    props: {
      source: String
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .wrapText {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
</style>