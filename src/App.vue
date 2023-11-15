<template>
  <main>
    <section id="movies" class="container">
      <h2>Movies</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(movie, index) in store.moviesList" :key="movie.id">
          <!-- qua componente card -->
          {{ movie.title }}
        </div>
      </div>
    </section>
    <section id="series" class="container">
      <h2>TV Series</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3" v-for="(serie, index) in store.seriesList" :key="serie.id">
          <!-- qua componente card -->
          {{ serie.name }}
          <!-- basisc images (configuration) -->
          <img src="" alt="">
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { store } from './assets/data/store.js'
export default {
  name: "App",
  data() {
    return {
      store,
    }
  },
  methods: {
    getMoviesAndSeries() {
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
    this.getMoviesAndSeries()
  }
}
</script>

<style lang="scss" scoped></style>