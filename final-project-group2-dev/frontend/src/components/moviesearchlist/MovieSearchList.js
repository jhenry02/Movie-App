import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import PageNavigation from '../pagenavigation/PageNavigation.js';
import MovieCard from '../moviecard/MovieCard.js';


const MovieSearchList = (props) => {
    //Get props
    const query = props.query;

    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);
    let [page, setPage] = useState(1);

    //Function for Axios call to backend server to search TMBD for movies based on a query
    function searchMovies(query, page) {

        //Clearing old response data and resetting loading state
        setLoading(true);
        setResponse(null);
        setError(null);

        //Make call to backend server
        axios.get(`/search/movie`, {
            params: {
                query: query,
                page: page
            }
        })
            .then(function (response) {
                //On success
                // console.log(response);
                setResponse(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                // On error
                // console.log(error);
                if (error.response) {
                    // Get error data and display error message accordingly
                    const errorMessage = error.response.data.status_message;
                    setError(errorMessage);
                    setLoading(false);
                }
            });
    }

    //Call function to search movies whenever this component re-renders
    useEffect(() => {
        searchMovies(query, page)
    }, [query, page])


    //Generate the search list
    return (
        <>
            {/*Show this while the request is loading*/}
            {loading && (
                <h4 className='loading-info text-center my-2'>Please wait...</h4>
            )}

            {/*If the response object isn't null, generate the movie list */}
            {response && (
                <>
                    <h4 className='result-info text-center my-2'>
                        {response.total_results > 10000 ? 10000 : response.total_results} results found for query: "{query}".
                        Showing page {response.page} of {response.total_pages > 500 ? 500 : response.total_pages}.
                    </h4>
                    <Container>
                        {/*Edit the line below to adjust the amount of movies shown per row based on the screensize*/}
                        <Row xs={1} sm={1} md={2} lg={3} xl={5}>
                            {response.results.map((movie) => (
                                <Col key={movie.id} className="d-flex align-items-stretch mb-4">
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PageNavigation
                            setPage={setPage}
                            currentPageNumber={page}
                            totalPages={response.total_pages > 500 ? 500 : response.total_pages}>
                        </PageNavigation>
                    </Container>
                </>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (<div className='error-message text-center' style={{ color: 'red' }}>{error}</div>)}
        </>
    );
};

export default MovieSearchList;
