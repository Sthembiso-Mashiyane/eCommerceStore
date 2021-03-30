<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand to="/" href="#">Home</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/store" href="#">Store</b-nav-item>
                    <b-nav-item-dropdown text="Brand Admin" v-if="isLoggedIn" right>
                        <b-dropdown-item to="/brand-profile" href="#">Brand Profile</b-dropdown-item>
                        <b-dropdown-item to="/inventory" href="#">Inventory</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Admin" v-if="isLoggedIn && user.isAdmin" right>
                        <b-dropdown-item to="/product-types" href="#">Product Types</b-dropdown-item>
                        <b-dropdown-item to="/brand-profile" href="#">Brand Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="!isLoggedIn" to="/login" href="#">Login</b-nav-item>
                    <b-nav-item v-if="!isLoggedIn" to="/register" href="#">Register</b-nav-item>

                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </template>
                        <b-dropdown-item to="/user-profile" href="#">Profile</b-dropdown-item>
                        <b-dropdown-item to="/address-book" href="#">Address Book</b-dropdown-item>
                        <b-dropdown-item @click="localLogout" to="/">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item to="/cart" class="text-center">
                        Checkout <span class="badge badge-light">{{ numItems }} (R {{ cartValue }})</span>
                    </b-nav-item>
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
