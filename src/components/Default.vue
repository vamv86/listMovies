<template>
  <div class="margin_body_movies">
    <!-- Componente de carga de pagina -->
    <Loader v-if="isLoading" />

    <div
      class="container shadow-lg bg-white rounded"
      style="padding-top: 30px; padding-bottom: 3px"
    >
      <!-- Modal Detall de Pelicula -->
      <div>
        <b-modal
          id="modal-detalle"
          centered
          :title="detail.Title + ' (' + detail.DVD + ')'"
          size="lg"
          hide-footer
          scrollable
        >
          <b-card
            :img-src="detail.Poster"
            img-alt="Card image"
            img-right
            class="ocultar"
          >
            <b-card-title>Genero : {{ detail.Genre }}</b-card-title>
            <b-card-sub-title class="mb-2"
              >Director : {{ detail.Director }}</b-card-sub-title
            >
            <b-card-sub-title class="mb-2"
              >Reparto : {{ detail.Actors }}</b-card-sub-title
            >

            <b-card-text>
              <br />
              {{ detail.Plot }}
            </b-card-text>

            <br />
            <b-card-title>Calificación : {{ detail.imdbRating }}</b-card-title>
            <b-card-sub-title class="mb-2"
              >Idiomas : {{ detail.Language }}</b-card-sub-title
            >
          </b-card>
        </b-modal>
      </div>

      <!-- Listado de Peliculas y Filtros -->
      <div>
        <h3>Películas</h3>
      </div>
      <form class="flex-container">
        <b-form-input
          type="text"
          placeholder="Buscar por Título"
          class="input-form-margin"
          v-model="titulo"
        ></b-form-input>

        <b-form-input
          type="number"
          placeholder="Buscar por año"
          class="input-form-margin"
          v-model="anio"
        >
        </b-form-input>

        <b-button
          variant="outline-dark"
          @click="consultar"
          style="margin-bottom: 10px"
          >Buscar</b-button
        >
      </form>

      <b-card-group deck>
        <!-- Componente de pelicula -->
        <Movie
          v-for="item in collection.Search"
          :key="item.id"
          :titulo="item.Title"
          :year="item.Year"
          :src="item.Poster"
          class="pointer"
          @click.native="mostrarDetalle(item.imdbID)"
        />
      </b-card-group>

      <div style="margin-top: 10px">
        <b-pagination
          v-model="currentPage"
          :total-rows="this.collection.totalResults"
          :per-page="10"
          @change="handlePageChange"
          align="right"
          pills
        ></b-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import Loader from "../shared/Loader.vue";
import Movie from "../components/Movie.vue";
export default {
  name: "Default",
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
          console.log(x.data);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>