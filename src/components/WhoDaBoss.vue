<template>

  <v-container>
    <v-tabs>
      <v-tab>
        Who da Boss
      </v-tab>

      <v-tab-item>
        <v-text-field v-model="username"
                      label="Ynet username"
                      @keyup.enter="getUser()"></v-text-field>
        <div v-for="user in match" :key="user">
          User: {{user}}
          <br/><br/> Boss: {{user.manager}}
        </div>
        <br/> Minions:
        <div v-for="minion in minions" :key="minion">
          {{minion.full_name}} - {{minion.username}}
        </div>
      </v-tab-item>

      <v-tab>
        Who Missin
      </v-tab>
      <v-tab-item>
        Count: {{computedMissing.length}}
        <div v-for="employee in computedMissing" :key="employee.full_name">
          {{employee.full_name}}
        </div>
      </v-tab-item>

      <v-tab>
        Duplicates
      </v-tab>
      <v-tab-item>
        Count: {{computeDuplicates.length}}
        <div v-for="employee in computeDuplicates" :key="employee">
          {{employee}}
        </div>
      </v-tab-item>
    </v-tabs>
  </v-container>

</template>
<script>

  export default {
    name: 'WhoDaBoss',

    data: () => ({
      username: '',
      employees: [],
      match: [],
      minions: [],
      full_name: '',
      manager_username: ''
    }),
    methods: {
      getUser() {
        var match = this.employees.filter(employee => {
          return employee.username == this.username
        })
        if (match.length != 1) {
          this.match = []
          this.minions = []
        } else {
          this.match = match
          this.full_name = match.map(x => x.full_name)
          this.minions = this.employees.filter(employee => {
            return employee.manager == this.full_name
          })
        }
      },
      getDuplicateArrayElements(arr) {
        var sorted_arr = arr.slice().sort()
        var results = []
        for (var i = 0; i < sorted_arr.length - 1; i++) {
          if (sorted_arr[i + 1] === sorted_arr[i]) {
            results.push(sorted_arr[i])
          }
        }
        return results
      }
    },
    mounted: function() {
      this.$api.get('http://directory-api-dev.ynet.gov.yk.ca/employees').then(response => {
        this.employees = response.data.employees
      })
    },
    computed: {
      computedMissing() {
        return this.employees.filter(employee => {
          return employee.manager == null || employee.manager == ''
        })
      },
      computeDuplicates() {
        var employeeNames = this.employees.map(employee => { return employee.full_name })
        return this.getDuplicateArrayElements(employeeNames)
      }
    }
  }

</script>
