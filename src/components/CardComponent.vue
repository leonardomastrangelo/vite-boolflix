<template>
    <div>
        <img class="my-fluid" :src="imageUrl + imagePath" :alt="title">
    </div>
    <div>
        <!-- title -->
        <h2>
            {{ title }}
        </h2>
        <!-- original title -->
        <h3>
            {{ orTitle }}
        </h3>
        <!-- original language -->
        <h3> {{ language }}</h3>
        <!-- vote average -->
        <h3>
            {{ vote }}
        </h3>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        title: String,
        orTitle: String,
        language: String,
        vote: Number,
        imagePath: String,
    },
    data() {
        return {
            imageUrl: "https://image.tmdb.org/t/p/w342/"
        }
    }
}
</script>

<style lang="scss" scoped>
.my-fluid {
    width: 100%;
    display: block;
}

h2 {
    font-size: 1.3em;
}

h3 {
    font-size: 1em;
}
</style>