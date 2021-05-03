import { Service } from 'typedi';
import dotenv from 'dotenv';
import { WeatherService } from '../services/weatherService';
import { DistanceService } from './distanceService';
import { ShopsService } from './shopsService';

dotenv.config();

const weatherService: WeatherService = new WeatherService();
const distanceService: DistanceService = new DistanceService();

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
    public async createSession(): Promise<string> {
        const watsonSession = await assistant.createSession({
            assistantId: process.env.ASSISTANT_ID
        });

        return watsonSession.result.session_id;
    }

    public async dialog(dialog: string, sessionId: string): Promise<string> {
        const response = await assistant.message({
            assistantId: process.env.ASSISTANT_ID,
            sessionId: sessionId,
            input: {
              'message_type': 'text',
              'text': dialog,
            }
        });

        const responseOutput = response.result.output;
        let text = responseOutput.generic[0].text;
        
        if (!responseOutput.intents[0]) {
            return text;
        }
        
        const intent = responseOutput.intents[0].intent;

        if (intent == 'Collect_location' && text.includes('weather')) {
            const location = dialog;
            const closestShop = await distanceService.findClosestShop(location);
            const forecast = await weatherService.getForecast(closestShop);
            text += forecast;
        }

        else if (intent == 'Collect_location' && text.includes('closest')) {
            const location = dialog;
            const closestShop = await distanceService.findClosestShop(location);

            text += closestShop;
        }

        return text;
    }
}