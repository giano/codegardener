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

                    new_article_txt = template
                        title: md_title
                        icon: article.get("icon") ? "fa fa-code"
                        class: if i%2 is 1 then "timeline-inverted" else "timeline-standard"
                        image: article.get("image")
                        body: md_body
                        body_snippet: md_body_snippet
                        width: article.get("width") ? 12
                        pubdate: moment(article.get("pubdate")).format("L LT")
                        ago: moment(article.get("pubdate")).fromNow()
                        link: "/article.html?id=#{article.id}"

                    new_article = $(new_article_txt).appendTo("#articles").find("article").first()

                    if article.get("code") or new_article.find(/<code>/i)
                        code_kind = article.get("code") ? "coffeescript"
                        new_article.find('pre').addClass("prettyprint")
                        prettyPrint(new_article[0])


                    new_article.addClass("with-photo").find(".bk-image").css("background-image","url('#{article.get("image")}')") if article.get("image")

                    $.attach_focus_events(new_article[0])

    url = $.url()
    get_news url.param "page"
)
