// Generated by CoffeeScript 1.6.3
$(function() {
  var Profile, get_profile, marked_settings, profile_tpl, template, url;
  Profile = Parse.User;
  profile_tpl = $("#profile_template").html();
  template = Handlebars.compile(profile_tpl);
  marked_settings = {
    gfm: true,
    tables: true,
    breaks: true,
    smartypants: true
  };
  get_profile = function(username) {
    var query;
    if (username == null) {
      username = "codegardener";
    }
    query = new Parse.Query(Profile).equalTo("username", username);
    return query.first().then(function(profile) {
      var new_profile, profile_desc, _ref, _ref1, _ref2;
      profile_desc = marked((_ref = profile.get("description")) != null ? _ref : "");
      new_profile = template({
        image: profile.get("image"),
        real_name: (_ref1 = profile.get("real_name")) != null ? _ref1 : profile.get("username"),
        city: profile.get("city"),
        email: profile.get("email"),
        url: profile.get("url"),
        birthday: moment(profile.get("birthday")).format("L"),
        social: (_ref2 = profile.get("social")) != null ? _ref2 : null,
        description: profile_desc
      });
      new_profile = $(new_profile).appendTo("#about").first();
      $.attach_focus_events(new_profile[0]);
      if (profile.get("image")) {
        return new_profile.addClass("with-photo").find(".bk-image").css("background-image", "url('" + (profile.get("image")) + "')");
      }
    });
  };
  url = $.url();
  return get_profile(url.param("username"));
});

/*
//@ sourceMappingURL=about.map
*/
