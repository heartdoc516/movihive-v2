import Favorite from "./Favorite.jsx";
import GenreTags from "./GenreTags";
import useProviders from "../hooks/useProviders.jsx";
import { Link } from "react-router-dom";
import "../style/banner.css";
import { tmdbApiToken } from "../utils/tmdbToken.js";

const Banner = ({ item, index, activeIndicator, genres, type }) => {
  const providers = useProviders(item.id, type);

  const handleTrailer = (id) => {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbApiToken}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        const trailer = json.results.find((video) => video.type === "Trailer");
        console.log(trailer);
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      })
      .catch((err) => console.error("error:" + err));
  };

  return (
    <div className={`carousel-item ${index === activeIndicator && "active"}`}>
      <div className="img-container">
        <img
          src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
          className="d-block"
          alt="..."
        />

        <div className="text-block ">
          <Link
            to={`/${type === "tv" ? "serie" : "movie"}/${item.id}`}
            className="text-decoration-none"
          >
            <h2 className="title text-white">
              {item.original_title || item.name}
            </h2>

            <div className="d-none mt-3 d-sm-flex">
              {<GenreTags genreIds={item.genre_ids} genres={genres} />}
            </div>
          </Link>

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
            <button
              className="trailer-button btn me-2"
              onClick={() => handleTrailer(item.id)}
            >
              Watch Trailer
            </button>
            <Favorite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
