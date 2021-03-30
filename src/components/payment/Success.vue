<template>
    <div class="jumbotron text-center">
        <h1 class="display-3">Thank You For Payment!</h1>
        <p class="lead"><strong>Please check your email in the next 24 hours</strong> for further information on
            delivery.</p>
        <div class="row">
            <div class="text-center m-auto">
                <img src="../../assets/icons/success-tick-svgrepo-com.svg" width="60vw" alt="Dripy no item found">
            </div>
        </div>
        <hr>
        <p>
            Having trouble? <a href="">Contact us</a>
        </p>
        <p class="lead">
            <router-link class="btn btn-primary btn-sm" to="/store" role="button">Continue Shopping</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        name: "Success"
    }
</script>

<style scoped>

</style>
