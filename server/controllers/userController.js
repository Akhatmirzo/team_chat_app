const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

//* POST => Register User
exports.registerUser = async (req, res) => {
  const { username, password, photo } = req.body;

  let errorMessage = "";

  if (!username || !password || !photo) {
    errorMessage = "Please provide username, password and photo";
  } else if (password.length < 8) {
    errorMessage = "Password must be at least 8 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  try {
    const foundUser = await User.find({ username }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This user has already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating new admin
    const user = new User({
      username,
      password: hashedPassword,
      photo,
    });

    await user.save();
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the admin",
      description: error,
    });
  }

  const token = jwt.sign(
    {
      username,
      role: "user",
    },
    process.env.jwt_secret_key
  );

  res.status(201).send({
    message: "User created successfully",
    token,
  });
};

//* POST => Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  let errorMessage = "";
  if (!username || !password) {
    errorMessage = "Username and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  } else if (!username) {
    return res.status(400).send({
      error: "Invalid Username",
    });
  }

  try {
    const foundUser = await User.find({ username }).exec();
    if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            username,
            role: "user",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "User successfully authenticated",
          token,
        });
      });
    } else {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      err,
    });
  }
};

// * EDIT => edit user
exports.editUser = async (req, res) => {
  const id = req.params.id;
  const { username, password, photo, newPassword } = req.body;

  if (!password) {
    return res.status(400).send({
      error: "Password is required",
    });
  }

  try {
    if (id === "me") {
      const newUserObj = {
        updateAt: Date.now()
      };

      if (username) newUserObj.username = username;
      if (photo) newUserObj.photo = photo;

      const findUser = await User.findById(req.userId);

      if (newPassword) {
        await bcrypt.compare(newPassword, findUser.password, (err, decoded) => {
          if (!decoded) {
            return res.status(400).send({
              error: "Invalid Password",
            });
          }

          const hasPassword = bcrypt.hash(newPassword, 10);
          newUserObj.password = hasPassword;
        });
      }

      await bcrypt.compare(password, findUser.password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
      })

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $set: newUserObj,
        }
      );

      if (!user) {
        return res.status(400).send({
          error: "User not found",
        });
      }

      const token = jwt.sign(
        {
          username,
          role: "user",
        },
        process.env.jwt_secret_key
      );

      return res.status(200).send({
        message: "User was updated",
        data: user,
        token,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while deleting User",
      description: error,
    });
  }
};

// * DELETE => delete user
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id == "me") {
      const user = await User.findByIdAndDelete(req.userId).exec();
      return res.status(200).send({
        message: "User was deleted",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while deleting User",
      description: error,
    });
  }
};

//* GET => Get user
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId).exec();
    return res.status(200).send({
      message: "User was found",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while getting users",
      description: error,
    });
  }
};

//* POST => Logout User
// exports.logoutUser = async (req, res) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(400).send({ error: "Token was not found" });
//   }

//   jwt.verify(
//     token,
//     process.env.jwt_secret_key,
//     async function (err, decoded) {
//       if (err) {
//         res.code(400).send({
//           error: "Invalid Token",
//         });
//       }
//     }
//   );

//   return res.status(200).send({
//     message: "User successfully logged out",
//   });
// };
