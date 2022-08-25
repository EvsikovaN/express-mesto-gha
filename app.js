const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send({ foo: "Hello" });
// });

// app.post("/", (req, res) => {
//   res.send(req.body);
// });

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
