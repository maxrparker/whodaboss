<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="username"
                      label="Employee"
                      @keyup.enter="getUser()"> </v-text-field>

      </v-col>
      <v-col>
        {{this.validUser}}
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field v-model="boss"
                      label="Manager"
                      @keyup.enter="getUser()"></v-text-field>
      </v-col>
      <v-col>
        {{this.validBoss}}
      </v-col>
    </v-row>
    My Boss: {{this.questions.myBoss}}<br /> Same Department: {{this.questions.department}}<br /> A Boss: {{this.questions.boss}}<br
    />
  </v-container>
</template>
<script>

  export default {
    name: 'WhoDaBoss',

    data: () => ({
      validUser: false,
      validBoss: false,
      username: '',
      boss: '',
      employees: [],
      match: [],
      bossMatch: [],
      minions: [],
      department: '',
      questions: {
        myBoss: false,
        department: false,
        boss: false
      }
    }),
    methods: {
      resetQuestions() {
        this.questions.myBoss = false
        this.questions.department = false
        this.questions.boss = false
        this.department = false
      },
      getUser() {
        var match = this.employees.filter(employee => {
          return employee.username == this.username
        })
        if (match.length != 1) {
          this.validUser = false
          this.match = []
        } else {
          this.validUser = true
          this.match = match
        }

        match = this.employees.filter(employee => {
          return employee.username == this.boss
        })
        if (match.length != 1) {
          this.validBoss = false
          this.bossMatch = []
          this.minions = []
        } else {
          this.validBoss = true
          this.bossMatch = match
          this.full_name = match.map(x => x.full_name)
          this.minions = this.employees.filter(employee => {
            return employee.manager == this.full_name
          })
        }

        if (this.bossMatch.length == 1 && this.match.length == 1) {
          if (this.bossMatch.map(x => x.full_name)[0] == this.match.map(x => x.manager)[0]) this.questions.myBoss = true
          else this.questions.myBoss = false
          if (this.bossMatch.map(x => x.department)[0] == this.match.map(x => x.department)[0])
            this.questions.department = true
          else this.questions.department = false
          if (this.minions.length > 0) this.questions.boss = true
          else this.questions.boss == false
          console.log(this.questions)
        } else this.resetQuestions()
      }
    },
    mounted: function() {
      this.$api.get('http://directory-api-dev.ynet.gov.yk.ca/employees').then(response => {
        this.employees = response.data.employees
      })
    },
    computed: {}
  }

</script>
