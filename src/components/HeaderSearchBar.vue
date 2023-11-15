<template>
    <header class="container-fluid">
        <div class="row">
            <!-- logo -->
            <div class="col-6">
                <img id="logo" src="/images/logo.jpg" alt="logo">
            </div>

            <div class="col-6 d-flex flex-column align-items-end justify-content-center">
                <div class="me-2">
                    <label for="search" class="form label text-light">Search Movies/Tv Series by name</label>
                    <input type="text" id="search" name="search" class="form-control" placeholder="The Witcher"
                        v-model="userSearch">
                    <button @click="$emit('filteringMoviesAndSeries', userSearch)">Search</button>
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
</style>