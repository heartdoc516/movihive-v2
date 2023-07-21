import { useEffect, useState } from "react";
import "../style/searchpage.css";
import { Search } from "react-feather";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/trending/all/day";
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
      .then((json) => setData(json.results))
      .catch((err) => console.error("error:" + err));
  });

  return (
    <section className="search-page">
      <form className="d-flex mt-5 mx-auto px-4 py-2" role="search">
        <input
          className="bg-transparent text-white border-0 flex-fill"
          type=""
          placeholder="Search Movies, Series, Actors..."
          aria-label="Search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
      <div className="mx-auto w-50 d-flex gap-3 justify-content-center flex-wrap mt-5">
        {data.map((item) => (
          <div className="text-white-50">{item.title}</div>
        ))}
      </div>

      <main className="search-results">
        <SearchResults type={"movie"} query={searchQuery} />
        <SearchResults type={"tv"} query={searchQuery} />
        <SearchResults type={"person"} query={searchQuery} />
      </main>
    </section>
  );
};

export default SearchPage;
