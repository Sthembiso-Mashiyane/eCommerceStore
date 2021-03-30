<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-12 offset-sm-1">
            <form id="login-form" role="form" style="display: block;">
                <h3 class="text-center">Login</h3>
                <div class="form-group">
                    <input type="email" name="email" id="email" class="form-control" placeholder="Email Address"
                           v-model="email">
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password"
                           v-model="password">
                </div>

                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-6 col-12 pb-3">
                            <button class="btn btn-info" style="width: 100%" @click.prevent="loginWithEmailLocal"
                                    :disabled="isLoading">
                                <i v-if="isLoading" class="fa fa-spinner fa-spin"/>
                                Log in
                            </button>
                        </div>
                        <div class="col-sm-6 col-12">
                            <button class="btn btn border-info" style="width: 100%" @click.prevent="loginWithGoogleLocal"
                                    :disabled="isLoading">
                                <i v-if="isLoading" class="fa fa-spinner fa-spin"/>
                                <img src="../../assets/images/5847f9cbcef1014c0b5e48c8.png" height="15px" alt="">
                                 Log in With Google
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';

    export default {
        data() {
            return {
                email: '',
                password: '',
                isLoading: false
            }
        },
        methods: {
            ...mapActions(['addMessage', 'clearMessage', 'loginWithEmail', 'loginWithGoogle']),
            loginWithEmailLocal() {
                this.isLoading = true
                let data = {
                    email: this.email,
                    password: this.password
                }
                this.loginWithEmail(data).then(() => {
                    this.clearMessage();
                    this.$router.push({
                        name: 'store'
                    });
                }).catch((error) => {
                    let message_obj = {
                        message: error.message,
                        messageClass: "danger",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                }).then(() => {
                    this.isLoading = false
                })
            },

            loginWithGoogleLocal() {
              this.isLoading = true
              this.loginWithGoogle().then(() => {
                    this.clearMessage();
                    this.$router.push({
                        name: 'store'
                    });
                }).catch((error) => {
                    let message_obj = {
                        message: error.message,
                        messageClass: "danger",
                        autoClose: true
                    }
                    this.addMessage(message_obj);
                }).then(() => {
                    this.isLoading = false
                });
            }
        }
    }
</script>
