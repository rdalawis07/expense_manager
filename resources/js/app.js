
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import 'babel-polyfill';
window.Vue = require('vue');
import Vue from 'vue';
import Axios from 'axios';
import Vuetify from 'vuetify';
import 'typeface-roboto/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import router from './routes.js';
import store from './stores.js';
import Chart from 'chart.js';
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import moment from 'moment';

window.moment = moment;
Vue.use(Vuetify);
Vue.prototype.$axios = Axios;
window.VueSweetalert2 = VueSweetalert2;
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;


const opts = {
    theme: {
        dark: false,
        themes: {
            light: {
            primary: "#4682b4",
            secondary: "#b0bec5",
            accent: "#8c9eff",
            error: "#b71c1c",
            },
        },
    },
    iconfont: 'mdi',
};

const app = new Vue({
    vuetify : new Vuetify(opts),
    router: router,
    store: store,
}).$mount('#app');
