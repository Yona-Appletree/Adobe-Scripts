// Create a bunch of randomly sized rectangles
// JK Keller

#target illustrator

var docRef = app.activeDocument;
var newLayerRef = activeDocument.layers.add();

// prompt for how many rects to make
var pTotal = prompt("How many?", 100)*1;
// prompt for the range of size 
var pMinSize = prompt("Minimum size?", 20)*1;
var pMaxSize = prompt("Maximum size?", 100)*1;
// prompt for location bounds
var pStartX = prompt("From x Location?", 0)*1;
var pEndX = prompt("To x Location?", 400)*1;
var pStartY = prompt("From y Location?", 0)*1;
var pEndY = prompt("To y Location?", 0)*1;

// create the rects
for (j=0; j<pTotal; j++) {
	var tWidth = Math.round(Math.random()*pMaxSize)+pMinSize
	var tHeight = Math.round(Math.random()*pMaxSize)+pMinSize

	var xLoc = pStartX + (Math.random() * (pEndX - pStartX));
	var yLoc = pStartY + (Math.random() * (pEndY - pStartY));
	var point1Ref = new Array(xLoc, yLoc);
	var point2Ref = new Array(xLoc, yLoc+tWidth);
	var point3Ref = new Array(xLoc+tHeight, yLoc+tWidth);
	var point4Ref = new Array(xLoc+tHeight, yLoc);

	var newPathRef = newLayerRef.pathItems.add();			
	newPathRef.setEntirePath( new Array(point1Ref, point2Ref, point3Ref, point4Ref) );
	
	newPathRef.closed = true;
}
