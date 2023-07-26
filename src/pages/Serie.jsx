import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
import ActorPage from "./ActorPage";
import Favorite from "../components/Favorite";
/*import "../style/movie.css"; // Ajout du fichier CSS pour les styles du film*/

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

const SeriePage = () => {
  const { serieId } = useParams();
  const [serie, setSerie] = useState(null);
  const [cast, setCast] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [trailerLink, setTrailerLink] = useState("");

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        setSerie(response.data);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/credits?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        setCast(response.data.cast.slice(0, 8));
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchBackdrops = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/images?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        setBackdrops(response.data.backdrops.slice(0, 10));
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    const fetchTrailerLink = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=473032693308961b0a4d8a7cb78b0087`
        );
        const videos = response.data.results;
        const trailer = videos.find((video) => video.type === "Trailer");

        if (trailer) {
          const trailerLink = `https://www.youtube.com/watch?v=${trailer.key}`;
          setTrailerLink(trailerLink);
        } else {
          setTrailerLink("");
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    fetchSerie();
    fetchCast();
    fetchBackdrops();
    fetchTrailerLink();
  }, [serieId]);

  if (!serie || cast.length === 0 || backdrops.length === 0) {
    return <div>Loading...</div>;
  }

  const { name, overview, poster_path, first_air_date, vote_average } = serie;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => <ul style={{ margin: "0px" }}>{dots}</ul>,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          margin: "20px 0 0 0 ",
          height: "10px",
          borderRadius: "50%",
          background: i === activeSlide ? " rgba(255, 234, 0, 0.822)" : "white",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselStyle = {
    width: "auto",
    height: "auto",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div>
      <div className="carousel" style={carouselStyle}>
        <Slider {...settings}>
          {backdrops.map((backdrop) => (
            <div key={backdrop.file_path}>
              <img
                className="actor-image"
                src={`https://image.tmdb.org/t/p/original/${backdrop.file_path}`}
                alt={backdrop.file_path}
                style={imageStyle}
              />
            </div>
          ))}
        </Slider>
      </div>
      ,
      <h2 className="overviewtext now-playing title text-white mt-4">{name}</h2>
      <p className="overviewtext text-white">
        Date de sortie : {first_air_date}
      </p>
      <p className="overviewtext text-white">Note : {vote_average}</p>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="overviewtext rounded bg-gray-transparent">
              <h2 className="text-white">Bande-annonce</h2>
            </div>
          </div>
          <div className="row">
            <div className="overview rounded bg-gray-transparent">
              {trailerLink && (
                <div className="movie-info">
                  <ReactPlayer
                    url={trailerLink}
                    controls={true}
                    width="100%"
                    height="auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="overviewtext rounded bg-gray-transparent">
              <h2 className="text-white">Synopsis</h2>
            </div>
          </div>
          <div className="row">
            <div className="overview rounded bg-gray-transparent">
              <p className="text-white">{overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cast">
        <h2 className="overviewtext text-white">Acteurs Principaux</h2>
        <div className="actor-container">
          {cast.map((actor) => (
            <div key={actor.id} className="actor-image">
              <Link to={`/ActorPage/${actor.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="now-playing title text-white">{actor.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriePage;
