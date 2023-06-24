const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');

/**
 * @description - Middleware function that handles token decoding
 * @param {JSON} req - request object 
 * @param {JSON} res - response object
 * @param {JSON} next - next object
 * @returns gives control to next middleware call
 */
const decodeToken = async (req, res, next) => {
    // retrieves token from user API call

    const token = req.headers.authorization.split(' ')[1] || " ";
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            console.log("trying to decode value")
            console.log(decodeValue);
            req.decodeValue = decodeValue;
            req.token = token.toString();
            return next();
        }
        return res.json({ message: 'unauthorize' })
    } catch (e) {
        return res.json({ message: 'Internal Error' });
    }
}

/**
 * GET - Allows for users to login
 * @method /Login
 * @param {JsonWebKey} Req.token - encoded token. Has uid and other important parameters
 * @param {JSON} Req.decodeValue - decoded token.
 * @returns {Response} - Returns a success status or a "UNAUTHORIZED REQUEST!"
 */
router.get('/', decodeToken, async (req, res) => {

    const idToken = req.token;   // get un-decoded idToken
    const decodedtoken = req.decodeValue
    console.log(idToken)
    
    // setting time for cookie expiring in 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // creates a session cookie
    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then((sessionCookie) => {
            console.log("success")
            const options = { maxAge: expiresIn, httpOnly: false, path: "/", sameSite: 'None', secure: true };
            res.cookie("session", sessionCookie, options);
            res.send({ status: "success", playsound: true});
        }).catch((e) => {
            console.log("not working")
            res.send("UNAUTHORIZED REQUEST!");
        });
})

module.exports = router;
