        jQuery(function($){
    		$.supersized({
			
				//Functionality
				slideshow               :   1,		//Slideshow on/off
				autoplay				:	1,		//Slideshow starts playing automatically
				start_slide             :   1,		//Start slide (0 is random)
				random					: 	0,		//Randomize slide order (Ignores start slide)
				slide_interval          :   30000,	//Length between transitions
				transition              :   1, 		//0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
				transition_speed		:	500,	//Speed of transition
				new_window				:	1,		//Image links open in new window/tab
				pause_hover             :   0,		//Pause slideshow on hover
				keyboard_nav            :   1,		//Keyboard navigation on/off
				performance				:	2,		//0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
				image_protect			:	1,		//Disables image dragging and right click with Javascript
				image_path				:	'img/', //Default image path
				
				//Size & Position
				min_width		        :   0,		//Min width allowed (in pixels)
				min_height		        :   0,		//Min height allowed (in pixels)
				vertical_center         :   1,		//Vertically center background
				horizontal_center       :   1,		//Horizontally center background
				fit_portrait         	:   1,		//Portrait images will not exceed browser height
				fit_landscape			:   1,		//Landscape images will not exceed browser width  
				
				//Components
				navigation              :   0,		//Slideshow controls on/off
				thumbnail_navigation    :   0,		//Thumbnail navigation
				slide_counter           :   0,		//Display slide numbers
				slide_captions          :   0,		//Slide caption (Pull from "title" in slides array)
				
				//Flickr
				source					:	1,						//1-Set, 2-User, 3-Group
				set                     :   '72157628132463486', 				//Flickr set ID (found in URL)
				user					:	'69797562@N04',				//Flickr user ID (http://idgettr.com/)
				group					:	'69797562@N04', 				//Flickr group ID (http://idgettr.com/)
				total_slides			:	100,					//How many pictures to pull (Between 1-500)
				image_size              :   'b', 					//Flickr Image Size - t,s,m,z,b  (Details: http://www.flickr.com/services/api/misc.urls.html)
				
				/**
	    		FLICKR API KEY
	    		NEED TO GET YOUR OWN -- http://www.flickr.com/services/apps/create/
	    		**/
				api_key					:	'd5b3758411a3152739b30f8f3b7b257c'		//Flickr API Key
					
			}); 
		});
    
        function GetWeather() {
            $.ajax({
                type: "GET",
                url: "proxy.php?url=" + escape("http://www.yr.no/sted/Sverige/Västra_Götaland/Kungälv/varsel_time_for_time.xml"),
                dataType: "xml",
                success: function(xml) {
                    var currentWeather = $(xml).find("time").first();
                    var weatherSymbol = $(currentWeather).find("symbol").attr("number");
                    var temperature = $(currentWeather).find("temperature").attr("value");
                    var sunrise = new Date($(xml).find("sun").attr("rise"));
                    var sunset = new Date($(xml).find("sun").attr("set"));
                    var currentTime = new Date();
                    if (currentTime > sunrise && currentTime < sunset) {
                        $("#weatherid").attr("src", "img/weather/" + weatherSymbol + ".png");
                    }
                    else {
                        $("#weatherid").attr("src", "img/weather/" + weatherSymbol + "n.png");
                    }
        
                    $("#temperature").text(temperature + "°");
                },
                error: function(xml) {
        
                }
            });
        
        }
        
        
        var monthNames = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
        
        
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        function GetClock() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
        
            $("#clock").text(checkTime(h) + ':' + checkTime(m));
            $("#date").text(checkTime(today.getDate()) + ' ' + monthNames[today.getMonth()]);
        
        }
        
        function Timer(fn_tick, tickLength) {
            return {
                timer: this.timer,
                started: false,
                start: function() {
                    if (!this.started) {
                        var self = this;
                        this.started = true;
                        this.timer = setInterval(fn_tick, tickLength);
                        return this;
                    }
                },
        
                stop: function() {
                    if (this.started) {
                        clearInterval(this.timer);
                        this.started = false;
                    }
                    return this;
                }
            }
        }
        
        
        $(function() {
            GetWeather();
            var weatherTimer = Timer("GetWeather()", 900000);
            weatherTimer.start();
            var clockTimer = Timer("GetClock()", 1000);
            clockTimer.start();
        });