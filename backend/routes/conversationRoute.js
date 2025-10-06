const express = require('express');
const {sendMessage,getConversation} = require('../controllers/conversationController')
const authMiddleware = require('../middleware/AuthMiddleware')



const router= express.Router();

//aply middleware para todas las rutas
router.use(authMiddleware)


//send a messages to get ai response in stream
router.post('/:chatId/messages',sendMessage);


//get Conversations
router.get('/:chatId',getConversation)


module.exports = router;