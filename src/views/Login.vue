<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don-t have an account?
        <router-link class="router-link" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </p>
      <h2 class="h2">Login to FireBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot Password?</router-link
      >
      
      <button v-on:click.prevent="signIn">Sign In</button>
      <!--<div class="angle"></div>-->
    </form>
    <!--<div class="background"></div>-->
  </div>
</template>

<script>

import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import { signInWithEmailAndPassword, currentUser } from "firebase/auth";
import { auth } from '../firebase/firebaseInit';


export default {
  name: "Login",
  components: {
    email,
    password,
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods:{
    signIn(){
      signInWithEmailAndPassword(auth,this.email,this.password)
      .then(() => {
        this.$router.push({ name: "Home"});
        this.error = false;
        this.errorMsg = "";
        console.console.log("ID:", auth.currentUser.uid);
      })
       .catch(err => {
         this.error = true;
         this.errorMsg = err.message;
       });

    },
  },
};
</script>

<style>

.form-wrap {
  overflow: hidden;
  display: flex;
  /*height: 100vh;*/
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  height: fit-content;
}

 @media (min-width: 900px) {
    .form-wrapper {
      width: 100%;
    }
  }

  .login-register {
    margin-bottom: 32px;
  }

  .router-link {
      color: #000;
    }

form{
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
}

@media (min-width: 900px) {
    form{
      padding: 0 50px;  
    }    
  }


 .h2{
     text-align: center;
     font-size: 32px;
     color: #303030;
     margin-bottom: 40px;
     font-weight: 441;
     text-transform: capitalize;
}

@media (min-width: 900px) {
    .h2{
      font-size: 40px;  
    }   
  }

.inputs{
    width: 100%;
    max-width: 350px;
}

.input{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
    }

input{
        width: 100%;
        border: none;
        background-color: #ffffff;
        padding: 4px 4px 4px 30px;
        height: 50px;
        border-radius: 5px;
        
}

input:focus{
          outline: none;
        }

.icon{
    width: 20px;
    position: absolute;
    left: 3px;
    background-color: rgb(248 250 250);
}

.forgot-password{
    text-decoration: none;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;
}

.forgot-passwor:hover{
     border-color: #303030;
}


button{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 15px 30px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

/*.angle{
    display: none;
    position: absolute;
    background-color: #fff;
    transform: rotateZ(3deg);
    width: 60px;
    right: -30px;
    height: 101%;
}

@media (min-width: 900px) {
    .angle{
        display: initial;
    }
}

.background{
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.png");
    width: 100%;
    height: 100%;
       
}
@media (min-width: 900px) {
    .background{
        display: initial;
    }

}*/


</style>