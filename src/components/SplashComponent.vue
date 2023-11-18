<template>
    <div class="wrapper" v-if="showIntro">
        <div class="splash" v-if="store.showSplash">
            <video autoplay muted class="w-100" src="/net-intro.mp4"></video>
        </div>
        <div v-show="store.showUser">
            <h2 class="display-2 text-center">Chi sta guardando Netflix?</h2>
            <div id="users" class="d-flex justify-content-center align-items-center">
                <div v-for="user in users">
                    <div class="box">
                        <img class="my-fluid" :src="user.img" :alt="user.name">
                    </div>
                    <h2 class="fs-5 text-center py-2">
                        {{ user.name }}
                    </h2>
                </div>
                <div>
                    <div class="box" @click="showAll">
                        <img class="my-fluid" src="/images/me.jpg" alt="me">
                    </div>
                    <h2 id="me" class="fs-5 text-center py-2">
                        Me
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../assets/data/store';
export default {
    name: "SplasComponent",
    data() {
        return {
            store,
            users: [
                {
                    name: "Pippo",
                    img: "/images/av-1.jpg"
                },
                {
                    name: "Pluto",
                    img: "/images/av-2.jpg"
                },
                {
                    name: "Carovana",
                    img: "/images/av-3.jpg"
                },
            ],
            showIntro: true
        }
    },
    methods: {
        showAll() {
            store.showHeader = true
            store.showHome = true
            this.showIntro = false
        }
    },
    mounted() {
        setTimeout(() => {
            store.showSplash = false
            store.showUser = true
        }, 5000)
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

.splash {
    width: 100%;
    height: 100vh;
}

.box {
    width: 150px;
    margin: 20px;
}

.my-fluid {
    display: block;
    width: 100%;
}

.wrapper {
    width: 100%;
    height: 100vh;
    background: $bg_gradient;
    overflow: hidden;
}

h2 {
    padding-top: 200px;
}
</style>