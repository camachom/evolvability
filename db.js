// load env variables
require('dotenv').config();

// db
const { Client } = require("pg")

const allMessages = () => {
  return [
    "SELECT * FROM messages"
  ]
};
const messagesByDate = (count) => {
  return [
    "SELECT * FROM messages LIMIT $1",
    [count]
  ]
}

const getMessages = async (req, res) => {
  let query = "SELECT * FROM messages";
  const arguments = [];
  if (req.query.start) {
    query += ` WHERE timestamp >= ($${arguments.length + 1})`;
    arguments.push(req.query.start);
  }
  if (req.query.count) {
    query += ` LIMIT ($${arguments.length + 1})`;
    arguments.push(req.query.count);
  }

  const client = new Client()
  client.connect()

  try {
    const { rows } = await client.query(query, arguments)
    res.send(rows);
  } catch (error) {
    console.log(error.stack);
  }
  client.end()
}

const postMessage = async (req, res) => {
  const client = new Client()
  client.connect()

  try {
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

const replyMessage = async (req, res) => {
  const client = new Client()
  client.connect()
  try {
    const newMessage = await client.query("INSERT INTO messages (message, parent_id) VALUES ($1, $2) RETURNING *", [req.body.message, req.params.id])
    if (req.query.replies) {
      const { rows } = await client.query("SELECT * FROM messages WHERE parent_id = $1 OR id = $1", [req.params.id])
      res.send([...newMessage.rows, ...rows])
      return;
    }

    res.send(newMessage.rows)

  } catch (error) {
    console.log(error.stack);
    res.send(error)
  }
  client.end()
}

module.exports = {
  getMessages,
  postMessage,
  replyMessage
}