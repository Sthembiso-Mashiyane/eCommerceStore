<template>
    <tr>
        <td data-th="Product">
            <div class="row">
                <div class="col-sm-2 d-none d-sm-block">
                    <b-img-lazy :src="cartItem.thumbnailURL" :alt=cartItem.description class="img-fluid"/>
                </div>
                <div class="col-sm-10">
                    <h4 class="nomargin">{{ cartItem.productName }}</h4>
                    <p>{{ cartItem.productDescription }}</p>
                </div>
            </div>
        </td>
        <td data-th="Price">R{{ formatPrice(cartItem.price) }}</td>
        <td v-if="!isConfirmationPage" data-th="Quantity">
            <input type="number" class="form-control text-center"
                   :value="cartItem.quantity"
                   @input="updateQuantity"
                   min="0">
        </td>
        <td v-if="isConfirmationPage" data-th="Quantity" class="text-center">{{cartItem.quantity}}</td>

        <td data-th="Subtotal" class="text-center">R{{ formatPrice(subtotal) }}</td>
        <td v-if="!isConfirmationPage" class="actions" data-th="">
            <button class="btn btn-danger btn-sm" @click="removeItem"><i class="fa fa-trash-o"></i></button>
        </td>
    </tr>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        props: {
            cartItem: null,
            isConfirmationPage: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            subtotal() {
                return this.cartItem.quantity * this.cartItem.price;
            }
        },
        methods: {
            ...mapActions(['updateCart', 'removeItemInCart']),
            removeItem() {
                let vm = this;
                this.removeItemInCart({
                    item: vm.cartItem
                });
            },
            updateQuantity(event) {
                let vm = this;
                this.updateCart({
                    item: vm.cartItem,
                    quantity: parseInt(event.target.value),
                    isAdd: false
                });
            },
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>
