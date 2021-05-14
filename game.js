// list for storing colors
var colors;
// index of correct color in the list
var chosenColorIndex = generateChosenIndex();
// variable to store color on which user clicks
var clickedColor;
var numberOfColors = 6;
var index = 0;

startOver();

$("h1").html(generateColorName(colors[chosenColorIndex]).toUpperCase());

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
  // changing the text content to new colors
  $(this).html("NEW COLORS");

  // adding the fade animations
  $(".title-section").css(
    "opacity", "0",
  );

  $(".title-section").animate({
    opacity: "1",
  }, "slow");

  setTimeout(function(){
    $(".title-section").css("background-color", "#21094e");
  }, 100);

  $(".card-tile").each(function(){
    $(this).css("opacity", "0");
  });

  // resetting the game
  startOver();
});

// function to reset the page with new color values and a new chosen color
function startOver() {
  colors = [];
  index=0;

  chosenColorIndex = generateChosenIndex();

  // adding the random color values in the colors list
  for(var i=0; i<numberOfColors; i++){
    colors.push(generateColorValues());
  }

  // iterating through the color tiles one by one and adding the random generated background colors
  $(".card-tile").each(function() {
    var color = generateColorName(colors[index]);

    // adding the fade animations
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
  var red = Math.floor(Math.random()*255+1);
  var green = Math.floor(Math.random()*255+1);
  var blue = Math.floor(Math.random()*255+1);

  return [red, green, blue];
}

// function to generate a color name in rgb form from 3 random numbers
function generateColorName(colorArray) {
  return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
}
