import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import chatbotController from '../src/controllers/chatbotController';

dotenv.config();
const app: express.Application = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/chatbot', chatbotController);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});