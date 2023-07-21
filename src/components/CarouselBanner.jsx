import React, { useEffect, useState } from "react";
import { tmdbApiToken } from "../utils/tmdbToken.js";
import useGenres from "../hooks/useGenres.jsx";

import "../style/carouselbanner.css";

import Banner from "./Banner.jsx";

const CarouselBanner = ({ title, url, type }) => {
  const [data, setData] = useState([]);
  const genres = useGenres();
  const [activeIndicator, setActiveIndicator] = useState(0);

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
      .then((json) => {
        setData(json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, []);

  function handleSetActiveIndicator(activeIdx, direction, idxToGoTo) {
    if (direction === "next") {
      if (activeIdx === data.length - 1) {
        setActiveIndicator(0);
      } else {
        setActiveIndicator((state) => state + 1);
      }
    }
    if (direction === "prev") {
      if (activeIdx === 0) {
        setActiveIndicator(data.length - 1);
      } else {
        setActiveIndicator((state) => state - 1);
      }
    }
    if (direction === "direct") {
      setActiveIndicator(idxToGoTo);
    }
  }

  return (
    <div id="carouselExample" className="carousel-banner carousel slide">
      <h1 className="now-playing title text-white">{title}</h1>

      <div className="carousel-inner">
        {data.map((item, idx) => (
          <Banner
            item={item}
            index={idx}
            activeIndicator={activeIndicator}
            genres={genres}
            key={item.id}
            type={type}
          />
        ))}
      </div>
      <button
        className="carousel-control-prev align-items-center"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        onClick={() => handleSetActiveIndicator(activeIndicator, "prev")}
      >
        <span
          className="carousel-control-prev-icon align-bottom"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next align-items-center"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        onClick={() => handleSetActiveIndicator(activeIndicator, "next")}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className="d-flex justify-content-center gap-2 mt-3">
        {data.map((item, idx) => (
          <div
            className={`indicator ${activeIndicator === idx && "active"}`}
            onClick={() =>
              handleSetActiveIndicator(activeIndicator, "direct", idx)
            }
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselBanner;
