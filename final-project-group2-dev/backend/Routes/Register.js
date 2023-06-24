const express = require('express');
const router = express.Router();
const admin = require('../src/config/firebase-config');
const { writeToCollection} = require('../database.js');

/**
 * @description - Middleware function that handles token decoding
 * @param {JsonWebKey} req.body.token - Firebase API JWT Token
 * @param {String} req.decodeValue - Decoded API JWT Token
 * @param {JSON} next - next object
 * @returns - Returns "unaurhotize message" or "Internal Error" message
 */
const decodeTokenForReg = async (req, res, next) => {
    
    // retrieves token from user API call
    const token = req.body.token;
    try {

        // Generated decoded JWT token
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            console.log("trying to decode value");

            // append decodeValue and token onto req response for use in other middleware methods
            req.decodeValue = decodeValue;
            req.token = token.toString();
            return next();  // Go to next request handler
        }
        return res.json({ message: 'unauthorize' });
    } catch (e) {
        return res.json({ message: 'Internal Error' });
    }
}

/**
 * @method /Register
 */
router.post('/', decodeTokenForReg, async (req, res, next) => {
    console.log(req.body);
    console.log(req.decodeValue);

    // Create User profile
    const User = {
        _id: String(req.decodeValue.uid),
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.decodeValue.email,
        "zipcode": parseInt(req.body.zipcode),
        "state": req.body.state,
    }

    // Writes to user to usercollection to retrieve for user info page
    await writeToCollection(User, "UsersDB", "Users");

    res.status(200).send("User was writen to database!");
})



module.exports=router;