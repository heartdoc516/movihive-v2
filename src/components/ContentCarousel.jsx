import React, { useEffect, useState } from "react";
import useGenres from "../hooks/useGenres.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbApiToken } from "../utils/tmdbToken.js";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import "../style/contentcarousel.css";

import { Pagination, Navigation, Virtual } from "swiper/modules";
import MovieCard from "./MovieCard.jsx";

const ContentCarousel = ({ title, url, type }) => {
  const [data, setData] = useState([]);
  const genres = useGenres();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbApiToken}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.results))
      .catch((err) => console.error("error:" + err));
  }, []);

  return (
    <>
      <h3 className="title text-white mt-3 ms-4">{title}</h3>
      <Swiper
        virtual
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation, Virtual]}
        className="content-carousel"
      >
        {data.map((item, index) => (
          <SwiperSlide key={item.id} virtualIndex={index}>
            <MovieCard item={item} genres={genres} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ContentCarousel;
