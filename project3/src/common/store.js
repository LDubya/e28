import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/app.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null 
        // using Vuex to locally persist the user data, as opposed to directly using Cookies / LocalStorage.
        // Gosh this is an extremely light usage of Vuex... 
        // Maybe in the future the site can have more features that make more use of Vuex.
    },
    mutations : {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions : {
        authUser(context) {
            axios.post('auth').then((response) => {
                if (response.data.authenticated) {
                    context.commit('setUser', response.data.user);
                }
            });
        }
    }
})