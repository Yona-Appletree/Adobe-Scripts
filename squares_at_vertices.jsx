#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, jack.");
} else {
	var tBoxSize = prompt("Size (width & height) of square?", "5")/2.0;
	var newLayerRef = activeDocument.layers.add();

	var color1 = new RGBColor();
	color1.red = 255;
	color1.green = 23;
	color1.blue = 24;

	var color2 = new RGBColor();
	color2.red = 24;
	color2.green = 255;
	color2.blue = 99;

	var color3 = new RGBColor();
	color3.red = 11;
	color3.green = 64;
	color3.blue = 243;

	var color4 = new RGBColor();
	color4.red = 66;
	color4.green = 66;
	color4.blue = 66;

	var colorW = new RGBColor();
	colorW.red = 255;
	colorW.green = 255;
	colorW.blue = 255;

	for (i=0; i<selRef.length; ++i) {
		var pathRef = selRef[i];

		var tmpWhich = i%4;
		if (tmpWhich == 0) {
			var theColor = color1;
		} else if (tmpWhich == 1) {
			var theColor = color2;
	 	} else if (tmpWhich == 2) {
			var theColor = color3;
		} else if (tmpWhich == 3) {
			var theColor = color4;
		}

		if (pathRef.stroked == true) {
			theColor = pathRef.strokeColor;
		} else if (pathRef.filled == true) {
			theColor = pathRef.fillColor;
		}

		for (j=0; j<pathRef.pathPoints.length; j++) {
			var point1Ref = pathRef.pathPoints[j].anchor;
			point1Ref[0] -= tBoxSize;
			point1Ref[1] -= tBoxSize;
			var point2Ref = pathRef.pathPoints[j].anchor;
			point2Ref[0] -= tBoxSize;
			point2Ref[1] += tBoxSize;
			var point3Ref = pathRef.pathPoints[j].anchor;
			point3Ref[0] += tBoxSize;
			point3Ref[1] += tBoxSize;
			var point4Ref = pathRef.pathPoints[j].anchor;
			point4Ref[0] += tBoxSize;
			point4Ref[1] -= tBoxSize;
			var newPathRef = newLayerRef.pathItems.add();
			newPathRef.setEntirePath( new Array(point1Ref, point2Ref, point3Ref, point4Ref) );

			newPathRef.stroked = true;
			newPathRef.strokeWidth = 1;
			newPathRef.strokeColor = theColor;
			newPathRef.closed = true;
			newPathRef.fillColor = colorW;
		}
	}
}
