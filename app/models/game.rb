class Game

  include DataMapper::Resource

  property :id, Serial
  property :uid, String, :length => 11, :unique => true
  property :home, Json, :lazy => false
  property :away, Json, :lazy => false
  property :timestamp, DateTime
  attr_accessor :raw_stats

  has n, :stats
  
  # These constants serve as object templates for our data apis.
  # -- 
  ShotAnalysis = {
    "points" => 0, "make" => 0, "miss" => 0, "total" => 0, "percentage" => 0
  }
  PlayerAnalysis = {
    "offense" => [],
    "defense" => [],
    "points" => 0,
    "freethrows" => ShotAnalysis.dup.merge("name" => "freethrow") ,
    "field_goals" => { 
      "shots" => [],
      "aggregate" => ShotAnalysis.dup
    }
  }
  GameAnalysis = {
    "home" => {
      "aggregate" => PlayerAnalysis.dup,
      "players" => []
    },
    "away" => {
      "aggregate" => PlayerAnalysis.dup,
      "players" => []
    }
  }
  
  def full_stats
    self.parse_raw_stats if raw_stats.blank?

  # stats per player per side
    ["home", "away"].each do |side|
      
    # loop through all players in this game
      self.send(side)["players"].each do |player|
      # deepclone the player object template
        p = Marshal::load(Marshal::dump(PlayerAnalysis)).merge(player.dup)

      # Field goals stats
        Action::FieldGoals.each do |action|  
          data = ShotAnalysis.dup.merge("name" => action[:name])
          
          # assign stats
          ["miss", "make"].each do |val|
            key = "#{action[:name]}-#{val}"
            if raw_stats[side.to_sym][key]
              data[val] = raw_stats[side.to_sym][key][player["number"].to_i].to_i
            end
          end
          
          # points
          data["points"] += (data["make"]*action[:value])
          # total
          data["total"] = data["make"]+data["miss"]
          # percentage
          data["percentage"] = percentify(data["make"],data["total"])
          
          # all field goals for this player.
          p["field_goals"]["shots"].push(data)
          p["points"] += (action[:value]*data["make"])
          p["field_goals"]["aggregate"]["points"] += (action[:value]*data["make"])
          p["field_goals"]["aggregate"]["make"] += data["make"]
          p["field_goals"]["aggregate"]["miss"] += data["miss"]
          p["field_goals"]["aggregate"]["total"] += data["total"]
        end
      # field_goal percentage for this player
        p["field_goals"]["aggregate"]["percentage"] = percentify(p["field_goals"]["aggregate"]["make"],p["field_goals"]["aggregate"]["total"])
        
      # Freethrow stats
        Action::Freethrows.each do |action|  
          p["freethrows"]["name"] = action[:name]

          ["miss", "make"].each do |val|
            key = "#{action[:name]}-#{val}"
            if raw_stats[side.to_sym][key]
              p["freethrows"][val] = raw_stats[side.to_sym][key][player["number"].to_i].to_i
            end
          end
          
          # points 
          p["freethrows"]["points"] += (p["freethrows"]["make"]*action[:value])
          # total
          p["freethrows"]["total"] = p["freethrows"]["make"]+p["freethrows"]["miss"]
          # percentage
          p["freethrows"]["percentage"] = percentify(p["freethrows"]["make"],p["freethrows"]["total"])
          
          # add to total point count
          p["points"] += (action[:value]*p["freethrows"]["make"])
        end
              
      # Offense stats
        Action::Offense.each do |action|  
          data = {"name" => action[:name], "total" => 0}
          if raw_stats[side.to_sym][action[:name]]
            data["total"] = raw_stats[side.to_sym][action[:name]][player["number"].to_i].to_i
          end
          
          p["offense"].push(data)
        end

      # Defense stats
        Action::Defense.each do |action|  
          data = {"name" => action[:name], "total" => 0}
          if raw_stats[side.to_sym][action[:name]]
            data["total"] = raw_stats[side.to_sym][action[:name]][player["number"].to_i].to_i
          end

          p["defense"].push(data)
        end
        
      # add player stats to player object    
        GameAnalysis[side]["players"].push(p)
      end
      
    end

    calculate_aggregates(GameAnalysis)
  end


  def percentify(make, total)
    ((make.to_i.zero? ? 0 : (100.to_f*(make.to_f/total)))*100).to_i/100.0
  end
  

  # calculate aggregate values.
  def calculate_aggregates(game_stats)
    ["home", "away"].each do |side|
      game_stats[side]["players"].each do |player|
      
      # aggregate for offense and defense
        ["offense", "defense"].each do |state|
          player[state].each_with_index do |o, i|
            if game_stats[side]["aggregate"][state][i]
              game_stats[side]["aggregate"][state][i]["total"] += o["total"]
            else
              game_stats[side]["aggregate"][state].push(o)
            end
          end
        end
        
      # agregrate points 
        game_stats[side]["aggregate"]["points"] += player["points"]

      # aggregate freethrows
        player["freethrows"].each do |a,b|
          next if (a == "name" || a == "percentage")
          if game_stats[side]["aggregate"]["freethrows"]["total"]
            game_stats[side]["aggregate"]["freethrows"][a] += b
          else
            game_stats[side]["aggregate"]["freethrows"] = player["freethrows"]
          end
        end
      # aggregate freethrow percentage
        game_stats[side]["aggregate"]["freethrows"]["percentage"] = percentify(game_stats[side]["aggregate"]["freethrows"]["make"], game_stats[side]["aggregate"]["freethrows"]["total"])

      # aggregate aggregate fieldgoals
        player["field_goals"]["aggregate"].each do |c,d|
          next if (c == "name" || c == "percentage")
          if game_stats[side]["aggregate"]["field_goals"]["aggregate"]["total"]
            game_stats[side]["aggregate"]["field_goals"]["aggregate"][c] += d
          else
            game_stats[side]["aggregate"]["field_goals"]["aggregate"] = player["field_goals"]["aggregate"]
          end
        end  
      # aggregate aggregate fieldgoals percentage
        game_stats[side]["aggregate"]["field_goals"]["aggregate"]["percentage"] = percentify(game_stats[side]["aggregate"]["field_goals"]["aggregate"]["make"], game_stats[side]["aggregate"]["field_goals"]["aggregate"]["total"])

      # aggregate fieldgoals shots
      # note we clone the first player's data and add subsequent data to the clone.
        if game_stats[side]["aggregate"]["field_goals"]["shots"].empty? 
          game_stats[side]["aggregate"]["field_goals"]["shots"] = Marshal::load(Marshal::dump(player["field_goals"]["shots"]))
        else
          player["field_goals"]["shots"].each_with_index do |shot, z|          
            shot.each do |e,f|
              next if (e == "name" || e == "percentage")
              game_stats[side]["aggregate"]["field_goals"]["shots"][z][e] += f
            end
          end        
        end
      # aggregate fieldgoals shot percentage
        game_stats[side]["aggregate"]["field_goals"]["shots"].each_with_index do |shot,y|
          game_stats[side]["aggregate"]["field_goals"]["shots"][y]["percentage"] = percentify(shot["make"], shot["total"])
        end
        
      end
    end
    
    game_stats
  end
  
    
  # This is mainly a utility to parse raw stat key/values sent from the app.
  # Players who do not log stats do not exist
  # Actions that do not have stats do not exist
  # For a comprehensive stat/action breakdown see the methods below.
  def parse_raw_stats
    home = {}
    away = {}
    self.stats.each do |stat|
      counts = {}
      data = stat.value.split("|");
      x = data.length-1 #subtract empty last array val.
      counts["total"] = x>0 ? x.to_i : 0

      # parse raw stat data to retrive players => action counts
      while(x>0)
        val = data[x].to_i
        if counts[val]
          counts[val] += 1
        else
          counts[val] = 1
        end
        x-=1
      end
      
      if stat.side == "home"
        home[stat.action] = counts
      else
        away[stat.action] = counts
      end
    end
    
    self.raw_stats = {:home => home, :away => away}
  end
  
  
end
