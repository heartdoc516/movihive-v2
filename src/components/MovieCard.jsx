import { Link } from "react-router-dom";
import "../style/moviecard.css";

const MovieCard = ({ item, genres, type }) => {
  return (
    <Link to={type === "movie" ? `/movie/${item.id}` : `/serie/${item.id}`}>
      <div className="w-100 movie-card position-relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt=""
          className="w-100 pb-5"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
