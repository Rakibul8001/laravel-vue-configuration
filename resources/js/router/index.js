import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/products/Index.vue';
import NotFound from '../components/NotFound.vue';
import ProductForm from '../components/products/Form.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'products.index',
            component: Index
        },
        {
            path:'/products/create',
            name:'products.create',
            component: ProductForm
        },
        {
            path:'/products/:id/edit',
            name:'products.edit',
            component: ProductForm
        },
        {
            path:'/:catchAll(.*)',
            name:'not-found',
            component: NotFound
        }
    ]
});

export default router;