import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

export class WeatherService {
    public async getForecast(location: string): Promise<string> {
        const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + process.env.OPENWEATHER_API_KEY;
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