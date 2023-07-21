import React from "react";
import "../style/genretags.css";

const GenreTags = ({ genreIds, genres }) => {
  const contentGenres = getGenreNames(genreIds, genres);

  return (
    <div className="genre-tags d-flex align-items-center">
      {contentGenres.map((genre, idx) => (
        <>
          {idx < 2 && (
            <>
              {idx > 0 && <span className="text-white pb-2 ps-1 pe-1">.</span>}
              <div className="genre">{genre}</div>
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default GenreTags;

function getGenreNames(genreIdArray, genres) {
  let genreNames = [];
  genres.forEach((genre) => {
    if (genreIdArray.includes(genre.id)) {
      genreNames.push(genre.name);
    }
  });
  return genreNames;
}
