<template>
    <!--    <div class="card mb-4">-->
    <!--        <div class="card-body">-->
    <!--            <v-stepper ref="stepper" :steps="steps" v-model="step"></v-stepper>-->
    <!--            &lt;!&ndash;            //Delivery Address&ndash;&gt;-->
    <!--            <template v-if="step === 1">-->
    <!--                <div class="card mt-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1">-->
    <!--                    <form class="card-body" @submit.prevent="submit">-->
    <!--                        <h3 class="text-center mb-3">Delivery Address Details</h3>-->
    <!--                        <div class="form-group">-->
    <!--                            <label for="streetAddress">Unit Number And Complex Name</label>-->
    <!--                            <input type="text" name="unitNo" id="unitNo"-->
    <!--                                   class="form-control mb-3"-->
    <!--                                   placeholder="Unit Number (Optional)"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.unitNo">-->
    <!--                        </div>-->
    <!--                        <div class="form-group"-->
    <!--                             :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.streetAddress.$error }">-->
    <!--                            <label for="streetAddress">Street Address</label>-->
    <!--                            <input type="text" required="required" name="streetAddress" id="streetAddress"-->
    <!--                                   class="form-control mb-3"-->
    <!--                                   placeholder="Street Address"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.streetAddress">-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.streetAddress.required">Delivery-->
    <!--                                Address is-->
    <!--                                required-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group" :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.suburb.$error }">-->
    <!--                            <label for="suburb">Suburb</label>-->
    <!--                            <input type="text" required="required" name="suburb" id="suburb" class="form-control mb-3"-->
    <!--                                   placeholder="Suburb"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.suburb">-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.suburb.required">Suburb is-->
    <!--                                required-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group" :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.city.$error }">-->
    <!--                            <label for="city">City/Town</label>-->
    <!--                            <input type="text" required="required" name="city" id="city" class="form-control mb-3"-->
    <!--                                   placeholder="Last Name"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.city">-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.city.required">City/Town Name is-->
    <!--                                required-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group"-->
    <!--                             :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.postalCode.$error }">-->
    <!--                            <label for="postalCode">Postal Code</label>-->
    <!--                            <input type="number" required="required" name="postalCode" id="postalCode"-->
    <!--                                   class="form-control mb-3"-->
    <!--                                   placeholder="Postal Code"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.postalCode">-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.postalCode.required">Postal-->
    <!--                                Code-->
    <!--                                Needs to be 4-->
    <!--                                Digits long-->
    <!--                            </div>-->
    <!--                        </div>-->

    <!--                        <div class="form-group" :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.province.$error }">-->
    <!--                            <label for="city">Province</label>-->
    <!--                            <input type="text" required="required" name="city" id="province" class="form-control mb-3"-->
    <!--                                   placeholder="Province"-->
    <!--                                   value=""-->
    <!--                                   v-model="deliveryAddress.province">-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.province.required">Last Name is-->
    <!--                                required-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group" :class="{ 'form-group&#45;&#45;error': $v.deliveryAddress.country.$error }">-->
    <!--                            <label for="country">Country</label>-->
    <!--                            <b-form-select v-model="deliveryAddress.country"-->
    <!--                                           class="mb-3" name="country" id="country">-->
    <!--                                <b-form-select-option value="ZA">South Africa</b-form-select-option>-->
    <!--                            </b-form-select>-->
    <!--                            <div class="error text-danger" v-if="!$v.deliveryAddress.country.required">Country is-->
    <!--                                required-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group text-center">-->
    <!--                            &lt;!&ndash;                            <button class="btn btn-info" style="width: 100%">&ndash;&gt;-->
    <!--                            &lt;!&ndash;                                Next&ndash;&gt;-->
    <!--                            &lt;!&ndash;                            </button>&ndash;&gt;-->
    <!--                            <button type="submit" :disabled="submitStatus === 'PENDING'" class="btn btn-info"-->
    <!--                                    @click="submit">Next-->
    <!--                            </button>-->

    <!--                        </div>-->
    <!--                    </form>-->
    <!--                </div>-->
    <!--            </template>-->

    <!--            <template v-if="step === 2">-->
    <!--                &lt;!&ndash;                //Are you sure you want to make payment&ndash;&gt;-->
    <!--                <div class="container">-->
    <!--                    <h2>Cart Summary</h2>-->
    <!--                    <ShoppingCart is-confirmation-page="true"></ShoppingCart>-->
    <!--                    <form action="https://sandbox.payfast.co.za/eng/process" method="POST">-->
    <!--                        <input hidden type="text" name="merchant_id" value="10000100">-->
    <!--                        <input hidden type="text" name="merchant_key" value="46f0cd694581a">-->
    <!--                        <input type="text" name="amount" :value=formatPrice(cartValue)>-->
    <!--                        <input type="hidden" name="return_url" value="https://dripy.co.za/successful-payment">-->
    <!--                        <input type="hidden" name="cancel_url" value="https://dripy.co.za/cancel">-->
    <!--                        <input type="text" name="item_name" value="Test Item">-->
    <!--                        <input type="text" name="item_description" value="A test product">-->
    <!--                        <input type="text" name="custom_int1" value="2">-->
    <!--                        <input type="text" name="custom_str1" value="Extra order information">-->
    <!--                        <input type="hidden" name="name_first" value="Sthem">-->
    <!--                        <input type="hidden" name="name_last" value="Mash">-->
    <!--                        <input type="hidden" name="email_address" value="sthembiso@insync-sa.co.za">-->
    <!--                        <input type="hidden" name="cell_number" value="0827896981">-->
    <!--                        <input type="hidden" name="email_confirmation" value="1">-->
    <!--                        <input type="hidden" name="confirmation_address" value="sthembisomashiyane@gmail.com">-->
    <!--                        <input type="submit" value="Submit">-->
    <!--                    </form>-->

    <!--                    <button type="submit" @click="submitLocal" class="btn btn-primary">Pay</button>-->
    <!--                </div>-->
    <!--            </template>-->
    <!--            <template v-if="step === 3">-->
    <!--                <div class="container">-->
    <!--                    <h2>Page 3</h2>-->
    <!--                    <p>In this example, we use <code>.was-validated</code> to indicate what's missing before-->
    <!--                        submitting the form:</p>-->
    <!--                    <form action="/action_page.php" class="was-validated">-->
    <!--                        <div class="form-group">-->
    <!--                            <label for="uname">Username:</label>-->
    <!--                            <input type="text" class="form-control" id="uname" placeholder="Enter username"-->
    <!--                                   name="uname" required>-->
    <!--                            <div class="valid-feedback">Valid.</div>-->
    <!--                            <div class="invalid-feedback">Please fill out this field.</div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group">-->
    <!--                            <label for="pwd">Password:</label>-->
    <!--                            <input type="password" class="form-control" id="pwd" placeholder="Enter password"-->
    <!--                                   name="pswd" required>-->
    <!--                            <div class="valid-feedback">Valid.</div>-->
    <!--                            <div class="invalid-feedback">Please fill out this field.</div>-->
    <!--                        </div>-->
    <!--                        <div class="form-group form-check">-->
    <!--                            <label class="form-check-label">-->
    <!--                                <input class="form-check-input" type="checkbox" name="remember" required> I agree on-->
    <!--                                blabla.-->
    <!--                                <div class="valid-feedback">Valid.</div>-->
    <!--                                <div class="invalid-feedback">Check this checkbox to continue.</div>-->
    <!--                            </label>-->
    <!--                        </div>-->
    <!--                        <button type="submit" class="btn btn-primary">Submit</button>-->
    <!--                    </form>-->
    <!--                </div>-->
    <!--            </template>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="alert-light">
        <md-steppers :md-active-step.sync="active" md-linear class="text-dark">
            <md-step id="first" md-label="Delivery Address" :md-done.sync="first">
                <div>
                    <div class="">
                        <form class="card-body" @submit.prevent="submit">
                            <div class="form-group">
                                <label for="streetAddress">Unit Number And Complex Name</label>
                                <input type="text" name="unitNo" id="unitNo"
                                       class="form-control mb-3"
                                       placeholder="Unit Number (Optional)"
                                       value=""
                                       v-model="deliveryAddress.unitNo">
                            </div>
                            <div class="form-group"
                                 :class="{ 'form-group--error': $v.deliveryAddress.streetAddress.$error }">
                                <label for="streetAddress">Street Address</label>
                                <input type="text" required="required" name="streetAddress" id="streetAddress"
                                       class="form-control mb-3"
                                       placeholder="Street Address"
                                       value=""
                                       v-model="deliveryAddress.streetAddress">
                                <div class="error text-danger" v-if="!$v.deliveryAddress.streetAddress.required">
                                    Delivery
                                    Address is
                                    required
                                </div>
                            </div>
                            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.suburb.$error }">
                                <label for="suburb">Suburb</label>
                                <input type="text" required="required" name="suburb" id="suburb"
                                       class="form-control mb-3"
                                       placeholder="Suburb"
                                       value=""
                                       v-model="deliveryAddress.suburb">
                                <div class="error text-danger" v-if="!$v.deliveryAddress.suburb.required">Suburb is
                                    required
                                </div>
                            </div>
                            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.city.$error }">
                                <label for="city">City/Town</label>
                                <input type="text" required="required" name="city" id="city" class="form-control mb-3"
                                       placeholder="Last Name"
                                       value=""
                                       v-model="deliveryAddress.city">
                                <div class="error text-danger" v-if="!$v.deliveryAddress.city.required">City/Town Name
                                    is
                                    required
                                </div>
                            </div>
                            <div class="form-group"
                                 :class="{ 'form-group--error': $v.deliveryAddress.postalCode.$error }">
                                <label for="postalCode">Postal Code</label>
                                <input type="number" required="required" name="postalCode" id="postalCode"
                                       class="form-control mb-3"
                                       placeholder="Postal Code"
                                       value=""
                                       v-model="deliveryAddress.postalCode">
                                <div class="error text-danger" v-if="!$v.deliveryAddress.postalCode.required">Postal
                                    Code
                                    Needs to be 4
                                    Digits long
                                </div>
                            </div>

                            <div class="form-group"
                                 :class="{ 'form-group--error': $v.deliveryAddress.province.$error }">
                                <label for="city">Province</label>
                                <input type="text" required="required" name="city" id="province"
                                       class="form-control mb-3"
                                       placeholder="Province"
                                       value=""
                                       v-model="deliveryAddress.province">
                                <div class="error text-danger" v-if="!$v.deliveryAddress.province.required">Last Name is
                                    required
                                </div>
                            </div>
                            <div class="form-group" :class="{ 'form-group--error': $v.deliveryAddress.country.$error }">
                                <label for="country">Country</label>
                                <b-form-select v-model="deliveryAddress.country"
                                               class="mb-3" name="country" id="country">
                                    <b-form-select-option value="ZA">South Africa</b-form-select-option>
                                </b-form-select>
                                <div class="error text-danger" v-if="!$v.deliveryAddress.country.required">Country is
                                    required
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="isBillingAddress">Country</label>
                                <b-checkbox v-model="deliveryAddress.isBillingAddress"
                                            class="mb-3" name="isBillingAddress" id="isBillingAddress">
                                </b-checkbox>
                            </div>
                            <div class="form-group text-center">
                                <!--                            <button class="btn btn-info" style="width: 100%">-->
                                <!--                                Next-->
                                <!--                            </button>-->
                                <button type="submit" :disabled="submitStatus === 'PENDING'" class="btn btn-info"
                                        @click="submit">Next
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
                <!--                <md-button class="md-raised md-" @click="setDone('first', 'second')">Continue</md-button>-->
                <div class="btn btn-info" @click="setDone('first', 'second')">Continue</div>
            </md-step>

            <md-step id="second" md-label="Payment Confirmation" :md-error="secondStepError" :md-done.sync="second">
                <div class="container">
                    <h2>Cart Summary</h2>
                    <ShoppingCart is-confirmation-page="true"></ShoppingCart>

                    <form action="https://sandbox.payfast.co.za/eng/process" method="POST">
                        <div class="form-group">
                            <input hidden type="text" name="merchant_id" value="10000100">
                            <input hidden type="text" name="return_url"
                                   value="https://vue-online-store-9d433.web.app/#/successful-payment">
                            <input hidden type="text" name="cancel_url"
                                   value="https://vue-online-store-9d433.web.app/#/checkout">
                            <input hidden type="text" name="return_url"
                                   value="https://vue-online-store-9d433.web.app/#/payment-notification">
                            <input hidden type="text" name="merchant_key" value="46f0cd694581a">
                            <input hidden type="text" name="name_first" value="Sthem">
                            <input hidden type="text" name="name_last" value="Mash">
                            <input hidden type="text" name="email_address" value="sthembiso@insync-sa.co.za">
                            <input hidden type="text" name="cell_number" value="0827896981">
                            <input hidden type="text" name="email_confirmation" value="1">
                            <input hidden type="text" name="confirmation_address" value="sthembisomashiyane@gmail.com">
                            <input hidden type="text" name="amount" :value=formatPrice(cartValue)>
                            <input hidden type="text" name="item_name" value="Dripy Invoice">
                            <input hidden type="text" name="item_description" value="Invoice No 1">
                        </div>
                        <div class="form-group text-center">
                            <button class="btn btn-info" type="submit" Make Payment
                                    @click="submit">Make Payment
                            </button>

                        </div>
                    </form>

                    <!--                                    <form action="https://sandbox.payfast.co.za/eng/process" method="POST">-->
                    <!--                                        <input hidden type="text" name="merchant_id" value="10000100">-->
                    <!--                                        <input hidden type="text" name="merchant_key" value="46f0cd694581a">-->
                    <!--                                        <input type="text" name="amount" :value=formatPrice(cartValue)>-->
                    <!--                                        <input type="hidden" name="return_url" value="https://dripy.co.za/successful-payment">-->
                    <!--                                        <input type="hidden" name="cancel_url" value="https://dripy.co.za/cancel">-->
                    <!--                                        <input type="text" name="item_name" value="Test Item">-->
                    <!--                                        <input type="text" name="item_description" value="A test product">-->
                    <!--                                        <input type="text" name="custom_int1" value="2">-->
                    <!--                                        <input type="text" name="custom_str1" value="Extra order information">-->
                    <!--                                        <input type="hidden" name="name_first" value="Sthem">-->
                    <!--                                        <input type="hidden" name="name_last" value="Mash">-->
                    <!--                                        <input type="hidden" name="email_address" value="sthembiso@insync-sa.co.za">-->
                    <!--                                        <input type="hidden" name="cell_number" value="0827896981">-->
                    <!--                                        <input type="hidden" name="email_confirmation" value="1">-->
                    <!--                                        <input type="hidden" name="confirmation_address" value="sthembisomashiyane@gmail.com">-->
                    <!--                                        <input type="submit" value="Submit">-->
                    <!--                                    </form>-->
                </div>
            </md-step>
        </md-steppers>
    </div>
