// require all dependencies
const express = require("express");
const path = require('path');
const app = express();

app.use('/src',express.static(path.join(__dirname, 'src')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));

//set up the template engine
app.set("views", "./views");
app.set("view engine", "pug");


// get response for '/'
app.get("/", (req, res) => {
  res.render("layout");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
