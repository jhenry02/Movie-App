import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetailsCard from '../components/moviedetailscard/MovieDetailsCard';
import ActorList from '../components/actorlist/ActorList';
import RecommendationList from '../components/recommendationlist/RecommendationList';

function MovieDetails(props) {
  //Set states and important variables
  const { id } = useParams();
  const navigate = useNavigate();
  let [movieID, setMovieID] = useState(id);
  let [history, setHistory] = useState([]);
  let [loading, setLoading] = useState(false);

  //Go back to search results page
  function goBackToSearchResults() {
    let lastPath = sessionStorage.getItem('lastPath');
    navigate(lastPath);
  }

  //Go back to previous movie viewed
  function goToPreviousMovie(history) {
    console.log(history);
    setHistory(history.slice(0, -1));
    setMovieID(history[history.length - 1]);
    navigate(`/movies/${history[history.length - 1]}`,{ replace: true })
  }

  return (
    <>
      {/*Navigation Buttons*/}
      {!loading && (
        <div className="text-center mt-3">
          <button className="btn btn-dark me-1" onClick={goBackToSearchResults}>Go Back To Search Results</button>
          {history && history.length > 0 && (<button className="btn btn-dark me-1" onClick={() => goToPreviousMovie(history)}>View Previous</button>)}
        </div>
      )}


      {/*Show this while the request is loading*/}
      {/*If at least one of the loadingStates are true, then this should show*/}
      {loading && (
        <h4 className='loading-info text-center my-2'>Please wait...</h4>
      )}

      {/*Main content*/}
      <MovieDetailsCard movieID={movieID} setLoading={setLoading} />
      <ActorList movieID={movieID} setLoading={setLoading} />
      <RecommendationList setLoading={setLoading} setMovieID={setMovieID} setHistory={setHistory} movieID={movieID} history={history} />

    </>
  );
}

export default MovieDetails;
