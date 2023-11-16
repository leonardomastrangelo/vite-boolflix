<template>
    <header class="container-fluid">
        <div class="row">
            <!-- logo -->
            <div class="col-2">
                <img id="logo" src="/images/logo.jpg" alt="logo">
            </div>

            <div class="col-10 d-flex justify-content-end align-items-center">
                <div id="search-element" class="d-flex justify-content-end align-items-center p-2">
                    <button class="border-0 bg-transparent" @click="$emit('filteringMoviesAndSeries', userSearch)">
                        <i class="fa-solid fa-magnifying-glass p-2 text-light"></i>
                    </button>
                    <div class="me-2">
                        <input type="text" id="search" name="search" class="form-control bg-transparent border-0"
                            placeholder="The Witcher" v-model="userSearch"
                            @keyup="$emit('filteringMoviesAndSeries', userSearch)">
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
export default {
    name: "HeaderSearchBar",
    data() {
        return {
            userSearch: ""
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

header {
    background-color: $primary_color;
}

#logo {
    width: 200px;
}

input {
    width: 0px;
}

#search-element:hover input {
    width: 100%;
}
</style>