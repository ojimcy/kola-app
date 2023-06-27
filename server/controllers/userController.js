const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.json({ msg: "Username already taken", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already taken", status: false });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex)
  }
};

module.exports = {
  register,
};
