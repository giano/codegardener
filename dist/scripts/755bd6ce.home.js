$(function(){var a,b,c,d,e,f,g,h;return a=Parse.Object.extend("News"),d=$("#article_template").html(),g=Handlebars.compile(d),f=function(){return $("body").addClass("reading"),$(".parallax").parallax("disable")},e=function(){return $("body").removeClass("reading"),$(".parallax").parallax("enable")},c={gfm:!0,tables:!0,breaks:!0,smartypants:!0},b=function(b){var c;return null==b&&(b=0),c=new Parse.Query(a).limit(25).skip(25*b).equalTo("published",!0).descending("pubdate"),c.find().then(function(a){var b,c,d,h,i;for(i=[],c=d=0,h=a.length;h>d;c=++d)b=a[c],i.push(function(a){var b,d,h,i,j,k,l,m,n;return d=marked(a.get("body")),h=marked(null!=(k=a.get("body_snippet"))?k:_.str.prune(a.get("body"),144)),i=$(marked(a.get("title"))).html(),j=g({title:i,icon:null!=(l=a.get("icon"))?l:"fa fa-code","class":c%2===1?"timeline-inverted":"timeline-standard",image:a.get("image"),body:d,body_snippet:h,width:null!=(m=a.get("width"))?m:12,pubdate:moment(a.get("pubdate")).format("L LT"),ago:moment(a.get("pubdate")).fromNow()}),j=$(j).appendTo("#articles").find("article").first().on("mouseenter touchstart",f).on("mouseleave touchend",e),(a.get("code")||j.find(/<code>/i))&&(b=null!=(n=a.get("code"))?n:"coffeescript",j.find("pre").addClass("prettyprint"),prettyPrint(j[0])),a.get("image")?j.addClass("with-photo").find(".bk-image").css("background-image","url('"+a.get("image")+"')"):void 0}(b));return i})},h=$.url(),b(h.param("page"))});