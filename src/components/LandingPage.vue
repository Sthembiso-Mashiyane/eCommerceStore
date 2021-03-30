<template>
    <sequential-entrance>
    <div class="container-fluid">
        <div class="row p-2">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <swiper-slide><img src="../assets/images/example.png" /></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="row">
            <div class="col-lg-6 col-12 p-2"><img
                    src="../assets/images/istockphoto-1011190214-1024x1024.jpg" /></div>
            <div class="col-lg-6 col-12  p-2"><img
                    src="../assets/images/istockphoto-1165885378-1024x1024.jpg" /></div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-12  p-2"><img
                    src="../assets/images/istockphoto-1165885378-1024x1024.jpg" /></div>
            <div class="col-lg-4 col-12  p-2"><img
                    src="../assets/images/istockphoto-1165885378-1024x1024.jpg" /></div>
            <div class="col-lg-4 col-12  p-2"><img
                    src="../assets/images/istockphoto-1011190214-1024x1024.jpg" /></div>
        </div>
    </div>
    </sequential-entrance>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'

    export default {
        title: 'Keyboard control',
        name: "LandingPage",
        components: {Swiper, SwiperSlide},
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    loop:true,
                    keyboard: {
                        enabled: true,
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                }
            }
        }
    }
</script>

<style scoped>
    swiper-slide{
             width:100%
         }

    swiper{
        width:100%
    }

    img{
        width:100%
    }
</style>
