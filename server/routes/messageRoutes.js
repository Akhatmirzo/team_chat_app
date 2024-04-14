const {getAllMessages, sendMessage, deleteMessage, updateMessage, getMessageById} = require("../controllers/messageController");
const auth = require("../middlewares/auth");

function messageRoutes(fastify, options, done) {
  //* Send message
  fastify.post("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["message"],
    },
    handler: sendMessage,
  });
  //* Get message
  fastify.get("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["message"],
    },
    handler: getMessageById,
  });
  //* Get all messages
  fastify.get("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["message"],
    },
    handler: getAllMessages,
  });
  //* Delete message
  fastify.delete("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["message"],
    },
    handler: deleteMessage,
  });
  //* Update message
  fastify.put("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["message"],
    },
    handler: updateMessage,
  });

  done();
}

module.exports = messageRoutes;