const express = require("express");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

const minionsRouter = express.Router();
const workRouter = require("./minionsWorkRouter");

const MODEL_TYPE = "minions";

// routes using 'minionId' as parameter
minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById(MODEL_TYPE, id);
  if (!minion) {
    return res.sendStatus(404);
  }
  req.minionId = id;
  req.minion = minion;
  next();
});

minionsRouter
  .get("/", (req, res) => {
    const minions = getAllFromDatabase(MODEL_TYPE);
    res.json(minions);
  })
  .post("/", (req, res) => {
    const newMinion = addToDatabase(MODEL_TYPE, req.body);
    res.status(201).json(newMinion);
  })
  .get("/:minionId", (req, res) => {
    res.json(req.minion);
  })
  .put("/:minionId", (req, res) => {
    const updatedMinion = updateInstanceInDatabase(MODEL_TYPE, req.body);
    res.status(200).json(updatedMinion);
  })
  .delete("/:minionId", (req, res) => {
    deleteFromDatabasebyId(MODEL_TYPE, req.minionId);
    res.status(204).send();
  })
  .use("/:minionId/work", workRouter);

module.exports = minionsRouter;
