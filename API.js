var giphy = ["dog", "cat", "funny", "fails", "emoji"];
    var giphImage = "";
// function shows all the buttons at the top of the page.
function showButtons () {
    $("#buttonItems").empty();
    $("#giph-input").val("");
    for (var i = 0; i < giphy.length; i++) {
        var button = $("<button class='btn btn-primary'>");
        button.addClass("space");
        button.attr("giph-name", giphy[i]);
        button.text(giphy[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}
showButtons();
// runs when the user clicks and adds it to the button array and updates the buttons.
$("#addGiphThing").on("click", function(event) {
    $("#entry").empty();
    event.preventDefault();
    var giphInput = $("#giph-input").val().trim();
    var giphTerm = $(this).attr("giph-name");
    // test area to make sure the user's button has at least 10 giphs for it.
    // if there aren't 10, an error message will be shown and no button will be created.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphInput + "&limit=2&api_key=dc6zaTOxFJmzC";
        $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        if (response.pagination.total_count >= 10) {
            giphy.push(giphInput);
            showButtons(); }
        else if (response.pagination.total_count === 0) {
            $("#entry").html(" Sorry, there were no results for this.  Please try again."); }
        else if (response.pagination.total_count === 1) { $("#entry").html(" Sorry, there was only 1 result for this.  Please try again."); }
        else { $("#entry").html(" Sorry, there were only " + response.pagination.total_count + " results for this.  Please try again."); }
        $("#giph-input").val("");
        });
});
$(document).on("click", ".space", display);
function display() {
    // is just to clear out any error message (if there is one)
    $("#entry").empty();
    var giphTerm = $(this).attr("giph-name");
    // the GIPHY query.  limits to 10 results
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphTerm + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        // runs 10 times (limit is 10 in query) to show all the GIPHY pictures from the website's response.
        for (var j = 0; j < response.data.length; j++) {
            
            // gets the animated gif URL
            var active = response.data[j].images.fixed_width.url;
            // gets the still gif URL
            var still = response.data[j].images.fixed_width_still.url;
            var rating = "Rating: " + (response.data[j].rating).toUpperCase();
            // creates the new img item
            var giphImage = $("<img>");
            
            // changes the text color of ratings to green so it can be seen against the space background image.
            $("#ratings").css("color", "green");
            // creates a new div for the rating so that it maintains the gifs size
            var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
            $(ratingDiv).css({"text-align":"center", "font-size":"20px", "width":"200", "display":"block"});
            giphImage.attr({"active":active, "still":still, "src":still, "state":"still"});
            // holds the new div for both rating and the image. Every image will have a rating on top of it.
            var ratingAndImage = $("<div>");
            $(ratingAndImage).css({"float":"left"});
            $(ratingAndImage).prepend(ratingDiv, giphImage);
            // adds the rating and image to the page.
            $("#ratings").prepend(ratingAndImage);
            // when the user clicks on a picture, this will either start or stop the animation of that picture.
            $(giphImage).on("click", function(event) {
                // to clear out any error message (if there is one)
                $("#entry").empty();
                
                var state = $(this).attr("state");
                var source = $(this).attr("src");
                if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                $(this).attr("state", "active"); }
                else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still"); } 
            });
        }
   });
}