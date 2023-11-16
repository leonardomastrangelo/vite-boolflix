<template>
    <header class="container-fluid">
        <div class="row">
            <!-- logo -->
            <div class="col-2">
                <img id="logo" src="/images/logo.jpg" alt="logo">
            </div>

            <div class="col-1 d-flex justify-content-center align-items-center" v-for="link in headerLinks">
                <a href="#">
                    {{ link }}
                </a>
            </div>

            <div class="col-7 d-flex justify-content-end align-items-center">
                <div id="search-element" class="d-flex justify-content-end align-items-center p-2">
                    <button class="border-0 bg-transparent"
                        @click="$emit('filteringMoviesAndSeries', userSearch); showResearch()">
                        <i class="fa-solid fa-magnifying-glass p-2 text-light"></i>
                    </button>
                    <div class="me-2">
                        <input type="text" id="search" name="search" class="form-control border-0" placeholder="The Witcher"
                            v-model="userSearch" @keyup="$emit('filteringMoviesAndSeries', userSearch); showResearch()">
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
import { store } from '../assets/data/store';

export default {
    name: "HeaderSearchBar",
    data() {
        return {
            userSearch: "",
            headerLinks: [
                'tv series',
                'movies',
                'originals'
            ]
        }
    },
    methods: {
        showResearch() {
            store.activeResearch = true
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

header {
    background-color: $primary_color;
}

a {
    text-decoration: none;
    color: rgb(43, 43, 43);
    text-transform: uppercase;
}

#logo {
    width: 200px;
}

input {
    opacity: 0;
    width: 0px;
    transition: all 1s ease-in-out;
    background-color: rgba(0, 0, 0, 0.651);
}

#search-element:hover input {
    width: 100%;
    opacity: 1;
}
</style>