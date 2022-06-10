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

const yourFeedback = () => {
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
            .get("http://localhost:8000/api/feedback/feedbackForOneUser", {
              headers: {
                id: id,
              },
            })
            .then((res) => {
              const feedbacks = res.data;
              setFeedbacksData(feedbacks);
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

  //console.log(feedbacksData);

  let feedbackList = [];

  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/feedback/deleteFeedback",
        {
          headers: {
            id: id,
          },
        }
      );
      if (response.data) {
        // feedbacksData.find((item) => (item.id = id)).delete();
        toast.success("Feedback-ul a fost sters cu succes!");
        const feedbacksDataNew = feedbacksData;
        feedbacksDataNew.splice(index, 1);
        setFeedbacksData(feedbacksDataNew);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.message);
    }
  };

  const handleEdit = async (e, idFeedback) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/feedback/findFeedbackByID",
        {
          headers: {
            id: idFeedback,
          },
        }
      );

      console.log(response.data.id);
      if (response.data) {
        router.push({
          pathname: "../editFeedback/editFeedback",
          query: {
            id: response.data.id,
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  feedbacksData.map((feedback, index) => {
    const dataT = feedback.DEPARTURE_TIME.split("T");
    const time = dataT[1].split(":00");

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
            Nume: {data.lastName + " " + data.firstName}
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
        >
          <CardActions>
            <Button
              size="small"
              sx={{
                backgroundColor: "red",
                color: "white",
                padding: 1,
                ":hover": {
                  backgroundColor: "#b30000", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={(e) => {
                handleDelete(e, feedback.id, index);
              }}
            >
              Stergere feedback
            </Button>
            <Button
              size="small"
              sx={{
                backgroundColor: "#00b300",
                color: "white",
                padding: 1,
                ":hover": {
                  backgroundColor: "green", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={(e) => {
                handleEdit(e, feedback.id);
              }}
            >
              Editare feedback
            </Button>
          </CardActions>
        </CardContent>
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

export default yourFeedback;
