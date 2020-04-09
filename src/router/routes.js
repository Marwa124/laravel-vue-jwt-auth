import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

export const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            guest: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            guest: true
        }
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import ("../views/Profile.vue"),
        meta: {
            secure: true
        }
    }
];

export const AppUrl = "http://localhost:8000/";
