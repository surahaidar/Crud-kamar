<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT KAMAR</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">nama kamar</label>
                                <input type="text" class="form-control" v-model="kamar.jeniskamar" placeholder="Masukkan nama kamar">
                                <!-- validation -->
                                <div v-if="validation.jeniskamar" class="mt-2 alert alert-danger">
                                    {{ validation.jeniskamar[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">fasilitas</label>
                                <textarea class="form-control" rows="4" v-model="kamar.fasilitaskamar" placeholder="fasilitas kamar"></textarea>
                                <!-- validation -->
                                <div v-if="validation.fasilitaskamar" class="mt-2 alert alert-danger">
                                    {{ validation.fasilitaskamar[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">reservasi</label>
                                <textarea class="form-control" rows="4" v-model="kamar.reservasi" placeholder="Reservasi"></textarea>
                                <!-- validation -->
                                <div v-if="validation.reservasi" class="mt-2 alert alert-danger">
                                    {{ validation.reservasi[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">harga</label>
                                <textarea class="form-control" rows="4" v-model="kamar.harga" placeholder="Harga"></textarea>
                                <!-- validation -->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{ validation.harga[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        //state posts
        const kamar = reactive({
            jeniskamar: '',
            fasilitaskamar: '',
            reservasi: '',
            harga: '',
        })

        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()

        //vue router
        const route = useRoute()

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get(`http://127.0.0.1:8000/api/kamars/${route.params.id}`)
            .then(response => {
              
              //assign state posts with response data
              kamar.jeniskamar    = response.data.data.jeniskamar
              kamar.fasilitaskamar  = response.data.data.fasilitaskamar 
              kamar.reservasi  = response.data.data.reservasi
              kamar.harga  = response.data.data.harga

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method update
        function update() {

            let jeniskamar   = kamar.jeniskamar
            let fasilitaskamar = kamar.fasilitaskamar
            let reservasi = kamar.reservasi
            let harga = kamar.harga

            axios.put(`http://127.0.0.1:8000/api/kamars/${route.params.id}`, {
                jeniskamar: jeniskamar,
                fasilitaskamar: fasilitaskamar,
                reservasi: reservasi,
                harga: harga,
            }).then(() => {

                //redirect ke post index
                router.push({
                    name: 'kamar.index'
                })

            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })

        }

        //return
        return {
            kamar,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>