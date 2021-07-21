import Loader from "../shared/Loader.vue";
import Movie from "../components/Movie.vue";
export default {
  name: "MovieList",
  components: {
    Loader,
    Movie,
  },
  mounted() {
    this.getMovies(1);
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      collection: {},
      detail: {},
      titulo: "",
      anio: "",
    };
  },
  methods: {
    mostrarDetalle(imdbID) {
      this.detail = {};
      this.getMovieDetail(imdbID);
      this.$bvModal.show("modal-detalle");
    },
    consultar() {
      this.currentPage = 1;
      this.getMovies(1);
    },
    handlePageChange(page) {
      this.getMovies(page);
    },
    getMovies(page) {
      this.isLoading = true;
      if (this.titulo) {
        this.$proxies.peliculaProxy
          .getMovies(page, this.titulo, this.anio)
          .then((x) => {
            if (x.data) {
              x.data.Search.forEach((element) => {
                if (element.Poster === "N/A") {
                  element.Poster =
                    "https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1";
                }
              });
            }

            this.collection = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        this.collection = {};
        this.isLoading = false;
      }
    },
    getMovieDetail(id) {
      this.isLoading = true;

      this.$proxies.peliculaProxy
        .getMovieDetail(id)
        .then((x) => {
          this.detail = x.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};