<template>
    <div class="mb-3 mb-md-4 col-md-3 col-12" @click="goToRoute(item.productID)">
        <md-card md-with-hover class="alert-light">
            <md-ripple>
                <md-card-header>
                </md-card-header>
                <b-img-lazy :src="item.thumbnailURL" alt="" class="card-img-top"></b-img-lazy>
                <md-card-content>
                    <router-link :to="'/product/' + item.productID" tag="h4" class="card-title"><a class="text-info">{{
                        item.productName
                        }}</a>
                    </router-link>
                    <!--                <p class="card-text truncate">{{ item.productDescription | shortDescription}}</p>-->
                    <div class="">
                        <p class="font-italic text-black-50">{{ item.brandName}}</p>
                        <hr>
                        <p v-if="!item.alternatingPrices" class="price "> {{ item.startingPrice | currency}}</p>
                        <p v-if="item.alternatingPrices" class="price "> From {{ item.startingPrice | currency}}</p>
                    </div>                </md-card-content>
            </md-ripple>
        </md-card>
    </div>
<!--        <div class="mb-3 mb-md-4 col-md-3 col-12">-->
<!--            <div class="card" @click="goToRoute(item.productID)">-->
<!--                <div class="img-container">-->
<!--                    <b-img-lazy :src="item.thumbnailURL" alt="" class="card-img-top"></b-img-lazy>-->
<!--                </div>-->
<!--                <div class="card-body card-text">-->
<!--                    -->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
</template>

<script>
    import {
        mapActions, mapGetters
    } from 'vuex';

    export default {
        props: ['item', 'displayList'],
        methods: {
            ...mapActions(['updateCart', 'getProductTypes']),
            addItem() {
                const order = {
                    item: Object.assign({}, this.item),
                    quantity: 1,
                    isAdd: true
                };
                this.updateCart(order);
            },
            goToRoute(id) {
                this.$router.push({path: '/product/' + id, params: {id: id}})
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        created() {
        },
        filters: {
            shortDescription(value) {
                if (value && value.length > 25) {
                    return value.substring(0, 25) + '...';
                } else {
                    return value;
                }
            },
            currency(value) {
                return 'R' + parseFloat(value).toFixed(2);

            }
        }
    }
</script>

<style lang="scss" scoped>
    .img-container {
        text-align: center;
    }

    .font-initial {
        font: initial;
    }

    .price {
        font-family: "Times New Roman"
    }

    div.card {
        height: 100%;
        border: none !important;

        &:hover {
            transition: all 0.5s ease-in;
            box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
            border: 1px solid #cccccc;
            background-color: white;
        }

        &:hover:before {
            transform: scale(2.15);
        }
    }

    .card-text {
        font-size: 0.875rem;
        line-height: 0
    }

    .remain {
        color: #d17581;
    }

    .grow {
        transition: all .2s ease-in-out;
    }

    .grow:hover {
        transform: scale(1.1);
    }

    .list-group-item {
        float: none;
        width: 100%;
        background-color: #fff;
        margin-bottom: 30px;
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
        padding: 0 1rem;
        border: 0;

        .thumbnail {
            display: inline-block;
            width: 100%;
        }

        .img-event {
            width: 20%;
            float: left;
            padding: 0 !important;
            margin: 0;
            height: auto;
        }

        .thumbnail-image {
            position: static;
        }

        .card-body {
            float: left;
            /*width: 80%;*/
            margin: 0;
        }

        @media (max-width: 767.98px) {
            .img-event {
                width: 30%;
                float: left;
                padding: 0 !important;
                margin: 0;
            }

            .card-body {
                float: left;
                width: 70%;
                margin: 0;
            }
        }
    }


    .item.list-group-item:before, .item.list-group-item:after {
        display: table;
        content: " ";
    }

    .item.list-group-item:after {
        clear: both;
    }

    .cardLike:hover {
        transition: all 0.6s ease-out;
        box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
        border: 1px solid #cccccc;
        background-color: white;
    }

    .card-img-top {
        flex-shrink: 0 !important;
        width: 100% !important;
        height: 200px !important;
        object-fit: contain !important;
        -o-object-fit: contain !important;
    }


</style>
