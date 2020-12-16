import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import HomePage from '@/components/pages/HomePage.vue';

import NeutralizingPage from '@/components/pages/NeutralizingPage.vue';
import MuddyPage from '@/components/pages/MuddyPage.vue';
import AccountPage from '@/components/pages/AccountPage.vue';

import store from '@/common/store' // make the store available to the whole app

Vue.config.productionTip = false;


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },

        { path: '/neutralizing', component: NeutralizingPage },
        { path: '/muddy', component: MuddyPage },
        { path: '/account', component: AccountPage }
    ],
})

new Vue({
    router, // equivalent to router: router,
    store,
    render: h => h(App),
}).$mount('#app')
