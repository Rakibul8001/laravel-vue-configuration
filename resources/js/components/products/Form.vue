<script setup>
import axios from "axios";
import { reactive,onMounted } from "vue";
import { useRouter,useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
let routeName = route.name;

const form = reactive({
    name: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    price: "",
});

const state = reactive({
  isEditMode: false,
});

const getProduct=async() =>{
    await axios.get(`/api/products/${route.params.id}`)
        .then(result=>{
            let data = result.data.product;
            console.log(data);
            form.name = data.name;
            form.category = data.category;
            form.price = data.price;
            form.stock = data.stock;
            form.description = data.description;
        }).catch(error=>{
            console.log('product fetching error',error)
        });
}

onMounted(()=>{
  if(route.name === 'products.edit'){
    state.isEditMode = true;
    getProduct();
    console.log('edit mode',state.isEditMode)
  }
});

const handleSubmit=async()=>{
  if(state.isEditMode){
    updateProduct();
  }else{
    createProduct();
  }
}

const createProduct=async()=>{
  await axios.post('/api/products',form)
  .then(response=>{
    console.log('successfully create product');
    router.push('/');
  }).catch(error=>{
    console.log('error', error);
  });
}

const updateProduct=async()=>{
  await axios.put(`/api/products/${route.params.id}`,form)
  .then(response=>{
    console.log('successfully updated');
    router.push('/');
  }).catch(error=>{
    console.log('error', error);
  });
}
</script>
<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div
                class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-3xl text-center font-semibold mb-6">
                        <span v-if="state.isEditMode">Edit </span>
                        <span v-else="state.isEditMode">Add </span>
                        Product
                    </h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"
                            >Name</label
                        >
                        <input
                            type="text"
                            v-model="form.name"
                            id="name"
                            name="name"
                            class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"
                            >Category</label
                        >
                        <input
                            type="text"
                            v-model="form.category"
                            id="category"
                            name="category"
                            class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"
                            >Price</label
                        >
                        <input
                            type="number"
                            v-model="form.price"
                            id="price"
                            name="price"
                            class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"
                            >Stock</label
                        >
                        <input
                            type="number"
                            v-model="form.stock"
                            id="stock"
                            name="stock"
                            class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                        />
                    </div>

                    <div class="mb-4">
                        <label
                            for="product-image"
                            class="block text-sm font-medium text-gray-700"
                            >Product Image</label
                        >
                        <input
                            type="file"
                            id="product-image"
                            name="product-image"
                            class="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p class="mt-1 text-sm text-gray-500">
                            JPG, PNG, GIF up to 10MB.
                        </p>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2"
                            >Description</label
                        >
                        <input
                            type="text"
                            v-model="form.description"
                            id="description"
                            name="description"
                            class="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. Beautiful Apartment In Miami"
                            required
                        />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
