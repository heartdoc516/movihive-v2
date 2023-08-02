import { useEffect, useState, useContext } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../graphql/mutations.js";
import { listFavorites } from "../graphql/queries.js";
import { Context } from "../context/AppContext.jsx";

const Watchlist = () => {
  const [favs, setFavs] = useState([]);
  const { user, setUser } = useContext(Context);

  async function getFavs() {
    try {
      const result = await API.graphql(graphqlOperation(listFavorites));
      setFavs(result.data.listFavorites.items);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  useEffect(() => getFavs, []);

  return (
    <div className="mt-5 mx-5">
      <h3 className={`text-white ms-3 mb-3`}>Your Watchlist</h3>
      <div className="grid gap-3 grid-container">
        {favs.map((fav) => (
          <div className="grid-item mt-0 d-flex justify-content-center align-items-center text-white">
            {fav.tmdbId}
          </div>
        ))}
      </div>
      <button className="btn btn-danger" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default Watchlist;
