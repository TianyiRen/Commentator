$(document).ready(function() {
    console.log(document.URL);
    var base_url = [];
    var base_url = document.URL.split("?");
    var paras = [];
    paras = base_url[1].split("&");
    var para_article_url = [];
    para_article_url = paras[0].split("=");
    var article_url = para_article_url[1];
    var para_userName = [];
    para_userName = paras[1].split("=");
    var userName = para_userName[1];
    var temp = [];
    temp = userName.split("%20");
    var firstName = temp[0];
    var lastName = temp[1];
    console.log(article_url);
    console.log(firstName);
    console.log(lastName);

    var fq_param = "web_url:(\""+article_url+"\")";
    var message = {
        'url': article_base_url + ".json",
        'method': 'GET'
    };
    //call article search API
    $.ajax({
        'url' : message.url,
        'data': {
            'fq': fq_param,
            'api-key': auth_article.apiKey
        },
        'dataType' : 'json',
        'cache': true,
        'success' : function(data, textStats, XMLHttpRequest) {
            console.log(data);
            var article_info = data.response.docs[0];
            if(article_info.pub_date != null) {
                var pub_date = article_info.pub_date.split("T")[0];
            }
            var article_headline="";
            if(article_info.headline != null && article_info.byline != null) {
                article_headline += '<div class="headline">'+article_info.headline.main+'</div>',
                article_headline += '<div class="post-info" style="color: #bfb585; padding-left:20px;">'+article_info.byline.original+'&nbsp;On&nbsp;'+pub_date+'</div>',
                $('#article-headline').append(article_headline);
            } else if(article_info.headline != null) {
                article_headline += '<div class="headline">'+article_info.headline.main+'</div>',
                article_headline += '<div class="post-info" style="color: #bfb585;">&nbsp;On&nbsp;'+pub_date+'</div>',
                $('#article-headline').append(article_headline);
            }
            var article_abstract="";
            if(article_info.abstract != null && article_info.lead_paragraph != null) {
                // alert("abstract! lead!")

                if(article_info.type_of_material != null) {
                    article_abstract += '<h4 class="paragraph">Type:&nbsp;&nbsp;'+article_info.type_of_material+'</h4>';
                }
                if(article_info.keywords != null) {
                    var kw = [];
                    for(var i = 0; i < article_info.keywords.length; i++) {
                        kw.push(article_info.keywords[i].value);
                        // keywords += kw[i] + '&nbsp;&nbsp;';
                    }
                    // console.log(kw);
                    var keywords = "";
                    keywords += '<h4 class="paragraph">Keywords:&nbsp;&nbsp;&nbsp;#' + kw[0]+'&nbsp;&nbsp;&nbsp;#' + kw[1]+'&nbsp;&nbsp;&nbsp;#' + kw[2]+'&nbsp;&nbsp;&nbsp;' +'</h4>';
                    $('#article-abstract').append(keywords);
                }
                article_abstract += '<h4 class="paragraph">Abstract</h4>';
                article_abstract += '<div class="paragraph" style="font-size:25px;">' + article_info.abstract + '</div>',
                article_abstract += '<div class="paragraph" style="font-size:25px;">' + article_info.lead_paragraph + '</div>',
                $('#article-abstract').append(article_abstract);
            }
            else if(article_info.lead_paragraph != null) {
                // alert("only lead!")
                if(article_info.type_of_material != null) {
                    article_abstract += '<h4 class="paragraph">Type:&nbsp;&nbsp;'+article_info.type_of_material+'</h4>';
                }
                if(article_info.keywords != null) {
                    var kw = [];
                    for(var i = 0; i < article_info.keywords.length; i++) {
                        kw.push(article_info.keywords[i].value);
                        // keywords += kw[i] + '&nbsp;&nbsp;';
                    }
                    // console.log(kw);
                    var keywords = "";
                    keywords += '<h4 class="paragraph">Keywords:&nbsp;&nbsp;&nbsp#' + kw[0]+'&nbsp;&nbsp;&nbsp;#' + kw[1]+'&nbsp;&nbsp;&nbsp;#' + kw[2]+'&nbsp;&nbsp;&nbsp;#' + kw[3] + '</h4>';
                    $('#article-abstract').append(keywords);
                }
                article_abstract += '<h4 class="paragraph">Abstract</h4>',
                article_abstract += '<div class="paragraph" style="font-size:25px;">' + article_info.lead_paragraph + '</div>',
                $('#article-abstract').append(article_abstract);
            }
            else {
                // alert("snippet")
                if(article_info.type_of_material != null) {
                    // console.log(type_of_material)
                    article_abstract += '<h4 class="paragraph">Type:&nbsp;&nbsp;'+article_info.type_of_material+'</h4>';
                }
                if(article_info.keywords != null) {
                    var kw = [];
                    for(var i = 0; i < article_info.keywords.length; i++) {
                        kw.push(article_info.keywords[i].value);
                        // keywords += kw[i] + '&nbsp;&nbsp;';
                    }
                    // console.log(kw);
                    var keywords = "";
                    keywords += '<h4 class="paragraph">Keywords:&nbsp;&nbsp;&nbsp;#' + kw[0]+'&nbsp;&nbsp;&nbsp;#' + kw[1]+'&nbsp;&nbsp;&nbsp;#' + kw[2]+'&nbsp;&nbsp;&nbsp;#' + kw[3] + '</h4>';
                    $('#article-abstract').append(keywords);
                }
                article_abstract += '<h4 class="paragraph">Abstract</h4>',
                article_abstract += '<div class="paragraph" style="font-size:25px;">' + article_info.snippet + '</div>',
                $('#article-abstract').append(article_abstract);
            }
            
           
            // var kw = [];
            // for(var i = 0; i < article_info.keywords.length; i++) {
            //     kw.push(article_info.keywords[i].value);
            //     // keywords += kw[i] + '&nbsp;&nbsp;';
            // }
            // // console.log(kw);
            // var keywords = "";
            // keywords += '<h4 class="paragraph">Keywords:&nbsp;&nbsp;' + kw[0]+'&nbsp;&nbsp;' + kw[1]+'&nbsp;&nbsp;' + kw[2]+'&nbsp;&nbsp;' + kw[3] + '</h4>';
            // $('#article-abstract').append(keywords);
            var article_readmore = "";
            article_readmore += '<a href="'+article_url+'"><button id="readmore-btn" class="read-more">read more</button></a>'
            $('#article-readmore').append(article_readmore);
            
        }
    });

    
});