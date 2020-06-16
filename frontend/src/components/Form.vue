<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="employee" label="Employee Username" @keydown.enter="forms()"> </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="manager" label="Manager Username" @keydown.enter="forms()"> </v-text-field>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import urls from '../urls.js'
  export default {
    name: 'WhoDaBoss',

    data: () => ({
      employee: '',
      manager: ''
    }),
    methods: {
      forms() {
        this.$api
          .post(urls.getInfo, { employee: this.employee, manager: this.manager })
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
