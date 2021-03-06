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

    $('#getCommments-btn').click(function(e) {
        getRecentComment();
    });
    function getRecentComment() {
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
                var count = data.results.comments.length;
                var comments = data.results.comments;
                var html = '';
                html += '<thead>';
                html += '<tr>';
                html += '<th style="font-size:19px;">No.</th>';
                html += '<th style="font-size:19px;">Commentor</th>';
                html += '<th style="font-size:19px;">Context</th>';
                html += '<th style="font-size:19px;">Article</th>'
                html += '</tr>';
                html += '</thead>';
                for(var i = 0; i < count; i++) {
                    var index = i+1;
                    var userComments = comments[i].userComments;
                    var userID = userComments.split('/')[7].split('.')[0];
                    var userName = comments[i].display_name;
                    var article_url = comments[i].articleURL;
                    var moreComments_url = "source/moreComments.html?userID="+userID+"&userName="+userName+"&articleURL="+article_url;
                    var articleDetail_url = "source/articleDetail.html?article_url="+article_url+"&userName="+userName;
                    html += '<tbody>',
                    html += '<tr>',
                    html += '<td class="comment_content number" id="comment-index">No.' + index + '</td>',
                    html += '<td class="comment_content"><div><b>' + comments[i].display_name + '</b></div>',
                    html += "<a class='comment_content' style='color: #bfb585; font-size:14px;' id='user-comments' href='"+moreComments_url+"'>more comments</a></td>",
                    html += '<td class="comment_content" id="comment-detail" style="text-align:justify">' + comments[i].commentBody + '</td>',
                    html += '<td id="ralated-article"><a class="comment_content" style="color: #bfb585; font-size:14px;" href="'+articleDetail_url+'">Related Article</a></td>',
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