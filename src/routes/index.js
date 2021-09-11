import Dashboard from "../views/Dashboard"
import Landing from "../views/Landing"
import Login from "../views/Login"
import Register from "../views/Register"

const route = [
    {
        path: "/login",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        component: Register,
        layout: "/auth"
    },
    {
        path: "/index",
        component: Landing,
        layout: "/main"
    },
    {
        path: "/dashboard",
        component: Dashboard,
        layout: "/main"
    }

]
export default route