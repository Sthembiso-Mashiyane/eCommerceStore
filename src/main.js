import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import store from './stores/store';
import './assets/styles/app.scss'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import {firebaseAuth} from './config/firebaseConfig';

import App from './App.vue';
import Vuelidate from 'vuelidate'
import './registerServiceWorker'

Vue.use(Vuelidate)
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);


export function firebaseListener(func) {
    firebaseAuth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User log in success", user);
                func(true, user)
                localStorage.setItem('user', JSON.stringify(user));
                store.dispatch('setUser', user.uid);
            } else {
                console.log("User log in failed", user);
                func(false);
                localStorage.setItem('user', null);
            }
        }
        ,

        function (error) {
            console.log(error)
        }
    )
    ;
}

firebaseListener(authStatusChange);


export const router = new VueRouter({
    mode: 'history',
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.onlyGuest && store.getters.isLoggedIn) {
//         next('/');
//     } else {
//         next();
//     }
// });


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

function authStatusChange(loggedIn, user) {
    if (store) {
        store.commit('AUTH_STATUS_CHANGE');
        if (user) {
            store.dispatch('getShoppingCart', {uid: user.uid, currentCart: store.getters.cartItemList});
        }
    }

}
