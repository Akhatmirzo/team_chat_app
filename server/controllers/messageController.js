const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

exports.sendMessage = async (req, res) => {
  const text = req.body.text;
  const id = req.userId;

  if (!text) {
    return res.status(400).send({
      error: "Malumotlar Xatoligi! Message Text not found",
    });
  }

  const findUser = await User.findById(id);

  if (!findUser) {
    return res.status(400).send({
      error: "User not found",
    });
  }

  const message = new Message({
    text,
    user: {...findUser},
  });

  await message.save();

  return res.status(201).send({
    message: "Message sent successfully",
  });
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().exec();

    if (messages.length > 0) {
      return res
        .code(200)
        .send({ message: "Messages were found", messages: [...messages] });
    }

    return res.code(200).send({ message: "There are no messages" });
  } catch (error) {
    return res.code(500).send({ message: error });
  }
};

exports.deleteMessage = (req, res) => {
  const id = req.params.id;
  Message.findByIdAndDelete(id, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(200).send({ message: "Message deleted successfully" });
};

exports.updateMessage = (req, res) => {
  const id = req.params.id;
  const text = req.body.text;

  Message.findByIdAndUpdate(id, { text }, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(200).send({ message: "Message updated successfully" });
};

exports.getMessageById = async (req, res) => {
  const id = req.params.id;
  const messageOne = await Message.findById(id, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
  });

  return res.status(200).send({ message: "Message found", messageOne });
};
