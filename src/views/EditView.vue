<template>
    <div>
        <h1>Alteração de Usuário</h1>
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
                    <p class="help is-danger" v-if="error != undefined">{{ error }}</p>
                    <button type="button" class="button is-success" @click="edit">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

const config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")

    }
}

export default {
    created() {
        axios.get("http://localhost:3000/user/" + this.$route.params.id, config).then(res => {
            this.email = res.data.email
            this.name = res.data.name
            this.id = res.data.id
        }).catch(err => {
            console.log(err)
            this.$router.push({ name: 'users' })
        })
    },
    data() {
        return {
            id: 0,
            name: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        edit() {
            axios.put("http://localhost:3000/user/" + this.id,
                { id: this.id, name: this.name, email: this.email },
                config).then(() => {
                    this.$router.push({ name: 'users' })
                }).catch(err => {
                    console.log(err)
                    this.error = err
                })
        }
    }
};
</script>

<style scoped>
</style>