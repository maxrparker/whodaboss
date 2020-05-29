<template>
  <v-app>
    <v-content>
      <Questions/>
    </v-content>
  </v-app>
</template>

<script>
import Questions from './components/Questions.vue';

export default {
  name: 'App',

  components: {
    Questions,
  },

  data: () => ({
    //
  }),
};
</script>
