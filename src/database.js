
const { defineRoute } = require("./routing.js");

const insertTestData = async (redis) => {
  // この方法では、ユーザー数が増えると一括取得した際にレスポンスも増える遅くなる
  // await Promise.all([
  //   redis.set("users:1", JSON.stringify({ id: 1, name: "alpha" })),
  //   redis.set("users:2", JSON.stringify({ id: 2, name: "bravo" })),
  //   redis.set("users:3", JSON.stringify({ id: 3, name: "charlie" })),
  //   redis.set("users:4", JSON.stringify({ id: 3, name: "delta" })),
  // ]);

  // ユーザー情報をリスト型に変更する
  await redis.rpush("users:list", JSON.stringify({ id: 1, name: "alpha" }));
  await redis.rpush("users:list", JSON.stringify({ id: 2, name: "bravo" }));
  await redis.rpush("users:list", JSON.stringify({ id: 3, name: "charlie" }));
  await redis.rpush("users:list", JSON.stringify({ id: 4, name: "delta" }));
};

exports.defineDatabase = (redis, app, express) => {

  redis.once("ready", async () => {
    try {
      await insertTestData(redis);
      defineRoute(redis, app, express)
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

  redis.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
};
