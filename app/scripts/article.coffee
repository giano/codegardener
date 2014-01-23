$(->
    News = Parse.Object.extend("News")
    news_temp_html = $("#full_article_template").html()
    template = Handlebars.compile(news_temp_html)

    marked_settings =
        gfm:true
        tables:true
        breaks:true
        smartypants: true

    get_article = (article_id)->
        query = new Parse.Query(News)
        query.get(article_id).then (article)->
            do (article)->
                md_body = marked(article.get("body"))
                md_body_snippet = md_body
                md_title = $(marked(article.get("title"))).html()

                new_article_txt = template
                    title: md_title
                    icon: article.get("icon") ? "fa fa-code"
                    class: "full-article"
                    image: article.get("image")
                    body: md_body
                    body_snippet: md_body_snippet
                    width: article.get("width") ? 12
                    pubdate: moment(article.get("pubdate")).format("L LT")
                    ago: moment(article.get("pubdate")).fromNow()

                new_article = $(new_article_txt).first().appendTo("#article")

                if article.get("code") or new_article.find(/<code>/i)
                    code_kind = article.get("code") ? "coffeescript"
                    new_article.find('pre').addClass("prettyprint")
                    prettyPrint(new_article[0])


                new_article.addClass("with-photo").find(".bk-image").css("background-image","url('#{article.get("image")}')") if article.get("image")

                $.attach_focus_events(new_article[0])

    url = $.url()
    get_article url.param "id"
)
