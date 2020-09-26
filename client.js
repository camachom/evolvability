const axios = require("axios").default

const getMessages = async () => {
  const { data } = await axios.get("http://localhost:3001/message")
  console.log('data', data);
}

const postMessage = async (message) => {
  const { data } = await axios.post("http://localhost:3001/message", {
    message
  })

  console.log('data', data);
}

getMessages()
// postMessage("hello there")