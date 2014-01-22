$(->
    News = Parse.Object.extend("News")
    news_temp_html = $("#article_template").html()
    template = Handlebars.compile(news_temp_html)

    marked_settings =
        gfm:true
        tables:true
        breaks:true
        smartypants: true

    get_news = (page = 0)->
        query = new Parse.Query(News).limit(25).skip(page * 25).equalTo("published", true).descending("pubdate")
        query.find().then (news)->
            for article, i in news
                do (article)->
                    md_body = marked(article.get("body"))
                    md_body_snippet = marked(article.get("body_snippet") ? _.str.prune(article.get("body"), 144))
                    md_title = $(marked(article.get("title"))).html()
                    new_article = template
                        title: md_title
                        icon: article.get("icon") ? "fa fa-code"
                        class: if i%2 is 1 then "timeline-inverted" else "timeline-standard"
                        image: article.get("image")
                        body: md_body
                        body_snippet: md_body_snippet
                        width: article.get("width") ? 12
                        pubdate: moment(article.get("pubdate")).format("L LT")
                        ago: moment(article.get("pubdate")).fromNow()

                    on_hover = ->
                        $("body").addClass("reading")
                        $(".parallax").parallax("disable")

                    on_exit = ->
                        $("body").removeClass("reading")
                        $(".parallax").parallax("enable")

                    new_article = $(new_article).appendTo("#articles").find("article").first().hover(on_hover, on_exit)

                    if article.get("code") or new_article.find(/<code>/i)
                        code_kind = article.get("code") ? "coffeescript"
                        new_article.find('pre').addClass("prettyprint")
                        prettyPrint(new_article[0])


                    new_article.addClass("with-photo").find(".bk-image").css("background-image","url('#{article.get("image")}')") if article.get("image")


    url = $.url()
    get_news url.param "page"
)