</template>

<script>
    // import {VStepper} from 'vue-stepper-component'
    import {maxLength, minLength, required} from "vuelidate/lib/validators";
    import ShoppingCart from "../ShoppingCart";
    import {mapGetters} from "vuex";

    export default {
        name: "Checkout",
        data() {
            return {
                steps: 3,
                step: undefined,
                deliveryAddress: {
                    streetAddress: "",
                    suburb: "",
                    province: "",
                    city: "",
                    postalCode: "",
                    country: "",
                    billingEmail: "",
                    unitNo: "",
                    isBillingAddress: false
                },
                submitStatus: null,
                active: 'first',
                first: false,
                second: false,
                third: false,
                secondStepError: null,

                form: {
                    firstName: null,
                    lastName: null,
                    gender: null,
                    age: null,
                    email: null,
                },
                userSaved: false,
                sending: false,
                lastUser: null
            }
        },
        components: {
            // VStepper,
            ShoppingCart
        },
        computed: {
            ...mapGetters(['cartValue'])
        },
        validations: {
            deliveryAddress: {
                streetAddress: {required},
                suburb: {required},
                province: {required},
                city: {required},
                postalCode: {required, maxLength: maxLength(4), minLength: minLength(4)},
                country: {required},
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.firstName = null
                this.form.lastName = null
                this.form.age = null
                this.form.gender = null
                this.form.email = null
            },
            saveUser() {
                this.sending = true

                // Instead of this timeout, here you can call your API
                window.setTimeout(() => {
                    this.lastUser = `${this.form.firstName} ${this.form.lastName}`
                    this.userSaved = true
                    this.sending = false
                    this.clearForm()
                }, 1500)
            },
            validateUser() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.saveUser()
                }
            },
            setDone(id, index) {
                this[id] = true

                this.secondStepError = null

                if (index) {
                    this.active = index
                }
            },
            setError() {
                this.secondStepError = 'This is an error!'
            },
            formatPrice(value) {
                console.log(value);
                let val = (value / 1).toFixed(2).replace(',', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            submit() {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.setDone('first', 'second')
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            },
        }
    }
</script>

<style scoped>
</style>
