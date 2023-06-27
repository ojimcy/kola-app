const { register, login, setAvatar, getUsers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/set-avatar/:id", setAvatar)
router.get("/users/:id", getUsers)

module.exports = router;
