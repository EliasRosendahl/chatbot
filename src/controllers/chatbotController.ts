import { Router } from 'express';
import Container from 'typedi';

import { ChatbotService } from '../services/chatbotService';

const router = Router();
const chatbotService: ChatbotService = new ChatbotService();

router.get('/', async(req, res) => {
    res.send('Welcome to the chatbot');
});

router.post('/', async(req, res) => {
    const chatQuestion: string = req.body.dialog;
    const chatResponse = await chatbotService.dialog(chatQuestion);
    
    res.send(chatResponse);
});


export default router;