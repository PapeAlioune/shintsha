import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Vuetify from 'vuetify'
import VueAsyncData from "vue-async-data";
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader


Vue.use(VueAsyncData)
Vue.use(Vuetify)
Vue.config.productionTip = false
EmbarkJS.onReady(() => {
  new Vue({
    render: h => h(App),
    router
  }).$mount('#app')
})