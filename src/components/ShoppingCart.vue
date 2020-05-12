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
                    <app-cart-item v-for="cartItem in cartItemList" :cartItem="cartItem"
                                   :key="cartItem.productID"></app-cart-item>
                </transition-group>

                <tfoot>
                <tr class="d-table-row d-sm-none">
                    <td class="text-center"><strong>Total R{{ formatPrice(cartValue) }}</strong></td>
                </tr>
                <tr>
                    <td>
                        <button class="btn btn-warning" @click="saveShoppingCartLocal">
                            <i class="fa fa-angle-left"></i> Save and Continue Shopping
                        </button>
                    </td>
                    <td colspan="2" class="d-none d-sm-table-cell"></td>
                    <td class="d-none d-sm-table-cell text-center"><strong>Total R{{ formatPrice(cartValue) }}</strong>
                    </td>
                    <td class="px-0">
                        <button class="btn btn-success" @click="goToRoute">
                            <span class="text-nowrap">Checkout <i class="fa fa-angle-right d-inline"></i></span>
                        </button>
                    </td>
                </tr>
                </tfoot>
            </table>

            <b-modal ref="payment-modal" size="lg" hide-footer title="Checkout Payment">
                <div class="row">
                    <div class="container-fluid d-flex justify-content-center">
                        <div class="col-sm-8 col-md-12">
                            <div class="card mb-3">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-md-6"><span>CREDIT/DEBIT CARD PAYMENT</span></div>
                                        <div class="col-md-6 text-right" style="margin-top: -5px;"><img
                                                src="https://img.icons8.com/color/36/000000/visa.png"> <img
                                                src="https://img.icons8.com/color/36/000000/mastercard.png"></div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="form-group"><label for="cc-number" class="control-label">CARD
                                        NUMBER</label>
                                        <input id="cc-number" type="tel" class="input-lg form-control cc-number"
                                               autocomplete="cc-number" placeholder="•••• •••• •••• ••••" required>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group"><label for="cc-exp" class="control-label">CARD
                                                EXPIRY</label> <input id="cc-exp" type="tel"
                                                                      class="input-lg form-control cc-exp"
                                                                      autocomplete="cc-exp"
                                                                      placeholder="•• / ••" required></div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group"><label for="cc-cvc" class="control-label">CARD
                                                CVC</label>
                                                <input id="cc-cvc" type="tel" class="input-lg form-control cc-cvc"
                                                       autocomplete="off" placeholder="••••" required></div>
                                        </div>
                                    </div>
                                    <div class="form-group"><label class="control-label">CARD HOLDER NAME</label>
                                        <input type="text" class=" form-control"></div>
                                    <div class="form-group">
                                        <button type="button"
                                                class="btn btn-success form-control">PAY R{{formatPrice(cartValue)}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-2">
                    <b-button variant="outline-info" class="mr-2" @click="hideModal">Save</b-button>
                    <b-button variant="outline-danger" class="mr-2" @click="toggleModal">Close</b-button>
                </div>

            </b-modal>
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
            return {
                merchantId: "10013266",
                merchantKey: "mrk7nzluqxnjp"
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
                        if (prodList[prodIdx].id == item.id) {
                            if (prodList[prodIdx].quantity < item.quantity) {
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
                        this.saveToTransaction({
                            cartItemList: this.cartItemList,
                            uid: this.currentUser.uid
                        }).then(() => {
                            this.addMessage({
                                messageClass: 'success',
                                message: 'Your order has been successfully processed!'
                            });
                            this.saveShoppingCart({
                                cartItemList: [],
                                uid: this.currentUser.uid
                            });
                            this.clearCart();
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
                        message: 'Please login to checkout'
                    });
                }
            },
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            goToRoute() {
                this.$router.push({path: '/checkout'})
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
