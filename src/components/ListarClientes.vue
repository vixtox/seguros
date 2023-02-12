<template>
  <div class="container">

    <div class="card">
      <div class="card-header">Clientes</div>
      <div class="card-body">
        <table id="tabla-clientes" class="table table -striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Teléfono</th>
              <th>Localidad</th>
              <th>CP</th>
              <th>Provincia</th>
              <th>Entidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
              <td>{{ cliente.id }}</td>
              <td>{{ cliente.nombre }}</td>
              <td>{{ cliente.apellidos }}</td>
              <td>{{ cliente.telefono }}</td>
              <td>{{ cliente.localidad }}</td>
              <td>{{ cliente.cp }}</td>
              <td>{{ cliente.provincia }}</td>
              <td>{{ cliente.entidad }}</td>
              <td>
                <div class="btn-group" aria-label="">

                  <button type="button" v-on:click="borrarCliente(cliente.id)" class="btn btn-danger">Baja</button>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import "datatables.net";

export default {
  data() {
    return {
      clientes: [],
    };
  },

  created: function () {
    this.consultarClientes();
  },
  methods: {
    //
    consultarClientes() {
      fetch("http://localhost/seguros/?consultar_clientes")
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
          this.clientes = [];
          if (typeof datosRespuesta[0].sucess === "undefined") {
            this.clientes = datosRespuesta;
          }
          this.$nextTick(function () {
            $("#tabla-clientes").DataTable();
          });
        })
        .catch(console.log);
    },
    
    borrarCliente(id) {

      console.log(id)

      fetch("http://localhost/seguros/?borrar_cliente=" + id)
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {

          console.log(datosRespuesta);
          this.consultarClientes();

        })
        .catch(console.log);

    }

  }

}
</script>
