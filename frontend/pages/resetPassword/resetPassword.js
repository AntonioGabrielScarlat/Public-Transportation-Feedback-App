import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditFeedback() {
  const router = useRouter();
  const [parola, setParola] = useState("");
  const [confirmareParola, setConfirmareParola] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Vă rugăm să vă completați email-ul!");
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
      toast.error("Alegeți o parolă!");
      return;
    }

    if (parola.length < 6) {
      toast.error("Alegeți o parolă mai lungă!");
      return;
    }

    if (confirmareParola !== parola) {
      toast.error("Parolele nu se potrivesc!");
      return;
    }

    const formValues = {
      email,
      password: parola,
    };

    try {
      const response = await axios.patch(
        "http://localhost:8000/api/user/updatePassword",
        formValues
      );
      if (response) {
        router.push({
          pathname: "/",
        });
      }
    } catch (err) {
      console.warn(err);
      toast.error(err.response.message);
    }
  };

  return (
    <div className="addFeedback">
      <div className="main">
        <form className="container" onSubmit={handleSubmit}>
          <h1 className="title">Schimbare parola!</h1>
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
              placeholder="Punct de plecare"
              name="Punct de plecare"
              value={parola}
              onChange={(e) => setParola(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Parola noua</label>
          </div>

          <div className="inputContainer">
            <input
              type="password"
              placeholder="Punct de sosire"
              name="Punct de sosire"
              value={confirmareParola}
              onChange={(e) => setConfirmareParola(e.target.value)}
              className="register-input"
            />
            <label className="register-label">Confirmare parola noua</label>
          </div>
          <div className="loginBtns">
            <input
              type="submit"
              value="Schimba parola"
              className="submit-btn-login"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
