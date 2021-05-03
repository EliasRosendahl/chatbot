import { Service } from 'typedi';
import dotenv from 'dotenv';
import { WeatherService } from '../services/weatherService';

dotenv.config();

const weatherService: WeatherService = new WeatherService();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2021-05-03',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
});

assistant.createSession({
    assistantId: process.env.ASSISTANT_ID
  })
    .then((res: { result: any; }) => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch((err: any) => {
      console.log(err);
    });


@Service()
export class ChatbotService {
    public async dialog(question: string): Promise<string> {
        const response = await assistant.messageStateless({
            assistantId: process.env.ASSISTANT_ID,
            input: {
              'message_type': 'text',
              'text': question,
            }
        });

        const responseOutput = response.result.output;

        const intent = responseOutput.intents[0].intent;
        let text = responseOutput.generic[0].text;

        if (intent == 'Store_weather') {
            const forecast = await weatherService.getForecast();
            text += forecast;
        }

        return text;
    }
}