const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const port = process.env.PORT;

const app = express();
dbConnection();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/events", require("./routes/events.routes"));

app.get("*", (req, res) => {
  res.send(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
