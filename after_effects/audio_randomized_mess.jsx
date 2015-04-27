// randomly create audio snippets that are offset & stretched
//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//

var theComp = app.project.activeItem;
if (theComp == null || !(theComp instanceof CompItem)) {
  alert('open a comp');
} else {
  var theLayers = theComp.selectedLayers;
  if (theLayers.length < 1) {
    alert('select at least one layer');
  } else {

    var frameRate = 25; // probably grab this from comp
    var dupeCount = 7;
    // var dupeCount = prompt("How messy?", "10"); 
    var chopLength = 6.4;
    var extendLength = 11.8;
    var diffLength = extendLength-chopLength;
    var diffStretchMin = chopLength/extendLength*100;
    var diffStretchMax = extendLength/chopLength*100;
    
    for (i=0; i<theLayers.length; i++) {
      var totalTime = theLayers[i].outPoint;
      var numOfChops = totalTime / chopLength;

      for (j=0; j<numOfChops; j++) {

        for (k=0; k<dupeCount; k++) {
          var newDupe = theLayers[i].duplicate();
          var chopAmount = Math.random()*diffLength;
          var startChop = Math.random()*chopLength + (j*chopLength);
          var tempStretch = Math.random()*(diffStretchMax-diffStretchMin)+diffStretchMin;

//           newDupe.name = 'dupe-';
          
          newDupe.inPoint = startChop;
          newDupe.outPoint = startChop + chopAmount;
          newDupe.startTime = (Math.random()*diffLength*2 - diffLength) + (startChop - startChop*(tempStretch/100));

          var pLevels = newDupe.audioLevels;
          var tempLevel = Math.min(0, Math.random()*-30 + 10);
          pLevels.setValueAtTime(newDupe.inPoint, [-40,-40]);
          if (chopAmount > 1.5) {
            pLevels.setValueAtTime(newDupe.inPoint+.5, [tempLevel,tempLevel]);
            pLevels.setValueAtTime(newDupe.outPoint-.5, [tempLevel,tempLevel]);
          } else {
            pLevels.setValueAtTime(newDupe.inPoint+chopAmount/4, [tempLevel,tempLevel]);
            pLevels.setValueAtTime(newDupe.outPoint-chopAmount/4, [tempLevel,tempLevel]);
          };
          pLevels.setValueAtTime(newDupe.outPoint, [-40,-40]);

          newDupe.stretch = tempStretch;
        }
      }
    }
  }
}