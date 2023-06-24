import { useEffect } from 'react';
import axios from "axios";
import { useContext, useState } from 'react';
import { UserContext } from "../../Context/UserContext";
import FavoriteCard from '../favoritecard/FavoriteCard';

const FavoriteList = (props) => {
    //Set states
    const [response1, setResponse1] = useState(null);
    const [response2, setResponse2] = useState(null);
    const [error, setError] = useState(null);

    //Getting userID
    const { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;


    //Function for Axios call to backend server to get favorite movies from user:
    async function getFavorites() {
        try {
          const response1 = await axios.get(`/favorites/${userID}`);
          setError(null);
          setResponse1(response1.data);
          const moviePromises = response1.data.map((movie_mongo) =>
            axios.get(`/movie/${movie_mongo}`)
          );
          const movieResponses = await Promise.all(moviePromises); // MovieDB reponse must be allocated to interal moviePromises array. (Await)
          const movies = movieResponses.map((movieResponse) => movieResponse.data);
          setResponse2({ results: movies });
        } catch (error) {
          if (error.response) {
            setResponse1(null);
            const errorMessage = error.response.data.status_message;
            setError(errorMessage);
          }
        }
      }

    //Call function to get actors whenever this component re-renders
    useEffect(() => {
        getFavorites()
    }, [])

    // useEffect(() => {
    //     console.log(response1);
    //     response1.map((movie_mongo) => {
    //         console.log(movie_mongo);
    //     })
    //     // response1.map((mongo_movie) => {
    //     //     console.log(mongo_movie);
    //     //     console.log(typeof mongo_movie);
    //     //     axios.get(`/movie/:${mongo_movie}`, {}
    //     //     )
    //     //     .then(function (movie_json) {
    //     //         setResponse2(response2.append(movie_json.data));
    //     //     })
    //     //     .catch(function (error) {
    //     //         console.log("Error :)");
    //     //     })
    //     // })
    //   }, [response1]);

    //Generate the actor list
    return (
        <>
            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response2 && response2.results && response2.results.length > 0 && (
                <>
                    <h4 className='text-center'>Favorites List</h4>
                    <div className="container border border-gray my-2">
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {response2.results.map((movie) => (
                                <div key={movie.id}>
                                    <FavoriteCard
                                        movie={movie}
                                        movieID={props.movieID}
                                        setMovieID={props.setMovieID}
                                        history={props.history}
                                        setHistory={props.setHistory}
                                    ></FavoriteCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the actor list */}
            {response2 && response2.results.length === 0 && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <p className='text-center'>Loading...</p>
                </>

            )}

            {/*If an error occured, report it to the client*/}
            {error && (
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