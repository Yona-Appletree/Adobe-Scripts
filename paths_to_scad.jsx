#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

var strPolygons = "";

if (selRef.length == 0) {
	alert("You gotta select something, buster.");
} else {
	for (i=0; i<selRef.length; i++) {
		var strPoints = "polygon(points=[";
		var strPaths = "], paths=[[";

		var pathsCounter = 0;

		var pathRef = selRef[i];

		if (pathRef.typename == "GroupItem") {
			alert("Grouped items don't work just yet.");

		} else if (pathRef.typename == "CompoundPathItem") {
			for (j=0; j<pathRef.pathItems.length; j++) {
				if (j != 0) {
					strPoints += ",";
					strPaths += "],[";
				}
				for (k=0; k<pathRef.pathItems[j].pathPoints.length; k++) {
					var tempX = Math.round(pathRef.pathItems[j].pathPoints[k].anchor[0]/.02834645)/100;
					var tempY = Math.round(pathRef.pathItems[j].pathPoints[k].anchor[1]/.02834645)/100;
					if (k != 0) {
						strPoints += ",";
						strPaths += ",";
					}
					strPoints += "["+tempX+","+tempY+"]";
					strPaths += pathsCounter;
					pathsCounter++;
				}
			}
			strPaths += "]]);\n";
			strPolygons += strPoints + strPaths;

		} else {
			for (j=0; j<pathRef.pathPoints.length; j++) {
				if (j != 0) {
					strPoints += ",";
				}
				var tempX = Math.round(pathRef.pathPoints[j].anchor[0]/.02834645)/100;
				var tempY = Math.round(pathRef.pathPoints[j].anchor[1]/.02834645)/100;
				strPoints += "["+tempX+","+tempY+"]";
			}
			strPoints += "]);\n";
			strPolygons += strPoints;
		}
	}
	var tName = prompt("Document Name \r .scad extension added automatically. Will overwrite files without warning!", "output");
	if (tName != null) {
		var textFile = File('~/Desktop/'+tName+'.scad');
		textFile.lineFeed = "Unix";
		textFile.open('w');
		// Automatically add some extrusion, as that's likely what you'll do here
		textFile.writeln("linear_extrude(height = 10, center = false) {\n");
		textFile.writeln(strPolygons);
		textFile.writeln("}");
		textFile.close();
		
		alert("Yay! Check your desktop.");
	}
}
