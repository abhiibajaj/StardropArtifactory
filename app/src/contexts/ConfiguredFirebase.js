import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9jCRrp2ClEXQlZ1L7YoKJVfTeftE_bZw",
    authDomain: "stardrop-e5f01.firebaseapp.com",
    databaseURL: "https://stardrop-e5f01.firebaseio.com",
    projectId: "stardrop-e5f01",
    storageBucket: "stardrop-e5f01.appspot.com",
    messagingSenderId: "96587277986",
    appId: "1:96587277986:web:971717bab436f015"
};

export default class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        app.auth().useDeviceLanguage();
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.providers = {
            //google: new app.auth.GoogleAuthProvider()
        };
        this.collections = {
            items: "items",
            users: "users"
        };
    }
}
