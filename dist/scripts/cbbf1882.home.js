$(function(){var a,b,c,d,e,f;return a=Parse.Object.extend("News"),d=$("#article_template").html(),e=Handlebars.compile(d),c={gfm:!0,tables:!0,breaks:!0,smartypants:!0},b=function(b){var c;return null==b&&(b=0),c=new Parse.Query(a).limit(25).skip(25*b).equalTo("published",!0).descending("pubdate"),c.find().then(function(a){var b,c,d,f,g;for(g=[],c=d=0,f=a.length;f>d;c=++d)b=a[c],g.push(function(a){var b,d,f,g,h,i,j,k,l,m;return d=marked(a.get("body")),f=marked(null!=(j=a.get("body_snippet"))?j:_.str.prune(a.get("body"),144)),g=$(marked(a.get("title"))).html(),i=e({title:g,icon:null!=(k=a.get("icon"))?k:"fa fa-code","class":c%2===1?"timeline-inverted":"timeline-standard",image:a.get("image"),body:d,body_snippet:f,width:null!=(l=a.get("width"))?l:12,pubdate:moment(a.get("pubdate")).format("L LT"),ago:moment(a.get("pubdate")).fromNow(),link:"/article.html?id="+a.id}),h=$(i).appendTo("#articles").find("article").first(),(a.get("code")||h.find(/<code>/i))&&(b=null!=(m=a.get("code"))?m:"coffeescript",h.find("pre").addClass("prettyprint"),prettyPrint(h[0])),a.get("image")&&h.addClass("with-photo").find(".bk-image").css("background-image","url('"+a.get("image")+"')"),$.attach_focus_events(h[0])}(b));return g})},f=$.url(),b(f.param("page"))});