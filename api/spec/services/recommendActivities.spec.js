const recommendActivities = require('../../services/recommendActivities');
const activities = require('../../utils/activities')

describe('#recommendActivities', ()=>{
    let mockProcessedWeatherData;
    beforeEach(() => {
        for (const activity in activities) {
            activities[activity].chosen = false;
          }

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
    
    //above to clear the chosen boolean field
    describe('with no user activity selection', () => {
        it('returns the original weather data for each day forecast', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
        
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
        })

        it('adds beach to hottest clear day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[2].activity).toEqual("beach");
        })
    
        it('adds sightseeing to next hottest clear day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[1].activity).toEqual("sightseeing")
        })

        it('adds shopping to first rainy day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[0].activity).toEqual("shopping")
        })
    });

    describe('with user prioritised selections', () => {
        it('adds the first outdoor activity in the array to the hottest non-rainy day', () => {
            let userSelected = ["museums", "eating", "sightseeing"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            expect(result.daily[0].activity).toEqual("museums")
            expect(result.daily[1].activity).toEqual("eating")
            expect(result.daily[2].activity).toEqual("sightseeing")
        })


        it('adds the indoor activity in the array even if only one selected', () => {
            let userSelected = ["eating"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            expect(result.daily[0].activity).toEqual("shopping")
            expect(result.daily[1].activity).toEqual("beach")
            expect(result.daily[2].activity).toEqual("eating")
        })


        //test below fails when all test running, but works individually, not sure why - chosen value does get changed
        it('adds the best activity to the hottest non-rainy day', () => {
            let userSelected = ["beach","museums", "sightseeing"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            expect(result.daily[0].activity).toEqual("museums")
            expect(result.daily[1].activity).toEqual("sightseeing")
            expect(result.daily[2].activity).toEqual("beach")
        })
    })

    describe('for different weather conditions', () => {
        it('adds all indoor activities if all three days are rainy, sorted by temperature', ()=> {
            // update the mock to represent three rainy days
            mockProcessedWeatherData.daily[1].weather[0].id = 500;
            mockProcessedWeatherData.daily[1].weather[0].main = "Rain";
            mockProcessedWeatherData.daily[1].weather[0].description = "light rain";
            mockProcessedWeatherData.daily[2].weather[0].id = 500;
            mockProcessedWeatherData.daily[2].weather[0].main = "Rain";
            mockProcessedWeatherData.daily[2].weather[0].description = "light rain";
    
            let userSelected = ["eating"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            
            expect(result.daily[0].activity).toEqual("shopping")
            expect(result.daily[1].activity).toEqual("museums")
            expect(result.daily[2].activity).toEqual("eating")
    
        });
    
        it('adds all outdoor activities if all three days are non-rainy, sorted by temperature', ()=> {
            // update the mock to represent three non-rainy days
            mockProcessedWeatherData.daily[0].weather[0].id = 800;
            mockProcessedWeatherData.daily[0].weather[0].main = "Clear";
            mockProcessedWeatherData.daily[0].weather[0].description = "clear sky";
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            //expect highest temp day to assign 'Beach'
            expect(result.daily[2].activity).toEqual("beach")
            //expect second highest temp day to assign 'Sightseeing'
            expect(result.daily[0].activity).toEqual("sightseeing")
            //expect third highest temp day to assign 'Sports'
            expect(result.daily[1].activity).toEqual("sports")
        });
    
        it('adds a mix of activities if all three day days are non-rainy BUT an indoor activity is ranked higher than an outdoor', ()=> {
            // update the mock to represent three non-rainy days
            mockProcessedWeatherData.daily[0].weather[0].id = 800;
            mockProcessedWeatherData.daily[0].weather[0].main = "Clear";
            mockProcessedWeatherData.daily[0].weather[0].description = "clear sky";
            // update the mock to switch the ranking of an indoor activity vs an outdoor activity
            activities.sports.ranking = 4;
            activities.museums.ranking = 3;
    
            result = recommendActivities(mockProcessedWeatherData, activities, ["museums"]);
            //expect highest temp day to assign 'Museums' as user has selected it
            expect(result.daily[2].activity).toEqual("museums")
            //expect second highest temp day to assign 'beach'
            expect(result.daily[0].activity).toEqual("beach")
            //expect third highest temp day to assign 'sightseeing'
            expect(result.daily[1].activity).toEqual("sightseeing")
        });

    })
});

