// Importing File Dependencies
const { controllerBoilerPlate, controllerResponse } = require('../utils/controller.utils.js');
const { checkExist } = require('../utils/user.utils.js');
const userService = require('../services/user.service.js');
const ControllerError = require('../errors/controller.error.js');
const voteService = require('../services/vote.service.js');

module.exports = {

  // Upvoting a user
  upvote: ('/upvote/:username', controllerBoilerPlate(async (req) => {
    const { username } = req.params;
    const data = await checkExist("username", username);
    if (!data)
      throw new ControllerError(404, "User not found!");
    let rating = 1;
    const check = await voteService.search({ voter: req.user._id, user: data._id });
    if (check[0]) {
      if (check[0].status === 1) throw new ControllerError(409, "Already upvoted!");
      else if (check[0].status === -1) rating = 2;
    }
    const vote = await voteService.create({ voter: req.user._id, user: data._id }, { $set: { status: 1 } });
    const updateUserA = await userService.updateById(data._id, { $addToSet: { votes: vote._id }, $inc: { rating } });
    return controllerResponse(201, 'Successful');
  })),

  // Downvoting a user
  downvote: ('/downvote/:username', controllerBoilerPlate(async (req) => {
    const { username } = req.params;
    const data = await checkExist("username", username);
    if (!data)
      throw new ControllerError(404, "User not found!");

    let rating = -1;
    const check = await voteService.search({ voter: req.user._id, user: data._id });
    if (check[0]) {
      if (check[0].status === -1) throw new ControllerError(409, "Already upvoted!");
      if (check[0].status === 1) rating = -2;
    }
    const vote = await voteService.create({ voter: req.user._id, user: data._id }, { $set: { status: 1 } });
    const updateUserA = await userService.updateById(data._id, { $addToSet: { votes: vote._id }, $inc: { rating } });
    return controllerResponse(201, 'Successful');
  })),

  remove: ('/removevote/:username', controllerBoilerPlate(async (req) => {
    const { username } = req.params;
    const data = await checkExist("username", username);
    if (!data)
      throw new ControllerError(404, "User not found!");

    const check = await voteService.search({ voter: req.user._id, user: data._id, status: 0 });
    if (JSON.stringify(check) !== "[]") throw new ControllerError(409, "Vote already removed!");

    const vote = await voteService.delete({ voter: req.user._id, user: data._id });
    if (!vote)
      throw new ControllerError(404, "Not voted!");

    const user = await userService.updateById(data._id, { $pull: { votes: vote._id }, $inc: { rating: vote.status } });
    return controllerResponse(201, 'Successful');
  })),

  getVoteLogs: (['/voteLogs'], controllerBoilerPlate(async (req) => {
    const voteLogs = await voteService.search({ user: req.user._id });
    return controllerResponse(200, voteLogs);
  })),

};