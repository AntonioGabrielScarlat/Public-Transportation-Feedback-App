import NavBar from "../../components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";

const allFeedbacks = () => {
  const router = useRouter();
  const id = parseInt(router.query.data);
  const [data, setData] = useState({
    id: "",
    nume: "",
    prenume: "",
    telefon: "",
    email: "",
    password: "",
  });

  const [feedbacksData, setFeedbacksData] = useState([]);
  const [Users, setUsers] = useState([]);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/user/getUserByID", {
          headers: {
            id: id,
          },
        })
        .then((res) => {
          const user = res.data;
          const { id, firstName, lastName, email, phone, password } = user;
          const newData = {
            id,
            firstName,
            lastName,
            email,
            phone,
            password,
          };
          setData(newData);

          axios
            .get("http://localhost:8000/api/feedback/findAllFeedback")
            .then((res) => {
              const feedbacks = res.data;
              setFeedbacksData(feedbacks);
              axios
                .get("http://localhost:8000/api/user/getAllUsers")
                .then((res) => {
                  const users = res.data;
                  setUsers(users);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.response);
    }
  }, []);

  //   console.log(data);
  //   console.log(feedbacksData);
  // console.log(Users);

  Users.forEach((user) => {
    feedbacksData.forEach((feedback) => {
      console.log(feedback);
      if (user.id === feedback.ID_USER) {
        feedback["firstName"] = user.firstName;
        feedback["lastName"] = user.lastName;
      }
    });
  });

  let feedbackList = [];

  feedbacksData.map((feedback, index) => {
    const dataT = feedback.DEPARTURE_TIME.split("T");
    const time = dataT[1].split(":00");

    // console.log(user);
    feedbackList.push(
      <Card
        key={index}
        sx={{ maxWidth: "90%", margin: "auto", marginTop: "10px" }}
      >
        <CardContent sx={{ display: "flex" }}>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Nume: {feedback.lastName + " " + feedback.firstName}
          </Typography>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Ruta: {feedback.STARTING_POINT + " - " + feedback.FINISHING_POINT}
          </Typography>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Mijloc de transport: {feedback.TRANSPORT_MEAN}
          </Typography>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Data calatoriei: {dataT[0] + " " + time[0]}
          </Typography>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Durata: {feedback.DURATION}
          </Typography>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Nivelul de aglomerare: {feedback.CONGESTION_LEVEL}
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "-30px",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Observatii:
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            {feedback.OBSERVATIONS}
          </Typography>
        </CardContent>

        <CardContent sx={{ display: "flex" }}>
          <Typography
            sx={{ fontSize: 14, margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Nivel de satisfacrie: {feedback.SATISFACTION_LEVEL}/10
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></CardContent>
      </Card>
    );
  });

  return (
    <div>
      <NavBar data={data} />
      {feedbackList}
      <ToastContainer />
    </div>
  );
};

export default allFeedbacks;
