<template>
    <div class="">
        <form action="https://sandbox.payfast.co.za/eng/process" method="POST">
            <input type="text" name="merchant_id" value="10000100">
                <input type="text" name="merchant_key" value="46f0cd694581a">
                <router-link name="return_url" to="/success"></router-link>
                <router-link name="cancel_url" to="/cancel"></router-link>
                <router-link name="notify_url" to="/success"></router-link>
                <input type="text" name="amount" value="100.00">
                <input type="text" name="item_name" value="Test Item">
                <input type="text" name="item_description" value="A test product">
                <input type="text" name="custom_int1" value="2">
                <input type="text" name="custom_str1" value="Extra order information">
                <input type="submit" value="Submit">
        </form>
    </div>

</template>

<script>
    export default {
        name: "Checkout"
    }
</script>

<style scoped>

</style>
