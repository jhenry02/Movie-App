# ReelGood

ReelGood is a web application for movie enthusiasts that provides users with the ability to browse info on the latest movies, manage a favorites list and find a nearby theater to visit in order to see what’s now playing. It can be viewed on Heroku [here](https://reelgood.herokuapp.com/).

![reelgood-usage](./frontend/src/images/reelgood-usage.gif)

## Table of Contents
1. [Getting Started](#getting-started)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Licenses](#licenses)
5. [Miscellaneous](#miscellaneous)


## Getting Started

#### Prerequisites
- npm

#### Installation
1. **Navigate to the directory in which you want to clone the repository and do so.**

```sh
$ cd <your-local-directory>
$ git clone https://github.com/cop4808-spring-2023-fullstack-web
```

2. **Install the dependencies using [npm](https://www.npmjs.com/):**

```sh
$ cd final-project-group2
$ cd frontend
$ npm install
$ cd ..
$ cd backend
$ npm install 
```
3. **After the installation is done, you can start the app by running:**

```sh
$ cd frontend
$ npm start
```

**The application is hosted on port 3000. To view it, visit http://localhost:3000/**

## Usage

For environment configuration, be sure to have the variables below. Place the environment file in the backend folder.

```sh
MOVIE_DB_API_KEY= "[Your MovieDB API Key]"
MOVIE_DB_BASE_URL="https://api.themoviedb.org/3"

YELP_API_KEY="Bearer [Your Yelp API Key]"
YELP_BASE_URL="https://api.yelp.com/v3"

MONGODB_USER="[Your MongoDB Username]"
MONGODB_PASS="[Your MongoDB Password]"
```

## Technologies Used
Here is a list of some of the core technologies used:
- Axios v1.3.6
- Bootstrap v5.2.3
- Express: v4.18.2
- Firebase v9.20.0
- Firebase-admin: v11.7.0
- Mongodb: v5.3.0
- React v18.2.0
- React-Bootstrap v2.7.4
- React-router-dom: v6.10.0

## Licenses

This app uses data from the following APIs, which have their own licensing requirements:

- Yelp API: [Yelp API Terms of Use](https://www.yelp.com/developers/api_terms)
- MovieDB API: [MovieDB API Terms of Use](https://www.themoviedb.org/documentation/api/terms-of-use)

Please make sure to review and comply with these terms of use before using the app or its data for any purpose.

## Miscellaneous

#### How to deploy to heroku

First to deploy to heroku using react you need to add a script to your package.json file in your react root directory .
```javascript
"scripts": {
    ...
    "build": "set BUILD_PATH=../backend/build&& react-scripts build",
    ...
  },
```
- ```set BUILD_PATH``` adds a variable to your enviroment. The react-scripts program then builds the needed static files in the 
specified directory.
- Next, You want to initalize a new git repository in the backend using ```git init```. Next, you want to add a remote .
- Then you ``` git add .``` to add files to project.
- Then do a commit .
- Then use command ```heroku git:remote -a reelgood``` to then create a heroku remote. 
- To deploy you just use git normally and push your branch to heroku
```git push heroku master```


#### MongoDB CRUD operations

Here are the functions that will be called for crud operations for database. The queries need to be build before passed into the function. Please user the example query templates provided to create queries to certain user data. The data in fields are just temporary data. Please change to fit needed query requirements
    


**Practice Data**
```javascript
const User = {
    _id: String(req.decodeValue.user_id),
    "first_name": "Eyan",
    "last_name": "Eubanks",
    "email": decodedtoken.email,
    "zipcode": 33212,
    "state": "Florida",
}

    const FavoriteMovies = {
        _id: String("us8daf9h289rt3r983jhoiwjf"/*req.decodeValue.user_id*/),
        movieId: [142684, 681341, 402760, 919631],
    }
```

Writes to user to usercollection to retrieve for user info page

```javascript
await writeToCollection(User, "UsersDB", "Users");
```

Deletes user from usercollection
```javascript
await DeleteFromCollection(req.decodeValue.user_id, "UsersDB", "Users");
```

Writes to favoriteMovies document to favorite movies collection
```javascript
await writeToCollection(FavoriteMovies, "UsersDB", "FavoritedMovies");
```

Returns Movie Array of user that matches user_id and array has movie id
```javascript
await Readdocument(String(req.decodeValue.user_id), "UsersDB", "FavoritedMovies", { $and: [{ _id: String(req.decodeValue.user_id) }, { "FavoriteMovie_Id": 142684 }] })
```


```javascript
queryid = { _id: String(req.decodeValue.user_id) } // Userid query 
query = { $push: { "FavoriteMovie_Id": 182612 } }  // statement that pushes value to end of array
```

```javascript
//Finds Favorite movies document and then appends value to end of the array
await updatedocument(queryid, "UsersDB", "FavoritedMovies", query)
```


```javascript
queryid1 = { _id: String(req.decodeValue.user_id)} // Userid query
query1 = {$pull: {"FavoriteMovie_Id": 919631}}
```

```javascript
await DeleteFavoritedMovie(queryid1, "UsersDB", "FavoritedMovies", query1)
```

