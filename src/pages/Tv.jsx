import React from "react";
import CarouselBanner from "../components/CarouselBanner.jsx";
import ContentCarousel from "../components/ContentCarousel.jsx";

const Tv = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  let currentDate = `${year}-${month}-${day}`;

  return (
    <>
      <CarouselBanner
        title={"Airing This Month"}
        url={`https://api.themoviedb.org/3/discover/tv?air_date.gte=${currentDate}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=CA&with_origin_country=US`}
        type={"tv"}
      />
      ;
      <ContentCarousel
        title={"Popular"}
        url={
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=CA&with_origin_country=US"
        }
        type={"tv"}
      />
      <ContentCarousel
        title={"Trending"}
        url={`https://api.themoviedb.org/3/trending/tv/week`}
        type={"tv"}
      />
      <ContentCarousel
        title={"Top Rated"}
        url={"https://api.themoviedb.org/3/tv/top_rated"}
        type={"tv"}
      />
    </>
  );
};

export default Tv;
