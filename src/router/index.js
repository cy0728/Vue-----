import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Index from "@/views/index.vue";
import searchSecond from "@/components/search/searchSecond.vue";
import latestSearch from "@/components/search/latestSearch.vue";

const routes = [
    {
        path: "/",
        component: Index,
    },
    { 
        path: "/searchSecond", 
        name: "sSecond", 
        component: searchSecond 
    },
    { 
        path: "/latestSearch", 
        name: "lSearch", 
        component: latestSearch 
},
];

const router = new VueRouter({
    routes,
});

export default router;
