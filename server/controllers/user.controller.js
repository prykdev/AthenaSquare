// Importing File Dependencies
const { controllerBoilerPlate, controllerResponse } = require('../utils/controller.utils.js');
const userService = require('../services/user.service.js');
const { checkExist, signToken, hashPassword, validateUser, checkPassword } = require('../utils/user.utils.js');
const ControllerError = require('../errors/controller.error.js');
const { checkAllSocials } = require('../utils/common.utils.js');

module.exports = {

  // Creating User
  createUser: ('/signup', controllerBoilerPlate(async (req) => {
    // Checking if user social handles are valid or not
    checkAllSocials(req.body.socials);
    // Hashing password for securely storing in database
    req.body.password = hashPassword(req.body.password);
    // Creating User
    let data = await userService.create(req.body);
    // Creating JWT Token for user
    token = signToken(data._id);
    // Updating token in database
    data = await userService.updateById(data._id, { token });
    return controllerResponse(201, 'Successful', { token });
  })),

  // Editing User
  editUser: ('/edit', controllerBoilerPlate(async (req) => {
    // Checking if user social handles are valid or not
    checkAllSocials(req.body.socials);
    // Updating data in database
    const data = await userService.updateById(req.user._id, req.body);
    return controllerResponse(204, 'Successful');
  })),

  // Viewing User Profile
  profile: ('/profile', controllerBoilerPlate(async (req) => {
    const data = await checkExist('_id', req.id);
    let response = (({ name, username, email, socials }) => ({ name, username, email, socials }))(data);
    return controllerResponse(200, 'Successful', response);
  })),

  // Logging in User
  login: ('/login', controllerBoilerPlate(async (req) => {
    const data = await validateUser(req.body);
    return controllerResponse(200, 'Successful', { token: data.token });
  })),

  // Checking if user exists
  check: ('/check', controllerBoilerPlate(async (req) => {
    data = await checkExist(req.body.entity, req.body.value);
    if (data)
      return controllerResponse(400, req.body.entity + ' already registered!');
    return controllerResponse(200, req.body.entity + ' available!');
  })),

  // Changing User Password
  changePassword: ('/password', controllerBoilerPlate(async (req) => {
    // Checking if old password is correct
    const isPasswordValid = checkPassword(req.body.currentPassword, req.user.password);
    if (!isPasswordValid)
      throw new ControllerError(401, 'Invalid Password!');
    // Hashing password for securely storing in database
    password = hashPassword(req.body.newPassword);
    // Creating new JWT Token for user
    token = signToken(req.user._id);
    const data = await userService.updateById(req.user._id, { password, token });
    return controllerResponse(201, 'Successful', { token });
  })),
};