import { getFunctions, httpsCallable } from "firebase/functions";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

//Create the funtion 
//https://firebase.google.com/docs/auth/admin/manage-users https://firebase.google.com/docs/functions/get-started?hl=es-419

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email)
        .then((user) => {

            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,  
            });
        })
        .then(() => {
            return {
                message: `Sucess! ${data.email} has been made an admin!`,
            };
        })
        .catch((err) => {
            console.log(err);
        });
});