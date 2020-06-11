<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="username" label="Username" @keydown.enter="forms()"> </v-text-field>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import urls from '../urls.js'
  export default {
    name: 'WhoDaBoss',

    data: () => ({
      username: ''
    }),
    methods: {
      forms() {
        //console.log("HELLO")
        console.log('in forms')
        this.$api
        //why won't it post?, post isn't being reached at all
          .post(urls.getInfo, { username: this.username })
          .then((res) => {
          console.log('posted')
            console.log(res)
          })
          .catch(e => {
          console.log('error')
            console.log(e)
          })
      }
    },
    mounted: function() {

    },
    computed: {

    }
  }
</script>
