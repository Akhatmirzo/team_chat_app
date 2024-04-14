const dotenv = require("dotenv");
dotenv.config();
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
fastify.register(cors);
fastify.register(multipart);
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "ChatApp API",
      description: "This is my Chat Application",
      version: "0.0.0",
    },
    tags: [
      { name: "API", description: "Test related end-points" },
      { name: "User", description: "Super User related end-points" },
      { name: "Messages", description: "Message related end-points" },
    ],
  },
});

const mongoose = require("mongoose");

fastify.get("/", { schema: { tags: ["API"] } }, (req, res) => {
  res.send("Server Mavjud");
});

fastify.register(require("./routes/userRoutes"), {
  prefix: "/api/user",
});
fastify.register(require("./routes/messageRoutes"), {
  prefix: "/api/message",
});

//* Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Global db connected");
});

fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
