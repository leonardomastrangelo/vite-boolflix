<template>
    <div v-if="store.showMoviesSection">
        <div id="movies-sec">
            <main class="container py-5">
                <h2 class="display-2 text-uppercase">Now playing Movies</h2>
                <section class="row justify-content-center pb-5">
                    <div class="col-8 col-md-4 col-xl-3 position-relative" v-for="(movie, index) in store.nowPlayingList"
                        :key="movie.id">
                        <CardComponent :title="movie.title" :or-title="movie.original_title"
                            :language="movie.original_language" :vote="movie.vote_average" :image-path="movie.backdrop_path"
                            :plot="movie.overview" />
                    </div>
                </section>
                <h2 class="display-2 text-uppercase">Reccomandations</h2>
                <p>Se ti piace Oppenheimer amerai sicuramente..</p>
                <div class="row justify-content-center">
                    <div class="col-8 col-md-4 col-xl-3 position-relative" v-for="(movie, index) in store.moviesRec"
                        :key="movie.id">
                        <CardComponent :title="movie.title" :or-title="movie.original_title"
                            :language="movie.original_language" :vote="movie.vote_average" :image-path="movie.backdrop_path"
                            :plot="movie.overview" />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import CardComponent from './CardComponent.vue';
export default {
    name: "MovieListComponent",
    data() {
        return {
            store,
        }
    },
    components: {
        CardComponent
    },
    methods: {
        getNowPlaying() {
            const nowUrl = `https://api.themoviedb.org/3/movie/now_playing`
            axios.get(nowUrl, { params: store.params }).then((res) => {
                store.nowPlayingList = res.data.results
            })
        },
        getRec() {
            const movie = 575264
            const recUrl = `https://api.themoviedb.org/3/movie/${movie}/recommendations`
            axios.get(recUrl, { params: store.params }).then((res) => {
                store.moviesRec = res.data.results
            })

        }

    },
    created() {

        this.getNowPlaying()
        this.getRec()

    },

}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

#movies-sec {
    background: $bg_gradient;
}
</style>