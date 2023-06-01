const path = require("path");

exports.root = (req, res, next) => {
  res.render(path.join(__dirname, "views", "index.ejs"));
};

exports.getUserById = async (redis, req, res, next) => {
  const key = `users:${req.params.id}`;
  const value = await redis.get(key);
  const user = JSON.parse(value);
  res.status(200).json(user);
};

exports.getAllUsers = async (redis, req, res, next) => {
  // try {
  //   const stream = redis.scanStream({
  //     match: "users:*",
  //     count: 2,
  //   });

  //   const users = [];
  //   for await (const resultKeys of stream) {
  //     for (const key of resultKeys) {
  //       const value = await redis.get(key);
  //       const user = JSON.parse(value);
  //       users.push(user);
  //     }
  //   }

  //   res.status(200).json(users);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Internal Server Error");

  // }

  // 以下offsetを使用し、一回あたりの取得上限を設ける
  try {
    const offset = req.query.offset ? Number(req.query.offset) : 0;
    const usersList = await redis.lrange("users:list", offset, offset + 1);

    const users = usersList.map((user) => JSON.parse(user));
    //res.status(200).json(users);

    res.render(path.join(__dirname, "views", "users.ejs"), { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
