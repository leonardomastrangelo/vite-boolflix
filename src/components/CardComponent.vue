<template>
    <div class="my-card py-4" @mouseleave="show = false">
        <div>
            <img class="my-fluid" :src="getImage()" :alt="title">
        </div>
        <div class="description p-4">
            <!-- title -->
            <h2 class="text-center">
                {{ title }}
            </h2>
            <!-- original title -->
            <h3 class="text-center fw-light">
                {{ orTitle }}
            </h3>
            <!-- original language -->
            <div>
                <img class="flag-size" :src="languageFlag" :alt="language">
            </div>
            <!-- vote average -->
            <h3 class="py-2">
                <i v-if="reducedVote !== 0" class="fa-star text-warning"
                    :class="(n <= reduceVote()) ? 'fa-solid' : 'fa-regular'" v-for="n in 5"></i>
                <div v-else class="fw-bold"> No reviews </div>
            </h3>
            <h2>Plot</h2>
            <i class="fa-solid fa-angles-down" @click="showPlot"></i>
        </div>
        <div :class="(!show) ? 'd-none' : 'shown'" class="rounded-bottom-3">
            <p v-if="plot === ''" class="text-center">
                Il Team è in fase di aggiunta
            </p>
            <p v-else class="text-center">
                {{ plot }}
            </p>
        </div>
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
        plot: String,
    },
    data() {
        return {
            imageUrl: "https://image.tmdb.org/t/p/w342/",
            languageFlag: "",
            reducedVote: this.vote,
            flags: [
                'ar', 'de', 'en', 'es', 'fr', 'it', 'ja'
            ],
            show: false
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
        },
        showPlot() {
            this.show = !this.show
        }

    },
    mounted() {
        this.convertToFlag()
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/partials/variables.scss' as *;

.my-fluid {
    width: 100%;
    display: block;
    transform: scale(1);
    transition: all 1s ease-in-out;
}

.my-card:hover .my-fluid {
    transform: scale(1.3);
    margin-bottom: 20px;
}

.description {
    display: none;
    flex-direction: column;
    align-items: center;
}

.flag-size {
    width: 30px;
}

h2 {
    font-size: 1.2em;
}

h3 {
    font-size: 0.86em;
}

.my-card:hover .description {
    display: flex;
    background-color: rgb(20, 19, 19);
}

.my-card:hover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
}

.shown {
    background-color: rgb(20, 19, 19);
    font-size: 0.85em;
    padding: 15px;
}
</style>