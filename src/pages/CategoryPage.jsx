import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { idCategory } = useParams();
  const [categoryName, setCategoryName] = useState('');
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
        console.error('Une erreur s\'est produite :', error);
      }
    };

    fetchCategoryName();
  }, [idCategory]);

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=473032693308961b0a4d8a7cb78b0087&with_genres=${idCategory}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Une erreur s\'est produite :', error);
      }
    };

    fetchMoviesByCategory();
  }, [idCategory]);

  if (categoryName === '' || movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      <h2 className="overviewtext now-playing title text-white">{categoryName}</h2>
      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.id} className="grid-item">
            <Link to={`/movie/${movie.id}`}>
              <img className="actor-image" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
            </Link>
            <Link to={`/movie/${movie.id}`}>
            <h2 className="overviewtextcatg now-playing title text-white">{movie.title}</h2>
               </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
