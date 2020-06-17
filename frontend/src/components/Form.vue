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
    Is this manager my boss? {{res.isMyBoss | boolToUser}} <br>
    Are we in the same department? {{res.isSameDepartment | boolToUser}} <br>
    Is this manager someones' boss? {{res.isAManager | boolToUser}}
  </v-container>

</template>

<script>
  import urls from '../urls.js'
  export default {
    name: 'WhoDaBoss',

    data: () => ({
      employee: '',
      manager: '',
      res: {}
    }),
    filters: {
      boolToUser: function(value) {
        if (value) return "Yes"
        else return "No"
      }
    },
    methods: {
      forms() {
        this.$api
          .post(urls.getInfo, { employee: this.employee, manager: this.manager })
          .then((res) => {
            this.res = res.data
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
