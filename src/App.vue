<template>
  <HeaderSearchBar @filtering-movies-and-series="getMoviesAndSeries" />
  <main>
    <section id="movies" class="container">
      <h2>Movies</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(movie, index) in store.moviesList" :key="movie.id">
          <!-- qua componente card -->
          {{ movie.title }}
          {{ movie.original_title }}
          {{ movie.original_language }}
          {{ movie.vote_average }}
        </div>
      </div>
    </section>
    <section id="series" class="container">
      <h2>TV Series</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
          <!-- qua componente card -->
          {{ serie.name }}
          {{ serie.original_name }}
          {{ serie.original_language }}
          {{ serie.vote_average }}
          <!-- basisc images (configuration) -->
          <!-- <img src="" alt=""> -->
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
export default {
  name: "App",
  data() {
    return {
      store,
    }
  },
  components: {
    HeaderSearchBar,
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