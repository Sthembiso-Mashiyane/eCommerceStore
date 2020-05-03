<template>
    <div class="">
        <div class="pb-3">
            <b-button @click="showModal">Add Item</b-button>
        </div>
        <table class="table table-bordered table-responsive-sm">
            <thead>
            <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Product Type</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                <td>
                    <b-button class="w-100">Edit</b-button>
                </td>
            </tr>
            <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
                <td>
                    <b-button class="w-100">Edit</b-button>
                </td>

            </tr>
            <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
                <td>
                    <b-button class="w-100">Edit</b-button>
                </td>

            </tr>
            </tbody>
        </table>

        <b-modal ref="my-modal" size="xl" hide-footer title="Inventory">
            <div class="d-block">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
                        <form id="register-form" role="form">
                            <h3 v-if="!product.productID" class="text-center">Add New Item</h3>
                            <h3 v-if="product.productID" class="text-center">Edit Item</h3>
                            <div class="form-group">
                                <label for="productName">Product Name</label>
                                <input type="text" required="required" name="productName" id="productName"
                                       class="form-control mb-3"
                                       placeholder="Product Name"
                                       value=""
                                       v-model="product.productName">
                                <div class="error text-danger" v-if="!$v.product.productName.required">Brand Name is
                                    required
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="productDescription">Product Description </label>
                                <input type="text" required="required" name="productDescription"
                                       id="productDescription"
                                       class="form-control mb-3"
                                       placeholder="Product Description"
                                       value=""
                                       v-model="product.productDescription">
                                <div class="error text-danger" v-if="!$v.product.productDescription.required">Brand
                                    Description is
                                    required
                                </div>
                            </div>
                            <div v-if="!product.productID" class="form-group">
                                <button class="btn btn-success" style="width: 100%" @click.prevent="saveProductLocal"
                                        :disabled="false">
                                    <i v-if="false" class="fa fa-spinner fa-spin"/>
                                    Add
                                </button>
                            </div>
                            <div v-if="product.productID" class="form-group">
                                <button class="btn btn-success" style="width: 100%" @click.prevent="saveProduct"
                                        :disabled="false">
                                    <i v-if="false" class="fa fa-spinner fa-spin"/>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="px-2">
                <b-button variant="outline-info" class="mr-2" @click="hideModal">Save</b-button>
                <b-button variant="outline-danger" class="mr-2" @click="toggleModal">Close</b-button>
            </div>

        </b-modal>

    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Inventory",
        methods: {
            ...mapActions(['getBrandByID','saveInventory']),
            showModal() {
                this.$refs['my-modal'].show()
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
            toggleModal() {
                this.$refs['my-modal'].toggle('#toggle-btn')
            },
            saveProductLocal() {
                this.product.brandID = this.brand.brandID;
                this.product.ownerID = this.user.uid;
                this.saveInventory(this.product)
            },
            updateProduct() {

            },
        },
        computed: {
            ...mapGetters(['brand','user']),
        },
        created() {
            if (!this.brand) {
                this.getBrandByID(this.user.uid);
            }
        },

        validations: {
            product: {
                productName: {required},
                productDescription: {required},
            }
        },
        data() {
            return {
                product: {
                    productName: '',
                    productDescription: '',
                    productDetails: [],
                    reviews: [],
                    inventory: [],
                    productID: '',
                    brandID: '',
                    ownerID: '',
                    verified: false
                }
            }
        }
    }
</script>

<style scoped>

</style>
