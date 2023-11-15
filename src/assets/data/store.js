import { reactive } from "vue";

export const store = reactive({
  apiUrl: "https://api.themoviedb.org/3/",
  endpoint: {
    movies: "search/movie",
    series: "search/tv",
  },
  params: {
    query: "null",
    api_key: "2f40b8e5f9dc4424458c6502f4a7ce56",
  },
  error: "error",
  loading: false,
  moviesList: [],
  seriesList: [],
});

// https://image.tmdb.org/t/p/w342
