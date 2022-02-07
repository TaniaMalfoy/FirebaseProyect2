import Vue from 'vue'
import Vuex from 'vuex'
import { db, firebaseApp, auth } from "../firebase/firebaseInit";
import { signInWithEmailAndPassword, UserCredential, currentUser } from "firebase/auth";
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "Feb 1, 2022" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "Feb 1, 2022" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "Feb 1, 2022" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "Feb 1, 2022" },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.user = payload;
      console.log(payload)
    },
    updateUser(state, payload) {
      state.user = payload;
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

  },
  actions: {
   async getCurrentUser({ commit }) {
      /*Use of commit to do the setProfileInitialschange of the state in the mutations*/

      var userIdFb = auth.currentUser.uid;
      const docRef = doc(db, "users", userIdFb);
      const docSnap = await getDoc(docRef);
     
      commit("setProfileInfo", docSnap);
      console.log("Document data:", docSnap.data());
      commit("setProfileInitials");

    },
  },
  modules: {
  }
})
