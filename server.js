const express = require("express");
const example = require("./middlewares/versioning");
const exampleWithOptions = require("./middlewares/language");

const app = express();

app.use(express.json());

app.use(example);
app.use(exampleWithOptions());

app.use(require("./routes/tasks"));
app.use(require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});