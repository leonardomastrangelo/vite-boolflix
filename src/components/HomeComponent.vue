<template>
    <div id="home">
        <header class="position-relative">
            <video muted loop src="/trailer.mp4"></video>
            <img src="/images/oppen-logo.png" alt="oppenheimer">
        </header>
        <main class="container-fluid overflow-hidden py-5 px-2">
            <h2 class="text-light display-5 pb-3">Popular Movies</h2>
            <div class="row" ref="column">
                <div v-for="(item, index) in store.popularList" :key="item.id" class="col-2 py-2"
                    :class="{ 'active': isActive('Movie', index) }">
                    <img class="w-100" :src="imageUrl + item.backdrop_path" />
                </div>
            </div>
            <h2 class="text-light display-5 pb-3">Popular Series Tv</h2>
            <div class="row">
                <div v-for="(item, index) in store.popularListSeries" :key="item.id" class="col-2 py-2"
                    :class="{ 'active': isActive('Serie', index) }">
                    <img class="w-100" :src="imageUrl + item.backdrop_path" />
                </div>
            </div>
            <h2 class="text-light display-5 pb-3">Upcoming Movies</h2>
            <div class="row">
                <div v-for="(item, index) in store.upComing" :key="item.id" class="col-2 py-2">
                    <img class="w-100" :src="imageUrl + item.backdrop_path"
                        :class="{ 'active': isActive('Upcoming', index) }" />
                </div>
            </div>
            <h2 class="text-light display-5 pb-3">Actors in recent movies/series</h2>
            <div class="row">
                <div v-for="(item, index) in store.actorsList" :key="item.id" class="col-2 py-2">
                    <img class="w-100" :src="imageUrl + item.profile_path"
                        :class="{ 'active': isActive('Actor', index) }" />
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
            activeMovieIndex: 0,
            activeSerieIndex: 0,
            activeUpcomingIndex: 0,
            activeActorIndex: 0,
            columnWidth: 0,
        };
    },
    components: {
        CardComponent,
    },
    methods: {
        getPopular() {
            const popularUrl = "https://api.themoviedb.org/3/movie/popular"
            axios.get(popularUrl, { params: store.params }).then((res) => {
                store.popularList = res.data.results;
            });
        },
        getPopularSeries() {
            const popularUrlSeries = "https://api.themoviedb.org/3/tv/top_rated"
            axios.get(popularUrlSeries, { params: store.params }).then((res) => {
                store.popularListSeries = res.data.results;
            });
        },
        getUpcoming() {
            const upComingUrl = "https://api.themoviedb.org/3/movie/upcoming"
            axios.get(upComingUrl, { params: store.params }).then((res) => {
                store.upComing = res.data.results;
            });
        },
        getActors() {
            const actorsUrl = "https://api.themoviedb.org/3/person/popular"
            axios.get(actorsUrl, { params: store.params }).then((res) => {
                store.actorsList = res.data.results;
            });
        },
        isActive(category, index) {
            const activeIndex = this[`active${category}Index`];
            return index === activeIndex;
        },

        updateActiveItemMovies() {
            this.activeMovieIndex = (this.activeMovieIndex + 1) % store.popularList.length;
        },

        updateActiveItemSeries() {
            this.activeSerieIndex = (this.activeSerieIndex + 1) % store.popularListSeries.length;
        },

        updateActiveItemUpcoming() {
            this.activeUpcomingIndex = (this.activeUpcomingIndex + 1) % store.upComing.length;
        },

        updateActiveItemActors() {
            this.activeActorIndex = (this.activeActorIndex + 1) % store.actorsList.length;
        },

    },

    created() {
        this.getPopular();
        this.getPopularSeries();
        this.getUpcoming();
        this.getActors();

    },
    mounted() {
        setInterval(() => this.updateActiveItemMovies(), 1000);
        setInterval(() => this.updateActiveItemSeries(), 1000);
        setInterval(() => this.updateActiveItemUpcoming(), 1000);
        setInterval(() => this.updateActiveItemActors(), 1000);

    }
};
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
}

.col-3 {
    position: relative;
}

.row::-webkit-scrollbar {
    display: none;
}

.active {
    transform: scale(1.1);
}
</style>
