import React, { useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";
import About from "./pages/About.jsx";
import Movie from "./pages/Movie.jsx";
import ActorPage from "./pages/ActorPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Movies from "./pages/Movies.jsx";
import Serie from "./pages/Serie.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import Tv from "./pages/Tv.jsx";
import Navbar from "./components/Navbar.jsx";
import Search from "./pages/Search.jsx";
import AuthPage from "./pages/AuthPage.jsx";


import { LoadingContextProvider } from "./context/AppContext.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <LoadingContextProvider>
      <div className="App">
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/ActorPage/:actorId" element={<ActorPage />} />
          <Route path="/serie/:serieId" element={<Serie />} />
          <Route path="/watchlist" element={user ? <Watchlist /> : <Movies />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/auth"
            element={<AuthPage user={user} setUser={setUser} />}
          />
         <Route path="/category/:idCategory" element={<CategoryPage />} />
        </Routes>
      </div>
    </LoadingContextProvider>
  );
}

export default App;
