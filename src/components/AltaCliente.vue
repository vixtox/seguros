<template>

    <div class="container">
        <div class="card">
            <div class="card-header">
                Alta cliente
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarRegistro">
                    <div class="col-md-6">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" required name="nombre" v-model="cliente.nombre"
                            id="nombre" aria-describedby="helpId" placeholder="Nombre">
                        <small id="helpId" class="form-text text-muted">Escribe el nombre del cliente</small>
                    </div>
                    <div class="col-md-6">
                        <label for="apellidos">Apellidos:</label>
                        <input type="apellidos" class="form-control" required name="apellidos"
                            v-model="cliente.apellidos" id="apellidos" aria-describedby="helpId"
                            placeholder="Apellidos">
                        <small id="helpId" class="form-text text-muted">Escribe los apellidos del cliente</small>
                    </div>
                    <div class="col-md-6">
                        <label for="telefono">Teléfono:</label>
                        <input type="telefono" class="form-control" required name="telefono" v-model="cliente.telefono"
                            id="telefono" aria-describedby="helpId" placeholder="Teléfono">
                        <small id="helpId" class="form-text text-muted">Escribe el teléfono del cliente</small>
                    </div>
                    <div class="col-md-6">
                        <label for="localidad">Localidad:</label>
                        <input type="localidad" class="form-control" required name="localidad"
                            v-model="cliente.localidad" id="localidad" aria-describedby="helpId"
                            placeholder="Localidad">
                        <small id="helpId" class="form-text text-muted">Escribe la localidad del cliente</small>
                    </div>
                    <div class="col-md-6">
                        <label for="cp">CP:</label>
                        <input type="cp" class="form-control" required name="cp" v-model="cliente.cp" id="cp"
                            aria-describedby="helpId" placeholder="CP">
                        <small id="helpId" class="form-text text-muted">Escribe el código postal del cliente</small>
                    </div>
                    <div class="col-md-6">
                        <label for="provincia">Provincia:</label>
                        <select class="form-select" id="provincia" v-model="cliente.provincia">
                            <option v-for="provincia in provincias" :value="provincia.provincia"
                                :key="provincia.provincia">
                                {{ provincia.provincia }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="entidad">Entidad:</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="entidad" value="empresa"
                                v-model="cliente.entidad" />
                            Empresa
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="entidad" value="particular"
                                v-model="cliente.entidad" />
                            Particular
                        </div>
                    </div>

                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Agregar</button>
                        <router-link :to="{ name: 'ListarClientes' }" class="btn btn-warning">Cancelar</router-link>
                    </div>
                </form>
            </div>
        </div>

    </div>

</template>


<script>
export default {
    data() {
        return {
            cliente: {
                nombre: "",
                apellidos: "",
                telefono: "",
                localidad: "",
                cp: "",
                provincia: "",
                entidad: "",

            },
            provincias: [],
        };
    },
    methods: {
        async agregarRegistro() {
            console.log(this.cliente);

            const respuesta = await fetch("http://localhost/seguros/?insertar=1", {
                method: "POST",
                body: JSON.stringify(this.cliente),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const datosRespuesta = await respuesta.json();
            console.log(datosRespuesta);
            this.$router.push({ name: "ListarClientes" });
        },
        async consultar_provincia() {
            const respuesta = await fetch(
                "http://localhost/seguros/?consultar_provincias"
            );
            const datosRespuesta = await respuesta.json();
            this.provincias = datosRespuesta;
            console.log(this.provincias)
        },
    },
    mounted() {
        this.consultar_provincia();
    },
};
</script>