<template>
    <div class="d-flex flex-column sticky-footer-wrapper baseStyles">
        <main class="flex-fill">
            <app-header></app-header>
            <b-alert variant="info" class="mt-2 text-center mx-2" dismissible fade show>Get up to the minute
                COVID-19 updates <a class="alert-link" href="https://sacoronavirus.co.za/"> here</a></b-alert>
            <message-component></message-component>
            <div class="container-fluid mt-md-2 mt-2">
                <div class="row">
                    <div class="col-md-12">
                        <transition
                                name="slide-fade"
                                mode="out-in">
                            <router-view></router-view>
                        </transition>

                    </div>
                </div>
            </div>
            <div class="md-bottom-bar--fixed alert-light w-100">
                <div class="d-block d-lg-none">
                    <md-bottom-bar md-sync-route>
                        <md-bottom-bar-item to="/" exact md-label="Home"
                                            md-icon="home"></md-bottom-bar-item>
                        <md-bottom-bar-item to="/store" md-label="Store"
                                            md-icon="store"></md-bottom-bar-item>
                        <md-bottom-bar-item @click="checkout" md-label="Checkout"
                                            md-icon="shopping_cart"></md-bottom-bar-item>
                    </md-bottom-bar>
                </div>
            </div>
        </main>
        <footer class="navbar-default navbar-bottom navbar-dark bg-dark">
            <div class="container-fluid">
                <p class="text-center nav-bar mb-0">Proudly Brought To You By <a
                        href="https://www.insync-sa.co.za/" target="_blank">
                    In-Sync
                </a></p>
            </div>
        </footer>
    </div>

</template>

<script>
    import {mapActions} from 'vuex';
    import Header from './components/Header.vue';
    import MessageComponent from './components/common/MessageComponent.vue';

    export default {
        components: {
            appHeader: Header,
            MessageComponent
        },
        methods: {
            ...mapActions(['getShoppingCart', 'listenToProductList', 'getProductTypes','addMessage']),
            checkout() {
                if (this.isLoggedIn) {
                    if (!this.cartItemList || this.cartItemList.length == 0) {
                        this.addMessage({
                            messageClass: 'warning',
                            message: 'Your cart is empty!'
                        });
                        return;
                    }
                    let {
                        isValid,
                        message
                    } = this.checkValidCart(this.cartItemList, this.products);

                    if (isValid) {
                        this.$router.push('/checkout');
                    } else {
                        this.addMessage({
                            messageClass: 'danger',
                            message: message
                        });
                    }
                } else {
                    this.addMessage({
                        messageClass: 'warning',
                        message: 'Please login to checkout'
                    });
                }
            },
        },
        created() {
            let uid = this.$store.getters.currentUser.uid;
            this.listenToProductList();
            this.getProductTypes();
            this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
        }
    }
</script>

<style>
    #reset-store-panel {
        position: fixed;
        bottom: 0px;
        right: 0px;
    }

    body, .sticky-footer-wrapper {
        min-height: 100vh;
    }

    .flex-fill {
        flex: 1 1 auto;
    }

    .baseStyles {
        background-color: #F4F4F4;
        line-height: 1.3;
    }

    footer {
        height: 40px;
        color: #666;
        padding: 10px 0 10px 0;
        font-size: 85%;
    }

    footer a {
        color: #999;
    }

    footer a:hover {
        color: #efefef;
    }

    @media (max-width: 576px) {
        footer {
            height: 50px;
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    div.md-bottom-bar--fixed {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 10000000;
    }

    .spacer {
        height: 1000vh;
    }

    .as-console-wrapper {
        display: none !important;
    }

</style>
