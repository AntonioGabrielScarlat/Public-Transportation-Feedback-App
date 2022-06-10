const UserDB = require("../models/User");
const bcryptjs = require("bcryptjs");

const controller = {
  addUser: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).send("Nu exista email!");
      }
      const user = await UserDB.findOne({ where: { email: req.body.email } });

      if (user) {
        res.status(409).send({
          message: "Email-ul exista, te rog introdu alt email!",
        });
      }
      try {
        const user = {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        };

        let errors = {};

        //Validari
        if (
          !user.lastName ||
          !user.firstName ||
          !user.email ||
          !user.phone ||
          !user.password
        ) {
          console.log("Nu au fost completate toate campurile!");
          errors.campuriGoale = "Nu au fost completate toate campurile!";
        } else {
          if (user.lastName.lenght < 2) {
            errors.nume =
              "Numele introdus trebuie sa contina mai mult de 2 caractere";
          }

          if (user.firstName.lenght < 2) {
            errors.prenume =
              "Prenumele introdus trebuie sa contina mai mult de 2 caractere";
          }

          if (user.phone.length != 10) {
            errors.telefon = "Numarul de telefon trebuie sa fie de 10 cifre!";
          } else if (!user.phone.match("^[0-9]+$")) {
            errors.telefon2 =
              "Numarul de telefon trebuie sa contina doar cifre!";
          }
          if (Object.keys(errors).length === 0) {
            const userCreated = await UserDB.create(user);
            res.status(200).json({
              userCreated,
              created: true,
            });
          } else {
            res.status(400).send(errors);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  },

  login: (req, res) => {
    UserDB.findOne({ where: { email: req.body.email } })
      .then((user) => {
        const { parola } = req.body;
        if (user === null) {
          res.status(401).send({
            message: "Nu exista acest cont!!",
          });
        } else {
          if (parola === user.password) {
            bcryptjs.compare(req.body.password, user.password, (result) => {
              if (result) {
                res.status(200).send({
                  message: "Te-ai autentificat cu succes!",
                  login: true,
                });
              }
            });
          } else {
            res.status(401).send({
              message: "Parola gresita!",
            });
          }
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: "A crapat serveru!",
        });
      });
  },

  updateUser: async (req, res) => {
    if (req.body.editEmail) {
      const user = await UserDB.findOne({
        where: { email: req.body.editEmail },
      });
      if (user) {
        if (
          user.firstName === req.body.firstName &&
          user.lastName === req.body.lastName &&
          user.phone === req.body.phone &&
          user.email === req.body.editEmail
        ) {
          res.status(403).send({ message: "Datele sunt deja salvate!" });
        } else {
          try {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.phone = req.body.phone;
            user.email = req.body.editEmail;
            await user.save();
            res.status(200).send({
              message: "Datele au fost salvate cu succes!",
              user: user,
            });
          } catch {
            res.status(500).send({ message: "Server error" });
          }
        }
      }
    } else {
      res.status(500).send({ message: "ceva nu merge bine!!!!" });
    }
  },

  updatePassword: async (req, res) => {
    if (req.body.email) {
      const user = await UserDB.findOne({
        where: { email: req.body.email },
      });
      if (user) {
        if (user.password === req.body.password) {
          res.status(403).send({ message: "exista deja aceasta parola!" });
        } else {
          user.password = req.body.password;
          await user.save();
          res.status(200).send({
            message: "Parola a fost schimbata cu succes!",
            user: user,
          });
        }
      } else {
        res.status(403).send({ message: "Nu exista user cu acest email!" });
      }
    } else {
      res.status(403).send({ message: "ceva nu exista mail!" });
    }
  },

  deleteUser: async (req, res) => {
    if (req.headers.email) {
      const user = await UserDB.findOne({
        where: { email: req.headers.email },
      });
      if (user) {
        try {
          await user.destroy();
          res
            .status(200)
            .send({ message: "COntul a fost dezactivat cu succes!" });
        } catch {
          res.status(500).send({ message: "Server error" });
        }
      } else {
        res.status(400).send({ message: "Nu exista userul cautat" });
      }
    } else {
      res.status(400).send({ message: "Pune-n plm emailul pe body!" });
    }
  },

  getUserByEmail: async (req, res) => {
    const email = req.headers.email;

    UserDB.findOne({ where: { email: email } })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.status(500).send(err));
  },

  getUserByID: async (req, res) => {
    UserDB.findOne({ where: { id: req.headers.id } })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.status(500).send(err));
  },

  getAllUsers: async (req, res) => {
    UserDB.findAll()
      .then((users) => res.status(200).send(users))
      .catch((err) => res.status(500).send(err));
  },
};

module.exports = controller;
