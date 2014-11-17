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
            var article_headline="";
            if(article_info.headline != null && article_info.byline != null) {
                article_headline += article_info.headline.main,
                article_headline += "<div><small>"+article_info.byline.original+"</small></div>",
                article_headline += '<div style="font-size:15px;">'+article_info.pub_date+'</div>'
                $('#article-headline').append(article_headline);
            }
            var article_abstract="";
            if(article_info.abstract != null && article_info.lead_paragraph != null) {
                alert("abstract! lead!")
                article_abstract += '<div class="thumbnail">',
                article_abstract += '<div class="caption">',
                article_abstract += '<h4 class="text-center">Abstract</h4>',
                article_abstract += '<p>' + article_info.abstract + '</p>',
                article_abstract += '<p class="text-center">',
                article_abstract += '<i class="fa fa-thumbs-o-up votes"></i><i class="fa fa-thumbs-o-down votes"></i>',                
                article_abstract += '</p></div><div>',        

                article_abstract += '<div class="thumbnail">',
                article_abstract += '<div class="caption">',
                article_abstract += '<h4 class="text-center">Lead Paragraph</h4>',
                article_abstract += '<p>' + article_info.lead_paragraph + '</p>',
                article_abstract += '<p class="text-center">',
                article_abstract += '<i class="fa fa-thumbs-o-up votes"></i><i class="fa fa-thumbs-o-down votes"></i>',                
                article_abstract += '</p></div><div>',
                $('#article-abstract').append(article_abstract);
            }
            else if(article_info.lead_paragraph != null) {
                alert("only lead!")
                article_abstract += '<div class="thumbnail">',
                article_abstract += '<div class="caption">',
                article_abstract += '<h4 class="text-center">Lead Paragraph</h4>',
                article_abstract += '<p>' + article_info.lead_paragraph + '</p>',
                article_abstract += '<p class="text-center">',
                article_abstract += '<i class="fa fa-thumbs-o-up votes"></i><i class="fa fa-thumbs-o-down votes"></i>',                
                article_abstract += '</p></div><div>',
                $('#article-abstract').append(article_abstract);
            }
            else {
                alert("snippet")
                article_abstract += '<div class="thumbnail">',
                article_abstract += '<div class="caption">',
                article_abstract += '<h4 class="text-center">Snippet</h4>',
                article_abstract += '<p>' + article_info.snippet + '</p>',
                article_abstract += '<p class="text-center">',
                article_abstract += '<i class="fa fa-thumbs-o-up votes"></i><i class="fa fa-thumbs-o-down votes"></i>',                
                article_abstract += '</p></div><div>',
                $('#article-abstract').append(article_abstract);
            }

            
        }
    });
});