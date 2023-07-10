let userSelected = ["beach", "eating", "sightseeing"]

const activities = {
  "beach": {
    //"type": "outdoor",
    "optimalConditions": [800, 801],
    //"minTemp": 20,
    "chosen": userSelected.includes("beach"),
  },
  "sightseeing": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    //"minTemp": 13,
    "chosen": userSelected.includes("sightseeing"),
  },
  "sports": {
    //"type": "outdoor",
    "optimalConditions": [800, 801, 802, 803],
    // "minTemp": 12,
    // "maxTemp": 30,
    "chosen": userSelected.includes("sports"),
  },
  "museums": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": userSelected.includes("museums"),
  },
  "shopping": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": userSelected.includes("shopping"),
  },
  "eating": {
    //"type": "indoor",
    "optimalConditions": [300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,611,612,613,615,616,620,621,800,801,802,803,803,804],
    "chosen": userSelected.includes("eating"),
  },
};

module.exports = activities