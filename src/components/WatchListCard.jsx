import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tmdbApiToken } from "../utils/tmdbToken";
import { API, graphqlOperation } from "aws-amplify";
import { deleteFavorite } from "../graphql/mutations";

const WatchListCard = ({ id, tmdbId, contentType }) => {
  const [data, setData] = useState([]);

  async function removeFav() {
    const result = await API.graphql(
      graphqlOperation(deleteFavorite, {
        input: {
          id: id,
        },
      })
    );
    window.location.reload();
    console.log(result);
  }

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/${contentType}/${tmdbId}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbApiToken}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("error:" + err));
  });

  return (
    <div className="w-100 movie-card position-relative">
      <Link
        to={contentType === "movie" ? `/movie/${tmdbId}` : `/serie/${tmdbId}`}
        className="text-decoration-none"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt=""
          className="w-100"
        />
        <h6 className="text-white text-center mt-3">
          {contentType === "tv" ? data.name : data.title}
        </h6>
      </Link>
      <button
        className="btn btn-danger py-0 d-block mx-auto"
        onClick={removeFav}
      >
        Remove
      </button>
    </div>
  );
};

export default WatchListCard;
