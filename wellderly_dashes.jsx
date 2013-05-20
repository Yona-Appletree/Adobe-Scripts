// Wellderly -- Dash Maker
// Gives the selected path(s) a random color and dash pattern
//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//
// v0.6, 2008 October 18
// 	check/alert path selection
// 	works for one level of compound & grouped paths
// 	dialog asks for dash variables
// v0.5, 2007 July 27

#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, mister.");
} else {
	// set minimum and maximum stroke widths
	var strokeMin = prompt("Stroke Width Minimum?", "1")*1.0;
	var strokeMax = prompt("Stroke Width Maximum?", "5")*1.0;
	if (strokeMin > strokeMax) {
		alert("Very funny, but I've corrected the minimum & maximum values.");
		var tStrokeMax = strokeMin;
		strokeMin = strokeMax;
		strokeMax = tStrokeMax;
	}
	// set dash and gap maximum values
	var dashMax = prompt("Dash Size Maximum?", "50")*1.0;
	var gapMax = prompt("Gap Size Maximum?", "25")*1.0;
	// counts how many objects do not get used?
	var nonPathCount = 0;

	// apply dashes to all paths
	for (i=0; i<selRef.length; i++) {
		var pathRef = selRef[i]
		if (pathRef.typename == "CompoundPathItem") {
			for (j=0; j<pathRef.pathItems.length; j++) {
				wellderly(pathRef.pathItems[j])
			}
		} else if (pathRef.typename == "GroupItem") {
			for (j=0; j<pathRef.pathItems.length; j++) {
				wellderly(pathRef.pathItems[j])
			}
		} else if (pathRef.typename == "PathItem") {
			wellderly(pathRef);
		} else {
			nonPathCount++;
		}
	}
	// let user know that items did not get changed
	if (nonPathCount == 1) {
		alert("There was "+nonPathCount+" non-path item selected. It remains unchanged.");
	} else if (nonPathCount > 0) {
		alert("There were "+nonPathCount+" non-path items selected. They remain unchanged.");
	}
}

function wellderly(aPath) {
	var tStrokeColor = new CMYKColor();
	tStrokeColor.cyan = Math.round(Math.random() * 100);
	tStrokeColor.magenta = Math.round(Math.random() * 100);
	tStrokeColor.yellow = Math.round(Math.random() * 100);
	tStrokeColor.black = 0;
/*
	// Comment above & Uncomment this if you want to use RGB colors
	var tStrokeColor = new RGBColor();
	tStrokeColor.red = Math.round(Math.random() * 255);
	tStrokeColor.green = Math.round(Math.random() * 255);
	tStrokeColor.blue = Math.round(Math.random() * 255);
*/
	aPath.stroked = true;
	aPath.strokeColor = tStrokeColor;
	aPath.strokeWidth = strokeMin + (Math.random() * (strokeMax-strokeMin));
	aPath.strokeDashes = new Array(Math.random() * dashMax, Math.random() * gapMax)
}