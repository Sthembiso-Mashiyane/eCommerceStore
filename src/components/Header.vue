<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/" href="#">Dripy</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/store" href="#">Store</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="!isLoggedIn" to="/login" href="#">Login</b-nav-item>
                    <b-nav-item v-if="!isLoggedIn" to="/register" href="#">Register</b-nav-item>

                    <b-nav-item to="/cart" class="btn btn-dark">
                        Checkout <span class="badge badge-light">{{ numItems }} (R {{ cartValue }})</span>
                    </b-nav-item>

                    <b-nav-item-dropdown text="User" v-if="isLoggedIn" right>
                        <b-dropdown-item to="/user-profile" href="#">Profile</b-dropdown-item>
                        <b-dropdown-item to="/address-book" href="#">Address Book</b-dropdown-item>
                        <b-dropdown-item @click="localLogout" to="/">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Brand Admin" v-if="isLoggedIn" right>
                        <b-dropdown-item to="/brand-profile" href="#">Brand Profile</b-dropdown-item>
                        <b-dropdown-item to="/inventory" href="#">Inventory</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Admin" v-if="isLoggedIn && user.isAdmin" right>
                        <b-dropdown-item to="/product-types" href="#">Product Types</b-dropdown-item>
                        <b-dropdown-item to="/brand-profile" href="#">Brand Profile</b-dropdown-item>
                        <b-dropdown-item  href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {
        mapActions, mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                isNavOpen: false,
                show: true
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'cartValue', 'user', 'cartItemList', 'currentUser']),
            numItems() {
                return this.cartItemList.reduce((total, item) => {
                    total += item.quantity;
                    return total
                }, 0);
            },
            userEmail() {
                return this.isLoggedIn ? this.currentUser.email : ''
            }
        },
        methods: {
            ...mapActions(['logout']),
            toggleNavbar() {
                this.show = !this.show
            },
            localLogout() {
                this.logout();
                // router.push({ path: 'landingPage' })
            }
        }
    }
</script>


<style scoped lange="sass">
    .navbar-btn a {
        color: white;
    }

    .li-pointer {
        cursor: pointer;
    }

    .li-pointer:hover {
        cursor: pointer;
    }
</style>
