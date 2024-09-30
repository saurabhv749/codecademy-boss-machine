const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./routers/minionsRouter");
const ideasRouter = require("./routers/ideasRouter");
const meetingsRouter = require("./routers/meetingsRouter");

apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
