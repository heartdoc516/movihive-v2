import React from "react";
import "../style/spinner.css";

const Spinner = ({ className }) => {
  return (
    <div
      className={`spinner-container d-flex justify-content-center align-items-center ${className}`}
    >
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
