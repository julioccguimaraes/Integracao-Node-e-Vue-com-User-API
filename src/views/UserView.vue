<template>
    <div>
        <h1>Painel Admin</h1>
        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Admin</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ processRole(user.role) }}</td>
                    <td>
                        <router-link :to="{ name: 'edit', params: { id: user.id } }"><button class="button is-success mr-1">Editar</button></router-link>
                        <button class="button is-danger" @click="showModal(user.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal" :class="{ modal: true, 'is-active': isShowModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Deseja excluir esse usuário?
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser">Excluir</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")

    }
}
export default {
    created() {
        this.getUsers()
    },
    data() {
        return {
            users: [],
            isShowModal: false,
            userId: -1
        }
    },
    methods: {
        processRole: function (value) {
            return value ? 'Admin' : 'Usuário'
        },
        hideModal() {
            this.isShowModal = false
        },
        showModal(id) {
            this.userId = id
            this.isShowModal = true
        },
        deleteUser() {
            axios.delete("http://localhost:3000/user/" + this.userId, config).then(res => {
                console.log(res)
                this.getUsers()
                this.isShowModal = false
            }).catch(err => {
                this.isShowModal = false
                console.log(err)
            })
        },
        getUsers() {
            axios.get("http://localhost:3000/user", config).then(res => {
                this.users = res.data
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
</style>