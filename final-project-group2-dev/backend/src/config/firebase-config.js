const admin = require("firebase-admin"); //requires the firebase-admin package

const serviceAccount = require("./serviceAccount.json"); //requires the serviceAccount.json file

admin.initializeApp({ //initializes the firebase app
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin; //exports the firebase app
/*Extra Comments for the code above :
it requires the "firebase-admin" package and assigns it to the "admin" variable. Then it requires the service account credentials, which are stored in a ".serviceAccount.json" file.
Next, it initializes the Firebase Admin instance with the service account credentials by calling the "admin.initializeApp()" function with the "credential" property set to "admin.credential.cert(serviceAccount)". This sets up the credentials that will be used to authenticate with Firebase services.
Finally, it exports the Firebase Admin instance by calling "module.exports = admin;".
Finally, it exports the initialized Firebase Admin instance as a module, so it can be used in other parts of the code.

Overall, this code provides a way to authenticate and access Firebase services programmatically from a Node.js environment using the Firebase Admin SDK.
*/
