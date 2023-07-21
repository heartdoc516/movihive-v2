import { useState, useEffect } from "react";
import { tmdbApiToken } from "../utils/tmdbToken";

export default function useProviders(id, type) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `
          https://api.themoviedb.org/3/${type}/${id}/watch/providers`;

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
        if (json.results.CA.flatrate) {
          setData(json.results.CA.flatrate);
        }
      })
      .catch((err) => console.error("error:" + err));
  }, [id]);

  return data;
}
