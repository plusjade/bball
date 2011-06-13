Action = {
  offensiveActions : ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
  defensiveActions : ["steal", "block", "drebound", "foul", "charge"],
  pointValues : {"three": 3, "two": 2, "layup": 2, "freethrow": 1},
  
  data : {
    "layup" : {id: "layup", name : "2pt Layup", state : "offense", type : "shot", value : 2},
    "two" : {id: "two", name : "2pt Shot", state : "offense", type : "shot", value : 2},
    "three" : {id: "three", name : "3pt Shot", state : "offense", type : "shot", value : 3},
    "freethrow" : {id: "freethrow", name : "Freethrow", state : "offense", type : "shot", value : 1},
    "orebound" : {id: "orebound", name : "O Rebound", state : "offense", type : "bool", value : null},
    "assist" : {id: "assist", name : "Assist", state : "offense", type : "bool", value : null},
    "turnover" : {id: "turnover", name : "Turnover", state : "offense", type : "bool", value : null},
  
    "steal" : {id: "steal", name : "Steal", state : "defense", type : "bool", value : null},
    "block" : {id: "block", name : "Block", state : "defense", type : "bool", value : null},
    "drebound" : {id: "drebound", name : "D Rebound", state : "defense", type : "bool", value : null},
    "charge" : {id: "charge", name : "Charge", state : "defense", type : "bool", value : null},
    "foul" : {id: "foul", name : "Foul", state : "defense", type : "bool", value : null}
  }
}