<template>
  <div id="app">
    <!-- v-if="$route.meta.requiresAuth" -->
    <nav v-if="$route.meta.requiresAuth">
     
      <router-link to="/listarclientes">Listar clientes</router-link> |
      <router-link to="/altacliente">Alta cliente</router-link> |
      <button class="badge bg-danger" @click="logout">Cerrar sesión</button>

    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("estoyLogueado");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>