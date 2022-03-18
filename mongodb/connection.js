const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = client;
