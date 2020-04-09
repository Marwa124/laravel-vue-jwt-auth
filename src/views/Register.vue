<template>
    <div class="mt-5">
        <div
            class="m-auto p-3 text-white bg-dark"
            style="max-width:368px; border-radius: 5px;">
            <h2>Register Form</h2>
            <form @submit.prevent="register" @keydown="form.onKeydown($event)">
                <div class="form-group">
                    <input
                        v-model="form.name"
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="UserName"
                        :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                    <input
                        v-model="form.email"
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Email"
                        :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                </div>

                <div class="form-group">
                    <input
                        v-model="form.password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        class="form-control"
                        :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                </div>

                <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>
            </form>
        </div>
        <div class="d-flex justify-content-center">
        <!-- epicmaxco/epic-spinners github -->
            <atom-spinner
                    :animation-duration="1000"
                    :size="60"
                    :color="'#ff1d5e'"
                    v-if="isLoading"
            />
        </div>
    </div>
</template>

<script>
    // import {AppUrl} from '@/router/routes';
    import {Form} from "vform";
    import {AtomSpinner} from 'epic-spinners';

export default {
    name: 'register',
    components: {
        AtomSpinner
    },  
    data() {
        return {
            form: new Form({
                name: '',
                email: '',
                password: ''
            }),
            isLoading: false,
        }
    },
    methods: {
        register() {
            this.isLoading = true,
            this.$store.dispatch('registerAction', {
                form: this.form
            }).then(() => {
                this.isLoading = false;
                this.$router.push('/')
            }).catch(err => {
                this.isLoading = false;
                console.log(err);
            });

            // this.form.post(AppUrl + 'api/auth/register').then( res => {
            //     localStorage.setItem('token', res.data.access_token);
            //     localStorage.setItem('user', res.data.user);
            //     this.$router.push("/profile");                
            //     // console.log(res);
            // }).catch( err => {
            //     console.log(err);
            // })
        }
    }
}
</script>