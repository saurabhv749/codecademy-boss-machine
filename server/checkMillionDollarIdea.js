const ONE_MILLION = 1000000;

const checkMillionDollarIdea = (req, res, next) => {
  try {
    const { weeklyRevenue, numWeeks } = req.body;
    if (!weeklyRevenue || !numWeeks) {
      throw new Error("weeklyRevenue and numWeeks are required");
    }
    const ideaWorth = Number(weeklyRevenue) * Number(numWeeks);
    if (isNaN(ideaWorth)) {
      throw new Error("numWeeks and weeklyRevenue must be valid numbers");
    }
    if (ideaWorth < ONE_MILLION) {
      throw new Error("This idea isn't worth more than one million dollars");
    }
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
