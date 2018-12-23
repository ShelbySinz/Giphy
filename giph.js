


var shows = ["How I Met Your Mother", "friends", "rules of engagement", "the office", "The Blacklist"];

function showData() {

    $("#showView").empty();
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + show + "&limit=10&rating=pg&api_key=ivNIzH31hmJWHfE1Ga8bvCCZIsqn25Xz";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
    
        var Gif = $("<img>");
        
        Gif.addClass("Giphy");

        Gif.attr("src", results[i].images.fixed_height_small_still.url);
        Gif.attr("data-still", results[i].images.fixed_height_small_still.url);
        Gif.attr( "data-animate", results[i].images.fixed_height_small.url);
        Gif.attr("data-state", "still")
            
        console.log(Gif);


        $("#showView").prepend(Gif);

    
 }
     });
        
}


$(document.body).on("click", ".Giphy", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  
});





function ButtonGifs() {

    $("#buttons-view").empty();

    shows.forEach(BttnShow => {
        var New = $("<button>");

        New.addClass("show");

        New.attr("data-name", BttnShow);
        // Provided the initial button text
        New.text(BttnShow);
        // Added the button to the buttons-view div
        $("#buttons-view").append(New);



    });
}



$("#add-Show").on("click", function (event) {
   
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var Input = $("#Show-input").val().trim();

    // The movie from the textbox is then added to our array
    shows.push(Input);

    // Calling renderButtons which handles the processing of our movie array
    ButtonGifs();

});


function animateGif() {
    var image = results[i].images.fixed_height_small.url;
    $(".Giphy").on("click" , function (){
     $(this).attr("src", image);

     clicked = true;
    });
}
    


$(document).on("click", ".show",  showData);



ButtonGifs();
