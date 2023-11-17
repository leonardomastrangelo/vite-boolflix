<template>
    <main v-if="store.activeResearch === true">
        <section id="movies" class="container py-4">
            <h2 class="display-2">Movies</h2>
            <div v-if="store.moviesList.length === 0">
                {{ msgNoResult }}
            </div>
            <div class="row justify-content-center" v-else>
                <div class="col-8 col-md-4 col-xl-3 position-relative" v-for="(movie, index) in store.moviesList"
                    :key="movie.id">

                    <CardComponent :title="movie.title" :or-title="movie.original_title" :language="movie.original_language"
                        :vote="movie.vote_average" :image-path="movie.backdrop_path" :plot="movie.overview" />

                </div>
            </div>
        </section>
        <section id="series" class="container py-4">
            <h2 class="display-2">TV Series</h2>
            <div v-if="store.seriesList.length === 0">
                {{ msgNoResult }}
            </div>
            <div class="row justify-content-center" v-else>
                <div class="col-8 col-md-4 col-xl-3 position-relative" v-for="(serie, index) in store.seriesList"
                    :key="serie.id">

                    <CardComponent :title="serie.name" :or-title="serie.original_name" :language="serie.original_language"
                        :vote="serie.vote_average" :image-path="serie.backdrop_path" :plot="serie.overview" />

                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { store } from '../assets/data/store.js';
import CardComponent from './CardComponent.vue';
export default {
    name: "ResearchComponent",
    data() {
        return {
            store,
            msgNoResult: "La tua ricerca non ha prodotto risultati"
        }
    },
    components: {
        CardComponent
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables' as *;

main {
    background: $bg_gradient;
    padding: 100px 0;
}
</style>