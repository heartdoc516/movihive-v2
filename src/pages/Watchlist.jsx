import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../graphql/mutations.js";
import { listFavorites } from "../graphql/queries.js";

const Watchlist = () => {

  async function createFav(tmdbId, name) {
    const result = await API.graphql(
      graphqlOperation(createFavorite, {
        input: {
          name: name,
          tmdbId: tmdbId,
        },
      })
    );
    console.log(result);
  }

  async function getFavs() {
    const result = await API.graphql(graphqlOperation(listFavorites));
    console.log(result.data);
  }

  

  useEffect(() => getFavs,[]);

  return (
    <>
      <div>watchlist</div>
      <button className="btn btn-primary mt-5" onClick={() => createFav('Oppenheimer', '872585')}>create a fav</button>
    </>
  );
};

export default Watchlist;
