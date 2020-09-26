// load env variables
require('dotenv').config();

// db
const { Client } = require("pg")
const client = new Client()
client.connect()


const getMessages = async (req, res) => {
  const client = new Client()
  client.connect()
  try {
    const { rows } = await client.query("SELECT * FROM messages;")
    res.send(rows);
  } catch (error) {
    console.log(error.stack);
  }
  client.end()
}

const postMessage = async (req, res) => {
  try {
    const client = new Client()
    client.connect()

    const { rows } = await client.query(
      "INSERT INTO messages (message) VALUES ($1) RETURNING *",
      [req.body.message]
    )

    res.send(rows);
  } catch (error) {
    console.log(error.stack);
  }
  client.end()
}

module.exports = {
  getMessages,
  postMessage
}