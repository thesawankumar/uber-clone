const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !lastname || !email || !password)
    return { error: "Missing required fields" };

  const user =userModel.create({
    fullname: { firstname, lastname },
    email,
    password,
  });
  return user;
};
