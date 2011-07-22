class Action
  
  # shots are recorded as {name}-miss/{name}-make in the app
  Shots = [
    {:name => "layup", :value => 2},
    {:name => "two", :value => 2},
    {:name => "three", :value => 3},
    {:name => "freethrow", :value => 1}
  ]
  
  Offense = [
    {:name => "orebound"},
    {:name => "assist"},
    {:name => "turnover"},
  ]
  
  Defense = [
    {:name => "drebound"},
    {:name => "steal"},
    {:name => "block"},
    {:name => "foul"},
  ]
  
  
  Data = {
    :offensiveActions => ["three", "two", "layup", "freethrow", "orebound", "assist", "turnover"],
    :defensiveActions => ["steal", "block", "drebound", "foul", "charge"],
    :pointValues => {"three"=> 3, "two"=> 2, "layup"=> 2, "freethrow"=> 1},

    :data => {
      "layup-miss" => {:id=> "layup", :short=> "Layup", :name => "2pt Layup", :state => "offense", :type => "shot", :value => 2},
      "layup-make" => {:id=> "layup", :short=> "Layup", :name => "2pt Layup", :state => "offense", :type => "shot", :value => 2},
      "two-miss" => {:id=> "two", :short=> "2's", :name => "2pt Shot", :state => "offense", :type => "shot", :value => 2},
      "two-make" => {:id=> "two", :short=> "2's", :name => "2pt Shot", :state => "offense", :type => "shot", :value => 2},
      "three-miss" => {:id=> "three", :short=> "3's", :name => "3pt Shot", :state => "offense", :type => "shot", :value => 3},
      "three-make" => {:id=> "three", :short=> "3's", :name => "3pt Shot", :state => "offense", :type => "shot", :value => 3},
      "freethrow-miss" => {:id=> "freethrow", :short=> "Free's", :name => "Freethrow", :state => "offense", :type => "shot", :value => 1},
      "freethrow-make" => {:id=> "freethrow", :short=> "Free's", :name => "Freethrow", :state => "offense", :type => "shot", :value => 1},

      "orebound" => {:id=> "orebound", :short=> "Oreb", :name => "O Rebound", :state => "offense", :type => "bool", :value => nil},
      "assist" => {:id=> "assist", :short=> "Assist", :name => "Assist", :state => "offense", :type => "bool", :value => nil},
      "turnover" => {:id=> "turnover", :short=> "T/O", :name => "Turnover", :state => "offense", :type => "bool", :value => nil},

      "steal" => {:id=> "steal", :short=> "Steal", :name => "Steal", :state => "defense", :type => "bool", :value => nil},
      "block" => {:id=> "block", :short=> "Block", :name => "Block", :state => "defense", :type => "bool", :value => nil},
      "drebound" => {:id=> "drebound", :short=> "Dreb", :name => "D Rebound", :state => "defense", :type => "bool", :value => nil},
      "foul" => {:id=> "foul", :short=> "Foul", :name => "Foul", :state => "defense", :type => "bool", :value => nil}
    }
  }

end