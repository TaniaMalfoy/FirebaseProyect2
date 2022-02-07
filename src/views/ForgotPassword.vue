<template>
  <div class="reset-password">
      <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
      <Loading v-if="loading"/>
    <div class="form-wrap">
      <form class="reset">
         <p class="login-register"> Back to
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>
          Do you want to remember your password? Enter your email here, so an
          owl will be send to you.
        </p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
         <button v-on:click.prevent="resetPassword"> Send me an owl!</button>
      </form>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Loading from '../components/Loading.vue';
import Modal from "../components/Modal.vue"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/firebaseInit';

export default {
  name: "ForgotPassword",
  data() {
      return{
          email: "",
          modalActive: false,
          modalMessage: "",
          loading: null,
      }
  },
  components:{
      email,
      Modal,
      Loading
  },
  methods: {
    resetPassword(){
      this.loading = true;
      sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.modalMessage = "If you are alive, you will see an owl coming!";
        this.loading = false;
        this.modalActive = true;
      })
      .catch(err => {
        this.modalMessage = err.message;
        this.loading = false;
        this.modalActive = true;
      });

    },
      closeModal(){
          this.modalActive = !this.modalActive;
          this.email = "";          
      },
  }
};
</script>

<style>
.reset-password{
    position: relative;
}

h2{
    margin-bottom: 8px;
}

p{
    text-align: center;  
    margin-bottom: 32px;
}
</style>