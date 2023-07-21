import { useState, useEffect } from "react";
import { tmdbApiToken } from "../utils/tmdbToken.js";

const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
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
        setGenres(json.genres);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  return genres;
};

export default useGenres;
