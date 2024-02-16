const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({ message: "Im up and running" });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Posts Created ...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "jaeson",
    email: "jaeson@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];

    // 2. Check if header exists:
    if (!bearerHeader) {
      // Handle missing header gracefully:
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing authorization header" });
    }

    // 3. Extract token with array destructuring:
    const [bearer, token] = bearerHeader.split(" ");

    // 5. Attach token to request object if valid:
    req.token = token;
    next();
  } catch (error) {
    // Handle generic errors appropriately:
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

app.use("/api/users", require("./routes/api/users"));

app.listen(3000, () => {
  console.log("Port 3000");
});
