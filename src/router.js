import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Registration from "@/views/Registration.vue";
import UserProfile from "@/views/UserProfile.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/register",
        name: "Registration",
        component: Registration,
    },
    {
        path: "/profile",
        name: "Profile",
        component: UserProfile,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;