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
      :home => {
        :totals => {},
        :players => []
      },
      :away => {
        :totals => {},
        :players => []
      }
    }
    
  # stats per play per side
    [:home, :away].each do |side|
      
    # loop through all players
      self.send(side.to_s)["players"].each do |player|
        shots = []
        offense = []
        defense = []
        
        # loop through shot stats
        Action::Shots.each do |action|  
          aggregate = {:name => action[:name]}
          ["miss", "make"].each do |type|
            key = "#{action[:name]}-#{type}"
            if stats[side][key]
              aggregate[type] = stats[side][key][player["number"].to_i].to_i
            else
              aggregate[type] = 0
            end
          end
          
          # total
          aggregate["total"] = aggregate["make"]+aggregate["miss"]

          # percentage
          if aggregate["make"].to_i.zero?
            aggregate[:percentage] = 0
          else
            aggregate[:percentage] = 100.to_f*(aggregate["make"].to_f/(aggregate["total"]))
          end
          
          shots.push(aggregate)
        end
        
      # loop through offense stats
        Action::Offense.each do |action|  
          aggregate = {:name => action[:name]}
          key = action[:name]
          if stats[side][key]
            aggregate["total"] = stats[side][key][player["number"].to_i].to_i
          else
            aggregate["total"] = 0
          end
          
          offense.push(aggregate)
        end
        
        # loop through defense stats
          Action::Defense.each do |action|  
            aggregate = {:name => action[:name]}
            key = action[:name]
            if stats[side][key]
              aggregate["total"] = stats[side][key][player["number"].to_i].to_i
            else
              aggregate["total"] = 0
            end

            defense.push(aggregate)
          end
          
        
        # add data to the player object
        p = player.dup
        p[:shots] = shots
        p[:offense] = offense
        p[:defense] = defense
        game_stats[side][:players].push(p)
      end
    end

    # total stats per side
    Action::Data[:data].each_key do |key|  
      if stats[:home][key]
        game_stats[:home][:totals][key] = stats[:home][key]["total"].to_i
      end
      if stats[:away][key]
        game_stats[:away][:totals][key] = stats[:away][key]["total"].to_i
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
