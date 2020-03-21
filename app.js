const mongoose = require('mongoose');
const express = require("express");
const app = express();
const path = require("path");
const db = require('./config/keys').mongoURI;
const passport = require('passport');
const users = require("./routes/api/users");
const households = require("./routes/api/households");
const chores = require("./routes/api/chores");
const bills = require("./routes/api/bills");
const events = require("./routes/api/events");
const bodyParser = require('body-parser')

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/households", households);

app.use("/api/chores", chores);
app.use("/api/bills", bills);
app.use("/api/events", events);
