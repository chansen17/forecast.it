import axios from 'axios';

// api url
const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "c9ffccd2551ea97ee07f1e349d4c8589"


export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY
        }
    });

    return data;
}