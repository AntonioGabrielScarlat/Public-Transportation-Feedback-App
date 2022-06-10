import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [parola, setParola] = useState("");
  const [confirmareParola, setConfirmareParola] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lastName === "") {
      toast.error("Vă rugăm să vă completați numele!");
      return;
    }

    if (firstName === "") {
      toast.error("Vă rugăm să vă completați prenumele!");
      return;
    }

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

    if (!telefon.match("^[0-9+]{10}$")) {
      toast.error("Numărul de telefon nu este scris corect!");
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
      lastName,
      firstName,
      email,
      phone: telefon,
      password: parola,
    };
    console.log(formValues);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/addUser",
        formValues
      );
      if (response.data && response.data.created) {
        router.push({
          pathname: "../profile/profile",
          query: {
            email: email,
          },
        });
      }
    } catch (err) {
      console.warn(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="title">Inregistrare</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Nume"
            name="nume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Nume</label>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            placeholder="Prenume"
            name="prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Prenume</label>
        </div>

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
            type="number"
            placeholder="Numar de telefon"
            name="telefon"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Numar de telefon</label>
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

        <div className="inputContainer">
          <input
            type="password"
            placeholder="Confirma parola"
            name="confirmare-parola"
            value={confirmareParola}
            onChange={(e) => setConfirmareParola(e.target.value)}
            className="register-input"
          />
          <label className="register-label">Confirmati parola</label>
        </div>
        <div className="loginBtns">
          <input
            type="submit"
            value="Inregistreaza-te"
            className="submit-btn-login"
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
