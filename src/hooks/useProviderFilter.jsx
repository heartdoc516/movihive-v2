import { useState, useEffect } from "react";
import { tmdbApiToken } from "../utils/tmdbToken";

export default function useProviderFilter(data) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const providers = [];

    data.forEach((item) => {
      fetch(`https://api.themoviedb.org/3/movie/${item.id}/watch/providers`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const results = json;
          providers.push(results);
        });
    });

    setResults(providers);
  }, [data]);

  console.log(results);
}
