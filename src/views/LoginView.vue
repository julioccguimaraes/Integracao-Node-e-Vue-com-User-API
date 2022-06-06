<template>
  <div>
    <h1>Login</h1>
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <form class="box">
          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input type="email" name="email" placeholder="E-mail" class="input" v-model="email" />
            </div>
          </div>
          <div class="field">
            <label class="label">Senha</label>
            <div class="control">
              <input type="password" name="password" placeholder="Senha" class="input" v-model="password" />
            </div>
          </div>
          <p class="help is-danger" v-if="error != undefined">{{ error }}</p>
          <button type="button" class="button is-success" @click="login">Logar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      email: '',
      password: '',
      error: undefined
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:3000/login",
        {
          email: this.email, password: this.password
        }
      ).then((res) => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          this.$router.push({ name: 'users' })
      }).catch(err => {
        console.log(err.response.data.err)
        this.error = err.response.data.err
      })
    }
  }
};
</script>

<style scoped>
</style>