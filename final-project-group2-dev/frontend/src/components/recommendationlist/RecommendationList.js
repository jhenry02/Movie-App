import { useEffect, useState } from 'react';
import axios from "axios";
import RecommendationCard from '../recommendationcard/RecommendationCard';

const RecommendationList = (props) => {
    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);

    //Function for Axios call to backend server to get movie recommendations
    function getRecommendedMovies(movieID) {

        //Clearing old response data and resetting loading state
        props.setLoading(true);
        setResponse(null);
        setError(null);

        //Make call to backend server
        axios.get(`/movie/${movieID}/recommendations`, {
            params: {
                page: 1
            }
        })
            .then(function (response) {
                //On success
                // console.log(response);
                setResponse(response.data);
                props.setLoading(false);
            })
            .catch(function (error) {
                // On error
                // console.log(error);
                if (error.response) {
                    // Get error data and display error message accordingly
                    const errorMessage = error.response.data.status_message;
                    setError(errorMessage);
                    props.setLoading(false);
                }
            });
    }

    //Call function to get recommended movies whenever this component re-renders
    useEffect(() => {
        getRecommendedMovies(props.movieID)
    }, [props.movieID])


    //Generate the recommended movie list
    return (
        <>
            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response && response.results.length > 0 && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <div className="container border border-gray my-2">
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {response.results.map((movie) => (
                                <div key={movie.id}>
                                    <RecommendationCard
                                        movie={movie}
                                        movieID={props.movieID}
                                        setMovieID={props.setMovieID}
                                        history={props.history}
                                        setHistory={props.setHistory}
                                    ></RecommendationCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response && response.results.length === 0 && (
                <div className="container border border-gray my-2">
                    <h4 className='text-center'>Recommendation List</h4>
                    <p className='text-center'>Unknown.</p>
                </div>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Recommendation List Error: {error}</div>
                </>
            )}
        </>
    );
};

export default RecommendationList;


//For testing, get rid of or comment out in final work
// RecommendationList.defaultProps = {
//     movieID: 502356
// }