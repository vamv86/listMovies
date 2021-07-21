<template>
  <div class="margin_body_movies">
    <Loader v-if="isLoading" />

    <div
      class="container shadow-lg bg-white rounded"
      style="padding-top: 30px; padding-bottom: 3px"
    >
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
        <Movie
          v-for="item in collection.Search"
          :key="item.id"
          :titulo="item.Title"
          :year="item.Year"
          :src="item.Poster"
          class="pointer"
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
      titulo: "",
      anio: "",
    };
  },
  methods: {
    consultar() {
      this.currentPage = 1;
      this.getMovies(1);
    },
    handlePageChange(page) {
      this.getMovies(page);
    },
    getMovies(page) {
      this.isLoading = true;
      if(this.titulo){
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
      }else{
        this.collection = {};
        this.isLoading = false;
      }
    },
  },
};
</script>