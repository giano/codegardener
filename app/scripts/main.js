// Generated by CoffeeScript 1.6.3
var on_exit, on_exit_t, on_hover, on_hover_t, shown_defocus;

$.is_device = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());

shown_defocus = false;

on_hover = function() {
  var el;
  $(this).addClass("focused");
  if ($.is_device && !shown_defocus) {
    $(this).addClass("gestures");
    shown_defocus = true;
    el = $(this);
    setTimeout(function() {
      return el.removeClass("gestures");
    }, 2000);
  }
  $("body").addClass("reading");
  return $(".parallax").parallax("disable");
};

on_exit = function() {
  $(this).removeClass("focused").removeClass("gestures");
  $("body").removeClass("reading");
  return $(".parallax").parallax("enable");
};

on_exit_t = function(e) {
  if ((Math.abs(e.gesture.deltaX)) > $(this).width() / 2) {
    on_exit.apply(this);
    return Hammer(this).off("dragstart").off("dragend");
  }
};

on_hover_t = function() {
  Hammer(this).on("dragstart", function(e) {
    var _ref, _ref1;
    if (((_ref = e.gesture) != null ? _ref.direction : void 0) !== Hammer.DIRECTION_UP && ((_ref1 = e.gesture) != null ? _ref1.direction : void 0) !== Hammer.DIRECTION_DOWN) {
      return $(this).addClass("gestures");
    }
  });
  Hammer(this).on("dragend", function(e) {
    return $(this).removeClass("gestures");
  });
  return on_hover.apply(this);
};

$.attach_focus_events = function(element) {
  if ($.is_device) {
    return Hammer(element).on("swiperight", on_exit_t).on("dragright", on_exit_t).on("swipeleft", on_exit_t).on("dragleft", on_exit_t).on("tap", on_hover_t);
  } else {
    return $(element).hover(on_hover, on_exit);
  }
};

$(function() {
  var FlowerMessage, createFlower, create_flowers_page, flower_temp_html, layers_def, template;
  $(".parallax").parallax({
    limitY: 50
  });
  flower_temp_html = $("#flower_template").html();
  template = Handlebars.compile(flower_temp_html);
  layers_def = {
    ".navbar-brand": {
      color: "#ffffff",
      scale: 0.2
    },
    ".parallax .c-front": {
      color: "#ffffff",
      scale: 1
    },
    ".parallax .c-mid": {
      color: "#cccccc",
      scale: 0.5
    }
  };
  createFlower = function(layer, x, y, phrase) {
    var f_body, flower_color, new_flower, scale, _ref, _ref1;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (phrase == null) {
      phrase = "var express = require('express'); var app = express();";
    }
    flower_color = (_ref = layers_def[layer]) != null ? _ref.color : void 0;
    scale = ((_ref1 = layers_def[layer]) != null ? _ref1.scale : void 0);
    new_flower = $(template({
      phrase: phrase
    })).css({
      left: x,
      top: y,
      color: flower_color,
      transform: "scale(" + scale + ")"
    });
    new_flower.appendTo("" + layer + " .flowers_container").find(".body .line").arctext({
      radius: 400
    });
    f_body = new_flower.find(".flower").addClass("display").find(".body").css({
      transform: "rotate(" + (_.random(-10, 10)) + "deg)"
    });
    return (function(f_body) {
      return setInterval(function() {
        return f_body.css({
          transform: "rotate(" + (_.random(-10, 10)) + "deg)"
        });
      }, 10000);
    })(f_body);
  };
  FlowerMessage = Parse.Object.extend("Flower");
  create_flowers_page = function(page) {
    var query, step;
    if (page == null) {
      page = 0;
    }
    query = new Parse.Query(FlowerMessage).equalTo("moderated", true).limit(100).skip(page * 100).descending("createdAt");
    step = $(window).width() * page;
    return query.find().then(function(flowers) {
      var flower, index, timeout, _i, _len, _results;
      _results = [];
      for (index = _i = 0, _len = flowers.length; _i < _len; index = ++_i) {
        flower = flowers[index];
        timeout = index * 700;
        _results.push((function(flower, index) {
          return setTimeout(function() {
            return createFlower(flower.get("layer"), flower.get("x") + step, flower.get("y"), flower.get("message"));
          }, timeout);
        })(flower, index));
      }
      return _results;
    });
  };
  return create_flowers_page(0);
});

/*
//@ sourceMappingURL=main.map
*/
