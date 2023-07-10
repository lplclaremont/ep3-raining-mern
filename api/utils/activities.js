let userRanking = ["beach", "eating", "sightseeing", "sports", "museums", "shopping" ]

const activities = {
  "beach": {
    "type": "outdoor",
    "minTemp": 20,
    "ranking": userRanking.indexOf("beach"),
  },
  "sightseeing": {
    "type": "outdoor",
    "minTemp": 13,
    "ranking": userRanking.indexOf("sightseeing"),
  },
  "sports": {
    "type": "outdoor",
    "minTemp": 12,
    "maxTemp": 30,
    "ranking": userRanking.indexOf("sports"),
  },
  "museums": {
    "type": "indoor",
    "ranking": userRanking.indexOf("museums"),
  },
  "shopping": {
    "type": "indoor",
    "ranking": userRanking.indexOf("shopping"),
  },
  "eating": {
    "type": "indoor",
    "ranking": userRanking.indexOf("eating"),
  },
};

module.exports = activities