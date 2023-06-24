import { useParams } from "react-router-dom";
import MovieSearchList from "../components/moviesearchlist/MovieSearchList";

function MovieSearch() {
    //Get query param from route pathname
    const { query } = useParams();

    return (
        <MovieSearchList query={query} />
    )
}
export default MovieSearch