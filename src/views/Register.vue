<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create your account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button v-on:click.prevent="register">Sign Up</button>
      <!--<div class="angle"></div>-->
    </form>
    <!--<div class="background"></div>-->
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import { createUserWithEmailAndPassword, getCurrentUser } from "firebase/auth";
import { auth, db } from "../firebase/firebaseInit";
import { setDoc, doc, documentId } from "@firebase/firestore";

export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";

        const createUser = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const result = await createUser;
        console.log("User Email: ", result.user.email);

        console.log("UserID: ", result.user.uid);

        //Create a user and set new document in Users Collection using the user's uid from firebase Auth instance

        await setDoc(doc(db, 'users', (result.user.uid)), {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
          }
        );
        console.log("Done");
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>
