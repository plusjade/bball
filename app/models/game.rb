class Game

  include DataMapper::Resource

  property :id, Serial
  property :uid, String, :length => 11, :unique => true
  property :home, Json, :lazy => false
  property :away, Json, :lazy => false
  property :timestamp, DateTime
  
  has n, :stats
  
  
  def full_stats
    stats = self.parse_raw_stats
    game_stats = {
      "home" => {
        "players" => []
      },
      "away" => {
        "players" => []
      }
    }
    
  # stats per player per side
    ["home", "away"].each do |side|
      
    # loop through all players
      self.send(side)["players"].each do |player|
        p = player.dup
        p["field_goals"] = { 
          "shots" => [],
          "aggregate" => {
            "points" => 0, "make" => 0, "miss" => 0, "total" => 0, "percentage" => 0
          }
        }
        p["freethrows"] = {
          "points" => 0, "make" => 0, "miss" => 0, "total" => 0, "percentage" => 0
        }
        p["offense"] = []
        p["defense"] = []
        p["points"] = 0


      # loop through Field goals stats
        Action::FieldGoals.each do |action|  
          aggregate = { 
            "name" => action[:name], "points" => 0, "make" => 0, "miss" => 0, "total" => 0, "percentage" => 0,
          }
          ["miss", "make"].each do |val|
            key = "#{action[:name]}-#{val}"
            if stats[side.to_sym][key]
              aggregate[val] = stats[side.to_sym][key][player["number"].to_i].to_i
            end
          end
          
          # points 
          aggregate["points"] += (aggregate["make"]*action[:value])
          # total
          aggregate["total"] = aggregate["make"]+aggregate["miss"]
          # percentage
          if !aggregate["make"].to_i.zero?
            aggregate["percentage"] = 100.to_f*(aggregate["make"].to_f/(aggregate["total"]))
          end
          
          p["points"] += (action[:value]*aggregate["make"])
          
          # all field goals for this player.
          p["field_goals"]["shots"].push(aggregate)
          p["field_goals"]["aggregate"]["points"] += (action[:value]*aggregate["make"])
          p["field_goals"]["aggregate"]["make"] += aggregate["make"]
          p["field_goals"]["aggregate"]["miss"] += aggregate["miss"]
          p["field_goals"]["aggregate"]["total"] += aggregate["total"]
        end
        
      # field_goal percentage for this player
        if !p["field_goals"]["aggregate"]["make"].to_i.zero?
          p["field_goals"]["aggregate"]["percentage"] = 100.to_f*(p["field_goals"]["aggregate"]["make"].to_f/p["field_goals"]["aggregate"]["total"])
        end
        
      # loop through freethrow stats
        Action::Freethrows.each do |action|  
          p["freethrows"]["name"] = action[:name]

          ["miss", "make"].each do |val|
            key = "#{action[:name]}-#{val}"
            if stats[side.to_sym][key]
              p["freethrows"][val] = stats[side.to_sym][key][player["number"].to_i].to_i
            end
          end
          
          # points 
          p["freethrows"]["points"] += (p["freethrows"]["make"]*action[:value])
          # total
          p["freethrows"]["total"] = p["freethrows"]["make"]+p["freethrows"]["miss"]
          # percentage
          if !p["freethrows"]["make"].to_i.zero?
            p["freethrows"]["percentage"] = 100.to_f*(p["freethrows"]["make"].to_f/(p["freethrows"]["total"]))
          end
          
          # add to total point count
          p["points"] += (action[:value]*p["freethrows"]["make"])
        end
                
      # loop through offense stats
        Action::Offense.each do |action|  
          aggregate = {"name" => action[:name], "total" => 0}
          if stats[side.to_sym][action[:name]]
            aggregate["total"] = stats[side.to_sym][action[:name]][player["number"].to_i].to_i
          end
          
          p["offense"].push(aggregate)
        end
        
      # loop through defense stats
        Action::Defense.each do |action|  
          aggregate = {"name" => action[:name], "total" => 0}
          if stats[side.to_sym][action[:name]]
            aggregate["total"] = stats[side.to_sym][action[:name]][player["number"].to_i].to_i
          end

          p["defense"].push(aggregate)
        end
        
        
        # add player stats to player object    
        game_stats[side]["players"].push(p)
      end
      
    end

    build_aggregate(game_stats)
  end
  
  # build aggregate values for each side.
  def build_aggregate(game_stats)
    game_stats["home"]["aggregate"] = {
      "offense" => [],
      "defense" => [],
      "field_goals" => {
        "aggregate" => {},
        "shots" => []
      },
      "freethrows" => {},
      "points" => 0
    }
    game_stats["away"]["aggregate"] = {
      "offense" => [],
      "defense" => [],
      "field_goals" => {
        "aggregate" => {},
        "shots" => []
      },
      "freethrows" => {},
      "points" => 0
    }
    
    ["home", "away"].each do |side|
      game_stats[side]["players"].each do |player|
        
        ["offense", "defense"].each do |blah|
          player[blah].each_with_index do |o, i|
            if game_stats[side]["aggregate"][blah][i]
              game_stats[side]["aggregate"][blah][i]["total"] += o["total"]
            else
              game_stats[side]["aggregate"][blah].push(o)
            end
          end
        end
        
        # points 
        game_stats[side]["aggregate"]["points"] += player["points"]
        
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
    
    {:home => home, :away => away}
  end
  
  
end
