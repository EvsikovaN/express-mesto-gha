const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send({ foo: "Hello" });
// });

// app.post("/", (req, res) => {
//   res.send(req.body);
// });

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();