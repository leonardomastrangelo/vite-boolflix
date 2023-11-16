<template>
    <header class="position-relative">
        <video muted loop src="/trailer.mp4"></video>
        <img src="/images/oppen-logo.png" alt="oppenheimer">
    </header>
    <main class="contianer-fluid overflow-hidden py-5 px-2">
        <h2 class="text-dark display-5 pb-3">I più popolari su netflix</h2>

        <div class="row" ref="sliderContainer" @scroll="handleSliderScroll">
            <div v-for="(item, index) in store.popularList" :key="item.id" class="col-2 py-2">
                <img class="w-100" :src="this.imageUrl + item.backdrop_path" :class="{ 'active': isActive === item.id }"
                    ref="slide">
            </div>
        </div>

    </main>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import CardComponent from './CardComponent.vue';
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
                this.isActive === ""
                    ? 0
                    : (store.popularList.findIndex((item) => item.id === this.isActive) + 1) %
                    store.popularList.length;

            this.isActive = store.popularList[nextIndex].id;
            this.checkAndScrollContainer();
        },
        checkAndScrollContainer() {
            const container = this.$refs.sliderContainer;
            const activeSlide = this.$refs.slide.find((slide) => slide.classList.contains('active'));

            if (activeSlide) {
                const containerRect = container.getBoundingClientRect();
                const slideRect = activeSlide.getBoundingClientRect();

                if (slideRect.right > containerRect.right) {
                    container.scrollLeft += slideRect.right - containerRect.right;
                } else if (slideRect.left < containerRect.left) {
                    container.scrollLeft -= containerRect.left - slideRect.left;
                }
            }
        },
    },
    created() {
        this.getPopoluar()
        setInterval(this.updateActiveItem, 3000);
    }

}
</script>

<style lang="scss" scoped>
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