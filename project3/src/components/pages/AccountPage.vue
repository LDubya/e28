<template>
    <div id="account-page">
        <div v-if="user">
            <h2 data-test="welcome-message">Hi, {{ user.name }}!</h2>
            <p>
                As a logged in user, you have access to easy copy-and-paste citations on the bottom of each infographic.
                <!-- 
                    One perk for logged in users is easy MLA citations. 
                    Sure they could go through the source code to find them, but the point is to make things convenient for them. 
                    They're not really something that must be securely stored on the backend, nor are they something that changes per user. 
                    Being logged in just makes the site more convenient for you than if you weren't logged in. 
                -->
            </p>

            <button @click="logout" data-test="logout-button">Logout</button>

            
        </div>

        <div v-else id="loginForm">
            <h2>Login</h2>
            <div>
                <label>
                    Email:
                    <input type="text" data-test="email-input" v-model="data.email" />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        data-test="password-input"
                        v-model="data.password"
                    />
                </label>
            </div>

            <button @click="login" data-test="login-button">Login</button>

            <ul v-if="errors">
                <li class="error" v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { axios } from '@/app.js';
export default {
    data() {
        return {
            // Users are invite-only, Gmail Beta style. There is no open user registration. For educational purposes, a user is pre-filled.
            // jill@harvard.edu/asdfasdf is one of the seed users from the e28-api/seeds/user.json
            data: {
                email: 'jill@harvard.edu',
                password: 'asdfasdf'
            },
            errors: null,
            favorites: []
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        login() {
            axios.post('login', this.data).then(response => {
                if (response.data.authenticated) {
                    this.$store.commit('setUser', response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            axios.post('logout').then(response => {
                if (response.data.success) {
                    this.$store.commit('setUser', null);
                }
            });
        }
    },
};
</script>