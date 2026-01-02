const express = require("express");
const version = require("./middlewares/versioning");
const hateoas = require('./middlewares/hateoas');
const format = require('./middlewares/format')

const app = express();

app.use(express.json());

app.use(version);
app.use(hateoas);
app.use(format)

app.use("/v1", require("./routes/v1/game"));

app.listen(process.env.PORT, () => {
  console.log(`Ca marche sur ${process.env.PORT}`);
});