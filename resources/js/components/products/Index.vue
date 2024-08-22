<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { onMounted, reactive } from 'vue';
import axios from 'axios';

const state = reactive({
    products:[],
    isLoading: true,
})

onMounted(async () =>{
    getProducts();
})

const getProducts = async()=>{
   await axios.get('/api/products')
    .then((response) =>{
        console.log(response);
        state.products = response.data.products;
        state.isLoading = false;
    }).catch((error) =>{
        console.log('Error: ' + error);
        state.isLoading = false;
    });
}

const deleteProduct=async(id)=>{
    await axios.delete(`/api/products/${id}`)
        .then((response) =>{
            console.log(response);
            getProducts();
        }).catch((error) =>{
            console.log('Error while deleting: ' + error);
        });
}
</script>
<template>
    <div class="container mx-auto p-6">
        <!-- Add Product Button -->
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-semibold">Product List</h1>
            <RouterLink to="/products/create"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
                Add Product
            </RouterLink>
        </div>

        <!-- Product List Table -->
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                        Product Name
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                        Category
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                        Price
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                        Stock
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody v-if="!state.isLoading">
                <tr class="hover:bg-gray-50" v-for="(product,index) in state.products">
                    <td class="px-6 py-4 whitespace-nowrap border-b">
                        {{ product.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b">
                        {{ product.category }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap border-b">${{ product.price }}</td>
                    <td class="px-6 py-4 whitespace-nowrap border-b">{{ product.stock }}</td>
                    <td class="px-6 py-4 whitespace-nowrap border-b">
                        <RouterLink :to="`/products/${product.id}/edit`" class="text-blue-500 hover:text-blue-700 mr-2">
                            <i class="pi pi-pen-to-square"></i>
                        </RouterLink>
                        <button @click="deleteProduct(product.id)" class="text-red-500 hover:text-red-700">
                            <i class="pi pi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
