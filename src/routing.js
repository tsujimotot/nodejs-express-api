const middle = require("./middlewares");
const path = require("path");

exports.defineRoute = (redis, app, express) => {

  app.set("view engine", "ejs");

  app.get("/", (req, res, next) => middle.root(req, res, next));
  app.get("/user/:id", async(req, res, next) => await middle.getUserById(redis, req, res, next));
  app.get("/users", async(req, res, next) => await middle.getAllUsers(redis, req, res, next));
  
  app.use("/static", express.static(path.join(__dirname, "public")));

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
};
