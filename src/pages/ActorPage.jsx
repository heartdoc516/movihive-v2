import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, Link } from "react-router-dom";
import "../style/actorpage.css";

const ActorPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        setActor(response.data);

        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        const movies = movieResponse.data.cast;

        const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity);
        const topThreeMovies = sortedMovies.slice(0, 6);

        setTopMovies(topThreeMovies);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchActor();
  }, [actorId]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  const { name, profile_path, birthday, place_of_birth, biography } = actor;

  // Récupérer les 300 premiers caractères de la biographie
  const truncatedBiography = biography.substring(0, 300);

  // Gérer le clic sur le bouton "Voir plus"
  const handleSeeMoreClick = () => {
    setShowFullBiography(true);
  };

  // Définir les paramètres du carrousel directement dans le composant
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="actor-page">
      <h2 className="overviewtext now-playing title text-white">{name}</h2>
      <p className="overviewtext text-white">Date de naissance : {birthday}</p>
      <p className="overviewtext text-white">
        Pays d'origine : {place_of_birth}
      </p>
      <div className="d-flex justify-content-center">
        <img
          src={`https://image.tmdb.org/t/p/w300/${profile_path}`}
          alt={name}
          className=""
        />
      </div>

      <div className="actor-page-container">
        <div className="movies">
          <h2 className="overviewtext text-white">
            Les films populaires de {name}
          </h2>
          <Slider {...settings}>
            {topMovies.map((movie) => (
              <div key={movie.id} className="movie">
                <Link to={`/movie/${movie.id}`}>
                  <div className="movie-content">
                    <img
                      className="actor-image"
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <p className="text-white">{movie.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="biography-container">
          <h2 className="overviewtext text-white">Biographie</h2>
          <p className="text-white w-75 mx-auto">
            {showFullBiography ? biography : truncatedBiography}
            {!showFullBiography && (
              <button className="see-more-button" onClick={handleSeeMoreClick}>
                Voir plus
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
