<template>
    <div>
        <img class="my-fluid" :src="getImage()" :alt="title">
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
            <i v-if="reducedVote !== 0" class="fa-star" :class="(n <= reduceVote()) ? 'fa-solid' : 'fa-regular'"
                v-for="n in 5"></i>
            <div v-else class="fw-bold"> No reviews </div>
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
            reducedVote: this.vote,
            flags: [
                'ar', 'de', 'en', 'es', 'fr', 'it', 'ja'
            ]
        }
    },
    methods: {
        getImage() {
            if (this.imagePath !== null) {
                return this.imageUrl + this.imagePath
            } else {
                return '/images/logo.jpg'
            }
        },
        convertToFlag() {
            (!this.flags.includes(this.language)) ? this.languageFlag = "/images/flags/earth.png" : this.languageFlag = "/images/flags/" + this.language + ".png"
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