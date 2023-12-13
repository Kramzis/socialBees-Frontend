import { createWebHistory, createRouter } from "vue-router";
import {createToast} from "mosha-vue-toastify";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Registration from "@/views/Registration.vue";
import Profile from "@/views/Profile.vue";
import EditProfile from "@/views/EditProfile.vue";
import AddWork from "@/views/AddWork.vue";
import AddComment from "@/views/AddComment.vue";
import EditWork from "@/views/EditWork.vue";
import EditComment from "@/views/EditComment.vue";
import FollowingList from "@/views/FollowingList.vue";
import FollowersList from "@/views/FollowersList.vue";
import Follower from "@/views/Follower.vue";
import UserProfile from "@/views/UserProfile.vue";
import 'mosha-vue-toastify/dist/style.css';
import Tags from "@/views/Tags.vue";

const routes = [
    {
        path: "/register",
        name: "Registration",
        component: Registration,
        meta: { hideToolbar: true },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { hideToolbar: true },
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        beforeEnter: authMiddleware,
    },
    {
        path: "/myProfile",
        name: "My Profile",
        component: Profile,
        beforeEnter: authMiddleware,
    },
    {
        path: "/editProfile/:userId",
        name: "Edit profile",
        component: EditProfile,
        beforeEnter: authMiddleware,

    },
    {
        path: "/profile/:userId",
        name: "Profile",
        component: UserProfile,
        beforeEnter: authMiddleware,
    },
    {
        path: "/following/:userId",
        name: "Following list",
        component: FollowingList,
        beforeEnter: authMiddleware,
    },
    {
        path: "/followers/:userId",
        name: "Followers list",
        component: FollowersList,
        beforeEnter: authMiddleware,
    },
    {
        path: "/follower",
        name: "Follower",
        component: Follower,
        beforeEnter: authMiddleware,
    },
    {
        path: "/addWork",
        name: "Add work",
        component: AddWork,
        beforeEnter: authMiddleware,
    },
    {
        path: "/editWork/:workId",
        name: "Edit work",
        component: EditWork,
        beforeEnter: authMiddleware,
    },
    {
        path: "/addComment/:workId",
        name: "Add comment",
        component: AddComment,
        beforeEnter: authMiddleware,
    },
    {
        path: "/editComment",
        name: "Edit comment",
        component: EditComment,
        beforeEnter: authMiddleware,
    },
    {
        path: "/tags",
        name: "Tags",
        component: Tags,
        beforeEnter: authMiddleware,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

function checkIfTokenExists () {
    let token = localStorage.getItem('token');
    return !!token;
}

function authMiddleware (to, from, next) {
    if (checkIfTokenExists()) {
        next();
    } else {
        createToast({
                title: 'Twój token wygasł!',
                description: 'Musisz się zalogować, by przejść dalej.'
            },
            {
                timeout: 5000,
                type: 'warning',
                position: 'top-center',
            })
        next("/login");
    }
}

export default router;