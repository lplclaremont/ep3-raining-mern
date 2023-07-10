const recommendActivities = require('../../services/recommendActivities');

describe('#recommendActivities', () => {
  let mockProcessedWeatherData;

  beforeEach(() => {
    mockProcessedWeatherData = {
      lat: 0.1,
      lon: 50.2,
      daily: [
        {
          dt: 1684951200,
          temp: {
            day: 23.05,
          },
          weather: [
            {
              id: 500,
              main: 'Rain',
              description: 'light rain',
            },
          ],
          clouds: 92,
          pop: 0.47,
        },
        {
          dt: 1685037600,
          temp: {
            day: 19.1,
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
            },
          ],
          clouds: 0,
          pop: 0.0,
        },
        {
          dt: 1685124000,
          temp: {
            day: 27.34,
          },
          weather: [
            {
              id: 800,
              main: 'Clear',
              description: 'clear sky',
            },
          ],
          clouds: 0,
          pop: 0.0,
        },
      ],
    };
  });

  test('returns the original weather data for each day forecast', () => {
    const result = recommendActivities(mockProcessedWeatherData);

    expect(result.daily[0].dt).toEqual(1684951200);
    expect(result.daily[0].temp.day).toEqual(23.05);
    expect(result.daily[0].weather[0].id).toEqual(500);
    expect(result.daily[0].weather[0].main).toEqual('Rain');
    expect(result.daily[0].weather[0].description).toEqual('light rain');

    expect(result.daily[1].dt).toEqual(1685037600);
    expect(result.daily[1].temp.day).toEqual(19.1);
    expect(result.daily[1].weather[0].id).toEqual(800);
    expect(result.daily[1].weather[0].main).toEqual('Clear');
    expect(result.daily[1].weather[0].description).toEqual('clear sky');
  });

  test('adds an indoor activity to a rainy day', () => {
    const result = recommendActivities(mockProcessedWeatherData);
    expect(result.daily[0].activity.name).toEqual('Museums');
    expect(result.daily[0].activity.description).toEqual('23.05 °C and rainy, perfect for Museums!');
  });

  test('adds an outdoor activity to a non-rainy day', () => {
    const result = recommendActivities(mockProcessedWeatherData);
    expect(result.daily[1].activity.name).toEqual('Sightseeing');
    expect(result.daily[1].activity.description).toEqual('19.1 °C and sunshine, great day for Sightseeing!');
  });

  test('adds the first outdoor activity in the array to the hottest non-rainy day', () => {
    const result = recommendActivities(mockProcessedWeatherData);
    expect(result.daily[2].activity.name).toEqual('Beach');
    expect(result.daily[2].activity.description).toEqual('27.34 °C and sunshine, great day for Beach!');
  });

  test('adds all indoor activities if all three days are rainy, sorted by temperature', () => {
    // update the mock to represent three rainy days
    mockProcessedWeatherData.daily[1].weather[0].id = 500;
    mockProcessedWeatherData.daily[1].weather[0].main = 'Rain';
    mockProcessedWeatherData.daily[1].weather[0].description = 'light rain';
    mockProcessedWeatherData.daily[2].weather[0].id = 500;
    mockProcessedWeatherData.daily[2].weather[0].main = 'Rain';
    mockProcessedWeatherData.daily[2].weather[0].description = 'light rain';
    const result = recommendActivities(mockProcessedWeatherData);
    // expect the highest temp day to assign 'Museums'
    expect(result.daily[2].activity.name).toEqual('Museums');
    expect(result.daily[2].activity.description).toEqual('27.34 °C and rainy, perfect for Museums!');
    // expect the second highest temp day to assign 'Shopping'
    expect(result.daily[0].activity.name).toEqual('Shopping');
    expect(result.daily[0].activity.description).toEqual('23.05 °C and rainy, perfect for Shopping!');
    // expect the third highest temp day to assign 'Eating'
    expect(result.daily[1].activity.name).toEqual('Eating');
    expect(result.daily[1].activity.description).toEqual('19.1 °C and rainy, perfect for Eating!');
  });

  test('adds all outdoor activities if all three days are non-rainy, sorted by temperature', () => {
    // update the mock to represent three non-rainy days
    mockProcessedWeatherData.daily[0].weather[0].id = 800;
    mockProcessedWeatherData.daily[0].weather[0].main = 'Clear';
    mockProcessedWeatherData.daily[0].weather[0].description = 'clear sky';
    const result = recommendActivities(mockProcessedWeatherData);
    // expect the highest temp day to assign 'Beach'
    expect(result.daily[2].activity.name).toEqual('Beach');
    expect(result.daily[2].activity.description).toEqual('27.34 °C and sunshine, great day for Beach!');
    // expect the second highest temp day to assign 'Sightseeing'
    expect(result.daily[0].activity.name).toEqual('Sightseeing');
    expect(result.daily[0].activity.description).toEqual('23.05 °C and sunshine, great day for Sightseeing!');
    // expect the third highest temp day to assign 'Sports'
    expect(result.daily[1].activity.name).toEqual('Sports');
    expect(result.daily[1].activity.description).toEqual('19.1 °C and sunshine, great day for Sports!');
  });
});
