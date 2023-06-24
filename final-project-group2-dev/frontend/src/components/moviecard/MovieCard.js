import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';
import emptyImage from '../../images/no-image-available.jpg';

function MovieCard(props) {

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    function goToMovieDetailsPage() {

        sessionStorage.setItem('lastPath', pathname);
        navigate(`/movies/${props.movie.id}`);
    }   

    return (
        <Card style={{ width: '100%', maxWidth: '22rem', }}>
            {props.movie.poster_path ? (
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${props.movie.poster_path}`} style={{ objectFit: 'cover' }} />
            ) : (
                <Card.Img variant="top" src={emptyImage} style={{ objectFit: 'cover', height: '22rem' }} />
            )}
            <Card.Body>
                <Card.Title className="text-center mb-2">{props.movie.title}</Card.Title>
                <Card.Text className="text-center mb-3">Released: {props.movie.release_date}</Card.Text>
                <Card.Text style={{ height: '75px', overflow: 'hidden', WebkitLineClamp: '3', display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    {props.movie.overview}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button className="d-block mx-auto" variant="dark" onClick={goToMovieDetailsPage}>View Details</Button>
            </Card.Footer>
        </Card>

    );
};

export default MovieCard;


