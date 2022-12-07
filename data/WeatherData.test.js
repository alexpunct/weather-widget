import { expect, jest } from '@jest/globals'
import { WeatherData } from './WeatherData'

// Mocking the 'Cache' class
jest.mock('../helpers/Cache.js', () => {
  return {
    LocalStorage: {
      set: jest.fn(),
      get: jest.fn(),
    },
  }
})

// Create a mock implementation for the URL class
jest.mock('url', () => ({
  URL: jest.fn(() => ({
    searchParams: {
      get: jest.fn(() => 'API_KEY'),
    },
  })),
}))

// Mocking the 'fetch' function
global.fetch = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({
      json: () => {
        return {
          cod: 200,
          name: 'Test City',
          main: {
            temp: 300.15,
            humidity: 75,
          },
          wind: {
            speed: 5,
          },
          sys: {
            country: 'Test Country',
            sunrise: 1234567890,
            sunset: 1234567891,
          },
        }
      },
    })
  })
})

describe('WeatherData', () => {
  describe('get', () => {
    it('returns an instance of the WeatherData class', async () => {
      const weather = await WeatherData.get(1, 2)
      expect(weather).toBeInstanceOf(WeatherData)
      expect(weather).toEqual({
        city: 'Test City',
        country: 'Test Country',
        temp: 300.15,
        humidity: 75,
        wind: 5,
        sunrise: 1234567890,
        sunset: 1234567891,
      })
    })

    it('returns the correct value in Celsius', async () => {
      const weather = await WeatherData.get(1, 2)
      expect(parseInt(weather.getCelsius())).toEqual(27)
    })

    it('returns the correct value in Farenheit', async () => {
      const weather = await WeatherData.get(1, 2)
      expect(parseInt(weather.getFarenheit())).toEqual(80)
    })
  })
})
