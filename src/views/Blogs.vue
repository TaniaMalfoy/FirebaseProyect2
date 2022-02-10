<template>
  <div class="blog-card-wrap">
      <div class="blog-card-container">
          <div class="toggle-edit">
           <span class="toggle">Toggle Editing Post</span>
           <input type="checkbox" v-model="editPost">
          </div>
          <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
      </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue"


export default {

    name: "blogs",
    components:{ BlogCard },
    computed: {
        blogPosts(){
          return this.$store.state.blogPosts;
     },
     editPost: {
         get(){
             return this.$store.state.editPost;
         },
         set(payload){
             this.$store.commit("toggleEditPost", payload);
         }
     }
   },
     beforeDestroy(){
       this.$store.commit("toggleEditPost", false);
   }
};

</script>

<style scoped>

.blog-cards{
    position: relative;
}

.toggle-edit{
    display: flex;
    align-items: center;
    position: relative;
    top: -90px;
    right: 0;
}

.toggle{
    margin-right: 16px;
}

input[type="checkbox"]{
    position: relative;
    border:none;
    -webkit-appearance: none;
    background: #fff ;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

input[type="checkbox"]:before{
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background: #303030 ;
    border-radius: 20px;
    transform: scale(1.1);
    transition: 750ms ease all;
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

input:checked[type="checkbox"]:before{
     background: #fff ;
     left: 52px;
    
}

</style>