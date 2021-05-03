import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';

import chatbotController from '../src/controllers/chatbotController';

dotenv.config();
const app: express.Application = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const secret: string = process.env.SECRET as string;
app.use(session({
    secret: secret
}))

app.use('/chatbot', chatbotController);

app.listen(port, function() {
    console.log('Listening on port ' + port);
});