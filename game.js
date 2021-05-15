// list for storing colors
var colors;
// index of correct color in the list
var chosenColorIndex = generateChosenIndex();
// variable to store color on which user clicks
var clickedColor;
var numberOfColors = 6;
var index = 0;

startOver();

// adding a click event listener to the whole web page
$(document).on("click", function(event){
  // check to see if the area clicked is a correct tile or not
  if(event.target.classList[2] === "card-tile"){

    // getting the background color of the clicked area
    clickedColor = event.target.style.backgroundColor;

    // check to see if the color tile is the correct color tile or not
    if(clickedColor == generateColorName(colors[chosenColorIndex])){

      // changing the tile of each color to the chosen color when the correct color is found
      $(".card-tile").each(function(){
        $(this).animate({opacity: "1"}, "slow");
        $(this).css("background-color", clickedColor);
      });

      // changing the title section color to the chosen color
      $(".title-section").css("background-color", clickedColor);

      $("#new-colors").html("PLAY AGAIN?");

    } else {
      // hiding the clicked tiles which are wrong answers
      $("#" + event.target.id).animate({opacity: "0"}, "slow");
    }
  }
});

// adding a click event listener to the new colors button in the menu section
$("#new-colors").click(function(){
  // resetting the game
  startOver();
});

// adding a click event listener to the easy button
$("#easy").click(function(){
  // changing the number of colors to 3 so that the chosen number is from the first three numbers
  numberOfColors = 3;

  startOver();

  //hiding the last three color tiles because the game mode changed to easy
  $(".card-tile.hard-exclusive").each(function(){
    // adding the hidden class to bottom three buttons to hide them
    $(this).addClass("hidden");
  });
});

// adding a click event listener to hard button
$("#hard").click(function(){
  // changing the number of colors back to 6
  numberOfColors = 6;

  startOver();

  // making the hidden color tiles visible again
  $(".card-tile.hard-exclusive").each(function(){
    // removing the hidden class from bottom three buttons
    $(this).removeClass("hidden");
  });
});

// function to reset the page with new color values and a new chosen color
function startOver() {
  colors = [];
  index=0;

  chosenColorIndex = generateChosenIndex();

  // adding the random color values in the colors list
  for(var i=0; i<6; i++){
    colors.push(generateColorValues());
  }

  $("h1").html(generateColorName(colors[chosenColorIndex]).toUpperCase());

  // changing the text content of play again button to new colors
  $("#new-colors").html("NEW COLORS");

  // adding the fade animation to the title section bakcground color
  $(".title-section").css(
    "opacity", "0",
  );

  $(".title-section").animate({
    opacity: "1",
  }, "slow");

  setTimeout(function(){
    $(".title-section").css("background-color", "#21094e");
  }, 100);

  // iterating through the color tiles one by one and adding the random generated background colors
  $(".card-tile").each(function() {
    var color = generateColorName(colors[index]);

    // adding the fade animations
    $(".card-tile").each(function(){
      $(this).css("opacity", "0");
    });
    $(this).animate({
      opacity: "1",
    }, "slow");

    $(this).css("background-color", color);
    index++;
  });
}

// function to generate a random index in the colors list which will be chosen color
function generateChosenIndex() {
  return Math.floor(Math.random()*numberOfColors);
}

// function to create three random values and store them in an array to make rgb colors
function generateColorValues() {
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);

  return [red, green, blue];
}

// function to generate a color name in rgb form from 3 random numbers
function generateColorName(colorArray) {
  return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
}
