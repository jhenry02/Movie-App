const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'certs', '.env') });
const { MongoClient, serverApiVersion, MongoServerError, ListCollectionsCursor } = require("mongodb");
const { query } = require('express');

// Create Uri
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@studentcluster.fwd4l95.mongodb.net/?retryWrites=true&w=majority`
const USERCOLLECTION = "Users";
const FAVORITEDMOVIES = "FavoritedMovies";

const client = new MongoClient(uri);

const PingDatabase = async function () {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
PingDatabase()

/**
 * @Description Writes to user to usercollection to retrieve for user info page
 * @param {String} obj - User Id
 * @param {String} db - name of database
 * @param {String} collection - name of collection
 */
const writeToCollection = async function (obj, db, collection) {
  try {

    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));

    //*************************THIS CODE USED TO CHECK FOR DUPLICATES***************************/
    // // first check if database has a similar object
    // const matches = await myColl.aggregate([{$match: {first_name: obj.first_name, last_name: obj.last_name}}]).toArray();

    // // If length is not 0, then database found similar object. Return duplicate values.
    // if(matches.length != 0){
    //   console.log("Duplicate values!!");
    //   return "Duplicate Values!!"
    // }
    //********************************************************************************************/


    if (collection == USERCOLLECTION) {
      console.log("insert")
      await myColl.insertOne({ _id: obj._id, "first_name": obj.first_name, "last_name": obj.last_name, "email": obj.email, "zipcode": obj.zipcode, "state": obj.state },).then((valueOrbool) => {
        // If returned response is false, print error
        if (valueOrbool.acknowledged == false)
          console.log("Error - Could not insert document");
        else
          console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
      });

      // If writing to FavoritedMovies
    } else if (collection == FAVORITEDMOVIES) {

      await myColl.insertOne({ _id: obj._id, "FavoriteMovie_Id": obj.movieId },).then((valueOrbool) => {

        // If returned response is false, print error
        if (valueOrbool.acknowledged == false)
          console.log("Error - Could not insert document");
        else
          console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
      });
    }

  } catch (error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {

    // Close client
    await client.close();
  }
}

/**
 * @Description Deletes user from usercollection
 * @param {String} Id - User Id.
 * @param {String} db - name of database
 * @param {String} collection - name of collection
 * @returns {Promise<string>} - returns resonse string
 */
const DeleteFromCollection = async function (Id, db, collection) {
  try {
    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));
    // stores result of document being deleted
    var result;
    // Create query
    const query = { _id: parseInt(Id) };
    if (collection == USERCOLLECTION) {
      console.log("insert")
      await myColl.findOneAndDelete(query).then((valueOrbool) => {
        // If returned response is false, print error
        if (valueOrbool.acknowledged == false)
          console.log("Error - Could not insert document");
        else
          console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
      });

      // If writing to FavoritedMovies
    } else if (collection == FAVORITEDMOVIES) {

      await myColl.insertOne({ _id: obj._id, "FavoriteMovie_Id": obj.movieId },).then((valueOrbool) => {

        // If returned response is false, print error
        if (valueOrbool.acknowledged == false)
          console.log("Error - Could not insert document");
        else
          console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
      });

    };
    return result;
  } catch (error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  }
}

/**
 * @descripton Reads all values in student collection.
 * @returns Returns Array of all studentRecords in collection.
 */
const ReadCollection = async function (Id, db, collection) {
  try {
    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));

    // Returns entire collection
    var myCursorAry = await myColl.find().toArray();
    if (myCursorAry.length === 0)
      console.log(`There are no documents in ${myColl.collectionName} collection`);
    else {
      myCursorAry.forEach((document) => console.log(document));
      return myCursorAry;
    }

  } catch (error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  }
}

/**
 * @description Returns Movie Array of user that matches user_id and array has movieid
 * @param {String} objId - id of userid
 * @param {String} db - name of database
 * @param {String} collection - name of collection
 * @param {JSON} query - query that finds if a value exist in UserFavorites array 
 */
const Readdocument = async function (objId, db, collection, query) {
  try {
    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));

    const newQuery = query
    console.log(newQuery)

    var myCursorAry = await myColl.find(newQuery).toArray();
    
    if (myCursorAry.length === 0){
      console.log(`There are no document with record id ${newQuery._id} in ${myColl.collectionName} collection`);
      return null
    } else {
      myCursorAry.forEach((document) => console.log(document));
      return myCursorAry;
    }

  } catch (error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  }
}

/**
 * @description Finds Favorite movies document and then appends value to end of the array
 * @param {JSON} queryid - id of userid
 * @param {String} db - name of database
 * @param {String} collection - name of collection
 * @param {JSON} query - query that pushes object to end of UserFavorites Array
 */
const updatedocument = async function (queryid, db, collection, query) {
  try {
    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));

    const result = await myColl.updateOne(queryid, query).then((valueOrbool) => {

      // If returned response is false, print error
      console.log(valueOrbool.acknowledged);
      if (valueOrbool.acknowledged == false){
        console.log("Error - Could not update document");
        return false;
      }
      else{
        console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
        return true;
      }
    });

    //This is what updatedocument is returning
    if (result)
      return true; //Success
    else
      return false; //Failure

  } catch (error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {

    // Close client
    await client.close();
  }
}


/**
 * @description Deletes Favorited movie Id in Favorited movie array
 * @param {JSON} queryid - id of userid
 * @param {String} db - name of database
 * @param {String} collection - name of collection
 * @param {JSON} query - query that pushes object to end of UserFavorites Array
 */
const DeleteFavoritedMovie = async (queryid, db, collection, query) => {
  try{
    await client.connect();

    const myDB = await client.db(String(db));
    const myColl = myDB.collection(String(collection));

    const result = await myColl.updateOne(queryid, query).then((valueOrbool) => {

      // If returned response is false, print error
      if (valueOrbool.acknowledged == false)
        console.log("Error - Could not update document");
      else
        console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
    });

  } catch(error){
    
    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally{

    // Close Client
    await client.close()
  }
}

module.exports = { client, PingDatabase, writeToCollection, DeleteFromCollection, ReadCollection, Readdocument, updatedocument, DeleteFavoritedMovie }