$(document).ready(function() {
    
    auth_community = {
        apiKey: "744b3c5570d5f1a90fd88b2dd7acb83d:10:70184487"
    };
    auth_article = {
        apiKey: "b639bbb0ea3705b06386037a73dd1db9:16:70184487"
    };
    community_base_url = "http://api.nytimes.com/svc/community/v2/comments/";
    article_base_url = "http://api.nytimes.com/svc/search/v2/articlesearch";

    getRecentComment();

    function getRecentComment(article_url) {
        // alert("Get Recent Comments!");
        var parameters = [];
        parameters.push(['api-key', auth_community.apiKey]);
        var message = {
            'url' : community_base_url+'random.jsonp',
            'method' : 'GET',
            'parameters' : parameters
        };
        var parameterMap = OAuth.getParameterMap(message.parameters);
        $.ajax({
            'url' : message.url,
            'data': parameterMap,
            'dataType' : 'jsonp',
            'cache': true,
            'success' : function(data, textStats, XMLHttpRequest) {
                console.log("http:\\/\\/")
                var count = data.results.comments.length;
                var comments = data.results.comments;
                var html = '';
                html += '<thead>';
                html += '<tr>';
                html += '<th></th>';
                html += '<th>Commentor</th>';
                html += '<th>Context</th>';
                html += '</tr>';
                html += '</thead>';
                for(var i = 0; i < 3; i++) {
                    var index = i+1;
                    var userComments = comments[i].userComments;
                    var userID = userComments.split('/')[7].split('.')[0];
                    var userName = comments[i].display_name;
                    var article_url = comments[i].articleURL;
                    // console.log(article_url);
                    /*call article API*/
                    // var temp = [];
                    // temp = article_url.split("/");
                    // for(var j=2; j<temp.length-1; j++) {
                    //     encoded_article_url = encoded_article_url+temp[j]+"\\/";
                    // }
                    // encoded_article_url += temp[temp.length-1];
                    // console.log("Encoded: ");
                    // var fq_param = "web_url:(\"";
                    // fq_param += encoded_article_url;
                    // fq_param += "\")";
                    // console.log(fq_param);
                    var encodedURL = encodeURIComponent(article_url);
                    var fq_param = "web_url:(\"" + encodedURL + "\")";;
                    console.log(fq_param);

                    var message = {
                        'url': article_base_url + ".json",
                        'method': 'GET'
                    };
                    $.ajax({
                        'url' : message.url,
                        'data': {
                            'fq': fq_param,
                            'api-key': auth_article.apiKey,  
                        },
                        'dataType' : 'json',
                        'cache': true,
                        'success' : function(data, textStats, XMLHttpRequest) {
                          console.log(data);
                        }
                    });





                    var moreComments_url = "moreComments.html?userID="+userID+"&userName="+userName+"&articleURL="+article_url;
                    

                    html += '<tbody>',
                    html += '<tr>',
                    html += '<td class="number" id="comment-index">No.' + index + '</td>',
                    html += '<td class="comment_content"><div><b>' + comments[i].display_name + '</b></div>',
                    html += "<a class='comment_content' style='border:none;' id='user-comments' href='"+moreComments_url+"'>more comments</a></td>",
                    html += '<td class="comment_content" id="comment-detail" style="text-align:justify">' + comments[i].commentBody + '</td>',
                    html += '<td id="ralated_article"><a href="'+article_url+'">article</a></td>',
                    html += '</tr>',
                    html += '</tbody>'
                }

                $("#comments-table").empty().append(html);    

                        
            }
        });
    }
    function getRandomComment() {
        alert("Get Random Set Comments!");
          var parameters = [];
          parameters.push(['api-key', auth_community.apiKey]);
          var message = {
              'url' : url+'random.jsonp',
              'method' : 'GET',
              'parameters' : parameters
          };
          var parameterMap = OAuth.getParameterMap(message.parameters);
          $.ajax({
              'url' : message.url,
              'data': parameterMap,
              'dataType' : 'jsonp',
              'cache': true,
              'success' : function(data, textStats, XMLHttpRequest) {
                alert(data.results.totalCommentsReturned);
                alert("Success!");
              }
          });

    }
    function getCommentByDate() {

    }
    function getCommentByArticle() {

    }

});