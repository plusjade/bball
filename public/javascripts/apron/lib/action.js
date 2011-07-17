Action = {
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  data : {
    "layup" : {id: "layup", short: "Layup", name : "2pt Layup", state : "offense", type : "shot", value : 2},
    "two" : {id: "two", short: "2's", name : "2pt Shot", state : "offense", type : "shot", value : 2},
    "three" : {id: "three", short: "3's", name : "3pt Shot", state : "offense", type : "shot", value : 3},
    "freethrow" : {id: "freethrow", short: "Free's", name : "Freethrow", state : "offense", type : "shot", value : 1},
    "orebound" : {id: "orebound", short: "Oreb", name : "O Rebound", state : "offense", type : "bool", value : null},
    "assist" : {id: "assist", short: "Assist", name : "Assist", state : "offense", type : "bool", value : null},
    "turnover" : {id: "turnover", short: "T/O", name : "Turnover", state : "offense", type : "bool", value : null},
  
    "steal" : {id: "steal", short: "Steal", name : "Steal", state : "defense", type : "bool", value : null},
    "block" : {id: "block", short: "Block", name : "Block", state : "defense", type : "bool", value : null},
    "drebound" : {id: "drebound", short: "Dreb", name : "D Rebound", state : "defense", type : "bool", value : null},
    "foul" : {id: "foul", short: "Foul", name : "Foul", state : "defense", type : "bool", value : null}
  }
}