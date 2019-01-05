var shows = ["How I Met Your Mother", "Friends", "Rules Of Engagement", "The office", "The Blacklist"];

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

            var GifDiv = $("<div class='item'>")
            var Gif = $("<img>");

            Gif.addClass("Giphy");

            Gif.attr("src", results[i].images.fixed_height_small_still.url);
            Gif.attr("data-still", results[i].images.fixed_height_small_still.url);
            Gif.attr("data-animate", results[i].images.fixed_height_small.url);
            Gif.attr("data-state", "still")

            console.log(Gif);

            var rating = $("<p>").append("<span class='badge'>" + "Rating:" + results[i].rating + "</span>");
            rating.addClass("rate");


            GifDiv.prepend(Gif);
            GifDiv.prepend(rating)
            $("#showView").prepend(GifDiv);

        }
    });

}


$(document.body).on("click", ".Giphy", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }


    if (state === "animate"){
         
        var favorite = $("<img>")
        favorite.attr("src", $(this).attr("data-animate"));

        $("#favorite").prepend(favorite);
       } 


    });
 

   /* $(document.body).on("click", ".Giphy", function () {
        var state = $(this).attr("data-state");
 
        if (state === "animate"){
         
         var favorite = $("<img>")
         favorite.attr("src", $(this).attr("data-animate"));
 
         $("#favorite").prepend(favorite);
        } 
 
        else(){
             }});
             */
















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






$(document).on("click", ".show", showData);

ButtonGifs();