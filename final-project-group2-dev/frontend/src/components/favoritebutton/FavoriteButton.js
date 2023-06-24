import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Context/UserContext";

function FavoriteButton(props) {

    //Get props
    let movieID = props.movieID;
    //Also getting setLoading as a prop

    //Getting userID
    const { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;

    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let [favorite, setFavorite] = useState(false);

    //Set proper state for Favorite button using DB data
    function getFavorites(movieID) {
        //Clear previous requests
        setError(null);
        setResponse(null)
        setFavorite(false)
        setLoading(true);

        axios.get(`/favorites/${userID}`, { //Modify path as necessary
        })
            .then(function (response) {
                //On success
                //Take the response array and try to find the current movie ID in it.
                //If it's in there, that movie was favorited. So the initial state needs to be setFavorite(true)
                //Else set it to false
                setResponse(response.data);
                setFavorite(response.data.includes(Number(movieID)));
                setLoading(false);
            })
            .catch(function (error) {
                // On error
                setError(error); //View this in the Network tab, don't intend on showing it on this page.
            });
    }

    //Call function whenever this component re-renders
    useEffect(() => {
        getFavorites(movieID);
    }, [movieID])


    //Now after the button's state is initially set, here's how the user can change it dynamically
    //For favoriting the movie
    function addToFavorites() {
        //Change button on frontend
        setFavorite(true);

        //Make axios call to add favorite endpoint
        axios.post(`/favorite`, {
            movieId: props.movieID,
            uid: userID
        })
            .then(function (response) {
                //On success
                console.log(response);
            })
            .catch(function (error) {
                // On error
                console.log(error);
            });

    }

    //For removing from favorites
    function removeFromFavorites(movieID) {
        //Change button on frontend
        setFavorite(false);

        //Make axios call to add favorite endpoint
        axios.put(`/favorite`, {
            movieId: props.movieID,
            uid: userID
        })
            .then(function (response) {
                //On success
                console.log(response);
            })
            .catch(function (error) {
                // On error
                console.log(error);
            });
    }


    return (

        <>
            {/*Display this while the request is still loading*/}
            {loading && (
                <button type="button" className="btn btn-dark me-1" disabled>Checking...</button>
            )}

            {/*Display once the response comes in*/}
            {response && (
                <>
                    {favorite ? (
                        <>
                            {/*If the current movie is a favorite, show the unfavorite button*/}
                            <button type="button" className="btn btn-danger me-1" onClick={removeFromFavorites}>Unfavorite</button>
                        </>
                    ) : (
                        <>
                            {/*If the current movie is not a favorite, show the favorite button*/}
                            <button type="button" className="btn btn-success me-1" onClick={addToFavorites}>Favorite</button>
                        </>
                    )}
                </>
            )}

            {/*Display this if something went wrong during the request*/}
            {error && (
                <button type="button" className="btn btn-dark me-1" disabled>???</button>
            )}
        </>
    )
}

export default FavoriteButton;
