import { config } from "./config"
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
