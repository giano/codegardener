$(function(){var a,b,c,d,e,f;return a=Parse.Object.extend("News"),d=$("#article_template").html(),e=Handlebars.compile(d),c={gfm:!0,tables:!0,breaks:!0,smartypants:!0},b=function(b){var c;return null==b&&(b=0),c=new Parse.Query(a).limit(25).skip(25*b).equalTo("published",!0).descending("pubdate"),c.find().then(function(a){var b,c,d,f,g;for(g=[],c=d=0,f=a.length;f>d;c=++d)b=a[c],g.push(function(a){var b,d,f,g,h,i,j,k,l,m,n;return d=marked(a.get("body")),f=marked(null!=(k=a.get("body_snippet"))?k:_.str.prune(a.get("body"),144)),g=$(marked(a.get("title"))).html(),h=e({title:g,icon:null!=(l=a.get("icon"))?l:"fa fa-align-justify","class":c%2===1?"timeline-inverted":null,image:a.get("image"),body:d,body_snippet:f,width:null!=(m=a.get("width"))?m:12,pubdate:moment(a.get("pubdate")).format("L LT"),ago:moment(a.get("pubdate")).fromNow()}),j=function(){return $("body").addClass("reading"),$(".parallax").parallax("disable")},i=function(){return $("body").removeClass("reading"),$(".parallax").parallax("enable")},h=$(h).appendTo("#articles").children("article").hover(j,i),(a.get("code")||h.find(/<code>/i))&&(b=null!=(n=a.get("code"))?n:"coffeescript",h.find("pre").addClass("prettyprint"),prettyPrint(h[0])),a.get("image")?h.addClass("with-photo").find(".bk-image").css("background-image","url('"+a.get("image")+"')"):void 0}(b));return g})},f=$.url(),b(f.param("page"))});