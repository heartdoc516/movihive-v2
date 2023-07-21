import React from "react";
import CarouselBanner from "../components/CarouselBanner.jsx";
import ContentCarousel from "../components/ContentCarousel.jsx";

const Movies = () => {
  return (
    <>
      <CarouselBanner
        title={"Now Playing"}
        url={
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        }
        type={"movie"}
      />
      ;
      <ContentCarousel
        title={"Popular Movies"}
        url={"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"}
        type={"movie"}
      />
      <ContentCarousel
        title={"Popular Series"}
        url={"https://api.themoviedb.org/3/tv/popular"}
        type={"movie"}
      />
      <ContentCarousel
        title={"Trending This Week"}
        url={"https://api.themoviedb.org/3/trending/all/week"}
        type={"movie"}
      />
    </>
  );
};

export default Movies;
