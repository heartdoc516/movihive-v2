import React, { useState, useContext } from "react";
import { LoadingContext } from "../context/AppContext";
import Spinner from "./Spinner.jsx";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "../style/authform.css";
const AuthForm = ({
  setUser,
  authForm,
  setAuthForm,
  username,
  setUsername,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  email,
  setEmail,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { loading, setLoading } = useContext(LoadingContext);

  async function signUp(e) {
    e.preventDefault();
    if (passwordConfirmation !== password) {
      setError("Passwords do not match");
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setLoading(true);

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
      setAuthForm("Confirm");
    } catch (error) {
      setError(error.message);
      console.log("error signing up:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setUser(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log("error signing in", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <form
        onSubmit={(e) => {
          if (authForm === "Register") {
            signUp(e);
          } else if (authForm === "Log in") {
            signIn(e);
          }
        }}
        className="auth-form"
      >
        <h1 className="title text-center mb-4">MOVIHIVE</h1>

        <h3 id="logo" className="text-white fs-4 mb-4">
          {authForm}
        </h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Type in your username.."
          required
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        {authForm === "Register" && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type in your email.."
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </>
        )}

        <>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password.."
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </>

        {authForm === "Register" && (
          <>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Re-enter your password.."
              required
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
          </>
        )}

        <p className="text-danger">{error}</p>

        {authForm === "Log in" && (
          <button className="forgot" href="#">
            Forgot Password?
          </button>
        )}

        <button
          className="register"
          onClick={() => {
            if (authForm === "Register") {
              setAuthForm("Log in");
            } else if (authForm === "Log in") {
              setAuthForm("Register");
            }
            setError("");
          }}
          type="button"
        >
          {authForm === "Log in" && "Register"}
          {authForm === "Register" && "Log in"}
        </button>

        <input
          type="submit"
          name="submit"
          value={
            authForm === "Register" || authForm === "Log in"
              ? authForm
              : "Send Verification Code"
          }
        />
      </form>
    );
  }
};

export default AuthForm;
