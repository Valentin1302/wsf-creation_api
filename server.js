const express = require("express");
const example = require("./middlewares/versioning");
const exampleWithOptions = require("./middlewares/language");
const hateoas = require('./middlewares/hateoas');

const app = express();

app.use(express.json());

app.use(example);
app.use(hateoas);

app.use("/v1", require("./routes/v1/game"));

app.listen(process.env.PORT, () => {
  console.log(`Ca marche sur ${process.env.PORT}`);
});