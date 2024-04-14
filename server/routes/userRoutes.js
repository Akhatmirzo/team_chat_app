const { registerUser, loginUser, editUser, deleteUser, getUsers } = require("../controllers/userController");
const auth = require("../middlewares/auth");

function userRoutes(fastify, options, done) {
  //* Register user
  fastify.post("/register", {
    schema: {
      tags: ["user"],
    },
    handler: registerUser,
  });

  //* Login user
  fastify.post("/login", {
    schema: {
      tags: ["user"],
    },
    handler: loginUser,
  });

  //* edit user
  fastify.put("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["user"],
    },
    handler: editUser,
  });

  //* delete user
  fastify.delete("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["user"],
    },
    handler: deleteUser,
  });

  //* get user
  fastify.get("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["user"],
    },
    handler: getUsers,
  });

  done();
}

module.exports = userRoutes;

















