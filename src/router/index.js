import LoansView from "../components/LoansView.vue";
import MarketView from "../components/MarketView.vue";
import FarmsView from "../components/FarmsView.vue";
import InvestorView from "../components/InvestorView.vue";
import ProductRequestView from "../components/ProductRequestView.vue";
import DeliveryServiceView from "../components/DeliveryServiceView.vue";
import PurchaseTokensView from "../components/PurchaseTokensView.vue";

import Router from 'vue-router';
import Vue from "vue"
Vue.use(Router)
export default new Router({
    routes: [{
            path: "/",
            redirect: "MarketView"
        }, {
            path: "/marketview",
            name: "MarketView",
            component: MarketView
        },
        {
            path: "/loansview",
            name: "LoansView",
            component: LoansView
        },
        {
            path: "/farmsview",
            name: "FarmsView",
            component: FarmsView
        },
        {
            path: "/investorview",
            name: "InvestorView",
            component: InvestorView
        },
        {
            path: "/productrequestview",
            name: "ProductRequestView",
            component: ProductRequestView
        },
        {
            path: "/deliveryserviceview",
            name: "DeliveryServiceView",
            component: DeliveryServiceView
        },
        {
            path: "/purchasetokensview",
            name: "PurchaseTokensView",
            component: PurchaseTokensView
        }
    ],
    mode: "history"
});