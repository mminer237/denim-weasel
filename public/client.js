window.addEventListener("load", init());

function init() {
  var input = document.getElementById("scaleBox");
  
  newChart();
  
  input.addEventListener('input', function() {
    console.log('input changed to: ', input.value);
    scaleChart(input.value);
  });
}
function newChart() {
  const LETTERS = ["C","D","E","F","L","O","P","T","Z"];
  const LETTERBANKS = ["p1","p2","p3","p4","p5","p6","p7","p8","p9","p10","p11","p12","p13","p14","p15","p16"];
  const LENGTHS = [1,2,3,4,5,6,7,8,8,8,9,9,9,10,10,10];
  var newString = "";
  var oldRand = -1;
  var newRand;
  var penultimate = false;
  
  for (var index = 1; index < LETTERBANKS.length; index++) {
    newString = "";
    oldRand = -1;
    
    while (newString.length < LENGTHS[index]) {
      do {
        newRand = Math.floor(Math.random() * LETTERS.length);
      }
      while (newRand == oldRand);
      if (newString.length == LENGTHS[index] - 1) {
        newString += "<span class=\"letter_span\">";
        penultimate = true;
      }
      newString += LETTERS[newRand];
      if (penultimate) {
        newString += "</span>";
        penultimate = false;
      }
      oldRand = newRand;
    }
    
    document.getElementById(LETTERBANKS[index]).innerHTML = newString;
  }
}
function scaleChart(feet) {
  var scale = feet/10;
  
  document.getElementById("cdiv").style.transform = "scale(" + scale + ")";
  document.getElementById("cdiv").style.transformOrigin = "0 0";
  document.body.style.marginTop = -90 * scale + "px";
  
  var cssPagedMedia = (function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule) {
        style.innerHTML = rule;
    };
  }());
  
  cssPagedMedia.size = function (size) {
      cssPagedMedia('@page {size: ' + size + '}');
      cssPagedMedia('@page {margin: 0mm ' + -90 * scale + 'mm 0mm 0mm}');
  };
  if (scale > 1.15)
    cssPagedMedia.size('landscape');
  else
    cssPagedMedia.size('portrait');
}