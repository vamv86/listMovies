<template>
  <section id="app">
    <template>
      <ListadoPeliculas />
    </template>
  </section>
</template>

<script>

import ListadoPeliculas from "./components/Default.vue"

export default {
  name: "app",
  mounted() {
    
  },
  components: {
   ListadoPeliculas
  }, 
  methods: { 
  }
};
</script>

<style>
  @import url("assets/css/style.css"); 
</style>