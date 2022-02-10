<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">FireBlogs</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="ul-link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="ul-link" :to="{ name: 'Blogs'}">Blogs</router-link>
         <router-link v-if="admin" class="ul-link" :to="{ name: 'CreatePost'}">Create Post</router-link>
          <router-link v-if="!user" class="ul-link" :to="{ name: 'Login'}">Login/Register</router-link>
        </ul>
        <div  v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
          <span class="sp"> {{ this.$store.state.profileInitials }} </span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                <p> {{ this.$store.state.profileUsername }}</p>
                <p> {{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>Profile</p>
                </router-link>
                <div v-if="admin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div v-on:click="signOut" class="option">
                  <signOutIcon class="icon" />
                  <p>Sign Out</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon v-on:click="toggleMobNav" class="menu-icon" v-show="mobile"/>
    <transition name="mobile-nav">
    <ul class="mobile-nav" v-show="mobileNav">
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs'}">Blogs</router-link>
          <router-link v-if="admin" class="link" :to="{ name: 'CreatePost'}">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'Login'}">Login/Register</router-link>
        </ul>
    </transition>
  </header>
  
</template>

<script>

import menuIcon from '../assets/Icons/bars-regular.svg'
import userIcon from '../assets/Icons/user-alt-light.svg'
import adminIcon from '../assets/Icons/user-crown-light.svg'
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg'
import { auth } from '../firebase/firebaseInit';
import { signOut } from "firebase/auth";

export default {
  name: 'navigation',
  components:{
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },

  data(){
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windownWidth: null
    };

  },
  created(){
    window.addEventListener('resize',this.checkScreen);
    this.checkScreen();
  },

  methods:{
    checkScreen(){
      this.windownWidth = window.innerWidth;
      if(this.windownWidth <= 750){
        this.mobile = true;
        return;
      }
      this.mobile =false;
      this.mobileNav = false;
      return;
    },

    toggleMobNav(){
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if(e.target === this.$refs.profile) {
      this.profileMenu = !this.profileMenu; 
      console.log(this.profileMenu); 
      } 
    },
    signOut(){
      signOut(auth);
      window.location.reload();
      console.log("User sign out")
    },
  },
  computed:{
    user(){
      return this.$store.state.user;
    },
    admin(){
      return this.$store.state.profileAdmin;
    },
  }

}
</script>

<style scoped>


header{
  background: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  font-weight: 500;
  padding: 0 8px;
  transition: .3s color ease;
  margin-right: 32px;
}

.link {
  font-weight: 500;
  padding: 0 8px;
  transition: .3s color ease;
  margin-right: 32px;
}

.link:hover{
  color: #1eb8b8;

}

nav{
  display: flex;
  padding: 25px 0;

}

.branding{
  display: flex;
  align-items: center;
}

.header{
  font-weight: 600;
  font-size: 24px;
  color: #000;
  text-decoration: none;

}

.nav-links{

  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  
}

.ul{
  margin-right: 32px;

}

.ul-link{
  margin-right: 32px;
}

.ul-link:last-child{
  margin-right: 0;
}

.profile{
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  background-color: #303030;
}

.profile-menu{
  position: absolute;
  top: 47px;
  right: -577px;
  width: 201px;
  background-color: #303030;
   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.sp{
  pointer-events: none;
}

.info{
  display: flex;
  align-items: center;
  padding: 15px;
  /*border-bottom: 1px solid #fff;*/
}

.initials{
  position: absolute;
  top: -90px;
  right: 17px;
  width: 79px;
  background-color: #303030;
  
  display: flex;
  align-items: center;
  padding: 26px;
  border-bottom: 1px solid #fff;
  border-radius: 50%;
}

.right{
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid #fff;
  flex: 1;
  margin-left: 11px;
}

p{
  display: flex;
  align-items: center;
  padding: 15px;
 /* border-bottom: 1px solid #fff;*/
  flex: 1;
  margin-left: 1px;
  font-size: large;
  color: #fff;
}

p:nth-child(1){
  font-size: 20px;
}

p:nth-child(2),p:nth-child(3){
  font-size: 12px;
}

.options{
  padding: 15px;
}

.option{
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child{
    margin-bottom: 0px;
  }

}
.option:last-child{
  margin-bottom: 10px;
}

 


.icon{
  width: 18px;
  height: auto;
  background-color: #303030;
}

p{
  font-size: 14px;
  margin-left: 12px;

}

.menu-icon{
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 32px;
  height: 25px;
  width: auto;

}



mobile-nav{
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position:fixed;
  height:100%;
  background:#303030;
  top: 0;
  left:0
}

.m-link{
  padding: 15px 0;
  color: #fff;

}

.mobile-nav-enter-active,
.mobile-nav-leave-active{
  transition: all 1s ease;
}

.mobile-nav-enter{
  transform: translateX(-250px);
}

.mobile-nav-enter-to{
  transform: translateX(0);
}
.mobile-nav-leave-to{
  translate: translateX(-250px) ;
}



</style>-->