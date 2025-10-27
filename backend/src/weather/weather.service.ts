import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,


  ) {
        const key = this.configService.get<string>('OPENWEATHER_API_KEY');
    if (!key) {
        throw new Error('OPENWEATHER_API_KEY is not defined in .env file');
    }
    this.apiKey = key;
  }

  async getWeatherByCity(city: string) {
    try {
      const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
      
      const response = await firstValueFrom(
        this.httpService.get(url)
      );

      const data = response.data;

      // Return simplified weather information
      return {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather.main,
        description: data.weather.description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error fetching weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}