const express = require("express");
const example = require("./middlewares/versioning");
//const exampleWithOptions = require("./middlewares/language");

const app = express();

app.use(express.json());

app.use(example);
//app.use(exampleWithOptions());

//app.use(require("./routes/user"));
app.use("/v1", require("./routes/v1/game"));

app.listen(process.env.PORT, () => {
  console.log(`Ca marche sur ${process.env.PORT}`);
});