const express = require("express");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

const workRouter = express.Router({ mergeParams: true });
const MODEL_TYPE = "work";

// routes using 'workId' as parameter
workRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById(MODEL_TYPE, id);

  if (!work || work.id !== req.minionId) {
    return res.sendStatus(400);
  }

  req.workId = id;
  next();
});

workRouter
  .get("/", (req, res) => {
    const works = getAllFromDatabase(MODEL_TYPE);
    const workAssignedToMinion = works.filter(
      (work) => work.minionId === req.minionId
    );
    res.json(workAssignedToMinion);
  })
  .post("/", (req, res) => {
    const newWork = addToDatabase(MODEL_TYPE, req.body);
    res.status(201).json(newWork);
  })
  .put("/:workId", (req, res) => {
    const updatedWork = updateInstanceInDatabase(MODEL_TYPE, req.body);
    res.status(200).json(updatedWork);
  })
  .delete("/:workId", (req, res) => {
    deleteFromDatabasebyId(MODEL_TYPE, req.workId);
    res.status(204).send();
  });

module.exports = workRouter;
