<template>
  <div class="margin_card_top">


    <b-card  :title="titulo" :img-src="src" img-alt="Image" img-top  class="card-movie" :sub-title="year">
    </b-card>

 
  </div>
</template>

<script> 

export default {
  name: "Movie",
  props: {
    titulo: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  } 
};
</script>