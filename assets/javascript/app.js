$(document).ready(function(){

    //initial array of movies
    var movies = ["Step Brothers", "The Big Lebowski", "Caddyshack", "The Hangover", "Wedding Crashers",
                  "The Interview", "Raising Arizona", "Dumb and Dumber", "Anchorman", "Superbad"]
    GIFArea = " "
    
    //==================RENDER BUTTON=============================
    function renderButtons() {
    
      $("#movies-view").empty();
    
      for (var i=0; i < movies.length; i++) {
        var a = $('<button>');
        a.addClass('movie');
        a.attr('data-name', movies[i]);
        a.text(movies[i]);
        $("#movies-view").append(a);
      }
      s=
      $("#movie-input").focus();    
    }
    
    renderButtons();
    
    //============CLICK BUTTON/ LISTENERS==================================

    $("#add-movie").on('click', function() {
      event.preventDefault();
      var movie = $("#movie-input").val().trim();    
      movies.push(movie);
      renderButtons();
    
    });
    
    //==============DISPLAY INFO==============================
        $(document).on('click', 'button',  function() {
          $('#GIFArea').empty(); 
          var b = $(this).attr('data-name');		
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=InxYV7T8o8eZrbgv07lWtKlerlS2cHtV";  //query api url and public key
          console.log(queryURL); 
    
          $.ajax({
            url: queryURL,
            method: 'GET'
          })

          .done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < 10; i++) {
              var gifDiv = $('<div class="item">');
              var rating = results[i].rating;
              var r = $('<p>').text("Rating: " + rating);
              var gifImage = $('<img>');

              gifImage.attr('src', results[i].images.fixed_height_still.url)
              .attr('data-still', results[i].images.fixed_height_still.url)
              .attr('data-animate', results[i].images.fixed_height.url)
              .attr('data-state', "still")
              .addClass("showImage");
               gifDiv.append(r)
              .append(gifImage);	                    
       	  
              $('#GIFArea').prepend(gifDiv);
            }
    
          });
        });
    
    
    //====================Still and Animate Image ==================================
        $(document).on('click', '.showImage',  function() {
    
            var state = $(this).data('state');
            if (state == "still") {
                console.log("still image works");
                $(this).attr('src', $(this).data('animate'))
                       .data('state', 'animate');
            } else {
                console.log("animated image works");
                $(this).attr('src', $(this).data('still'))
                       .data('state', 'still');               
            }
    
        });
    
});