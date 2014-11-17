$(document).ready(function() {
	console.log(document.URL);
	var base_url = [];
	var base_url = document.URL.split("?");
	var paras = [];
	paras = base_url[1].split("&");
	var para_userID = [];
	para_userID = paras[0].split("=");
	var userID = para_userID[1];
	var para_userName = [];
	para_userName = paras[1].split("=");
	var userName = para_userName[1];
	var para_article_url = [];
	var para_article_url = paras[2].split("=");
	var article_url = para_article_url[1];
	var temp = [];
	temp = userName.split("%20");
	var firstName = temp[0];
	var lastName = temp[1];
	//gloabal
	auth_community = {
        apiKey: "744b3c5570d5f1a90fd88b2dd7acb83d:10:70184487"
    };
    auth_article = {
        apiKey: "b639bbb0ea3705b06386037a73dd1db9:16:70184487"
    };
    url = "http://api.nytimes.com/svc/community/v2/comments/";

    total_recommendations = 0;
    if(firstName != null && lastName != null) {
    	$("#moreComments-name").append("<h1>"+firstName+ "&nbsp;"+ lastName+ "</h1>");
    }
    else if(firstName == null) {
    	$("#moreComments-name").append("<h1>"+lastName+ "</h1>");
    }
    else {
    	$("#moreComments-name").append("<h1>"+firstName+ "</h1>");
    }
    getCommentByUid(userID, userName, article_url);
    
    function goBack() {
    	window.location.hash = window.location.lasthash[window.location.lasthash.length-1];
    //blah blah blah
    	alert("Go Back!");
    	window.location.lasthash.pop();
	}

	window.onhashchange = function() {
	    if (window.innerDocClick) {
	        window.innerDocClick = false;
	    } else {
	        if (window.location.hash != '#undefined') {
	            goBack();
	        } else {
	            history.pushState("", document.title, window.location.pathname);
	            location.reload();
	        }
	    }
	}
	function getCommentByUid(userID, userName, article_url) {
        var parameters = [];
          parameters.push(['api-key', auth_community.apiKey]);
          var message = {
              'url' : url+"user/id/"+userID+'.jsonp',
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
                  	console.log(data);

                  	var count = data.results.comments.length;
	                var comments = data.results.comments;
	                var html = '';
	                html += '<thead>';
	                html += '<tr>';
	                html += '<th></th>';
	                html += '<th>Comntext</th>';
	                html += '<th>Recommendation</th>';
	                html += '</tr>';
	                html += '</thead>';
	                for(var i = 0; i < count; i++) {
	                    var index = i+1;

	                    var articleDetail_url = "articleDetail.html?article_url="+article_url+"&userName="+userName;
	                    html += '<tbody>',
	                    html += '<tr>',
	                    html += '<td class="number" id="comment-index"><b>No.' + index + '</b></td>',
	                    html += '<td style="text-align:justify;">' + comments[i].commentBody + '</td>',
	                    html += '<td class="number" style="text-align:center;"><b>' + comments[i].recommendations + '</b></td>',
	                    html += '<td id="ralated-article"><a href="'+articleDetail_url+'">Related Article</a></td>',
	                    html += '</tr>'
	                    total_recommendations += comments[i].recommendations;
	                }
	                
	                $("#moreComments-table").empty().append(html);
	                var total_comments = "<h4 style='float:left;'>Total Comments:&nbsp;" + count + "</h4>";
    				var total_recom = "<h4>Total Recommend:&nbsp;"+total_recommendations+"</h4>";
    				$('#moreComments-totalRec').append(total_comments);
    				$('#moreComments-totalRec').append(total_recom);

    				var please_rate = "";
				   	please_rate += '<h4>Please Rate:</h4>',
				   	please_rate += '<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>',
				   	please_rate += '<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>',
				   	please_rate += '<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Pretty good">3 stars</label>',
				   	please_rate += '<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Pretty good">2 stars</label>',
				   	please_rate += '<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Pretty good">1 stars</label>'
				   	$('#moreComments-pleaseRate').append(please_rate);
              }
          });

    }


});