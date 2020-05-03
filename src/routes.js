import ShoppingCart from './components/ShoppingCart.vue';
import ProductDetails from './components/ProductDetails.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import LandingPage from "./components/LandingPage";
import Store from "./components/Store";
import UserProfile from "./components/settings/UserProfile";
import AddressBook from "./components/settings/AddressBook";
import BrandProfile from "./components/brand/BrandProfile";
import ProductTypes from "./components/admin/ProductTypes";
import Inventory from "./components/brand/Inventory";


function guardMyroute(to, from, next) {
    let isAuthenticated = false;
//this is just an example. You will have to find a better or
// centralised way to handle you localstorage data handling
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        if (user.uid)
            isAuthenticated = true;
        else
            isAuthenticated = false;
        if (isAuthenticated) {
            next(); // allow to enter route
        } else {
            next('/'); // go to '/login';
        }
    } else {
        next('/'); // go to '/login';
    }
}


export const routes = [
    // {path: '/', component: Store, name: 'mainpage'},
    {path: '/store', component: Store, name: 'store'},
    {path: '/', component: LandingPage, name: 'landingPage'},
    {path: '/product/:id', component: ProductDetails, name: 'product'},
    {path: '/cart', component: ShoppingCart, name: 'shoppingcart'},
    {path: '/login', component: Login, name: 'login', onlyGuest: true},
    {path: '/register', component: Register, name: 'register', onlyGuest: true},
    {path: '/user-profile', component: UserProfile, name: 'user-profile', beforeEnter: guardMyroute},
    {path: '/brand-profile', component: BrandProfile, name: 'brand-profile', beforeEnter: guardMyroute},
    {path: '/address-book', component: AddressBook, name: 'address-book', beforeEnter: guardMyroute},
    {path: '/product-types', component: ProductTypes, name: 'product-types', beforeEnter: guardMyroute},
    {path: '/inventory', component: Inventory, name: 'inventory', beforeEnter: guardMyroute},
    {path: '*', redirect: '/'}
];
