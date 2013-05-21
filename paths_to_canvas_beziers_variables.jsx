#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, buster.");
} else {
	pText = "";
	pTextVar = "var paths = new Array(\r";

	for (i=0; i<selRef.length; i++) {
		var pathRef = selRef[i];
	
		if (pathRef.typename == "GroupItem") {
			alert("groupItem: "+pathRef.pathItems.length+": you need to ungroup paths")
		} else if (pathRef.typename == "CompundPathItem") {
			alert("compoundItem: "+pathRef.pathItems.length+": you need to release compound paths")
		} else {
	
			if (i == 0) {
				pTextVar += "\tnew Array(\r";
			} else {
				pTextVar += ",\r\tnew Array(\r";
			}
			pText += "ctx.beginPath();\r";
			for (j=0; j<pathRef.pathPoints.length; j++) {
				if (j == 0) {
					pTextVar += "\t\tnew Array("+pathRef.pathPoints[j].anchor[0]+", "+(pathRef.pathPoints[j].anchor[1]*-1)+")";
					pText += "ctx.moveTo(paths["+i+"][0][0],paths["+i+"][0][1]);\r";
				} else {
					pTextVar += ",\r\t\tnew Array("+pathRef.pathPoints[j-1].rightDirection[0]+", "+(pathRef.pathPoints[j-1].rightDirection[1]*-1)+", "+pathRef.pathPoints[j].leftDirection[0]+", "+(pathRef.pathPoints[j].leftDirection[1]*-1)+", "+pathRef.pathPoints[j].anchor[0]+", "+(pathRef.pathPoints[j].anchor[1]*-1)+")";
					pText += "ctx.bezierCurveTo(paths["+i+"]["+j+"][0],paths["+i+"]["+j+"][1],paths["+i+"]["+j+"][2],paths["+i+"]["+j+"][3],paths["+i+"]["+j+"][4],paths["+i+"]["+j+"][5]);\r";
				}
				if (j == pathRef.pathPoints.length-1) {
					pTextVar += ",\r\t\tnew Array("+pathRef.pathPoints[j].rightDirection[0]+", "+(pathRef.pathPoints[j].rightDirection[1]*-1)+", "+pathRef.pathPoints[0].leftDirection[0]+", "+(pathRef.pathPoints[0].leftDirection[1]*-1)+", "+pathRef.pathPoints[0].anchor[0]+", "+(pathRef.pathPoints[0].anchor[1]*-1)+")";
					pText += "ctx.bezierCurveTo(paths["+i+"]["+(j+1)+"][0],paths["+i+"]["+(j+1)+"][1],paths["+i+"]["+(j+1)+"][2],paths["+i+"]["+(j+1)+"][3],paths["+i+"]["+(j+1)+"][4],paths["+i+"]["+(j+1)+"][5]);\r";
				}
			}
			pText += "ctx.closePath();\r";
			pText += "ctx.stroke();\r\r";
			pTextVar += "\r\t)";
		}
	}
}

pTextVar += "\r);\r\r";

var tName = prompt("Document Name \r .html extension added automatically. Will overwrite files without warning!", "canvas-variables");
if (tName != null) {
	var textFile = File('~/Desktop/'+tName+'.html');
	textFile.lineFeed = "Unix";
	textFile.open('w');
	textFile.writeln('<html>');
	textFile.writeln('<body>');
	textFile.writeln('<canvas width="1000" height="1000" id="output"></canvas>');
	textFile.writeln('<script>');
	textFile.writeln('var cnvs = document.getElementById("output");');
	textFile.writeln('var ctx = cnvs.getContext("2d");');
	textFile.write(pTextVar);
	textFile.write(pText);
	textFile.writeln('</script>');
	textFile.writeln('</body>');
	textFile.writeln('</html>');
	textFile.close();
	
	alert("Yay! Check your desktop.");
}
