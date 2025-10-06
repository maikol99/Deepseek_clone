const { generateStreamResponse } = require("../aiProvider/deepseek-ai");
const Conversation = require("../models/Conversation");

exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    if (!message || !message.content) {
      return res.status(400).json({ error: "message content is required" });
    }

    const chat = await chat.findOne({
      _id: chatId,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(401).json({ error: "chats not found" });
    }

    let Conversation = await Conversation.findOne({ chatId });

    if (!Conversation) {
      Conversation = new Conversation({
        chatId,
        messages: [],
      });
    }

    //add user message to conversation
    const userMessages = {
      role: "user",
      content: message.content,
    };
    Conversation.messages.push(userMessages);

    chat.updateAt = Date.now();
    await chat.save();

    await Conversation.save();

    res.setHeader("Content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    //generative asistante response

    let assistantResponse = "";
    try {
      assistantResponse = await generateStreamResponse(
        Conversation.messages,
        (chunk) => {
          res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
        }
      );

      const titleMatch = assistantResponse.match(/\[TITLE:\s*(.*?)\]/i);
      const cleanResponse = assistantResponse.replace((/\[TITLE:\s*(.*?)\]/i, "")).trim();

      Conversation.message.push({
        role: "assistant",
        content: cleanResponse,
      });

      await Conversation.save();
      //if its the first assistant response, extract title
      if ((chat.title = "New Chat")) {
        const assistantMessages = Conversation.messages.filter(
          (msg) => msg.role === "ass"
        );
        if (assistantMessages.length === 1) {
          if (titleMatch) {
            chat.title = titleMatch[1].trim();
            await chat.save();
          }
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      console.error("Error generating response:", error);
      res.write(`data: ${JSON.stringify({error:"failed to generate response"})}\n\n`);
    }
  } catch (error) {
    console.log('error in conversation api', error)
    res.status(500).json({ error: error.message });

  }
};


exports.getConversation = async(req,res) => {
  try {
    const {chatId} = req.params;
    const chat = await chat.findOne({
      _id: chatId,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(401).json({ error: "chats not found" });
    }
      const Conversation = await Conversation.findOne({ chatId });
      if(!Conversation){
        return res.status(404).json({error:"Consversation not found"})
      }

      const messages = Conversation.messages.filter((msg) => msg.role !== "system")
      res.json({messages})
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}