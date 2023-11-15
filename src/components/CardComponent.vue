<template>
    <div v-if="imagePath !== null">
        <img class="my-fluid" :src="imageUrl + imagePath" :alt="title">
    </div>
    <div v-else>
        <img class="my-fluid" src="/images/logo.jpg" alt="logo">
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
        <div>
            <img class="flag-size" :src="languageFlag" :alt="language">
        </div>
        <!-- vote average -->
        <h3>
            <i v-if="reducedVote !== 0" class="fa-solid fa-star" v-for="vote in reduceVote()"></i>
            <div v-else class="fw-bold"> 0 votes </div>
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
            imageUrl: "https://image.tmdb.org/t/p/w342/",
            languageFlag: "",
            reducedVote: this.vote
        }
    },
    methods: {
        convertToFlag() {
            if (this.language !== "ar" && this.language !== "de" && this.language !== "en" && this.language !== "es" && this.language !== "fr" && this.language !== "it" && this.language !== "ja") {
                this.languageFlag = "/images/flags/earth.png"
            } else {
                this.languageFlag = "/images/flags/" + this.language + ".png"
            }
        },
        reduceVote() {
            return Math.ceil(this.reducedVote / 2)
        }

    },
    mounted() {
        this.convertToFlag()
    }
}
</script>

<style lang="scss" scoped>
.my-fluid {
    width: 100%;
    display: block;
}

.flag-size {
    width: 30px;
}

h2 {
    font-size: 1.3em;
}

h3 {
    font-size: 1em;
}
</style>