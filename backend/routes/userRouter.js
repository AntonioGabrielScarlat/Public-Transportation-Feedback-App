const userController = require("../controllers/user");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.get("/getUserByEmail", userController.getUserByEmail);
userRouter.get("/getUserByID", userController.getUserByID);
userRouter.get("/getAllUsers", userController.getAllUsers);
userRouter.delete("/deleteUser", userController.deleteUser);
userRouter.patch("/updateUser", userController.updateUser);
userRouter.patch("/updatePassword", userController.updatePassword);

module.exports = userRouter;
