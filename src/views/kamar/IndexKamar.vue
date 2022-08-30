<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>DATA KAMAR</h4>
                        <hr>
                        <router-link :to="{name: 'kamar.create'}" class="btn btn-md btn-success">TAMBAH POST</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">jenis kamar</th>
                                    <th scope="col">fasilitas kamar</th>
                                    <th scope="col">reservasi</th>
                                    <th scope="col">harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kamar, index) in kamars" :key="index">
                                    <td>{{ kamar.jeniskamar }}</td>
                                    <td>{{ kamar.fasilitaskamar }}</td>
                                    <td>{{ kamar.reservasi }}</td>
                                    <td>{{ kamar.kamar }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'kamar.edit', params:{id: kamar.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="kamarDelete(kamar.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {

    setup() {

        //reactive state
        let kamars = ref([])

        //mounted
        onMounted(() => {

            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kamars')
            .then(response => {
              
              //assign state posts with response data
              kamars.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })
        //method delete
        function kamarDelete(id) {

                    //delete data post by ID
                    axios.delete(`http://localhost:8000/api/kamars/${id}`)
                    .then(() => {

                        //splice posts 
                        kamars.value.splice(kamars.value.indexOf(id), 1);
                    
                     }).catch(error => {
                         console.log(error.response.data)
                     })
                 
        }


        //return
        return {
        kamars,
        kamarDelete
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>