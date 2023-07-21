import React from "react";
import "../style/mobilemenu.css";
import Navlink from "./Navlink";
import { Star, User, Search } from "react-feather";
import { Link } from "react-router-dom";

const MobileMenu = ({ user, setMenuDisplay }) => {
  return (
    <div className="mobile-menu d-flex d-lg-none flex-column justify-content-start align-items-start-center gap-3">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4 mb-5">
        <Link
          to="search"
          className="d-flex justify-content-center align-items-center"
          onClick={() => setMenuDisplay(false)}
        >
          <Search color="gold" size={20} />
        </Link>

        {user ? (
          <Link
            to="/watchlist"
            className="watchlist d-flex justify-content-between align-items-center"
            onClick={() => setMenuDisplay(false)}
          >
            <User color="gold" size={20} />
          </Link>
        ) : (
          <Link
            to="/auth"
            className="login-link"
            onClick={() => setMenuDisplay(false)}
          >
            <div>Log In</div>
          </Link>
        )}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-3">
        <Navlink name="Movies" slug="/" setMenuDisplay={setMenuDisplay} />
        <Navlink name="TV" slug="tv" setMenuDisplay={setMenuDisplay} />
        <Navlink
          name="Categories"
          slug="categories"
          setMenuDisplay={setMenuDisplay}
        />
        <Navlink name="About" slug="about" setMenuDisplay={setMenuDisplay} />
      </div>
      <div className="mobile-menu-footer" onClick={() => setMenuDisplay(false)}>
        <div className="movihive title text-center fs-1">MOVIHIVE</div>
        <div className="coded-by text-center">
          Coded by Francis Plante @2023
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
