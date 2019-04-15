var gifs = ["happy", "funny"];

function displayGifInfo() {
  var gif = $(this).attr("data-name");
  var queryURl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&api_QLhaJiH5e6zpvE5eoSS87fSTmmuxv2Ui";

  $.ajax({
    url: queryURl,
    method: "GET"
  }).then(function(response) {
    $("gifs-veiw").text(JSON.stringify(response));
  });
}

// display gif buttons
function renderButton() {
  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("gifs");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  var gif = $("#gif-input")
    .val()
    .trim();
  gifs.push(gif);
  console.log(gifs);

  renderButton();
});

$(document).on("click", ".gif", displayGifInfo);

renderButton();
