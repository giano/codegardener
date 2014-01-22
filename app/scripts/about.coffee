$(->
    Profile = Parse.User
    profile_tpl = $("#profile_template").html()
    template = Handlebars.compile(profile_tpl)

    marked_settings =
        gfm:true
        tables:true
        breaks:true
        smartypants: true

    get_profile = (username = "codegardener")->
        query = new Parse.Query(Profile).equalTo("username", username)
        query.first().then (profile)->
            profile_desc = marked(profile.get("description") ? "")
            new_profile = template
                image: profile.get("image")
                real_name: profile.get("real_name") ? profile.get("username")
                city: profile.get("city")
                email: profile.get("email")
                url: profile.get("url")
                birthday: moment(profile.get("birthday") ).format("L")
                social: profile.get("social") ? null
                description: profile_desc

            on_hover = ->
                $("body").addClass("reading")
                $(".parallax").parallax("disable")
            on_exit = ->
                $("body").removeClass("reading")
                $(".parallax").parallax("enable")

            new_profile = $(new_profile).appendTo("#about").first().hover(on_hover, on_exit)
            new_profile.addClass("with-photo").find(".bk-image").css("background-image","url('#{profile.get("image")}')") if profile.get("image")


    url = $.url()
    get_profile url.param "username"
)
