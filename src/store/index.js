import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from "../firebase/firebaseInit";
import { collection, doc, getDoc, updateDoc, getDocs, query, orderBy } from "firebase/firestore";
import 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null, 
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    
  },
  getters:{
    blogPostFeed(state){
      return state.blogPosts.slice(0,2);
    },
    blogPostCards(state){
      return state.blogPosts.slice(2,26);
    }
  },
  mutations: {

    newBlogPost(state,payload){
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload){
      state.blogTitle = payload;
    },
    fileNameChange(state, payload){
      state.blogPhotoName = payload;
      console.log(state.blogPhotoName);
    },
    createFileURL(state, payload){
      state.blogPhotoFileURL = payload; 
      console.log(state.blogPhotoFileURL);
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview; 
      console.log("Preview",state.blogPhotoPreview);
    },
    toggleEditPost(state, payload) {
      state.user = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin( state, payload){
      state.profileAdmin = payload;
      console.log("Admin state:",state.profileAdmin);
    },
    setProfileInfo(state, doc) {

      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log("state.profileUsername:", state.profileUsername);
      console.log("state.Email:", state.profileEmail);
      console.log("state.profileLastName:", state.profileLastName);
      console.log("state.profileFirstName:", state.profileFirstName);
    },
    setProfileInitials(state) {

      state.profileInitials = state.profileFirstName.match(/^./).join("") + state.profileLastName.match(/^./).join("");

      //  state.profileFirstName.match(/(\b\S)?/g).join("") +
      //  state.profileLastName.match(/(\b\S)?/g).join("");
      console.log("Inititals:", state.profileInitials);
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
      console.log(state.profileFirstName);
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
      console.log(state.profileLastName);
    },
    changeUsername(state, payload) {
      console.log("Username",payload);
      state.profileUsername = payload;
      console.log("State UN",state.profileUsername);
    },
  },
  actions: {

    async getCurrentUser({ commit }, user) {
      /*Use of commit to do the setProfileInitialschange of the state in the mutations*/

      var userIdFb = auth.currentUser.uid;
      const docRef = doc(db, "users", userIdFb);
      const docSnap = await getDoc(docRef);

      commit("setProfileInfo", docSnap);
      console.log("Document data:", docSnap.data());
      commit("setProfileInitials");

      const token = await user.getIdTokenResult();
      console.log("token claims",token.claims);

      //set admin with true or false
      const admin = token.claims.admin;
      commit("setProfileAdmin", admin);

    },
    async getPost({state}) {

      /*
      const citiesRef = db.collection('cities');
      const snapshot = await citiesRef.where('capital', '==', true).get();
      if (snapshot.empty) {
      console.log('No matching documents.');
      return;
      }

      snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      });

      const docRef = doc(db, "cities", "SF");
      const docSnap = await getDoc(docRef);
      
      ////
      const postRef = db.collection('Post');
      const dbResults = await postRef.orderBy('date','desc').get();

      const docRef = doc(db, "Post", post.blogID);
      const docSnap = await getDoc(docRef);
      
      dbResults.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      });
      
      */      
     const querySnapshot = await getDocs(collection(db, "Post"), orderBy("date", "desc"));

     querySnapshot.forEach((doc) => {
    
      if(!state.blogPosts.some(post => post.blogID === doc.id)) {
        const data = {

          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,

        };
        state.blogPosts.push(data);
      }

      console.log(doc.id, " Docs in the If => ", doc.data());
      });
   /*   docSnap.forEach(doc => {
        if(!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {

            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,

          };
          state.blogPosts.push(data);
        }
      }); */

      state.postLoaded = true;
      console.log("state blogPosts",state.blogPosts);
    }, //funcion

    async updateUserSettings({ commit, state }) {
      
      var userIdFb = auth.currentUser.uid;
      console.log("userIdFb:",userIdFb);
      const docRef = doc(db, "users", userIdFb);
     
      // Set the new data from user loged in
      //const docSnap 
      await updateDoc(docRef, {
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
        email: state.profileEmail,
      });
      
      commit("setProfileInitials");
      console.log("UserID", state.profileId);
      console.log("Data updated for FN", state.profileFirstName);
      console.log("Data updated for LN", state.profileLastName,);
      console.log("Data updated for UN", state.profileUsername);
      console.log("Email remainds the same", state.profileEmail);


    },
  },
  modules: {
  }
});