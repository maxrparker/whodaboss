<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form lazy-validation ref="form">
          <v-text-field v-model="form.employee" label="Username" @keyup.enter="forms()"> </v-text-field>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  import urls from '../urls.js'
  export default {
    name: 'WhoDaBoss',

    data: () => ({
      form: {
        employee: ''
      },
    }),
    methods: {
      forms() {
        this.$api
        //why won't it post?, post isn't being reached at all
          .post(urls.getInfo, this.form, )
          .then(() => {
            this.snackText = 'Form updated successfully'
            this.snackbar = true
            this.$router.push('/')
            this.form = this.initialState()
          })
          .catch(e => {
            this.snackText = 'Failed to update form'
            this.snackbar = true
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