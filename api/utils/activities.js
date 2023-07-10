//let userSelected = ["beach", "eating", "sightseeing"]

const activities = {
  "beach": {
    //"type": "outdoor",
    "optimalConditions": [800, 801],
    //"minTemp": 20,
    "chosen": false,
  },
  "sightseeing": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    //"minTemp": 13,
    "chosen": false,
  },
  "sports": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    // "minTemp": 12,
    // "maxTemp": 30,
    "chosen": false,
  },
  "museums": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": false,
  },
  "shopping": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": false,
  },
  "eating": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": false,
  },
};

module.exports = activities