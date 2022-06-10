import NavBar from "../../components/NavBar";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import index from "../index";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const { email } = router.query;
  const idUser = router.query.id
    ? parseInt(router.query.id)
    : parseInt(router.query.data);
  console.log(idUser);
  const [data, setData] = useState({
    id: "",
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (email) {
      try {
        axios
          .get("http://localhost:8000/api/user/getUserByEmail", {
            headers: {
              email: email,
            },
          })
          .then((res) => {
            console.log(res.data);
            const user = res.data;
            // console.log(user);
            const { id, firstName, lastName, email, phone, password } = user;
            // console.log(id);
            const newData = {
              id,
              firstName,
              lastName,
              email,
              phone,
              password,
            };
            setData(newData);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (err) {
        console.error(err.response.data);
      }
    } else {
      try {
        axios
          .get("http://localhost:8000/api/user/getUserByID", {
            headers: {
              id: idUser,
            },
          })
          .then((res) => {
            console.log(res.data);
            const user = res.data;
            // console.log(user);
            const { id, firstName, lastName, email, phone, password } = user;
            // console.log(id);
            const newData = {
              id,
              firstName,
              lastName,
              email,
              phone,
              password,
            };
            setData(newData);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (err) {
        console.error(err.response.data);
      }
    }
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/user/deleteUser",
        {
          headers: {
            email: email,
          },
        }
      );
      if (response) {
        router.push({
          pathname: "/",
          as: "/",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="profile">
      <NavBar data={data} />
      <div className="main">
        <div className="container">
          <h1 className="title-profile">Date Personale</h1>
          <div className="name-container">
            <div className="firstName">
              <h2>Nume</h2>
              <p>{data.firstName}</p>
            </div>
            <div className="lastName">
              <h2>Prenume</h2>
              <p>{data.lastName}</p>
            </div>
          </div>
          <div className="phone-container">
            <h2>Numar de telefon</h2>
            <p>{data.phone}</p>
          </div>
          <div className="email-container">
            <h2>Email</h2>
            <p>{data.email}</p>
          </div>
          <div className="btn-container">
            <button type="submit" className="delete-btn" onClick={handleDelete}>
              Dezactivare cont
            </button>
            <Link href={{ pathname: "../edit/edit", query: { id: data.id } }}>
              <button type="submit" className="edit-btn">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
