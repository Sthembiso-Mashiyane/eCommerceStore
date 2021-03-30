<template>
    <div class="col-md-12">
        <div v-if="isProductLoading" class="text-center">
            <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"
                         class="d-inline-block"/>
        </div>
        <div class="mb-3">
            <md-card md-with-hover class="alert-light">
                <md-card-header>
                </md-card-header>
                <div class="col-12 col-md-4 offset-md-4 text-center">
                        <b-img-lazy class="" fluid :src=viewProduct.thumbnailURL
                                    :alt="viewProduct.productDescription"></b-img-lazy>
                </div>

                <md-card-content>
                    <div class="caption-full">
                        <h4 class="pull-right" v-if="moneyVal">R {{moneyVal}}</h4>
                        <h4 class="text-info"> {{ viewProduct.productName }}</h4>
                        <p> {{ viewProduct.productDescription }} </p>
                    </div>
                    <div class="ratings">
                        <span :hidden="viewProduct.productType.sizes[selectedIndex].stock > 10">{{ viewProduct.productType.sizes[selectedIndex].stock }} left in stock</span>
                        <div class="mt-3 mb-3">
                            <b-badge :hidden="size.stock == 0"
                                     v-for="(size,index) in viewProduct.productType.sizes"
                                     :key="size" href="#"
                                     class="mr-2 p-3 mb-2" @click="selectSize(index)" variant="primary">
                                {{size.size}}
                            </b-badge>
                        </div>
                        <p class="pull-right">
                            <button :disabled="!moneyVal" @click="addItem" class="btn btn-info">
                                Add to cart
                            </button>
                        </p>
                        <div class="clearfix"></div>
                    </div>
                </md-card-content>
            </md-card>
            <!--            <div v-else class="card mb-3">-->
            <!--                -->
            <!--                <div class="row">-->
            <!--                    <div class="col-12 col-md-4 offset-md-4">-->
            <!--                        <b-img-lazy class="" fluid :src=viewProduct.thumbnailURL :alt="viewProduct.productDescription"></b-img-lazy>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div class="caption-full">-->
            <!--                    <h4 class="pull-right" v-if="moneyVal">R {{moneyVal}}</h4>-->
            <!--                    <h4 class="text-info"> {{ viewProduct.productName }}</h4>-->
            <!--                    <p> {{ viewProduct.productDescription }} </p>-->
            <!--                </div>-->
            <!--                <div class="ratings">-->
            <!--                    <span :hidden="viewProduct.productType.sizes[selectedIndex].stock > 10">{{ viewProduct.productType.sizes[selectedIndex].stock }} left in stock</span>-->
            <!--                    <div class="mt-3 mb-3">-->
            <!--                        <b-badge :hidden="size.stock == 0" v-for="(size,index) in viewProduct.productType.sizes"-->
            <!--                                 :key="size" href="#"-->
            <!--                                 class="mr-2 p-3 mb-2" @click="selectSize(index)" variant="primary">{{size.size}}-->
            <!--                        </b-badge>-->
            <!--                    </div>-->
            <!--                    <p class="pull-right">-->
            <!--                        <button :disabled="!moneyVal" @click="addItem" class="btn btn-success">-->
            <!--                            Add to cart-->
            <!--                        </button>-->
            <!--                    </p>-->
            <!--                    <div class="clearfix"></div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        components: {
            GridLoader
        },
        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
                selectedIndex: 0,
                moneyVal: ''
            }
        },
        computed: {
            ...mapGetters(['isProductLoading', 'products', 'viewProduct']),
        },
        created() {
            let id = this.$route.params.id;
            this.getProductByID(id);
        },
        methods: {
            ...mapActions(['updateCart', 'getProductByID']),
            addItem() {
                const itemObject = {
                    size: this.viewProduct.productType.sizes[this.selectedIndex].size,
                    productID: this.viewProduct.productID,
                    price: this.viewProduct.productType.sizes[this.selectedIndex].price,
                    productName: this.viewProduct.productName,
                    productTypeName: this.viewProduct.productType.productTypeName,
                    thumbnailURL: this.viewProduct.thumbnailURL,
                }

                const order = {
                    item: Object.assign(itemObject),
                    quantity: 1,
                    isAdd: true
                };
                this.updateCart(order);
            },
            selectSize(index) {
                this.selectedIndex = index;
                this.formatPrice()
            },
            formatPrice() {
                this.moneyVal = (this.viewProduct.productType.sizes[this.selectedIndex].price / 1).toFixed(2).replace('.', ',')
                this.moneyVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
        }
    }
</script>

<style scoped>
    .caption-full {
        padding-right: 10px;
        padding-left: 10px;
    }

    .ratings {
        padding-right: 10px;
        padding-left: 10px;
        color: #d17581;
    }

    .card {
        box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
        border: 1px solid #cccccc;
        background-color: white;
    }
</style>
