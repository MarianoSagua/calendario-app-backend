const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const port = process.env.PORT || 3000;

const app = express();
dbConnection();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/events", require("./routes/events.routes"));

// app.get("*", (req, res) => {
//   res.send(__dirname + "/public/index.html");
// });

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express</title>
      </head>
      <body>
        <h1>Calendar Backend</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
