$(function(){var a,b,c,d,e,f;return a=Parse.User,d=$("#profile_template").html(),e=Handlebars.compile(d),c={gfm:!0,tables:!0,breaks:!0,smartypants:!0},b=function(b){var c;return null==b&&(b="codegardener"),c=new Parse.Query(a).equalTo("username",b),c.first().then(function(a){var b,c,d,f,g,h,i;return f=marked(null!=(g=a.get("description"))?g:""),b=e({image:a.get("image"),real_name:null!=(h=a.get("real_name"))?h:a.get("username"),city:a.get("city"),email:a.get("email"),url:a.get("url"),birthday:moment(a.get("birthday")).format("L"),social:null!=(i=a.get("social"))?i:null,description:f}),d=function(){return $("body").addClass("reading"),$(".parallax").parallax("disable")},c=function(){return $("body").removeClass("reading"),$(".parallax").parallax("enable")},b=$(b).appendTo("#about").first().hover(d,c),a.get("image")?b.addClass("with-photo").find(".bk-image").css("background-image","url('"+a.get("image")+"')"):void 0})},f=$.url(),b(f.param("username"))});