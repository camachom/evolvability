const { getMessages, postMessage, replyMessage } = require("./db")
// server code
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

app.get("/message", async (req, res, next) => {
  try {
    getMessages(req, res);
  } catch (error) {
    console.log(error);
  }
})

app.post("/message", (req, res, next) => {
  try {
    postMessage(req, res);
  } catch (error) {
    console.log(error);
  }
})

app.post("/message/:id", (req, res, next) => {
  try {
    replyMessage(req, res);
  } catch (error) {
    console.log(error);
  }
})


app.listen(3001, () => {
  console.log("listing on port 3001")
})