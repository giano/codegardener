$(->
	$(".parallax").parallax
		limitY:50

	flower_temp_html = $("#flower_template").html()
	template = Handlebars.compile(flower_temp_html)

	layers_def=
		".navbar-brand":
			color:"#ffffff"
			scale:0.2
		".parallax .c-front":
			color:"#ffffff"
			scale:1
		".parallax .c-mid":
			color:"#cccccc"
			scale:0.5

	createFlower = (layer, x=0, y=0, phrase = "var express = require('express'); var app = express();")->
		flower_color = layers_def[layer]?.color
		scale = (layers_def[layer]?.scale)
		new_flower = $(template({phrase:phrase})).css
			left:x
			top:y
			color:flower_color
			transform: "scale(#{scale})"

		new_flower.appendTo("#{layer} .flowers_container").find(".body .line").arctext({radius: 400})
		f_body= new_flower.find(".flower").addClass("display").find(".body").css({transform: "rotate(#{_.random(-10,10)}deg)"})
		do (f_body)->
			setInterval ->
				f_body.css({transform: "rotate(#{_.random(-10,10)}deg)"})
			, 10000

	FlowerMessage = Parse.Object.extend("Flower")
	create_flowers_page = (page = 0)->
		query = new Parse.Query(FlowerMessage).equalTo("moderated", true).limit(100).skip(page * 100).descending("createdAt")
		step = $(window).width() * page
		query.find().then (flowers)->
			for flower, index in flowers
				timeout = index * 700
				do (flower, index)->
					setTimeout ->
						createFlower flower.get("layer"), flower.get("x")+step, flower.get("y"), flower.get("message")
					, timeout

	create_flowers_page(0)

)
