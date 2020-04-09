<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">Navbar</router-link>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- if Authorized -->
        <div v-if="loggedIn" class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">About</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <li v-if="loggedIn" class="nav-item">
                <a class="btn btn-outline-warning logout" href="#" @click.prevent="logout">Logout</a>
            </li>
        </div>

        <!-- if not authorized -->
        <div v-if="!loggedIn" class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="navbar-nav ml-auto">
                <router-link to="/login" class="btn btn-info text-capitalize text-white">login</router-link>
                <router-link to="/register" class="btn btn-secondary text-capitalize mx-3 text-white">register</router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            token: null
        }
    },
    mounted() {
        this.checkUserStatus();
    },
    computed: {
        loggedIn()
        {
            return this.$store.getters.get_loggedIn;
        }
    },
    methods: {
        checkUserStatus(){
            let token = localStorage.getItem('token');
            if(token != null){
                this.token = token;
            }
        },
        logout(){
            this.$store.dispatch('logoutAction').then(() => {
                this.$router.push('/');
            }).catch(err => {
                console.log(err);
            });
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');
            // this.token = null;
            // this.$router.push('/');
        }
    },
}
</script>

<style scoped>

nav a {
    font-weight: bold;
    color: #2c3e50;
}
a.router-link-exact-active {
    color: #42b983 !important;
}
.btn{
    color: #fff !important;
    transition: all 1s;
}
.btn:hover {
    background-color: #42b983;
    box-shadow: 5px 5px 5px rgba(255, 255, 255, .2);
    border: transparent;
}
.logout:hover{
    background-color: orange;
}
</style>