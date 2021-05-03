import { Service } from 'typedi';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?q=Aarhus&appid=' + process.env.OPENWEATHER_API_KEY;


@Service()
export class WeatherService {
    public async getForecast(): Promise<string> {
        try {
            const weatherData = await axios.get(weatherEndpoint);
            const weatherDescription:string = weatherData.data.weather[0].description;
            return weatherDescription;
        }
        catch(error) {
            console.log(error);
            return 'unavailable';
        }
    }
}