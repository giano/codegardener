$(function(){var a,b,c,d,e,f;return a=Parse.User,d=$("#profile_template").html(),e=Handlebars.compile(d),c={gfm:!0,tables:!0,breaks:!0,smartypants:!0},b=function(b){var c;return null==b&&(b="codegardener"),c=new Parse.Query(a).equalTo("username",b),c.first().then(function(a){var b,c,d,f,g;return c=marked(null!=(d=a.get("description"))?d:""),b=e({image:a.get("image"),real_name:null!=(f=a.get("real_name"))?f:a.get("username"),city:a.get("city"),email:a.get("email"),url:a.get("url"),birthday:moment(a.get("birthday")).format("L"),social:null!=(g=a.get("social"))?g:null,description:c}),b=$(b).appendTo("#about").first(),$.attach_focus_events(b[0]),a.get("image")?b.addClass("with-photo").find(".bk-image").css("background-image","url('"+a.get("image")+"')"):void 0})},f=$.url(),b(f.param("username"))});