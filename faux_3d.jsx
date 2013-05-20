// 3dFo - faux 3d
//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//
// v0.5 - 2008_10_11

#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, bub.");
} else {

	var xDiff = prompt("X Distance Offset:",5)*1;
	var yDiff = prompt("X Distance Offset:",5)*1;
	
	for (i=0; i<selRef.length; i++) {
		var pathRef = selRef[i];
			
		if (pathRef.typename == "GroupItem") {
			alert("Nothing grouped just yet, please.")
		} else if (pathRef.typename == "CompundPathItem") {
			alert("No compund paths ATM.")
		} else {
			var newLayerRef = activeDocument.layers.add();
			// cycle through all points in the path
			for (k=0; k<pathRef.pathPoints.length; k++) {
				var point1Ref = pathRef.pathPoints[k];
				if (k==pathRef.pathPoints.length-1) {
					var point2Ref = pathRef.pathPoints[0];
				} else {
					var point2Ref = pathRef.pathPoints[k+1];
				};

				var newPathRef = newLayerRef.pathItems.add();			
				newPathRef.setEntirePath( new Array(point1Ref.anchor, point2Ref.anchor, new Array(point2Ref.anchor[0]+xDiff, point2Ref.anchor[1]+yDiff), new Array(point1Ref.anchor[0]+xDiff, point1Ref.anchor[1]+yDiff)) );

				newPathRef.closed = true;
				newPathRef.stroked = false;
				newPathRef.filled = true;

				var cmykColor = new CMYKColor();
				cmykColor.cyan = Math.random() * 100;
				cmykColor.yellow = Math.random() * 100;
				cmykColor.magenta = Math.random() * 100;
				cmykColor.black = 0;
				newPathRef.fillColor = cmykColor;

				newPathRef.pathPoints[0].rightDirection = point1Ref.rightDirection;
				newPathRef.pathPoints[1].leftDirection = point2Ref.leftDirection;
				newPathRef.pathPoints[2].rightDirection = new Array(point2Ref.leftDirection[0]+xDiff, point2Ref.leftDirection[1]+yDiff);
				newPathRef.pathPoints[3].leftDirection = new Array(point1Ref.rightDirection[0]+xDiff, point1Ref.rightDirection[1]+yDiff);
			}
		}
	}
}
	
