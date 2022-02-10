<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading"/>
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p class="invp"><span class="invsp">Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input
          class="inblog"
          type="text"
          placeholder="Enter Blog Title"
          v-model="blogTitle"
        />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            class="inupload"
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, .jpe"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span class="spreview"
            >File Chosen: {{ this.$store.state.blogPhotoName }}</span
          >
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog" class="blog-ab">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Post Preview</router-link
        >
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

import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from "../components/Loading.vue";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseInit";
import {
  setDoc,
  doc,
  collection,
  addDoc,
} from "@firebase/firestore";
import { db, auth } from "../firebase/firebaseInit";


export default {
  name: "CreatePost",
  data() {
    return {
      file: null,

      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    BlogCoverPreview,
    Loading,
  },
  methods: {
    fileChange() {
      console.log("fileChange");
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
      console.log("openPhotoPreview");
    },
    async imageHandler(file, Editor, cursorLocation, resetUploader) {
     
     const imgRefName = "documents/blogPostPhotos/" + file.name;
      console.log("imgRefName",imgRefName);

      const storageRef = ref(storage, imgRefName);
      console.log("storageRef", storageRef);

      uploadBytes(storageRef, "state_changed", file);
     // .then(
       // (snapshot) => {
       //   console.log("Uploaded a blob or file!");
       const storageRef2 = ref(storage, imgRefName);
       console.log("storageref2", storageRef2);

          const downloadURL = await getDownloadURL(ref(storage, storageRef2));
          console.log("downloadURL", downloadURL);

            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            console.log("Show image");
            resetUploader();
        //  });
      //  },
        (err) => {
          console.log(err);
        }
      //);
    }, //image

    async uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
        this.loading = true;
          const photoName = this.$store.state.blogPhotoName;
          var userIdFb = auth.currentUser.uid;

          const storageRef = ref(
            storage,
            "documents/blogCoverPhotos/" + photoName
          );
          const downloadURL = getDownloadURL(storageRef);
          console.log("downloadURL", downloadURL);

          uploadBytes(storageRef, this.file);

          const docRef = await addDoc(collection(db, "Post"), {});

          await setDoc(doc(db, docRef.path), {
            blogID: docRef.id,
            blogHTML: this.blogHTML,
            blogCoverPhoto: photoName,
            blogCoverPhotoName: this.blogCoverPhotoName,
            blogTitle: this.blogTitle,
            profileId: userIdFb,
            date: Date.now(),
          });
          this.loading = false;
          console.log("Doc", docRef);
          this.$router.push({ name: "ViewBlog" });

          return;
        } //if file

        this.error = true;
        this.errorMsg = "Where is the cover photo!?";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      } // if title
      this.error = true;
      this.errorMsg = "There is no post without a title and a post, fill it!";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }, // fin de la funcion
  },

  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
};
</script>

<style>
.create-post {
  position: relative;
  height: 100%;
}

button {
  margin-top: 0;
}

.router-button {
  text-decoration: none;
  color: #fff;
}

label,
button,
.router-button {
  transition: 0.5s ease-in-out all;
  align-self: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
}

label:hover {
  background-color: rgba(48, 48, 48, 0.7);
}

button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}

.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);
}

.container {
  position: relative;
  height: 100%;
  padding: 10px 25px 60px;
}

/*Error styling*/

.invisible {
  opacity: 0 !important;
}
.err-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 10px;
  background-color: #303030;
  opacity: 1;
  transition: 0.5s ease all;
}

.invp {
  font-size: 14px;
}

.invsp {
  font-weight: 600;
}

.blog-info {
  display: flex;
  margin-bottom: 32px;
  flex-direction: unset;
}

.inblog:nth-child(1) {
  min-width: 300px;
}

.inblog:nth-child(2) {
  transition: 0.5s ease-in-out all;
  padding: 10px 4px;
  border: none;
  border-bottom: 1px solid #303030;
}

.inblog:focus {
  outline: none;
  box-shadow: 0 1px 0 0 #303030;
}

.upload-file {
  flex: 1;
  margin-left: 16px;
  position: relative;
  display: flex;
}

.inupload {
  display: none;
}

.preview {
  margin-left: 16px;
  text-transform: initial;
}

.spreview {
  font-size: 12px;
  margin-left: 16px;
  align-self: center;
}

.editor {
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.quillWrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 748px;
}

.ql-toolbar.ql-snow {
  flex-direction: row;
}

.ql-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
}

.ql-editor {
  padding: 10px 16px 25px;
  min-height: 379px;
}

.blog-actions {
  margin-top: 32px;
}

.blog-ab {
  margin-right: 16px;
}

.ql-blank {
  min-height: 385px;
  font-size: 16px;
}
</style>