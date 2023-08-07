import React, { useContext, useEffect } from "react";
import "../style/alert.css";
import { Context } from "../context/AppContext";

const Alert = () => {
  const { alert, setAlert } = useContext(Context);

  return (
    <div class="alert alert-warning" role="alert">
      {alert}
    </div>
  );
};

export default Alert;
