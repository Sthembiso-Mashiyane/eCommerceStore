<template>
    <div class="">
        <div v-if="cartValue == 0" class="row text-center">
            <div class="container h-100">
                <div class="row centerThis justify-content-center align-items-center">
                    <div class="col-12 my-auto">
                        <div class="col-12">
                            <div class="justify-content-center" v-if="cartValue == 0">
                                <img src="../assets/images/shopping-cart-empty.svg" class="w-50" alt="">
                                <h4>Unfortunately your shopping cart is empty, please continue shopping
                                    <router-link
                                            class="btn-link" to="/store">here
                                    </router-link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="cartValue != 0" class="container table-responsive">
            <table id="cart" class="table table-hover table-sm">
                <thead>
                <tr>
                    <th style="width:50%">Product</th>
                    <th style="width:10%">Price</th>
                    <th style="width:8%">Quantity</th>
                    <th style="width:22%" class="text-center">Subtotal</th>
                    <th style="width:10%"></th>
                </tr>
                </thead>

                <transition-group name="list-shopping-cart" tag="tbody">
                    <app-cart-item :is-confirmation-page="isConfirmationPage" v-for="cartItem in cartItemList"
                                   :cartItem="cartItem"
                                   :key="cartItem.productID"></app-cart-item>
                </transition-group>

                <tfoot>
                <tr class="d-table-row d-sm-none">
                    <td class="text-center"><strong>Total R{{ formatPrice(cartValue) }}</strong></td>
                </tr>
                <tr>
                    <td v-if="!isConfirmationPage">
                        <button class="btn btn-warning" @click="saveShoppingCartLocal">
                            <i class="fa fa-angle-left"></i> Save and Continue Shopping
                        </button>
                    </td>
                    <td colspan="2" class="d-none d-sm-table-cell"></td>
                    <td class="d-none d-sm-table-cell text-center"><strong>Total R{{ formatPrice(cartValue) }}</strong>
                    </td>
                    <td v-if="!isConfirmationPage" class="px-0">
                        <button class="btn btn-success">
                            <span class="text-nowrap" @click="checkout">Checkout <i class="fa fa-angle-right d-inline"></i></span>
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import CartItem from './cart/CartItem.vue';

    export default {
        data() {
            return {}
        },
        props: {
            isConfirmationPage: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            ...mapGetters(['cartItemList', 'isLoggedIn', 'products', 'currentUser', 'cartValue'])
        },
        components: {
            appCartItem: CartItem
        },
        methods: {
            ...mapActions(['saveShoppingCart', 'addMessage', 'saveToTransaction', 'clearCart']),
            showModal() {
                this.$refs['payment-modal'].show()
            },
            hideModal() {
                this.$refs['payment-modal'].hide()
            },
            checkValidCart(itemList, prodList) {
                let isValid = true;
                let message = "";

                itemList.map(item => {
                    for (let prodIdx = 0; prodIdx < prodList.length; prodIdx++) {
                        if (prodList[prodIdx].productID == item.productID) {
                            if (prodList[prodIdx].totalStock < item.totalStock) {
                                message = `Only ${prodList[prodIdx].quantity} ${item.title} available in stock`;
                                isValid = false;
                                return;
                            }
                            break;
                        }
                    }
                });
                return {
                    isValid,
                    message
                }
            },
            saveShoppingCartLocal() {
                if (this.isLoggedIn) {
                    let {
                        isValid,
                        message
                    } = this.checkValidCart(this.cartItemList, this.products);

                    if (isValid) {
                        this.saveShoppingCart({
                            cartItemList: this.cartItemList,
                            uid: this.currentUser.uid
                        }).then(() => {
                            this.addMessage({
                                messageClass: 'success',
                                message: 'Your shopping cart is saved successfully'
                            });
                            this.$router.push('/');
                        });
                    } else {
                        this.addMessage({
                            messageClass: 'danger',
                            message: message
                        });
                    }
                } else {
                    this.addMessage({
                        messageClass: 'warning',
                        message: 'Please login to save your cart'
                    });
                }
            },
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
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            goToRoute() {
                this.$router.push({name: 'checkout'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-shopping-cart-leave-active {
        transition: all 0.4s;
    }

    .list-shopping-cart-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }

    .table-sm {
        font-size: 0.875rem;

        /deep/ h4 {
            font-size: 1.25rem;
        }
    }
</style>
