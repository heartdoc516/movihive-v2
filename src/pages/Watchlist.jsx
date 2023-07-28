import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../graphql/mutations.js";
import { listFavorites } from "../graphql/queries.js";

const Watchlist = () => {
  async function createFav() {
    const result = await API.graphql(
      graphqlOperation(createFavorite, {
        input: {
          name: "two",
          tmdbId: "sdfg",
        },
      })
    );
    console.log(result);
  }

  async function getFavs() {
    const result = await API.graphql(graphqlOperation(listFavorites));
    console.log(result);
  }

  // createFav();
  getFavs();

  //authorization rules ??  https://docs.amplify.aws/cli/graphql/authorization-rules/

  return (
    <>
      <div>watchlist</div>
    </>
  );
};

export default Watchlist;
