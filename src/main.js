import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuetify'
import * as fb from 'firebase'
import BuyComponent from '@/components/Shared/BuyModal'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
    theme: {
        primary: colors.red.darken1
    }
})

Vue.config.productionTip = false;
Vue.component('app-buy-modal', BuyComponent);
new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        fb.initializeApp({
            apiKey: "AIzaSyBuTZVtLkJ04432mrkbSeB_jaW2QwNV4gI",
            authDomain: "itc-tes.firebaseapp.com",
            databaseURL: "https://itc-tes.firebaseio.com",
            projectId: "itc-tes",
            storageBucket: "itc-tes.appspot.com",
            messagingSenderId: "630799589546",
            appId: "1:630799589546:web:42917befab56205e"
        });

        fb.auth().onAuthStateChanged(user => {
            if(user) {
                this.$store.dispatch('userAuthorized', user)
            }
        });
        this.$store.dispatch('fetchAds');
    }
}).$mount('#app');
