import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ContentCarousel from "../components/ContentCarousel";
import "../style/categories.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=473032693308961b0a4d8a7cb78b0087"
        );
        const fetchedCategories = response.data.genres;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const moviesData = {};

        for (const category of categories) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=473032693308961b0a4d8a7cb78b0087&with_genres=${category.id}`
          );
          moviesData[category.name] = response.data.results;
        }

        setMoviesByCategory(moviesData);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchMoviesByCategory();
  }, [categories]);

  if (categories.length === 0 || Object.keys(moviesByCategory).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <div className="movies-container">
            {Array.isArray(moviesByCategory[category.name]) &&
            moviesByCategory[category.name].length > 0 ? (
              <ContentCarousel
                title={category.name}
                url={`https://api.themoviedb.org/3/discover/movie?api_key=473032693308961b0a4d8a7cb78b0087&with_genres=${category.id}`}
                type={"movie"}
              />
            ) : (
              <p>Aucun film disponible pour cette catégorie.</p>
            )}
            ,
            {moviesByCategory[category.name].length > 10 && (
              <div className="d-flex justify-content-end pe-4">
                <Link to={`/category/${category.id}`}>
                  <button className="btn btn-outline-warning text-warning py-0">
                    See All
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
