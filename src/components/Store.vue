<template>
    <div class="container-fluid" :class="{loadingItem: isProductListLoading}">
        <div v-if="isProductListLoading" class="">
            <grid-loader :loading="!isProductListLoading" :color="loaderColor"
                         :size="loaderSize"></grid-loader>
        </div>
        <div v-else class="row">
            <div class="col-lg-2 d-none d-lg-block">
                <div class="sidebar">
                    <div>
                        <img class="img-fluid" fluid src="../assets/images/logo/dripyLogoBlack.png">
                    </div>
                    <div class="mt-4">
                        <label>Order By:</label>
                        <b-form-select size="sm" @change="orderMethod" v-model="order">
                            <b-form-select-option disabled value="">
                                Select Order By...
                            </b-form-select-option>
                            <b-form-select-option value="">
                                None
                            </b-form-select-option>
                            <b-form-select-option value="MostRecent">
                                Most Recent
                            </b-form-select-option>
                            <b-form-select-option value="LowToHigh">
                                Price : Low to High
                            </b-form-select-option>
                            <b-form-select-option value="HighToLow">
                                Price : High to Low
                            </b-form-select-option>
                        </b-form-select>
                    </div>
                    <div class="mt-4">
                        <label>Product Type:</label>
                        <b-form-select size="sm" aria-placeholder="Product Type" v-model="productType">
                            <b-form-select-option :value=emptyProductType selected disabled>Please Select Product
                                Type...

                            </b-form-select-option>
                            <b-form-select-option :value=emptyProductType>None

                            </b-form-select-option>
                            <b-form-select-option v-for="prodType in productTypes"
                                                  :key="prodType" :value="prodType">{{prodType.productTypeName}}
                            </b-form-select-option>
                        </b-form-select>
                    </div>
                    <div class="mt-4">
                        <label>Gender:</label>
                        <b-form-select size="sm" aria-placeholder="Product Type" v-model="gender">
                            <b-form-select-option value="" selected disabled>Please Select Gender...
                            </b-form-select-option>
                            <b-form-select-option value="">None
                            </b-form-select-option>

                            <b-form-select-option value="unisex">Unisex

                            </b-form-select-option>
                            <b-form-select-option value="male">Male

                            </b-form-select-option>
                            <b-form-select-option value="female">Female

                            </b-form-select-option>
                            <b-form-select-option value="boy">Boy

                            </b-form-select-option>
                            <b-form-select-option value="girl">Girl

                            </b-form-select-option>
                        </b-form-select>
                    </div>
                    <!--                    <div class="mt-4">-->
                    <!--                        <label>Starting Price:</label>-->
                    <!--                        <b-form-select size="sm" v-model="startingPrice">-->
                    <!--                            <b-form-select-option value="" selected disabled>Please Select A Starting Price...-->
                    <!--                            </b-form-select-option>-->
                    <!--                            <b-form-select-option value="">None-->
                    <!--                            </b-form-select-option>-->

                    <!--                            <b-form-select-option value="100">From R100-->
                    <!--                            </b-form-select-option>-->

                    <!--                            <b-form-select-option value="">From R200-->
                    <!--                            </b-form-select-option>-->

                    <!--                            <b-form-select-option value="">From R300-->
                    <!--                            </b-form-select-option>-->

                    <!--                            <b-form-select-option value="">From R500-->
                    <!--                            </b-form-select-option>-->

                    <!--                            <b-form-select-option value="">Above R500-->
                    <!--                            </b-form-select-option>-->
                    <!--                        </b-form-select>-->
                    <!--                    </div>-->
                </div>
            </div>
            <div class="col-lg-10 col-sm-12 col-12">
                <div class="row mb-4 p-1 px-md-3">
                    <div class="d-none d-md-block w-100">
                        <b-input-group class="" size="md">
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon-search></b-icon-search></span>
                            </b-input-group-prepend>
                            <b-form-input id="input-1" placeholder="Search..." v-model="search"
                                          trim></b-form-input>
                        </b-input-group>
                    </div>
                    <div class="d-block d-sm-none w-100">
                        <b-input-group class="" size="sm">
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon-search></b-icon-search></span>
                            </b-input-group-prepend>
                            <b-form-input id="input-1" placeholder="Search..." v-model="search"
                                          trim></b-form-input>
                        </b-input-group>
                    </div>
                </div>
                <div v-if="filteredList.length > 0" class="row">
                    <app-product-item :hidden="prod.totalStock === 0" v-for="prod in filteredList" :item="prod"
                                      :key="prod.productID"
                                      :displayList="displayList">

                    </app-product-item>
                </div>
                <div v-else class="row">
                    <div class="p-5 text-center m-auto">
                        <img src="../assets/icons/sad-no-items-found.svg" alt="Dripy no item found">
                        <h2 class="mt-4">No Products Found</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ProductItem from './product/ProductItem.vue';
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
                displayList: false,
                search: '',
                gender: '',
                productType: {
                    productTypeName: ''
                },
                emptyProductType: {
                    productTypeName: ''
                },
                startingPrice: 0
                , order: ''
            }
        },
        computed: {
            ...mapGetters(['inventory', 'products', 'isProductListLoading', 'productTypes']),
            filteredList() {
                return this.products.filter(product => {
                    return (product.productName.toLowerCase().includes(this.search.toLowerCase()) ||
                        product.productDescription.toLowerCase().includes(this.search.toLowerCase()) ||
                        product.brandName.toLowerCase().includes(this.search.toLowerCase())) &&
                        product.productType.productTypeName.toLowerCase().includes(this.productType.productTypeName.toLowerCase())
                        && product.gender.toLowerCase().includes(this.gender.toLowerCase())
                });
            }
        },
        created() {
            this.orderMethod()
        },
        filters: {
            currency(value) {
                return 'R' + parseFloat(value).toFixed(2);

            }
        },
        components: {
            appProductItem: ProductItem,
            GridLoader
        },
        methods: {
            orderByTimestamp(a, b) {
                if (a.addedTimeStamp < b.addedTimeStamp) {
                    return 1;
                }
                if (a.addedTimeStamp > b.addedTimeStamp) {
                    return -1;
                }
                return 0;
            },
            orderByPriceLowToHigh(a, b) {
                if (a.startingPrice > b.startingPrice) {
                    return -1;
                }
                if (a.startingPrice < b.startingPrice) {
                    return 1;
                }
                return 0;
            },

            orderByPriceHighToLow(a, b) {
                if (a.startingPrice < b.startingPrice) {
                    return -1;
                }
                if (a.startingPrice > b.startingPrice) {
                    return 1;
                }
                return 0;
            },
            orderMethod(event) {
                if (event === "MostRecent") {
                    this.filteredList.sort(this.orderByTimestamp)
                } else if (event === "LowToHigh") {
                    this.filteredList.sort(this.orderByPriceLowToHigh)

                } else if (event === "HighToLow") {
                    this.filteredList.sort(this.orderByPriceHighToLow)

                } else {
                    return
                }
            }
        }
    }
</script>

<style>
    select {
        background-image: linear-gradient(45deg, transparent 50%, #17a2b8 60%),
        linear-gradient(135deg, #17a2b8 40%, transparent 50%) !important;
        background-position: calc(100% - 30px) 14px,
        calc(100% - 20px) 14px,
        100% 0;
        background-size: 10px 10px,
        10px 10px;
        background-repeat: no-repeat;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
</style>
