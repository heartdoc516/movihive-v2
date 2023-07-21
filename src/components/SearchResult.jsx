import React from "react";
import { Film } from "react-feather";
import { Link } from "react-router-dom";

const SearchResult = ({ content, type }) => {
  const imgPath =
    type === "person" ? content.profile_path : content.poster_path;

  const linkUrl = {
    movie: `/movie/${content.id}`,
    tv: `/serie/${content.id}`,
    person: `/actorPage/${content.id}`,
  };

  if (imgPath === null) {
    return <Film size={30} color="gold" />;
  } else {
    return (
      <Link to={linkUrl[type]} className="search-result">
        <img
          src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
          alt=""
          className="w-100"
        />
        {type === "person" && (
          <>
            <h5 className="text-white">{content.name}</h5>
            <p className="text-white-50">{content.known_for_department}</p>
          </>
        )}
      </Link>
    );
  }
};

export default SearchResult;
