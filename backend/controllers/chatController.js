//Importamos el modelo
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");

//Obtener todos los chats del usuario
exports.getChats = async (req, res) => {
  try {
    //busca todos los chats que pertenezcan a ese usuario.
    const chats = await Chat.find({ userId: req.user.id }).sort({ update: -1 });
    if (!chats) {
      return res.status(401).json({ error: "chats not found" });
    }
    return res.json({ chats, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createChat = async (req, res) => {
  try {
    //obtenemos el ID del usuario
    const userId = req.user.id;
    const { title, description } = req.body;
    const chat = new Chat({
      //lo guardamos en la DB
      userId: userId,
      title: title || "New Chat",
      description,
    });
    //Guarda el chat en la base de datos
    await chat.save();
    //Devuelve un JSON con el chat recién creado y un mensaje de éxito.
    return res.status(201).json({ chat, message: "Chat created succesfully" });
  } catch (error) {
    //Si hay error, devuelve 500 con el mensaje de error.
    res.status(500).json({ error: error.message });
  }
};

exports.getChat = async (req, res) => {
  try {
    const id = req.params.id;
    const chat = await Chat.findOne({ _id: id, userId: req.user.id });
    if (!chat) {
      return res.status(401).json({ error: "chats not found" });
    }
    const Conversation = await Conversation.findOne({ chatId: id });

    const messages = Conversation
      ? Conversation.messages.filter((msg) => msg.role !== "system")
      : [];

    return res.json({
      chat,
      messages,
      message: "Conversation get succesfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const id = req.params.id;
    const chat = await Chat.findOne({ _id: id, userId: req.user.id });

    if (!chat) {
      return res.status(401).json({ error: "chats not found" });
    }

    await chat.deleteOne({ _id: id });
    await Conversation.deleteOne({ chatId: id });

    res.json({ success: true, message: "chat deleted successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
