import Favorite from "./Favorite.jsx";
import GenreTags from "./GenreTags";
import useProviders from "../hooks/useProviders.jsx";
import "../style/banner.css";

const Banner = ({ item, index, activeIndicator, genres, type }) => {
  const providers = useProviders(item.id, type);

  return (
    <div className={`carousel-item ${index === activeIndicator && "active"}`}>
      <div className="img-container">
        <img
          src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
          className="d-block"
          alt="..."
        />

        <div className="text-block">
          <h2 className="title text-white">
            {item.original_title || item.name}
          </h2>

          <div className="d-none mt-3 d-sm-flex">
            {<GenreTags genreIds={item.genre_ids} genres={genres} />}
          </div>
          <div className="mt-3">
            {providers.map((provider) => {
              return (
                <img
                  src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="provider-logo ms-2"
                ></img>
              );
            })}
          </div>
          <div className="mt-3">
            <button className="trailer-button btn me-2">Watch Trailer</button>
            <Favorite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
