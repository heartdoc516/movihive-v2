import React, { useContext } from "react";
import VerificationInput from "react-verification-input";
import "../style/confirmSignupForm.css";
import { Hub } from "aws-amplify";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/AppContext";
import Spinner from "./Spinner.jsx";

const ConfirmSignupForm = ({ setUser, username }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);

  async function confirmSignUp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      listenToAutoSignInEvent();
    } catch (error) {
      setError(error.message);
      console.log("error confirming sign up", error);
      setLoading(false);
    }
  }

  function listenToAutoSignInEvent() {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        const user = payload.data;
        // assign user
        setUser(user);

        navigate("/");
        setLoading(false);
      } else if (event === "autoSignIn_failure") {
        // redirect to sign in page
        navigate("/auth");
        console.log(event);
        setLoading(false);
      }
    });
  }

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <form
        className="confirm-signup-form d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => confirmSignUp(e)}
      >
        <h3 className="fs-5 text-center mb-3">
          We sent you a confirmation code, check your email.
        </h3>
        <VerificationInput
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
          }}
          onChange={(value) => setCode(value)}
        />

        <p className="text-danger mt-4">{error}</p>

        <input type="submit" name="submit" value="Verify" />
      </form>
    );
  }
};

export default ConfirmSignupForm;
