<template>
  <div id="app">

    <div class="container">
    <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Cadastrar Empresa">
    </b-card>
  </div>
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
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Seu Nome"
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
      <b-button type="submit" style="margin-top: 20px; margin-bottom: 20px;" variant="primary">Salvar</b-button>
    </form>
      <table style="width: 100%;">

        <thead>

          <tr>
            <th>A</th>
            <th>Email</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto of produtos" :key="produto.id">

            <td>{{ produto.name }}</td>
            <td>{{ produto.email }}</td>
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
import Produto from '../services/teste'
import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

export default {
  name: 'About',
  components: {
  },
  data () {
    return {
      produto:{
        id: '',
        name: '',
        email: ''
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

