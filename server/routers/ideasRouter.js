const express = require("express");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

const ideasRouter = express.Router();
const MODEL_TYPE = "ideas";

// routes using 'ideaId ' as parameter
ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById(MODEL_TYPE, id);
  if (!idea) {
    return res.sendStatus(404);
  }
  req.ideaId = id;
  req.idea = idea;
  next();
});

ideasRouter
  .get("/", (req, res) => {
    const ideas = getAllFromDatabase(MODEL_TYPE);
    res.json(ideas);
  })
  .post("/", checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase(MODEL_TYPE, req.body);
    res.status(201).json(newIdea);
  })
  .get("/:ideaId", (req, res) => {
    res.json(req.idea);
  })
  .put("/:ideaId", checkMillionDollarIdea, (req, res) => {
    const updatedIdea = updateInstanceInDatabase(MODEL_TYPE, req.body);
    res.status(200).json(updatedIdea);
  })
  .delete("/:ideaId", (req, res) => {
    deleteFromDatabasebyId(MODEL_TYPE, req.ideaId);
    res.status(204).send();
  });

module.exports = ideasRouter;
