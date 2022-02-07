<template>
  <div class="container">
    <div class="app">
      <Navigation v-if="!navigation"/>
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>

import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { auth } from './firebase/firebaseInit';
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null,
    };
  },
  created() {
   onAuthStateChanged(auth, (user) => {
    this.$store.commit("updateUser", user);
     console.log("onAuthState", user.email);
      if(user){
        this.$store.dispatch("getCurrentUser");
        console.log("CurrentUser onAuthStateChanged:", this.$store.profileEmail);
      }
    });
      this.checkRoute();
  },

  mounted() {},
  methods: {
    checkRoute(){
      if(this.$route.name == "Login" || 
      this.$route.name == "Register" ||
      this.$route.name == "ForgotPassword"
    ){
        this.navigation = true;
        return;
      } 
      this.navigation = false;
    },
  },
  watch: {
    $$route(){
      this.checkRoute();
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  background-color: rgb(248 250 250);;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  fill: #000;
}

.arrow-light {
  width: 12px;
  fill: #fff;
}

.button{
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

.button:hover {
  outline: none;
  background-color: rgba(48, 48, 48, 0.7);
}
.router-button:hover {
  outline: none;
  background-color: rgba(244, 244, 250, 0.7);
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
}

@media (mind-width: 700px) {
  .button-ghost {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #f1f1f1;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error{
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap{
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
}

@media (min-width: 500px) {
  .blog-card-wrap {
    padding: 100px 16px;
  }
}

.blog-cards{
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
}

@media (min-width: 500px) {
  .blog-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    .blog-cards {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 120px) {
      .blog-cards {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}
</style>
