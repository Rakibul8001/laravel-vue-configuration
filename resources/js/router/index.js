import { createRouter, createWebHistory } from "vue-router";
import ProductListing from '../components/ProductListing.vue';
import NotFound from '../components/NotFound.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component: ProductListing
        },
        {
            path:'/:catchAll(.*)',
            name:'not-found',
            component: NotFound
        }
    ]
});

export default router;