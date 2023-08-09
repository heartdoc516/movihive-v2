import React, { useContext, useEffect, useState } from "react";
import "../style/alert.css";
import { Context } from "../context/AppContext";

const Alert = () => {
  const { alert, setAlert } = useContext(Context);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (alert) {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
      }, 3000);
    }
  }, [alert]);

  if (display) {
    return (
      <div class="alert alert-warning py-2" role="alert">
        {alert}
      </div>
    );
  }
};

export default Alert;
