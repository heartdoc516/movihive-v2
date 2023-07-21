import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const SearchResults = ({ type, query }) => {
  const resultsType = {
    movie: "Movies",
    tv: "TV",
    person: "People",
  };

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZjNTcxMzZmNzEyMjlhMTY3NTVlNTRmZTc5YmE3ZCIsInN1YiI6IjY0OGM5ZWIwMDc2Y2U4MDBlNzQzOTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9lCZhB2s6M6hSUyJUsuKeWKY4V3R2_KwMTgtapE5lGE",
      },
    };
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        fetch(url, options)
          .then((res) => res.json())
          .then((json) => {
            setData(json.results);
            setPage(json.page);
            setTotalPages(json.total_pages);
          })
          .catch((err) => console.error("error:" + err));
      }, 700)
    );
  }, [type, query]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&include_adult=false&language=en&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZjNTcxMzZmNzEyMjlhMTY3NTVlNTRmZTc5YmE3ZCIsInN1YiI6IjY0OGM5ZWIwMDc2Y2U4MDBlNzQzOTc5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9lCZhB2s6M6hSUyJUsuKeWKY4V3R2_KwMTgtapE5lGE",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData([...data, ...json.results]))
      .catch((err) => console.error("error:" + err));
  }, [page]);

  return (
    <div className="mt-5 mx-5">
      <h3
        className={`text-white ms-3 mb-3 ${data.length === 0 ? "d-none" : ""}`}
      >
        {resultsType[type]}
      </h3>
      <div className="grid gap-3 grid-container">
        {data.map((content) => (
          <div className="grid-item mt-0 d-flex justify-content-center align-items-center">
            <SearchResult
              content={content}
              type={type}
              key={content.id}
            ></SearchResult>
          </div>
        ))}
        <button
          className={`next-button btn w-100 ${
            data.length === 0 || page === totalPages ? "d-none" : ""
          }`}
          onClick={() => setPage(page + 1)}
        >
          More Results
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
