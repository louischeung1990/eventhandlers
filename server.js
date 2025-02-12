const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//socket.io imports
const server = require('http').createServer(app);
let io = require('./io')
io.attach(server)

require("dotenv").config();
require("./config/database");
require('dotenv').config();
require('./config/database');
require('./config/passport');

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser());
app.use(session({
  secret: 'EventHandlers',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));



app.use(require('./routes/stripe'));
app.use("/api/users", require("./routes/users"));

/*--------------------------AUTHORIZATION BELOW THIS LINE -------------------------------*/

app.use(require("./config/auth"));

app.use("/api/packages", require("./routes/packages"));

/*--------------------------AUTHORIZATION ABOVE THIS LINE -------------------------------*/
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
