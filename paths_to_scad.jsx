#target illustrator
 
var docRef = app.activeDocument;
var selectedRef = activeDocument.selection;
var docText = "";
var docText2 = "";
var pathsCounter = 0;

for (i=0; i<selectedRef.length; i++) {
	var pathRef = selectedRef[i];

	if (pathRef.typename == "GroupItem") {
		alert("Grouped items don't work just yet");
	} else if (pathRef.typename == "CompoundPathItem") {
		docText += "polygon(points=[";
		docText2 += "], paths=[[";

		for (j=0; j<pathRef.pathItems.length; j++) {
			if (j != 0) {
				docText += ",";
				docText2 += "],[";
			}
			for (k=0; k<pathRef.pathItems[j].pathPoints.length; k++) {
				var tempX = Math.round(pathRef.pathItems[j].pathPoints[k].anchor[0]/.2834645)/10;
				var tempY = Math.round(pathRef.pathItems[j].pathPoints[k].anchor[1]/.2834645)/10;
				if (k != 0) {
					docText += ",";
					docText2 += ",";
				}
				docText += "["+tempX+","+tempY+"]";
				docText2 += pathsCounter;
				pathsCounter++;
			}
		}
		docText2 += "]";

	} else {
		alert("non-compound items don't work just yet");
	}
}

var tName = prompt("Document Name (.scad extension added automatically). Will overwrite files without warning!", "output");
docText += docText2+"]);";
var textFile = File('~/Desktop/'+tName+'.scad');
textFile.open('e');
textFile.write(docText);
textFile.close();

alert("Yay! Check your desktop.");