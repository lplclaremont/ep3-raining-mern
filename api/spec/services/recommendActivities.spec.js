const recommendActivities = require('../../services/recommendActivities');

describe('#recommendActivities', ()=>{
    let mockProcessedWeatherData;
    beforeEach(() => {
        mockProcessedWeatherData = {
            "lat": 0.1,
            "lon": 50.2,
            "daily":[
                {
                    "dt":1684951200,
                    "temp":{
                        "day":23.05
                    },
                    "weather":[
                        {
                            "id":500,
                            "main":"Rain",
                            "description": "light rain"
                        }
                    ],
                    "clouds":92,
                    "pop":0.47
                },
                {
                    "dt":1685037600,
                    "temp":{
                        "day":19.10
                    },
                    "weather":[
                        {
                            "id":800,
                            "main":"Clear",
                            "description": "clear sky"
                        }
                    ],
                    "clouds":0,
                    "pop":0.00
                },
                {
                    "dt":1685124000,
                    "temp":{
                        "day":27.34
                    },
                    "weather":[
                        {
                            "id":800,
                            "main":"Clear",
                            "description": "clear sky"
                        }
                    ],
                    "clouds":0,
                    "pop":0.00
                }
    
            ]
        };
    });
    
    test('returns the original weather data for each day forecast', () => {
        result = recommendActivities(mockProcessedWeatherData);
        
        expect(result.daily[0].dt).toEqual(1684951200)
        expect(result.daily[0].temp.day).toEqual(23.05)
        expect(result.daily[0].weather[0].id).toEqual(500)
        expect(result.daily[0].weather[0].main).toEqual("Rain")
        expect(result.daily[0].weather[0].description).toEqual("light rain")

        expect(result.daily[1].dt).toEqual(1685037600)
        expect(result.daily[1].temp.day).toEqual(19.10)
        expect(result.daily[1].weather[0].id).toEqual(800)
        expect(result.daily[1].weather[0].main).toEqual("Clear")
        expect(result.daily[1].weather[0].description).toEqual("clear sky")

    });

    test('adds a indoor activity to a rainy day', () => {
        result = recommendActivities(mockProcessedWeatherData);
        expect(result.daily[0].activity).toEqual("Museums")
    })

    test('adds a outdoor activity to a non-rainy day', () => {
        result = recommendActivities(mockProcessedWeatherData);
        expect(result.daily[1].activity).toEqual("Sightseeing")
    })

    test('adds the first outdoor activity in the array to the hottest non-rainy day', () => {
        result = recommendActivities(mockProcessedWeatherData);
        expect(result.daily[2].activity).toEqual("Beach")
    })

    test('adds all indoor activities if all three days are rainy, sorted by temperature', ()=> {
        // update the mock to represent three rainy days
        mockProcessedWeatherData.daily[1].weather[0].id = 500;
        mockProcessedWeatherData.daily[1].weather[0].main = "Rain";
        mockProcessedWeatherData.daily[1].weather[0].description = "light rain";
        mockProcessedWeatherData.daily[2].weather[0].id = 500;
        mockProcessedWeatherData.daily[2].weather[0].main = "Rain";
        mockProcessedWeatherData.daily[2].weather[0].description = "light rain";
        result = recommendActivities(mockProcessedWeatherData);
        //expect highest temp day to assign 'Museums'
        expect(result.daily[2].activity).toEqual("Museums")
        //expect second highest temp day to assign 'shopping'
        expect(result.daily[0].activity).toEqual("Shopping")
        //expect third highest temp day to assign 'eating'
        expect(result.daily[1].activity).toEqual("Eating")

    });

    test('adds all outdoor activities if all three days are non-rainy, sorted by temperature', ()=> {
        // update the mock to represent three non-rainy days
        mockProcessedWeatherData.daily[0].weather[0].id = 800;
        mockProcessedWeatherData.daily[0].weather[0].main = "Clear";
        mockProcessedWeatherData.daily[0].weather[0].description = "clear sky";
        result = recommendActivities(mockProcessedWeatherData);
        //expect highest temp day to assign 'Beach'
        expect(result.daily[2].activity).toEqual("Beach")
        //expect second highest temp day to assign 'Sightseeing'
        expect(result.daily[0].activity).toEqual("Sightseeing")
        //expect third highest temp day to assign 'Sports'
        expect(result.daily[1].activity).toEqual("Sports")
    });

});

