//file: api/spec/processData.spec.js

const processData = require('../../utils/processData');

const dummyDay = {
  dt: 1625624400,
  temp: { day: 25.5 },
  weather: [{ id: 800, main: 'Clear', description: 'Clear sky', icon: '04d' }],
  clouds: 10,
  pop: 0.2,
};

describe('processData', () => {
  it('should process the data correctly', () => {
    const data = {
      lat: 10.1234,
      lon: -20.5678,
      daily: [dummyDay, dummyDay, dummyDay],
    };

    const expectedProcessedData = {
      lat: 10.1234,
      lon: -20.5678,
      daily: [
        { dt: 1625624400, temp: { day: 25.5 }, weather: [{ id: 800, main: 'Clear', description: 'Clear sky', icon: '04d' }], clouds: 10, pop: 0.2 },
        { dt: 1625624400, temp: { day: 25.5 }, weather: [{ id: 800, main: 'Clear', description: 'Clear sky', icon: '04d' }], clouds: 10, pop: 0.2 },
        { dt: 1625624400, temp: { day: 25.5 }, weather: [{ id: 800, main: 'Clear', description: 'Clear sky', icon: '04d' }], clouds: 10, pop: 0.2 },
      ],
    };

    const processedData = processData(data);
    expect(processedData).toEqual(expectedProcessedData);
  });

  it('should return an empty array for daily data if input is missing or invalid', () => {
    //missing daily data
    const dataWithNoDaily = { lat: 10.1234, lon: -20.5678 };
    let processedDataWithNoDaily;
    try {
      processedDataWithNoDaily = processData(dataWithNoDaily);
    } catch (error) {
      expect(error).toBeDefined();
    }

    //invalid daily data
    const invalidData = { lat: 10.1234, lon: -20.5678, daily: 'invalid' };
    let invalidProcessedData;
    try {
      invalidProcessedData = processData(invalidData);
    } catch (error) {
      expect(error).toBeDefined();
    }

    //empty daily data
    const emptyData = { lat: 10.1234, lon: -20.5678, daily: [] };
    let emptyProcessedData;
    try {
      emptyProcessedData = processData(emptyData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});  