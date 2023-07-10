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
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "ranking": userRanking.indexOf("museums"),
  },
  "shopping": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "ranking": userRanking.indexOf("shopping"),
  },
  "eating": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "ranking": userRanking.indexOf("eating"),
  },
};

module.exports = activities