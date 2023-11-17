<template>
  <HeaderSearchBar @filtering-movies-and-series="getMoviesAndSeries" />
  <ResearchComponent :class="{ 'd-none': !store.activeResearch, 'd-none': store.params.query === '' }" />
  <HomeComponent />
  <MovieListComponent />
</template>

<script>
import axios from 'axios';
import { store } from './assets/data/store.js'
// components
import HeaderSearchBar from './components/HeaderSearchBar.vue';
import ResearchComponent from './components/ResearchComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import MovieListComponent from './components/MovieListComponent.vue';
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
  }
}
</script>

<style lang="scss" scoped></style>