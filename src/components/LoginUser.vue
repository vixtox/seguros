<template>
    <div class="d-flex align-items-center h-100">
      <div class="card mx-auto" style="width: 25rem">
        <div class="card-body">
          <form @submit.prevent="login">
            <label class="text-center h4 mt-3">Iniciar sesión</label>
            <div class="form-group mt-3">
              <input
                type="email"
                class="form-control"
                v-model="email"
                placeholder="Email"
                required
              />
              <div v-if="errorEmail" class="alert alert-danger mt-2">
                Email incorrecto
              </div>
            </div>
            <div class="form-group mt-1">
              <input
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Contraseña"
                required
              />
              <div v-if="errorPassword" class="alert alert-danger mt-2">
                Contraseña incorrecta
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        errorEmail: false,
        errorPassword: false,
      };
    },
    methods: {
      async login() {
        this.errorEmail = false;
        this.errorPassword = false;
        const response = await fetch(
          "http://localhost/seguros/?login=" + this.email
        );
        const usuarios = await response.json();
        if (usuarios.length > 0 && usuarios[0].pass === this.password) {
          localStorage.setItem("estoyLogueado", true);
          this.$router.push({ name: "ListarClientes" });
        } else {
          this.errorEmail = true;
          this.errorPassword = true;
          localStorage.removeItem("estoyLogueado");
        }
      },
    },
  };
  </script>