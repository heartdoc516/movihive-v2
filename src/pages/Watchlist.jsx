import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../graphql/mutations.js";
import { listFavorites } from "../graphql/queries.js";

const Watchlist = () => {

const [favs, setFavs] = useState([]);


 

  async function getFavs() {
    const result = await API.graphql(graphqlOperation(listFavorites));
    setFavs(result.data.listFavorites.items);

  }




  useEffect(() => getFavs,[]);

  return (
    <div className="mt-5 mx-5">
      <h3
        className={`text-white ms-3 mb-3`}
      >
        Your Watchlist
      </h3>
      <div className="grid gap-3 grid-container">
        {favs.map((fav) => (
          <div className="grid-item mt-0 d-flex justify-content-center align-items-center text-white">
            {fav.tmdbId}
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default Watchlist;
