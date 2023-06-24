import { useEffect, useState } from 'react';
import axios from "axios";
import ActorCard from '../actorcard/ActorCard';

const ActorList = (props) => {
    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);

    //Function for Axios call to backend server to get Actors
    function getActors(movieID) {

        //Clearing old response data and resetting loading state
        props.setLoading(true);
        setResponse(null);
        setError(null);

        //Make call to backend server
        axios.get(`/movie/${movieID}/credits`, {
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

    //Call function to get actors whenever this component re-renders
    useEffect(() => {
        getActors(props.movieID)
    }, [props.movieID])


    //Generate the actor list
    return (
        <>
            {/*If the response object isn't null and has at least one item, generate the actor list */}
            {response && response.cast.length > 0 && (
                <>
                    <div className="container border border-gray my-2">
                        <h4 className='text-center'>Actor List</h4>
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {response.cast.map((actor) => (
                                <div key={actor.id}>
                                    <ActorCard actor={actor}></ActorCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the actor list */}
            {response && response.cast.length === 0 && (
                <div className='container border border-gray my-2'>
                    <h4 className='text-center'>Actor List</h4>
                    <p className='text-center'>Unknown.</p>
                </div>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Actor List</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Actor List Error: {error}</div>
                </>
            )}
        </>
    );
};

export default ActorList;


//For testing, get rid of or comment out in final work
// ActorList.defaultProps = {
//     movieID: 502356
// }