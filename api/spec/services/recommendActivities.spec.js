const recommendActivities = require('../../services/recommendActivities');
const activities = require('../../utils/activities')

describe('#recommendActivities for three day itinerary', ()=>{
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
            let userSelected = ["museums", "dining", "sightseeing"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            expect(result.daily[0].activity).toEqual("museums")
            expect(result.daily[1].activity).toEqual("dining")
            expect(result.daily[2].activity).toEqual("sightseeing")
        })


        it('adds the indoor activity in the array even if only one selected', () => {
            let userSelected = ["dining"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            expect(result.daily[0].activity).toEqual("sightseeing")
            expect(result.daily[1].activity).toEqual("beach")
            expect(result.daily[2].activity).toEqual("dining")
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
        it('adds sightseeing to light rain and indoor activities to other rain days', ()=> {
            // update the mock to represent three rainy days
            mockProcessedWeatherData.daily[1].weather[0].id = 500;
            mockProcessedWeatherData.daily[1].weather[0].main = "Rain";
            mockProcessedWeatherData.daily[1].weather[0].description = "light rain";
            mockProcessedWeatherData.daily[2].weather[0].id = 501;
            mockProcessedWeatherData.daily[2].weather[0].main = "Rain";
            mockProcessedWeatherData.daily[2].weather[0].description = "moderate rain";
    
            let userSelected = ["dining"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            
            expect(result.daily[0].activity).toEqual("sightseeing")
            expect(result.daily[1].activity).toEqual("shopping")
            expect(result.daily[2].activity).toEqual("dining")
    
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
            // the userSelected array contains just "museums", if they only clicked that
            let userSelected = ["museums"]
    
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            //expect highest temp day to assign 'Museums' as user has selected it
            expect(result.daily[2].activity).toEqual("museums")
            //expect second highest temp day to assign 'beach'
            expect(result.daily[0].activity).toEqual("beach")
            //expect third highest temp day to assign 'sightseeing'
            expect(result.daily[1].activity).toEqual("sightseeing")
        });

    })
});


describe('#recommendActivities for 8 day itinerary', ()=>{
    let mockProcessedWeatherData;
    beforeEach(() => {
        for (const activity in activities) {
            activities[activity].chosen = false;
          }

        mockProcessedWeatherData = {
            daily: [
              {
                dt: 1689134400,
                temp: { day: 19.56 },
                weather: [{
                    id:800,
                    main:"Clear",
                    description: "clear sky"
                }],
                clouds: 69,
                pop: 0.36,
              },
              {
                dt: 1689220800,
                temp: { day: 18.31 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 82,
                pop: 0.48,
              },
              {
                dt: 1689307200,
                temp: { day: 17.54 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 86,
                pop: 0.5,
              },
              {
                dt: 1689393600,
                temp: { day: 19.61 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 63,
                pop: 0.45,
              },
              {
                dt: 1689480000,
                temp: { day: 19.26 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 59,
                pop: 0.57,
              },
              {
                dt: 1689566400,
                temp: { day: 18.99 },
                weather: [{
                    id: 802,
                    main: 'Clouds',
                    description: 'scattered clouds',
                    icon: '03d'
                  }],
                clouds: 45,
                pop: 0.25,
              },
              {
                dt: 1689652800,
                temp: { day: 19.63 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 44,
                pop: 0.26,
              },
              {
                dt: 1689739200,
                temp: { day: 17.68 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
                clouds: 82,
                pop: 0.44,
              }
            ]
          }
    });
    
    describe('with no user activity selection', () => {
        it('adds beach to hottest clear day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[0].activity).toEqual("beach");
        })
    
        it('adds sightseeing to next hottest clear/cloud-only day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[5].activity).toEqual("sightseeing")
        })

        it('adds shopping to hottest rainy day', () => {
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            expect(result.daily[6].activity).toEqual("shopping")
        })
        it('suggests activities even when weather is raining every day', () => {
            for (let i = 0; i < 8; i++) {
                mockProcessedWeatherData.daily[i].weather[0].id = 500;
            }
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            let anyUndefined = result.daily.some((day)=>{
                return typeof day.activity === 'undefined'
            })
            expect(anyUndefined).toEqual(false)
        })
        it('suggests activities when every day is clear weather', () => {
            for (let i = 0; i < 8; i++) {
                mockProcessedWeatherData.daily[i].weather[0].id = 800;
            }
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            let anyUndefined = result.daily.some((day)=>{
                return typeof day.activity === 'undefined'
            })
            expect(anyUndefined).toEqual(false)
        })
        it('will include hiking when every day is clear weather', () => {
            for (let i = 0; i < 8; i++) {
                mockProcessedWeatherData.daily[i].weather[0].id = 800;
            }
            result = recommendActivities(mockProcessedWeatherData, activities, []);
            let includeHiking = result.daily.some((day)=>{
                return day.activity === 'hiking'
            })
            expect(includeHiking).toEqual(true)
        })
    });

    describe('with user prioritised selections', () => {
        it('will prioritise users choice, if all indoor activites are chosen beach will not be added to a sunny week', () => {
            for (let i = 0; i < 8; i++) {
                mockProcessedWeatherData.daily[i].weather[0].id = 800;
            }
            let userSelected = ["museums", "shopping", "theatre", "library", "dining"]
            result = recommendActivities(mockProcessedWeatherData, activities, userSelected);
            let includeHiking = result.daily.some((day)=>{
                return day.activity === 'hiking'
            })
            expect(includeHiking).toEqual(false)
        })

    })
});

