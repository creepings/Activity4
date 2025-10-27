import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get weather by city name' })
  @ApiQuery({ name: 'city', required: true, description: 'City name' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns temperature and weather condition',
    schema: {
      example: {
        city: 'London',
        temperature: 15.5,
        condition: 'Cloudy',
        description: 'overcast clouds'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'City parameter is required' })
  @ApiResponse({ status: 404, description: 'City not found' })
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new Error('City parameter is required');
    }
    return await this.weatherService.getWeatherByCity(city);
  }
}