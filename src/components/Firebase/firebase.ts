import { config } from "./config"
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();