<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
            <form id="register-form" role="form">
                <h3 class="text-center">Product Sizes</h3>
                <div class="form-group">
                    <label for="productTypeName">Product Type Name</label>
                    <input type="text" required="required" name="productTypeName" id="productTypeName"
                           class="form-control mb-3"
                           placeholder="Product Type Name"
                           value=""
                           v-model="productType.productTypeName">
                    <div class="error text-danger" v-if="!$v.productType.productTypeName.required">Product Type
                        Required
                    </div>
                </div>
                <div class="form-group">
                    <label for="size">Add Size</label>
                    <input type="size" required="required" name="size" id="size"
                           class="form-control mb-3"
                           placeholder="Add Size"
                           value=""
                           v-model="size">
                    <button class="btn btn-info" style="width: 100%" @click.prevent="addSize(size)"
                            :disabled="false">
                        <i v-if="false" class="fa fa-spinner fa-spin"/>
                        Add Size
                    </button>
                </div>
                <div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Size</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in productType.sizes" :key="item">{{item}}</tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group">
                    <button class="btn btn-success" style="width: 100%" @click.prevent="saveProductTypeLocal"
                            :disabled="false">
                        <i v-if="false" class="fa fa-spinner fa-spin"/>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import {required} from "vuelidate/lib/validators";
    import {mapActions} from "vuex";

    export default {
        name: "ProductTypes",
        data() {
            return {
                productType: {
                    productTypeName: '',
                    sizes: [],
                    size: ''
                }
            }
        },
        computed: {
        },
        methods: {
            ...mapActions(['saveProductType']),
            addSize(size) {
                this.productType.sizes.push(size);
            },
            saveProductTypeLocal(){
                this.saveProductType(this.productType);
            }
        },
        validations: {
            productType: {
                productTypeName: {required}
            }
        }
    }
</script>

<style scoped>

</style>
