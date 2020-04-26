<template>
    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
        <form id="register-form" role="form">
            <h3 class="text-center">Address Details</h3>
            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.streetAddress.$error }">
                <label for="streetAddress">Street Address</label>
                <input type="text" required="required" name="streetAddress" id="streetAddress" class="form-control mb-3"
                       placeholder="Street Address"
                       value=""
                       v-model="deliveryAddress.streetAddress">
                <div class="error text-danger" v-if="!$v.deliveryAddress.streetAddress.required">Delivery Address is
                    required
                </div>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.suburb.$error }">
                <label for="suburb">Suburb</label>
                <input type="text" required="required" name="suburb" id="suburb" class="form-control mb-3"
                       placeholder="Suburb"
                       value=""
                       v-model="deliveryAddress.suburb">
                <div class="error text-danger" v-if="!$v.deliveryAddress.suburb.required">Suburb is required</div>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.city.$error }">
                <label for="city">City/Town</label>
                <input type="email" required="required" name="city" id="city" class="form-control mb-3"
                       placeholder="Last Name"
                       value=""
                       v-model="deliveryAddress.city">
                <div class="error text-danger" v-if="!$v.deliveryAddress.city.required">City/Town Name is required</div>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.province.$error }">
                <label for="city">Province</label>
                <input type="email" required="required" name="city" id="province" class="form-control mb-3"
                       placeholder="Province"
                       value=""
                       v-model="deliveryAddress.province">
                <div class="error text-danger" v-if="!$v.deliveryAddress.province.required">Last Name is required</div>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.postalCode.$error }">
                <label for="postalCode">Postal Code</label>
                <input type="number" required="required" name="postalCode" id="postalCode" class="form-control mb-3"
                       placeholder="Postal Code"
                       value=""
                       v-model="deliveryAddress.postalCode">
                <div class="error text-danger" v-if="!$v.deliveryAddress.postalCode.required">Postal Code Needs to be 4
                    Digits long
                </div>
            </div>
            <div class="form-group">
                <button v-if="!isEdit" class="btn btn-success" style="width: 100%" @click.prevent="saveAddressLocal"
                        :disabled="false">
                    <i v-if="false" class="fa fa-spinner fa-spin"/>
                    Add Address
                </button>
            </div>
            <div class="form-group">
                <button v-if="isEdit" class="btn btn-success" style="width: 100%" @click.prevent="updateAddressLocal"
                        :disabled="false">
                    <i v-if="false" class="fa fa-spinner fa-spin"/>
                    Update Address
                </button>
            </div>

        </form>
    </div>
</template>

<script>
    import {maxLength, minLength, required} from "vuelidate/lib/validators";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Address",
        data() {
            return {
                deliveryAddress: {
                    streetAddress: "",
                    suburb: "",
                    province: "",
                    city: "",
                    postalCode: "",

                },
            }
        },
        validations: {
            deliveryAddress: {
                streetAddress: {required},
                suburb: {required},
                province: {required},
                city: {required},
                postalCode: {required, maxLength: maxLength(4), minLength: minLength(4)},
            }
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            ...mapActions(['saveAddress', 'editAddressByAddressID','addMessage']),
            saveAddressLocal() {
                this.saveAddress({uid: this.user.uid, addressObject: this.deliveryAddress}).then(res => {
                    console.log(res);
                    this.deliveryAddress = {}
                    let message_obj = {
                        message: "Address Added Successfully",
                        messageClass: "success",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                })
            },
            updateAddressLocal() {
                this.editAddressByAddressID({uid: this.user.uid, address: this.deliveryAddress}).then(res => {
                    console.log(res)

                    let message_obj = {
                        message: "Address Updated Successfully",
                        messageClass: "success",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                })
            }

        },
        props: [
            'address', 'isEdit','callMethod'
        ],
        created() {
            if (this.address)
                this.deliveryAddress = this.address;
        }
    }
</script>

<style scoped>

</style>
