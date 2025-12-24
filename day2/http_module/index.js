// http = it is used to create http servers and make http requests
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("My name is Aditya");
  } else if (req.url == "/about") {
    res.end("I am 21 year Old");
  } else {
    res.end("Bad request");
  }
});

server.listen(5000, () => {
  console.log("Server is running on PORT 5000");
});
