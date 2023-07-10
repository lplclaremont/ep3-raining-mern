let userRanking = ["beach", "eating", "sightseeing", "sports", "museums", "shopping" ]

const activities = {
  "beach": {
    //"type": "outdoor",
    "optimalConditions": [800, 801],
    //"minTemp": 20,
    "ranking": userRanking.indexOf("beach"),
  },
  "sightseeing": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    //"minTemp": 13,
    "ranking": userRanking.indexOf("sightseeing"),
  },
  "sports": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    // "minTemp": 12,
    // "maxTemp": 30,
    "ranking": userRanking.indexOf("sports"),
  },
  "museums": {
    //"type": "indoor",
    "optimalConditions": [8, 3, 5, 6],
    "ranking": userRanking.indexOf("museums"),
  },
  "shopping": {
    //"type": "indoor",
    "optimalConditions": [8, 3, 5, 6],
    "ranking": userRanking.indexOf("shopping"),
  },
  "eating": {
    //"type": "indoor",
    "optimalConditions": [8, 3, 5, 6],
    "ranking": userRanking.indexOf("eating"),
  },
};

module.exports = activities