import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { API, Auth, graphqlOperation } from "aws-amplify";
import MovieCard from "../components/MovieCard.jsx";
import "../style/watchlist.css";
import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from "../graphql/mutations.js";
import { listFavorites } from "../graphql/queries.js";
import { Context } from "../context/AppContext.jsx";
import WatchListCard from "../components/WatchListCard.jsx";

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
    <div className="watchlist-container">
      <div className="d-flex align-items-center justify-content-center gap-4">
        <h1 className={`title text-white text-center mb-0`}>{user.username}</h1>
        <button className="btn btn-danger py-0" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <h3 className="title text-white mt-3 ms-4">Your Watchlist</h3>
      <main className="border border-1 border-warning rounded-3 mx-3 p-4">
        <div className="row mx-auto">
          {favs.map((fav) => (
            <div className="col-6 col-md-3 col-lg-2">
              {" "}
              <WatchListCard
                id={fav.id}
                tmdbId={fav.tmdbId}
                contentType={fav.content_type}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
