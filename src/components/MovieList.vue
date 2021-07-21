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

<script src="./MovieList.js"></script>