import { useEffect } from 'react';
import axios from "axios";
import { useContext, useState } from 'react';
import { UserContext } from "../../Context/UserContext";
import FavoriteCard from '../favoritecard/FavoriteCard';

const FavoriteList = (props) => {
    //Set states and important variables
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let [favoriteList, setFavoriteList] = useState([]);

    //Getting userID
    const { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;


    //Function for Axios call to backend server to get favorite movies from user:
    // async function generateFavoritesList() {

    //     //Reset error/response states and set loading to true
    //     setError(null);
    //     setLoading(true);

    //     //Make Axios call to get the array of favorite movie IDs
    //     axios.get(`/favorites/${userID}`, {
    //     })
    //         .then(function (res) {
    //             //On success
    //             // console.log(response.data);
    //             console.log(res.data);
    //             let favoriteMovieIDs = res.data;
    //             favoriteList = favoriteMovieIDs.map( favoriteMovieID => {getPrunedMovieDetails(favoriteMovieID)});
    //             console.log(favoriteList);
    //             setLoading(false);

    //         })
    //         .catch(function (error) {
    //             // On error
    //             console.log(error);
    //         });
    // }

    async function generateFavoritesList() {
        // Reset error/response states and set loading to true
        setError(null);
        setLoading(true);

        try {
            // Make Axios call to get the array of favorite movie IDs
            const response = await axios.get(`/favorites/${userID}`);

            // Map the response data to an array of promises for getting pruned movie details
            const promises = response.data.map(movieID => getPrunedMovieDetails(movieID));

            // Wait for all promises to resolve and set the favoriteList state
            const prunedMovieDetails = await Promise.all(promises);
            setFavoriteList(prunedMovieDetails);
        } catch (error) {
            // On error
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }


    //Getting only the id, title, and poster path from the movie details response
    async function getPrunedMovieDetails(movieID) {

        //Make Axios request to get movie details
        return await axios.get(`/movie/${movieID}`, {
        })
            .then(function (res) {
                //On success
                let prunedMovieDetails = {
                    id: res.data.id,
                    title: res.data.title,
                    poster_path: res.data.poster_path
                }
                console.log(prunedMovieDetails);

                return prunedMovieDetails;
            })
            .catch(function (error) {
                // On error
                console.log(error);
            });
    }



    //Regenerate the favorites list whenever this component re-renders
    useEffect(() => {
        generateFavoritesList()
    }, [])


    //Generate the actor list
    return (
        <>
            {/*Show when loading*/}
            {loading && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <p className='text-center'>Loading...</p>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {!loading && favoriteList && favoriteList.length > 0 && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <div className="container border border-gray my-2">
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {favoriteList.map((movie) => (
                                <div key={movie.id}>
                                    <FavoriteCard
                                        movie={movie}
                                    ></FavoriteCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the actor list */}
            {!loading && favoriteList && favoriteList.length === 0 && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <p className='text-center'>No favorite movies, go add some :)</p>
                </>

            )}

            {/*If an error occured, report it to the client*/}
            {!loading && error && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Favorites List Error: {error}</div>
                </>
            )}
        </>
    );
};

export default FavoriteList;


//For testing, get rid of or comment out in final work
// ActorList.defaultProps = {
//     movieID: 502356
// }