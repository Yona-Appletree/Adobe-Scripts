// author: JK Keller, dilettante coder 
// will take any image that has an odd height or width and will add or crop a pixel
// for getting retina images to display crisply when displaying at 50% in css

app.preferences.rulerUnits = Units.PIXELS;

if (0 < app.documents.length) {
    alert ("Sorry, close all your open documents before running script.");
}

alert ("Just a WARNING, this will save the images in the same folder (no subfolders, sorry). Maybe just duplicate that folder for safety?");

// Prompts for features...
var cropAdd = prompt("Do you want to crop or add Pixels? CROP ADD", "ADD").toUpperCase();
var anchorChoice = prompt(cropAdd+" Canvas Anchor (no centers as this script is a single pixel)? BOTTOMLEFT BOTTOMRIGHT TOPLEFT TOPRIGHT", "BOTTOMLEFT").toUpperCase();
var sourceFolder = Folder.selectDialog ("Choose location of source image files.", Folder.myDocuments);

var files = sourceFolder.getFiles(/.+\.(?:gif|jpe?g|png)$/i);
for (var i = 0; i < files.length; i++) {
  var f = files[i];
  if (f instanceof Folder)
      continue;

  var doc = app.open (f);

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

  // otherwise this will ask to save as copy...
  if (cropAdd == "CROP") {
    doc.flatten ();
  }

  doc.save ();
  doc.close ();
}
