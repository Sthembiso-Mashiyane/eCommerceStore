<template>
    <div class="row">
        <div v-if="isUserLoading" class="w-100">
            <grid-loader :loading="isUserLoading" :color="loaderColor"
                         :size="loaderSize"></grid-loader>
        </div>
        <div v-if="!isUserLoading" class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
            <div class="card mb-3">
                <div class="card-body">
                    <form id="register-form" role="form">
                        <h3 class="text-center">User Details</h3>
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input type="text" required="required" name="email" id="firstName" class="form-control mb-3"
                                   placeholder="First Name"
                                   value=""
                                   v-model="user.firstName">
                            <div class="error text-danger" v-if="!$v.user.firstName.required">First Name is required
                            </div>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.lastName.$error }">
                            <label for="lastName">Last Name</label>
                            <input type="email" required="required" name="email" id="lastName" class="form-control mb-3"
                                   placeholder="Last Name"
                                   value=""
                                   v-model="user.lastName">
                            <div class="error text-danger" v-if="!$v.user.lastName.required">Last Name is required</div>

                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.user.telNumber.$error }">
                            <label for="phoneNumber">Phone Number</label>
                            <input type="number" required="required" name="email" id="phoneNumber"
                                   class="form-control mb-3"
                                   placeholder="Telephone Number"
                                   value=""
                                   v-model="user.telNumber">
                            <div class="error text-danger" v-if="!$v.user.telNumber.required">Phone Number is required
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" required="required" name="email" id="email" class="form-control mb-3"
                                   placeholder="Email Address"
                                   value=""
                                   disabled="disabled"
                                   v-model="user.email">
                            <div class="error text-danger" v-if="!$v.user.email.required">Email Address is required
                            </div>
                            <div class="error text-danger" v-if="!$v.user.email.email">Please enter a valid email
                                address.
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-success" style="width: 100%" @click.prevent="updateUserLocal"
                                    :disabled="isLoading">
                                <i v-if="isLoading" class="fa fa-spinner fa-spin"/>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {required, maxLength, minLength, email} from 'vuelidate/lib/validators';
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
                isLoading: false
            }
        },
        validations: {
            user: {
                firstName: {required},
                lastName: {required},
                telNumber: {required, maxLength: maxLength(10), minLength: minLength(10)},
                email: {required, email},
            }
        },
        computed: {
            ...mapGetters(['user', 'isUserLoading']),
        },
        components: {
            GridLoader
        },
        methods: {
            ...mapActions(['clearMessage', 'addMessage', 'updateUser', 'getUser']),
            updateUserLocal() {
                this.isLoading = true
                console.log(this.user)
                let data = {
                    displayName: this.user.firstName + ' ' + this.lastName,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    telNumber: this.user.telNumber,
                    uid: this.user.uid
                }
                console.log(data);
                this.updateUser(data).then(() => {
                    this.clearMessage();
                    let message_obj = {
                        message: "Details Updated Successfully",
                        messageClass: "success",
                        autoClose: true
                    }
                    this.addMessage(message_obj);

                    //this.$router.push({name: 'store'});
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
