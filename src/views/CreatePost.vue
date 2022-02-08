<template>

  <div class="create-post">
      <div class="container">
          <div :class="{ invisible: !error }" class="err-message">
              <p class="invp"><span class="invsp">Error:</span>{{ this.errorMsg }}</p>
          </div>
          <div class="blog-info">
              <input class="inblog" type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
              <div class="upload-file">
                  <label for="blog-photo">Upload Cover Photo</label>
                  <input class="inupload" type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpe" />
                  <button class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
                      Preview Photo
                  </button>
                  <span class="spreview">File Chosen: {{ this.$store.state.blogPhotoName }}</span>
              </div>
          </div>
          <div class="editor">
              <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler />
              <!--@image-added="imageHandler" -->
          </div>
          <div class="blog-actions">
              <button class="blog-ab">Publish Blog</button>
              <router-link class="router-button" to="#">Post Preview</router-link>
          </div>
      </div>
  </div>

</template>

<script>

//Importing the library to resize the post images.

import Quill from "quill";
window.Quill = Quill;

const ImageResize = require("quill-image-resize-module").default;
Quill.register("module/imageResize", ImageResize);


export default {
    name: "CreatePost",
    data() {
        return {
        
        error: null,
        errorMsg: null,
        editorSeetings: {
            modules: {
                imageResize: {},
            },
          },
        };
    },
    methods: {
        
    },

    computed:{
        profileId(){
            return this.$store.state.profileId;
        },
        blogCoverPhotoName(){
            return this.$store.state.blogCoverPhotoName;
        },
        blogTitle: {
            get(){
                return this.$store.state.blogTitle;
            },
            set(payload){
                this.$store.commit("updateBlogTitle",payload);
            }
        },
        blogHTML: {
            get(){
                return this.$store.state.blogHTML;
            },
            set(payload){
                this.$store.commit("newBlogPost",payload);
            }
        },
    },
};
</script>

<style>

.create-post{
    position: relative;
    height: 100%;
}

button{
    margin-top: 0;
}

.router-button{
    text-decoration: none;
    color: #fff;
}

label, button, .router-button{
    transition: .5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

}

label:hover{
    background-color: rgba(48, 48, 48, 0.7);
}

button:hover{
    background-color: rgba(48, 48, 48, 0.7);
}

.router-button:hover{
    background-color: rgba(48, 48, 48, 0.7);
}

.container{
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
}

/*Error styling*/

.invisible{
    opacity: 0 !important;
}
.err-message{
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
}

.invp{
    font-size: 14px;
}

.invsp{
    font-weight: 600;
}

.blog-info{
    display: flex;
    margin-bottom: 32px;
    flex-direction: unset;
}

.inblog:nth-child(1){
        min-width: 300px;
}

.inblog:nth-child(2){
    transition: .5s ease-in-out all;
    padding: 10px 4px;
    border: none;
    border-bottom: 1px solid #303030;
}

.inblog:focus{
    outline: none;
    box-shadow: 0 1px 0 0 #303030;
}

.upload-file{
    flex:1;
    margin-left: 16px;
    position: relative;
    display: flex;
}

.inupload{
    display: none;
}

.preview{
    margin-left: 16px;
    text-transform: initial;
}

.spreview{
    font-size:12px;
    margin-left: 16px;
    align-self: center;
}

.editor{
    height: 60vh;
    display: flex;
    flex-direction: column;
}

.quillWrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 748px;
}

.ql-toolbar.ql-snow {
    flex-direction: row;
}

.ql-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
}

.ql-editor{
   padding: 10px 16px 25px;
   min-height: 379px;
}

.blog-actions{
    margin-top: 32px;
}

.blog-ab{
    margin-right: 16px;
}

.ql-blank{
  min-height: 385px;
  font-size: 16px;
}

</style>
