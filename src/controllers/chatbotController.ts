import { Router } from 'express';
import Container from 'typedi';

import { ChatbotService } from '../services/chatbotService';

declare module "express-session" {
    interface Session {
        sessionId: string;
    }
}

const router = Router();
const chatbotService: ChatbotService = new ChatbotService();

router.get('/', async(req, res) => {
    res.send('Welcome to the chatbot');
});

router.post('/', async(req, res) => {
    let sessionId: string = req.session.sessionId;

    if (!sessionId) {
        sessionId = await chatbotService.createSession();
        req.session.sessionId = sessionId;
    }

    const chatQuestion: string = req.body.dialog;
    const chatResponse = await chatbotService.dialog(chatQuestion, sessionId);
    
    res.send(chatResponse);
});


export default router;