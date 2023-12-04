import { createWebHistory, createRouter } from "vue-router";
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

const routes = [
    {
        path: "/register",
        name: "Registration",
        component: Registration,
    },
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
        path: "/myProfile",
        name: "My Profile",
        component: Profile,
    },
    {
        path: "/editProfile/:userId",
        name: "Edit profile",
        component: EditProfile,
    },
    {
        path: "/profile/:userId",
        name: "Profile",
        component: UserProfile,
    },
    {
        path: "/following/:userId",
        name: "Following list",
        component: FollowingList,
    },
    {
        path: "/followers/:userId",
        name: "Followers list",
        component: FollowersList,
    },
    {
        path: "/follower",
        name: "Follower",
        component: Follower,
    },
    {
        path: "/addWork",
        name: "Add work",
        component: AddWork,
    },
    {
        path: "/editWork/:workId",
        name: "Edit work",
        component: EditWork,
    },
    {
        path: "/addComment",
        name: "Add comment",
        component: AddComment,
    },
    {
        path: "/editComment",
        name: "Edit comment",
        component: EditComment,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;