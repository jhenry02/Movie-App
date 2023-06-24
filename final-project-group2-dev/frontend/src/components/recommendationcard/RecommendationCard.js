import emptyImage from '../../images/no-image-available.jpg';
import { useNavigate } from 'react-router-dom';

function RecommendationCard(props) {

    //Set states and important variables
    const navigate = useNavigate()

    return (
        <div className="d-flex flex-column border border-gray h-100 mx-1 recommendation-link" onClick={() => {
            console.log(props.history);
            let historyCopy = [...props.history];
            historyCopy.push(props.movieID);
            props.setHistory(historyCopy);
            props.setMovieID(props.movie.id);
            window.scroll(0, 0);
            navigate(`/movies/${props.movie.id}`,{ replace: true })
        }}>
            {/*For the source we're using, actor images come in 278x185 px sizes.*/}
            {props.movie.poster_path ? (
                <img alt="..." src={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`}
                    style={{ objectFit: 'cover', height: 'calc(278px * 0.7)', width: 'calc(185px * 0.7)' }} />
            ) : (
                <img alt="..." src={emptyImage} style={{ objectFit: 'cover', height: 'calc(278px * 0.7)', width: 'calc(185px * 0.7)' }} />
            )}
            <div style={{ maxWidth: 'calc(185px * 0.7)' }}
            >
                <h6 className="text-center text-wrap">{props.movie.title}</h6>
            </div>
        </div>
    );
};

export default RecommendationCard;