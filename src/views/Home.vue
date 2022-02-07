<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3 class="h3">View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            :post="post"
            v-for="(post, index) in sampleBlogCards"
            :key="index"
          />
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register your free acount today!.</h2>
        <router-link class="router-button" to="#">
          Register for Fireblogs. <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost: "Weekly articles about nothing.",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "Horcrux1",
          blogHTML: "This is a blog post Title",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "Horcrux2",
          blogHTML: "This is a blog post Title2",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
      };
  },
      computed: {
        sampleBlogCards() {
          console.log(this.$store.state.sampleBlogCards);
          return this.$store.state.sampleBlogCards;
        },
       user(){
      console.log(this.$store.state.user);
      return this.$store.state.user;
      },
  },
};
</script>

<style>
.blog-card-wrap {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

/*updates*/
.container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (mind-width: 800px) {
  .container {
    padding: 125px 25px;
    flex-direction: row;
  }
}

.router-button {
  display: flex;
  font-size: 14;
  text-decoration: none;
}

@media (min-width: 800px) {
  .router-button {
    margin-left: auto;
  }
}

h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 475px;
  width: 90%;
  text-align: center;
  text-transform: uppercase;
}

@media (mid-width: 800px) {
  h2 {
    text-align: initial;
    font-size: 40px;
  }
}
</style>
