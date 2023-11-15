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
        <div>
            <img class="flag-size" :src="languageFlag" :alt="language">
        </div>
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
            imageUrl: "https://image.tmdb.org/t/p/w342/",
            languageFlag: "",
        }
    },
    mounted() {
        if (this.language === "en") {
            this.languageFlagFlag = "/images/flags/england.png"
        } else if (this.language === 'ja') {
            this.languageFlag = "/images/flags/japan.png"
        } else if (this.language === 'es') {
            this.languageFlag = "/images/flags/flag.png"
        } else if (this.language === 'it') {
            this.languageFlag = "/images/flags/circle.png"
        } else if (this.language === 'fr') {
            this.languageFlag = "/images/flags/france.png"
        } else {
            this.languageFlag = "/images/flags/earth.png"
        }
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