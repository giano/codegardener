Parse.initialize("AVv5O6z1eS96ZO5rnMRecr1x4L0JUASLlUefmZ7m","fjpd9F6ECYZMvbqETnX6sCajCoKF4Q1fabWq9Rru"),$(function(){var a,b,c,d,e,f;return $(".parallax").parallax({limitY:50}),d=$("#flower_template").html(),f=Handlebars.compile(d),e={".navbar-brand":{color:"#ffffff",scale:.2},".parallax .c-front":{color:"#ffffff",scale:1},".parallax .c-mid":{color:"#cccccc",scale:.5}},b=function(a,b,c,d){var g,h,i,j,k,l;return null==b&&(b=0),null==c&&(c=0),null==d&&(d="var express = require('express'); var app = express();"),h=null!=(k=e[a])?k.color:void 0,j=null!=(l=e[a])?l.scale:void 0,i=$(f({phrase:d})).css({left:b,top:c,color:h,transform:"scale("+j+")"}),i.appendTo(""+a+" .flowers_container").find(".body .line").arctext({radius:400}),g=i.find(".flower").addClass("display").find(".body").css({transform:"rotate("+_.random(-10,10)+"deg)"}),function(a){return setInterval(function(){return a.css({transform:"rotate("+_.random(-10,10)+"deg)"})},1e4)}(g)},a=Parse.Object.extend("Flower"),(c=function(c){var d,e;return null==c&&(c=0),d=new Parse.Query(a).equalTo("moderated",!0).limit(100).skip(100*c).descending("createdAt"),e=$(window).width()*c,d.find().then(function(a){var c,d,f,g,h,i;for(i=[],d=g=0,h=a.length;h>g;d=++g)c=a[d],f=700*d,i.push(function(a){return setTimeout(function(){return b(a.get("layer"),a.get("x")+e,a.get("y"),a.get("message"))},f)}(c,d));return i})})(0)});