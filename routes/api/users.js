const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let users = require("../../Users");

//Get All User
router.get("/", (req, res) => {
  return res.json(users);
});

//Get by ID
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    return res.json(
      users.filter((user) => user.id === parseInt(req.params.id))
    );
  } else {
    return res.sendStatus(400);
  }
});

//Create a New User
router.post("/", (req, res) => {
  const newUser = { id: uuid.v4(), name: req.body.name, email: req.body.email };

  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }

  users.push(newUser);
  res.json(users);
});

//Update User
router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updatedUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.email = updatedUser.email ? updatedUser.email : user.email;
        return res.json({ msg: "User Updated", user });
      }
    });
  } else {
    return res.sendStatus(400);
  }
});

//Delete User
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id == req.params.id);

  if (found) {
    users = users.filter((user) => user.id != req.params.id);
    return res.json({ msg: "User Deleted", users });
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
