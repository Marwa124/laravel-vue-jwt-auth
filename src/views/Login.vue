<template>
<div class="mt-5">
<div class="m-auto p-3 text-white bg-dark" style="max-width:368px; border-radius: 5px;">
  <h2>Login Form</h2>
  <form @submit.prevent="login" @keydown="form.onKeydown($event)">
    <div class="form-group">
      <input v-model="form.email" type="email" name="email" placeholder="Email"
        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
      <has-error :form="form" field="email"></has-error>
    </div>

    <div class="form-group">
      <input v-model="form.password" type="password" name="password" placeholder="Password"
        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
      <has-error :form="form" field="password"></has-error>
    </div>
    
    <button :disabled="form.busy" type="submit" class="btn btn-primary">Log In</button>

  </form>
  </div>
    <div class="d-flex justify-content-center">
      <flower-spinner
            :animation-duration="3000"
            :size="60"
            :color="'#42b983'"
            v-if="isLoading"
      />
      
    </div>
    <!-- pacifio/vue-spinners github -->
    <!-- <circle-spin v-if="isLoading"></circle-spin> -->
  </div>
</template>

<script>  
// import {AppUrl} from "@/router/routes";
import {Form} from "vform";
import {FlowerSpinner} from 'epic-spinners'

export default {
  components: {
    FlowerSpinner
  },
  name: "login",
  data() {
    return {
      form: new Form({
        email: "",
        password: "",
      }),
      isLoading: false,
    }
  }, 
  methods: {
    login() {
      this.isLoading = true;
      this.$store.dispatch("loginAction", {
        form: this.form
      }).then(() => {
        // console.log(res);
        this.isLoading = false;
        this.$router.push("/profile");
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      });

      // Using localStorage Instead of VueX

      // this.form.post(AppUrl + "api/auth/login", this.form).then(res => {
      // // this.form.post("http://127.0.0.1:8000/api/auth/login", this.form).then(res => {
      //   console.log(res);
      //   localStorage.setItem('token', res.data.access_token);
      //   localStorage.setItem('user', res.data.user);
      //   this.$router.push("/profile");
      // }).catch((err) => {
      //   console.log(err);
      // })
    },
  }
}
</script>