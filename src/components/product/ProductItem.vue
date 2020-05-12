<template>
    <!--    <div class="mb-3 col-sm-4 col-md-3 item">-->
    <!--        <div class="card cardLike" style="">-->
    <!--            <div class="card-body">-->
    <!--                <h6 v-if="item.totalStock < 20" class="card-subtitle mb-2 text-warning">{{ item.totalStock }} left in-->
    <!--                    stock</h6>-->
    <!--            </div>-->
    <!--            <div class="">-->
    <!--                <b-img-lazy class="intrinsic thumbnail-image" :src=item.thumbnailURL :alt=item.description></b-img-lazy>-->
    <!--            </div>-->
    <!--            <div class="card-body">-->
    <!--                <router-link :to="'/product/' + item.productID" tag="h5" class="card-title"><a>{{ item.productName-->
    <!--                    }}</a></router-link>-->
    <!--                &lt;!&ndash;                <h6 v-if="item.totalStock > 20" class="card-subtitle mb-2 text-info">{{ item.totalStock }} left in&ndash;&gt;-->
    <!--                &lt;!&ndash;                    stock</h6>&ndash;&gt;-->
    <!--                <p v-if="!item.alternatingPrices">{{ item.startingPrice | currency }}</p>-->
    <!--                <p v-if="item.alternatingPrices">FROM {{ item.startingPrice | currency }}</p>-->
    <!--                <p v-if="item.productDescription"> {{ item.productDescription }}</p>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="mb-3 col-md-3" :class="{'list-group-item': displayList}">
        <div class="card" @click="goToRoute(item.productID)">
            <div class="card-body">
                <h6 v-if="item.totalStock < 11" class="card-subtitle mb-2 text-warning">{{ item.totalStock }} left in
                    stock</h6>
            </div>
            <div class="img-container">
                <img :src="item.thumbnailURL" alt="" class=" thumbnail-image card-img-top intrinsic-item">
            </div>
            <div class="card-body">
                <router-link :to="'/product/' + item.productID" tag="h5" class="card-title"><a class="text-info">{{
                    item.productName
                    }}</a>
                </router-link>
<!--                <p class="card-text truncate">{{ item.productDescription | shortDescription}}</p>-->
                <div class="">
                    <p class="">{{ item.startingPrice | currency}}</p>
                </div>
            </div>
        </div>
    </div>
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

    div.card {
        height: 100%;

        &:hover {
            transition: all 0.9s ease-out;
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


</style>
