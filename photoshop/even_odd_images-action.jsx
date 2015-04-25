// will take any image that has an odd height or width and will add or crop a pixel
// for getting retina images to display crisply when displaying at 50% in css
//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//

// USE THIS IN AN ACTION (File / Scripts / Browse...)

// YOU CAN CHANGE THESE
var cropAdd = "ADD";  // change to "CROP" if need be
var anchorChoice = "BOTTOMLEFT" // change to "BOTTOMRIGHT" or "TOPLEFT" or "TOPRIGHT" if need be;

app.preferences.rulerUnits = Units.PIXELS;
var doc = app.activeDocument;

var newWidth = doc.width;
var newHeight = doc.height;
if (cropAdd == "ADD") {
  var changeAmt = 1;
} if (cropAdd == "CROP") {
  var changeAmt = -1;
}
if (newWidth % 2 == 1) {
  newWidth += changeAmt;
}
if (newHeight % 2 == 1) {
  newHeight += changeAmt;
}
  
// whatever, I couldn't quickly figure out how to get this to dynamically change
switch (anchorChoice) {
  case 'BOTTOMLEFT':
    doc.resizeCanvas(newWidth,newHeight,AnchorPosition.BOTTOMLEFT);
    break;
  case 'BOTTOMRIGHT':
    doc.resizeCanvas(newWidth,newHeight,AnchorPosition.BOTTOMRIGHT );
    break;
  case 'TOPLEFT':
    doc.resizeCanvas(newWidth,newHeight,AnchorPosition.TOPLEFT);
    break;
  case 'TOPRIGHT':
    doc.resizeCanvas(newWidth,newHeight,AnchorPosition.TOPRIGHT);
    break;
}
