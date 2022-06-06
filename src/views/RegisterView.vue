<template>
  <div>
    <h1>Registro de Usuário</h1>
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <form class="box">
          <div class="field">
            <label class="label">Usuário</label>
            <div class="control">
              <input type="text" name="name" placeholder="Nome de usuário" class="input" v-model="name" />
            </div>
          </div>
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
          <button type="button" class="button is-success" @click="register">Cadastrar</button>
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
      name: '',
      email: '',
      password: '',
      error: undefined
    }
  },
  methods: {
    register() {
      axios.post("http://localhost:3000/user",
        {
          name: this.name, email: this.email, password: this.password
        }
      ).then(() => {
        this.$router.push({ name: 'home' })
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