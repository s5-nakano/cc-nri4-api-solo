const server = require("./server");


const app = server();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
