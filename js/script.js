$(function()
{
	var $results = $('#results');
	$('#searchbutton').on('click',function()
	{	
		$('#results').empty();
		$('#results').css("height","auto");
		$('#pagination').empty();
		var movieName=$('#movie').val();
		var foundMatch= false; 
		var pgCount=0;
		$.ajax(
		{
			type:'GET',
			url: 'http://www.omdbapi.com/?s='+movieName,
			success: function(movies)
           	{
	           	
				$.each(movies["Search"], function(i,movie)
				{ 
							foundMatch=true;
							pgCount++;
							$results.append('<div class="line-content"><img src="'+movie.Poster+'" alt="'+movie.Title+'" width="180" height="180"><br><strong>Title : '+movie.Title+'</strong><br>Year : '+movie.Year+'<br>ImdbID : '+movie.imdbID+'<br>Type : '+movie.Type+'<br></div>');
				});

				if(!foundMatch)
				{	
					$('#results').css("color","black").css("height","250px");
					$results.append('<h3 class="text-center">No match found..kindly search with different keyword</h3>');
				}

       			//pagination
				 pageSize = 4;
				 var pageCount =  pgCount/pageSize;
			     for(var i = 0 ; i<pageCount;i++)
			     {
			       $('#pagination').addClass('text-center');
			       $('#pagination').append('<li><a href="#">'+(i+1)+'</a></li>');
			     }
			     $('#pagination li').first().find('a').addClass('current');
				 showPage = function(page)
				 {
					$('.line-content').hide();
					$('.line-content').each(function(n) {
					  	if (n >= pageSize * (page - 1) && n < pageSize * page)
					        {
					           $(this).show(); 
					        }
			    	});        
				}
				showPage(1);
				$('#pagination li a').click(function() {
				    $('#pagination li a').removeClass("current");
				    $(this).addClass('current');
				    showPage(parseInt($(this).text())) 
				});
		
				
			},			
			error : function()
			{
				$results.append('Sorry, unable to fetch data');
			}
		});
	})
	
});
