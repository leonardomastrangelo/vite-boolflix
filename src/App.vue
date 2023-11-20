<template>
  <Transition name="bounce">
    <SplashComponent />
  </Transition>
  <HeaderSearchBar @filtering-movies-and-series="getMoviesAndSeries" />
  <ResearchComponent :class="{ 'd-none': !store.activeResearch, 'd-none': store.params.query === '' }" />
  <HomeComponent />
  <TransitionGroup :duration="550" name="slide-fade">
    <MovieListComponent />
  </TransitionGroup>
</template>

<script>
import axios from 'axios';
import { store } from './assets/data/store.js'
// components
import HeaderSearchBar from './components/HeaderSearchBar.vue';
import ResearchComponent from './components/ResearchComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import MovieListComponent from './components/MovieListComponent.vue';
import SplashComponent from './components/SplashComponent.vue';
export default {
  name: "App",
  data() {
    return {
      store,
    }
  },
  components: {
    HeaderSearchBar,
    ResearchComponent,
    HomeComponent,
    MovieListComponent,
    SplashComponent,
  },
  methods: {
    getMoviesAndSeries(value) {
      store.params.query = value
      const movieUrl = store.apiUrl + store.endpoint.movies
      axios.get(movieUrl, { params: store.params }).then((res) => {
        store.moviesList = res.data.results
      })
      const seriesUrl = store.apiUrl + store.endpoint.series
      axios.get(seriesUrl, { params: store.params }).then((res) => {
        store.seriesList = res.data.results
      })
    },

  },
  created() {
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}</style>