import axios from 'axios';
import { useEffect, useState } from 'react';
import EmptyImage from "../../images/no-image-available.jpg";
import FavoriteButton from '../favoritebutton/FavoriteButton';

const MovieDetailsCard = (props) => {

    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);

    //Write function to get Movie Details using the Passed ID
    function getMovieDetails(movieID) {

        //Clearing old response data and resetting loading state
        props.setLoading(true);
        setResponse(null);
        setError(null);

        //Make call to backend server
        axios.get(`/movie/${movieID}`, {

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


    //Call function to get movie details whenever this component re-renders
    useEffect(() => {
        getMovieDetails(props.movieID);
    }, [props.movieID])

    //Generate the movie details card
    return (
        <>
            {response && (
                <div className="container my-3" >
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-md-3 text-center d-flex align-items-center">
                                {response.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${response.poster_path}`} className="img-fluid center-img rounded-start" alt="..." />
                                ) : (
                                    <img src={EmptyImage} className="img-fluid center-img rounded-start" alt="..." />
                                )}

                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <div className='d-flex flex-column mb-2'>
                                        <div>
                                            <div className="d-flex flex-row justify-content-between">
                                                <div>
                                                    {response.title ? (
                                                        <h2 className="card-title movie-title-and-year">{response.title}</h2>
                                                    ) : (
                                                        <h2 className="card-title movie-title-and-year">Unknown.</h2>
                                                    )}
                                                </div>

                                                <div>
                                                    {/*Favorite button goes here*/}
                                                    <FavoriteButton movieID={props.movieID}/>
                                                </div>
                                            </div>

                                        </div>
                                        {response.genres && response.genres.length !== 0 ? (
                                            <div className="movie-genre-tags">
                                                {response.genres.map((genre) => (
                                                    <span key={genre.id} className="badge text-bg-dark me-1">
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="badge text-bg-secondary me-1">
                                                    Unknown.
                                                </span>
                                            </div>

                                        )}
                                    </div>
                                    <div className='movie-overview mb-2'>
                                        {response.overview ? (
                                            <p className="card-text">{response.overview}</p>
                                        ) : (
                                            <p className="card-text">Unknown.</p>
                                        )}
                                    </div>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <div className="movie-runtime">
                                            <b>Runtime: </b>
                                            {response.runtime ? (
                                                <p>{response.runtime} min.</p>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>
                                        <div className="movie-budget">
                                            <b>Budget: </b>
                                            {response.budget ? (
                                                <p>${response.budget}</p>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>
                                        <div className="movie-revenue">
                                            <b>Revenue: </b>
                                            {response.revenue ? (
                                                <p>${response.revenue}</p>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>

                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="movie-production-companies">
                                            <b>Production Companies: </b>
                                            {response.production_companies && response.production_companies.length !== 0 ? (
                                                <div className="d-flex flex-row">
                                                    {response.production_companies.map((company, index) => (
                                                        <div key={index} className="me-2">
                                                            <p key={company.id}>{company.name}.</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="movie-production-countries">
                                        <b>Production Countries: </b>
                                        {response.production_countries && response.production_countries.length !== 0 ? (
                                            <div className="d-flex flex-row">
                                                {response.production_countries.map((country, index) => (
                                                    <div key={index} className="me-2">
                                                        <p key={country.id}>{country.name}. &nbsp;</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>Unknown.</p>
                                        )}
                                    </div>
                                    <div className="movie-homepage mb-2">
                                        <b>Homepage: </b>
                                        {response.homepage ? (
                                            <div>
                                                <a href={response.homepage}>{response.homepage}</a>
                                            </div>

                                        ) : (
                                            <p>Unknown.</p>
                                        )}
                                    </div>
                                    <div className="d-flex flex-row justify-content-between">

                                        <div className="movie-status">
                                            <b>Status:</b>
                                            {response.status ? (
                                                <p>{response.status}</p>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>
                                        <div className="movie-release-date">
                                            <b>Release Date:</b>
                                            {response.release_date ? (
                                                <p>{response.release_date}</p>
                                            ) : (
                                                <p>Unknown.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Movie Details</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Movie Details Error: {error}</div>
                </>
            )}

        </>

    );
};

export default MovieDetailsCard;

// //For testing - Remove later
// MovieDetailsCard.defaultProps = {
//     movieID: 502356
// }