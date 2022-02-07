<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
      <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
      <h2 v-else>{{ post.title }}</h2>
      <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
      <p class="content-preview" v-else>{{ post.blogHTML }}</p>

      <router-link class="link link-light" v-if="post.welcomeScreen" to="#"
        >Login/Register<Arrow class="arrow arrow-light" />
      </router-link>
      <router-link class="link" v-else to="#"
        >View the post<Arrow class="arrow" />
      </router-link>
    </div>
    </div>

    <div class="blog-photo">
      <img
        v-if="post.welcomeScreen"
        :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
        alt=""
      />
      <img
        v-else
        :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "blogPost",
  props: ["post"],
  components: {
    Arrow,
  },
  computed:{
    user(){
      console.log(this.$store.state.user);
      return this.$store.state.user;

    },
  }
};
</script>

<style>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

@media (min-width: 700px) {
  .blog-wrapper {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
}

.blog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}

@media (min-width: 700px) {
  .blog-content {
    order: 1;
  }
  @media (min-width: 800px) {
    .blog-content {
      flex: 3;
    }
  }
}

div {
  display: flex;
  /*max-width: 375px;*/
  padding: 72px 24px;
  flex-direction: column;
}

@media (min-width: 700px) {
  div {
    padding: 0px 24px;
  }
}

h2 {
      font-size: 32px;
      font-weight: 300;
      text-transform: uppercase;
      margin-bottom: -19px;
  }

  @media (min-width: 700px) {
    h2 {
      font-size: 40px;
    }
  }

  p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;

  }

.content-preview{
    font-size: 13px;
    max-height: 24px;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link{
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    transition: .5s ease-in all;

  }

  .link:hover{
    border-bottom-color: #303030;
  }

  .link-light:hover{
    border-bottom-color: #ffff;

  }

  .blog-photo{
    order: 1;
    flex: 3;
    flex-direction: row;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
    
  }

  @media (mind-wdth: 700px) {
    .blog-photo{
      order:2;
    }
     @media (mind-wdth: 800px) {
    .blog-photo{
      flex: 4;
      }
    }   
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .blog-content:nth-child(even){
    order: 2;
  }
 .blog-photo:nth-child(even){
    order: 1;
  }

    
  .arrow{
    margin-left: 8px;
    width: 12px;
    fill: #000;
  }
  
.arrow-light{
  width: 12px;
  fill: #fff;
}

.blog-wrapper.no-user:first-child{
  background-color: #303030;
  color: #fff;
}

</style>