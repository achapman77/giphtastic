$(function(){
    //Drag and Drop
    $( "#buttons-view, #giphs-view" ).sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
      
    

    var giphs = ["Pong", "Contra", "Metroid", "Super Mario", "Zelda","HALO", "Call of Duty", "Fortnite", "PUBG"]

    
    function displayGiphInfo() {
        $("#giphs-view").empty();

        var giph = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search";
        queryURL += '?' + $.param({
        'api_key': "iVfFkzJiSmOKc573FKyl16awko2eBl2K",
        'q': giph,
        'limit': 20,
        })

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            var giphData = response.data;

            for (var i = 0; i < giphData.length; i++){
            var giphDiv = $("<div class='giph'>");
            
            // Render static giph image
            var giphStaticURL = giphData[i].images.fixed_height_still.url;
            
            var giphAnimateURL = giphData[i].images.fixed_height.url;

            var giphImage = $("<img>");
            giphImage.addClass("giph-img");
            
            // Set to still image
            giphImage.attr("data-state", "still");
            giphImage.attr("src", giphStaticURL);
            
            //include still gif url as attr
            giphImage.attr("data-still", giphStaticURL)
            //include moving gif url as attr
            giphImage.attr("data-animate", giphAnimateURL)

            giphDiv.append(giphImage);

            // Render giph rating
            var rating = giphData[i].rating;

            var pRating = $("<p>").text("GIPH RATING: " + rating);

            giphDiv.append(pRating);

            

            $("#giphs-view").append(giphDiv);
            }
          });

    }

    function renderButtons(){
        $("#buttons-view").empty();

        for (var i = 0; i < giphs.length; i++){
            var b = $("<div>")
            // b.html($("<button>"));
            b.addClass("giph-btn");
            b.attr("data-name", giphs[i]);
            b.attr("id", "btn-" + giphs.indexOf(giphs[i]));
            b.text(giphs[i]);
            $("#buttons-view").prepend(b)
        }
    }

    //Toggle still to animate and back using data states
    $("#giphs-view").on("click", ".giph-img", function(){       
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    //Add search term to button array 
    $("#add-giph").on("click", function(event){
        event.preventDefault();
        var giph = $("#giph-input").val().trim()
        // console.log(giph);
        giphs.push(giph);
        renderButtons();
        displayGiphInfo();
    });

    $("#buttons-view").on("click", ".giph-btn", displayGiphInfo);

    //Add button from search term by hitting Enter
    //https://stackoverflow.com/questions/699065/submitting-a-form-on-enter-with-jquery
    $("#giph-input").keypress(function (e){
        if (e.which == 13) {
            jQuery(this).blur();
            jQuery("#add-giph").focus().click();
            // clicks on button for search term just entered
            jQuery("#btn-" + (giphs.length - 1)).focus().click();
        }
    });
    
    
    
    

    renderButtons();






});