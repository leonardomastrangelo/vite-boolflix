<template>
    <div id="home">
        <header class="position-relative">
            <video muted loop src="/trailer.mp4"></video>
            <img src="/images/oppen-logo.png" alt="oppenheimer">
        </header>
        <main class="contianer-fluid overflow-hidden py-5 px-2">
            <h2 class="text-light display-5 pb-3">I più popolari su netflix</h2>
            <div class="row" ref="sliderContainer">
                <div v-for="(item, index) in store.popularList" :key="item.id" class="col-2 py-2">
                    <img :ref="`slide${index}`" class="w-100" :src="this.imageUrl + item.backdrop_path"
                        :class="{ 'active': isActive === item.id }">
                </div>
            </div>

        </main>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import CardComponent from './CardComponent.vue';
import { nextTick } from 'vue';
export default {
    name: "HomeComponent",
    data() {
        return {
            store,
            imageUrl: "https://image.tmdb.org/t/p/w342/",
            isActive: ""
        }
    },
    components: {
        CardComponent,
    },
    methods: {
        getPopoluar() {
            const popularUrl = "https://api.themoviedb.org/3/movie/popular"
            axios.get(popularUrl, { params: store.params }).then((res) => {
                store.popularList = res.data.results
            })
        },
        updateActiveItem() {
            const nextIndex =
                this.isActive === ''
                    ? 0
                    : (store.popularList.findIndex((item) => item.id === this.isActive) +
                        1) %
                    store.popularList.length;
            this.isActive = store.popularList[nextIndex].id;

            // Esegui lo scrollIntoView sull'elemento attivo
            this.scrollToActiveItem(nextIndex);
        },
        scrollToActiveItem(index) {
            const activeElements = this.$refs[`slide${index}`];

            // Verifica se activeElements è un array e accedi al primo elemento
            const activeElement = Array.isArray(activeElements) ? activeElements[0] : activeElements;

            const container = this.$refs.sliderContainer;

            if (activeElement && container) {
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                });
            }
        },
    },
    created() {
        this.getPopoluar()
        setInterval(this.updateActiveItem, 1000);
    }

}
</script>

<style lang="scss" scoped>
@use "../assets/css/partials/variables.scss" as *;

#home {
    background: $bg_gradient;
}

video {
    width: 100%;
}

header img {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 40%;
}

.row {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
}

.col-3 {
    position: relative;
}

.row::-webkit-scrollbar {
    display: none;
}

.active {
    box-shadow: 10px 5px 5px black;
    transform: scale(1.05);
}
</style>