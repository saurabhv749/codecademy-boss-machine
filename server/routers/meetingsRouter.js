const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("../db");

const meetingsRouter = express.Router();
const MODEL_TYPE = "meetings";

meetingsRouter
  .get("/", (req, res) => {
    const meetings = getAllFromDatabase(MODEL_TYPE);
    res.json(meetings);
  })
  .post("/", (req, res) => {
    let newMeeting = createMeeting();
    newMeeting = addToDatabase(MODEL_TYPE, newMeeting);
    res.status(201).json(newMeeting);
  })
  .delete("/", (req, res) => {
    deleteAllFromDatabase(MODEL_TYPE);
    res.status(204).send();
  });

module.exports = meetingsRouter;
