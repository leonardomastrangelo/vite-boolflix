<template>
  <HeaderSearchBar @filtering-movies-and-series="getMoviesAndSeries" />
  <main>
    <section id="movies" class="container">
      <h2 class="display-2">Movies</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(movie, index) in store.moviesList" :key="movie.id">

          <CardComponent :title="movie.title" :or-title="movie.original_title" :language="movie.original_language"
            :vote="movie.vote_average" :image-path="movie.backdrop_path" />

        </div>
      </div>
    </section>
    <section id="series" class="container">
      <h2 class="display-2">TV Series</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(serie, index) in store.seriesList" :key="serie.id">

          <CardComponent :title="serie.name" :or-title="serie.original_name" :language="serie.original_language"
            :vote="serie.vote_average" :image-path="serie.backdrop_path" />

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { store } from './assets/data/store.js'
// components
import HeaderSearchBar from './components/HeaderSearchBar.vue';
import CardComponent from './components/CardComponent.vue';
export default {
  name: "App",
  data() {
    return {
      store,
    }
  },
  components: {
    HeaderSearchBar,
    CardComponent,
  },
  methods: {
    getMoviesAndSeries(value) {
      store.params.query = value
      const movieUrl = store.apiUrl + store.endpoint.movies
      axios.get(movieUrl, { params: store.params }).then((res) => {
        console.log(res.data.results);
        store.moviesList = res.data.results
      })
      const seriesUrl = store.apiUrl + store.endpoint.series
      axios.get(seriesUrl, { params: store.params }).then((res) => {
        console.log(res.data.results);
        store.seriesList = res.data.results
      })
    },
  },
  created() {
  }
}
</script>

<style lang="scss" scoped></style>