const express = require("express");
const userRouter = require("./userRouter");
const feedbackRouter = require("./feedbackRouter");
const dbRouter = require("./dbRouter");
const router = express.Router();

router.use("/user", userRouter);
router.use("/feedback", feedbackRouter);
router.use("/", dbRouter);

module.exports = router;
