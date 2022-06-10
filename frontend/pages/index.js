import React, { useContext, useState, Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, withRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = {
      email,
      parola,
    };
    //console.log(formValues);
    try {
      if (email === "") {
        toast.error("Introduceti email-ul!");
        return;
      }

      if (
        !/([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/g.test(
          email
        )
      ) {
        toast.error("Formatul email-ului nu este valid!");
        return;
      }

      if (parola === "") {
        toast.error("Introduceti parola!");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formValues
      );
      //console.log(response);

      if (response.data && response.data.login === true) {
        router.push({
          pathname: "./profile/profile",
          // as: "/profile",
          query: {
            email: email,
          },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.warn(err);
    }
  };

  return (
    <div className="login">
      <form className="container">
        <h1 className="title">Bine ai venit!</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Email</label>
        </div>
        <div className="inputContainer">
          <input
            type="password"
            placeholder="Introduceti parola"
            name="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Introduceti parola</label>
        </div>
        <div className="loginBtns">
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-btn-login"
          >
            Login
          </button>
          <Link href="./register/register" as="/register">
            <button type="submit" className="submit-btn-login">
              Creare cont
            </button>
          </Link>
        </div>
        <div className="loginBtns">
          <Link href="./resetPassword/resetPassword" as="/resetPassword">
            <button type="submit" className="submit-btn-reset">
              Ai uitat parola? Apasa aici
            </button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
