<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
            <form id="register-form" role="form">
                <h3 class="text-center">Register</h3>
                <div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
                    <label for="firstName">First Name</label>
                    <input type="text" required="required" name="firstName" id="firstName" class="form-control mb-3"
                           placeholder="First Name"
                           value=""
                           v-model="firstName">
                    <div class="error text-danger" v-if="!$v.firstName.required">First Name is required</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
                    <label for="lastName">Last Name</label>
                    <input type="email" required="required" name="email" id="lastName" class="form-control mb-3"
                           placeholder="Last Name"
                           value=""
                           v-model="lastName">
                    <div class="error text-danger" v-if="!$v.lastName.required">Last Name is required</div>

                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.phoneNumber.$error }">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="number" required="required" name="email" id="phoneNumber" class="form-control mb-3"
                           placeholder="Telephone Number"
                           value=""
                           v-model="phoneNumber">
                    <div class="error text-danger" v-if="!$v.phoneNumber.required">Phone Number is required</div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" required="required" name="email" id="email" class="form-control mb-3"
                           placeholder="Email Address"
                           value=""
                           v-model="email">
                    <div class="error text-danger" v-if="!$v.email.required">Email Address is required</div>
                    <div class="error text-danger" v-if="!$v.email.email">Please enter a valid email address.</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                    <label for="password">Password</label>
                    <input type="password" required="required" name="password" id="password" class="form-control mb-3"
                           placeholder="Password"
                           v-model="password">
                    <div class="error text-danger" v-if="!$v.password.required">Please enter a password.</div>
                </div>
                <div class="form-group" :class="{ 'form-group--error': $v.confirmPassword.$error }">
                    <label for="confirmPassword">Password</label>
                    <input type="password" required="required" name="password" id="confirmPassword"
                           class="form-control mb-3"
                           placeholder="Password"
                           v-model="confirmPassword">
                    <div class="error text-danger" v-if="!$v.confirmPassword.required">Please enter a password.</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-info" style="width: 100%" @click.prevent="registerByEmailLocal"
                            :disabled="isLoading">
                        <i v-if="isLoading" class="fa fa-spinner fa-spin"/>
                        Register
                    </button>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <router-link to="/login"><a class="text-info">Login</a></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'
    import {} from '../../stores/modules/auth'

    export default {
        data() {
            return {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
                isLoading: false,
                confirmPassword: ''
            }
        },
        validations: {
            firstName: {required},
            lastName: {required},
            phoneNumber: {required, maxLength: maxLength(10), minLength: minLength(10)},
            email: {required, email},
            password: {required, minLength: minLength(8)},
            confirmPassword: {required, minLength: minLength(8)},
        },
        methods: {
            ...mapActions(['clearMessage', 'addMessage', 'registerByEmail']),
            registerByEmailLocal() {
                if (this.password != this.confirmPassword) {
                    let message_obj = {
                        message: "Oops Password Validation Failed,Please enter the right email address in both the email and confirm email input boxes",
                        messageClass: "danger",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                    this.isLoading = false
                    return
                }

                this.isLoading = true
                let data = {
                    email: this.email,
                    password: this.password,
                    displayName: this.firstName.trim() + ' ' + this.lastName.trim(),
                    firstName: this.firstName.trim(),
                    lastName: this.lastName.trim(),
                    telNum: this.phoneNumber
                }
                console.log(data);
                this.registerByEmail(data).then(() => {
                    this.clearMessage();
                    this.$router.push({name: 'store'});
                }).catch((error) => {
                    // console.log('register error', error);
                    let message_obj = {
                        message: error.message,
                        messageClass: "danger",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                }).then(() => {
                    this.isLoading = false
                })
            }
        }
    }
</script>
