<template>
    <div id="home" v-if="store.showHome">
        <header class="position-relative">
            <video muted autoplay loop src="/trailer.mp4"></video>
            <img src="/images/oppen-logo.png" alt="oppenheimer">
        </header>
        <main class="container-fluid overflow-hidden py-5 px-2">
            <h2 class="text-light display-2 fw-bold pb-3">Popular Movies</h2>
            <div class="movie-container" ref="movies" @mouseover="() => isHoveredMovie = true"
                @mouseout="() => isHoveredMovie = false">
                <div v-for="(item, index) in store.popularList" :key="item.id" class="movie-item"
                    :class="{ 'active': isActive('Movie', index) }" @click="selectItem('Movie', index)">
                    <img class="movie-image" :src="imageUrl + item.backdrop_path" />
                    <div class="cast rounded-bottom-3 overflow-hidden">
                        <h4 class="fs-5 text-center py-3 mb-0" v-show="isActive('Movie', index) || isHoveredMovie">{{
                            item.title }}</h4>
                        <div class="info text-center pb-4 overflow-hidden"
                            v-show="isActive('Movie', index) || isHoveredMovie">
                            <div>
                                <span @click="showingCast"
                                    class="text-uppercase fw-bold badge text-bg-primary mb-2">cast</span>
                                <div :class="{ 'd-none': !showCast }"
                                    v-for="(castMember, castIndex) in item.credits.cast.slice(0, 5)" :key="castIndex">
                                    <span class="fw-light">{{ castMember.name
                                    }}</span>
                                </div>
                            </div>
                            <div class="py-3">
                                <h5 @click="showingDate" class="badge text-bg-light">release date</h5>
                                <div :class="{ 'd-none': !showDate }" class="text-center release-date">{{ item.release_date
                                }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="text-light display-2 fw-bold pb-3">Popular Series Tv</h2>
            <div class="movie-container" ref="series" @mouseover="() => isHoveredSeries = true"
                @mouseout="() => isHoveredSeries = false">
                <div v-for="(item, index) in store.popularListSeries" :key="item.id" class="movie-item"
                    :class="{ 'active': isActive('Serie', index) }" @click="selectItem('Serie', index)">
                    <img class="movie-image" :src="imageUrl + item.backdrop_path" />
                    <h4 class="fs-5 text-center py-3 cast rounded-bottom-3" v-show="isActive('Serie', index)">{{ item.name
                    }}</h4>
                </div>
            </div>
            <h2 class="text-light display-2 fw-bold pb-3">Upcoming Movies</h2>
            <div class="movie-container" ref="upcoming" @mouseover="() => isHoveredUpcoming = true"
                @mouseout="() => isHoveredUpcoming = false">
                <div v-for="(item, index) in store.upComing" :key="item.id" class="movie-item"
                    :class="{ 'active': isActive('Upcoming', index) }" @click="selectItem('Upcoming', index)">
                    <img class="movie-image" :src="imageUrl + item.backdrop_path" />
                    <h4 class="fs-5 text-center py-3 cast rounded-bottom-3" v-show="isActive('Upcoming', index)">{{
                        item.title }}</h4>
                </div>
            </div>
            <h2 class="text-light display-2 fw-bold pb-3">Actors in recent movies/series</h2>
            <div class="movie-container" ref="upcomingseries" @mouseover="() => isHoveredActors = true"
                @mouseout="() => isHoveredActors = false">
                <div v-for="(item, index) in store.actorsList" :key="item.id" class="movie-item"
                    :class="{ 'active': isActive('Actor', index) }" @click="selectItem('Actor', index)">
                    <img class="movie-image" :src="imageUrl + item.profile_path" />
                    <h4 class="fs-5 text-center py-4 cast rounded-bottom-3" v-show="isActive('Actor', index)">{{ item.name
                    }}</h4>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script>
import axios from 'axios';
import { store } from '../assets/data/store';
import CardComponent from './CardComponent.vue';
import { nextTick } from 'vue';
export default {
    name: "HomeComponent",
    data() {
        return {
            store,
            imageUrl: "https://image.tmdb.org/t/p/w342/",
            activeMovieIndex: 0,
            activeSerieIndex: 0,
            activeUpcomingIndex: 0,
            activeActorIndex: 0,
            isHoveredMovie: false,
            isHoveredSeries: false,
            isHoveredUpcoming: false,
            isHoveredActors: false,
            ids: [],
            showCast: false,
            showDate: false
        };
    },
    components: {
        CardComponent,
    },
    methods: {
        async getPopular() {
            const popularUrl = "https://api.themoviedb.org/3/movie/popular";
            const res = await axios.get(popularUrl, { params: store.params });
            store.popularList = res.data.results.map(movie => ({
                ...movie,
                credits: {
                    cast: [],
                    crew: [],
                },
            }));
        },

        async getPopularSeries() {
            const popularUrlSeries = "https://api.themoviedb.org/3/tv/top_rated"
            const res = await axios.get(popularUrlSeries, { params: store.params });
            store.popularListSeries = res.data.results;
        },
        async getUpcoming() {
            const upComingUrl = "https://api.themoviedb.org/3/movie/upcoming"
            const res = await axios.get(upComingUrl, { params: store.params });
            store.upComing = res.data.results;
        },
        async getActors() {
            const actorsUrl = "https://api.themoviedb.org/3/person/popular"
            const res = await axios.get(actorsUrl, { params: store.params });
            store.actorsList = res.data.results;
        },
        async getCreditsForMovie(movie) {
            const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits`;
            const res = await axios.get(url, { params: store.params });

            movie.credits.cast = res.data.cast;
            movie.credits.crew = res.data.crew;
        },

        async getCredits() {
            for (let i = 0; i < store.popularList.length; i++) {
                const movie = store.popularList[i];
                await this.getCreditsForMovie(movie);
            }
        },

        getId() {
            store.popularList.forEach((el) => {
                this.ids.push(el.id)
            })
        },

        isActive(category, index) {
            const activeIndex = this[`active${category}Index`];
            return index === activeIndex;
        },

        updateActiveItemMovies() {
            if (store.showHome) {

                this.activeMovieIndex = (this.activeMovieIndex + 1) % store.popularList.length;
                this.$nextTick(() => {
                    if (this.activeMovieIndex === store.popularList.length - 1) {
                        this.$refs.movies.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                        this.activeMovieIndex = 0

                    } else {
                        this.$refs.movies.scrollBy({
                            top: 0,
                            left: 280,
                            behavior: "smooth",
                        })
                    }
                })
            }

        },

        updateActiveItemSeries() {
            if (store.showHome) {

                this.activeSerieIndex = (this.activeSerieIndex + 1) % store.popularListSeries.length;
                this.$nextTick(() => {
                    if (this.activeSerieIndex === store.popularList.length - 1) {
                        this.$refs.series.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                        this.activeSerieIndex = 0

                    } else {
                        this.$refs.series.scrollBy({
                            top: 0,
                            left: 280,
                            behavior: "smooth",
                        })
                    }
                })
            }
        },

        updateActiveItemUpcoming() {
            if (store.showHome) {
                this.activeUpcomingIndex = (this.activeUpcomingIndex + 1) % store.upComing.length;
                this.$nextTick(() => {
                    if (this.activeUpcomingIndex === store.popularList.length - 1) {
                        this.$refs.upcoming.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                        this.activeUpcomingIndex = 0

                    } else {
                        this.$refs.upcoming.scrollBy({
                            top: 0,
                            left: 280,
                            behavior: "smooth",
                        })
                    }
                })
            }

        },

        updateActiveItemActors() {
            if (store.showHome) {

                this.activeActorIndex = (this.activeActorIndex + 1) % store.actorsList.length;
                this.$nextTick(() => {
                    if (this.activeActorIndex === store.popularList.length - 1) {
                        this.$refs.upcomingseries.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                        this.activeActorIndex = 0

                    } else {
                        this.$refs.upcomingseries.scrollBy({
                            top: 0,
                            left: 280,
                            behavior: "smooth",
                        })
                    }
                })
            }
        },
        selectItem(category, index) {
            this[`active${category}Index`] = index;
        },
        showingCast() {
            this.showCast = !this.showCast
        },
        showingDate() {
            this.showDate = !this.showDate
        },
    },

    async created() {
        await this.getPopular();
        await this.getPopularSeries();
        await this.getUpcoming();
        await this.getActors();
        await this.getId()
        await this.getCredits()
    },
    mounted() {
        setInterval(() => {
            if (this.isHoveredMovie === false) {
                this.updateActiveItemMovies()
            }
        }, 3000);

        setInterval(() => {
            if (this.isHoveredSeries === false) {
                this.updateActiveItemSeries()
            }
        }, 3500);

        setInterval(() => {
            if (this.isHoveredUpcoming === false) {
                this.updateActiveItemUpcoming()
            }
        }, 4000);

        setInterval(() => {
            if (this.isHoveredActors === false) {
                this.updateActiveItemActors()
            }
        }, 5500);

    }
};
</script>


<style lang="scss" scoped>
@use "../assets/css/partials/variables.scss" as *;

#home {
    background: $bg_gradient;
}

video {
    width: 100%;
}

header img {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 40%;
}


.movie-container::-webkit-scrollbar {
    display: none;
}

.active {
    transform: scale(1.1);
}

.movie-container {
    display: flex;
    overflow-x: auto;
    padding-bottom: 80px;
}

.movie-item {
    flex: 0 0 288px;
    position: relative;
    padding: 15px;
    transition: transform 0.3s ease-in-out;
}

.movie-image {
    width: 100%;
    height: auto;
    cursor: pointer;
}

.movie-item:hover {
    transform: scale(0.95);
}

.cast {
    background-color: #221e22;
    width: 90%;
    padding: 5px;
    margin: 0 auto;
    position: relative;
}

.release-date {
    font-style: italic;
}

.info {
    opacity: 0;
    height: 0;
    transition: all 1s ease-in;
}

.movie-item:hover .info {
    opacity: 1;
    height: 100%;
}

.movie-image:hover .info {
    opacity: 1;
    height: 100%;
}

.badge {
    cursor: pointer;
}
</style>
