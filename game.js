var colors;
var chosenColorIndex = generateChosenIndex();
var clickedColor;
var numberOfColors = 6;
var index = 0;

startOver();

$("h1").html(generateColorName(colors[chosenColorIndex]).toUpperCase());

$(document).on("click", function(event){

  if(event.target.classList[2] === "card-tile"){

    clickedColor = event.target.style.backgroundColor;

    if(clickedColor == generateColorName(colors[chosenColorIndex])){
      $(".card-tile").each(function(){
        $(this).animate({opacity: "1"}, "slow");
        $(this).css("background-color", clickedColor);
      });

      $(".title-section").css("background-color", clickedColor);

      $("#new-colors").html("PLAY AGAIN?");

    } else {

      $("#" + event.target.id).animate({opacity: "0"}, "slow");
    }
  }
});

$("#new-colors").click(function(){
  $(this).html("NEW COLORS");
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
  startOver();
});

function startOver() {
  colors = [];
  index=0;

  chosenColorIndex = generateChosenIndex();

  for(var i=0; i<numberOfColors; i++){
    colors.push(generateColorValues());
  }

  $(".card-tile").each(function() {
    var color = generateColorName(colors[index]);

    $(this).animate({
      opacity: "1",
    }, "slow");
    $(this).css("background-color", color);
    index++;
  });
}

function generateChosenIndex() {
  return Math.floor(Math.random()*numberOfColors);
}

function generateColorValues() {
  var red = Math.floor(Math.random()*255+1);
  var green = Math.floor(Math.random()*255+1);
  var blue = Math.floor(Math.random()*255+1);

  return [red, green, blue];
}

function generateColorName(colorArray) {
  return "rgb(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ")";
}
