<template>
  <div id="app">

    <div class="container">
    <b-card class="mt-3" header="Cadastrar Usuários">
    </b-card>
   <form @submit.prevent="salvar">
      <b-form-group
        id="input-group-1"
        label="Nome "
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="produto.name"
          type="text"
          placeholder="Seu Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Seu Email"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="produto.email"
          type="text"
          placeholder="Seu email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
      id="input-group-1"
      label="Seu Website"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="produto.website"
        type="text"
        placeholder="Seu Website"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
    id="input-group-1"
    label="Data do Cadastro"
    label-for="input-1"
  >
    <b-form-input
      id="input-1"
      v-model="produto.website"
      type="text"
      placeholder="Data"
      v-mask="'##/##/####'"
      required
    ></b-form-input>
  </b-form-group>

      <b-button type="submit" style="margin-top: 20px; margin-bottom: 20px;" variant="primary">Salvar</b-button>
    </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Website</th>
            <th>OPÇÕES</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto of produtos" :key="produto.id">
            <td>{{ produto.name }}</td>
            <td>{{ produto.email }}</td>
            <td>{{ produto.website }}</td>
            <td>{{ produto.data }}</td>
            <td>
              <b-button @click="editar(produto)"  variant="info">Editar</b-button>
              <b-button @click="remover(produto)" style="margin-left: 5px;"  variant="danger">Deletar</b-button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>


<script>


import Produto from '../services/produtos'
import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
import VueMask from 'v-mask'
Vue.use(VueMask);
Vue.use(VueSimpleAlert);  


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      produto:{
        id: '',
        name: '',
        email: '',
        website: '',
        data: ''
      },
      produtos: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      Produto.listar().then(resposta => {
        this.produtos = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.produto.id){

        Produto.salvar(this.produto).then(resposta => {
          this.produto = {}
          this.$alert("Cadastrado com Sucesso");
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

          this.identidicador = this.produto.id
          Produto.atualizar(this.identidicador, this.produto).then(resposta => {
          this.produto = {}
          this.errors = {}
          this.$alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
      
    },

    editar(produto){
      this.produto = produto
    },

    remover(produto){
      if(confirm('Deseja excluir o produto?')){

        Produto.apagar('/' + produto.id).then(resposta => {
          this.$alert('Deletado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }
  }
}
</script>

<style>
table{
  width: 100%;
}
td{
  height: 60px;
}
th{
  height: 40px;
}
.card-body{
  padding: 0px;
}
</style>
