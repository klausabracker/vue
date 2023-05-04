<template>
  <header class="header">
    <h1 class="title">CRUD VUE JS + API REST</h1>
    <div id="nav">
      <router-link to="/" class="active">HOME</router-link> |
      <router-link to="/about">EMPRESA</router-link> |
      <router-link to="/contact">CONTATO</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .title{
    margin-bottom: 20px;
  }
  .header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
  }

  .header a {
    color: #d4d4d4;
    padding-right: 5px;
    text-decoration: none;
    transition: all .3s;
  }

  .header a.active,
  .header a:hover,
  .header a:focus {
    color: #fff;
  }

  h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


