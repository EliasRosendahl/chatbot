import dotenv from 'dotenv';
import { WeatherService } from '../services/weatherService';
import { DistanceService } from './distanceService';
import { StockService } from './stockService';

dotenv.config();

const weatherService: WeatherService = new WeatherService();
const distanceService: DistanceService = new DistanceService();
const stockService: StockService = new StockService();

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2021-05-03',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_API_KEY,
    }),
    serviceUrl: 'https://api.eu-de.assistant.watson.cloud.ibm.com',
});

export class ChatbotService {
    private async postMessage(dialog: string, sessionId: string): Promise<[string, any]> {
        const response = await assistant.message({
            assistantId: process.env.ASSISTANT_ID,
            sessionId: sessionId,
            input: {
              'message_type': 'text',
              'text': dialog,
            }
        });

        const text = response.result.output.generic[0].text;
        const intents = response.result.output.intents;

        return [text, intents];
    }

    public async createSession(): Promise<string> {
        const watsonSession = await assistant.createSession({
            assistantId: process.env.ASSISTANT_ID
        });

        return watsonSession.result.session_id;
    }

    public async dialog(dialog: string, sessionId: string): Promise<string> {
        let values = await this.postMessage(dialog, sessionId);
        let text = values[0];
        const intents = values[1];

        if (!intents || intents.length == 0) {
            return text;
        }
        const intent = intents[0].intent;

        if (intent == 'Products_stock') {

            const stock = stockService.getStock();
            for (const item in stock) {
                const quantity = stock[item];
                text = text + item + ": " + quantity + '\n'
            }
        }

        else if (intent == 'Collect_location' && text.includes('weather')) {
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