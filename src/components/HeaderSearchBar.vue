<template>
    <header class="container-fluid d-flex justify-content-between" v-show="store.showHeader">
        <!-- logo -->
        <div class="d-none d-md-block">
            <a @click="showHome" href="#home"><img id="logo" src="/images/logo.jpg" alt="logo"></a>
        </div>

        <div class="d-flex justify-content-center align-items-center">
            <ul>
                <li class=" position-relative py-3">
                    <a @click="showMoviesSection" href="#movies-sec"
                        :class="{ 'active-link': store.showMoviesSection }">Movies</a>
                    <div :class="{ 'active-bar': store.showMoviesSection }"></div>
                </li>
            </ul>
            <ul class="d-lg-flex d-none justify-content-center align-items-center">
                <li v-for="link in headerLinks">
                    <a href="#">
                        {{ link }}
                    </a>
                </li>
            </ul>
            <div class="dropdown px-3 d-lg-none">
                <button class="bg-transparent border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">

                </button>
                <ul class="dropdown-menu py-3">
                    <li v-for="link in headerLinks">
                        <a href="#">
                            {{ link }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="d-flex justify-content-end align-items-center">
            <div id="search-element" class="d-flex justify-content-end align-items-center p-2">
                <button class="border-0 bg-transparent"
                    @click="$emit('filteringMoviesAndSeries', userSearch); showResearch()">
                    <a href="#research-component"><i class="fa-solid fa-magnifying-glass p-2 text-light"></i></a>
                </button>
                <div class="me-2">
                    <input type="text" id="search" name="search" class="form-control border-0" placeholder="The Witcher"
                        v-model="userSearch" @keyup.enter="$emit('filteringMoviesAndSeries', userSearch); showResearch()">
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
            store,
            userSearch: "",
            headerLinks: [
                'explore',
                'tv series',
                'originals',
            ]
        }
    },
    methods: {
        showResearch() {
            store.activeResearch = true
            if (this.userSearch === "") {
                store.showHome = true
            } else {
                store.showHome = false
                store.showMoviesSection = false

            }
        },
        showHome() {
            store.activeResearch = false
            store.showMoviesSection = false
            store.showHome = true
        },
        showMoviesSection() {
            store.activeResearch = false
            store.showHome = false
            store.showMoviesSection = true
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

header {
    background-color: $primary_color;
    position: fixed;
    margin-bottom: 100%;

    z-index: 1000;
}

ul {
    list-style: none;
    padding: 0;

    li {
        padding: 0 30px;
    }
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

.active-link {
    color: rgba(255, 255, 255, 0.664);
}

.active-bar {
    width: 100%;
    height: 3px;
    position: absolute;
    top: 110%;
    left: 0;
    background-color: rgba(255, 255, 255, 0.664);
}

a:hover {
    transform: scale(1.1);
    color: rgba(255, 255, 255, 0.392);
}

.dropdown-toggle::after {
    color: rgba(255, 255, 255, 0.664);
}

.dropdown-menu {
    background-color: rgba(30, 28, 28, 0.999);

    a {
        color: rgb(43, 43, 43);
    }
}
</style>