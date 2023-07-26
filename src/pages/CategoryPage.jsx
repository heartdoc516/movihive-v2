import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/categorypage.css";

const CategoryPage = () => {
  const { idCategory } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        const categories = response.data.genres;
        const category = categories.find((c) => c.id.toString() === idCategory);
        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchCategoryName();
  }, [idCategory]);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      let page = 1;
      let movieData = [];
      while (page < 6) {
        try {
          console.log(page);
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=473032693308961b0a4d8a7cb78b0087&with_genres=${idCategory}&page=${page}`
          );
          movieData = [...movieData, ...response.data.results];
        } catch (error) {
          console.error("Une erreur s'est produite :", error);
        } finally {
          page++;
        }
      }
      setMovies(movieData);
    };

    fetchMoviesByCategory();
  }, [idCategory]);

  if (categoryName === "" || movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 py-4">
      <h2 className="overviewtext now-playing title text-white mt-5">
        {categoryName}
      </h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-6 col-md-4 col-lg-2">
            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
              <img
                className="actor-image w-100"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <h4 className="text-white fs-6 text-start mt-3">{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
