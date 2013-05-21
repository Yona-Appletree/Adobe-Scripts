#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

var strCanvas = "";

if (selRef.length == 0) {
	alert("You gotta select something, buster.");
} else {

	for (i=0; i<selRef.length; i++) {
		var pathRef = selRef[i];
	
		if (pathRef.typename == "GroupItem") {
			alert("groupItem: "+pathRef.pathItems.length+": you need to ungroup paths")
		} else if (pathRef.typename == "CompundPathItem") {
			alert("compoundItem: "+pathRef.pathItems.length+": you need to release compound paths")
		} else {
	
			strCanvas += "ctx.beginPath();\r";
			for (j=0; j<pathRef.pathPoints.length; j++) {
				if (j == 0) {
					strCanvas += "ctx.moveTo("+pathRef.pathPoints[j].anchor[0]+","+(pathRef.pathPoints[j].anchor[1]*-1)+");\r";
				} else {
					strCanvas += "ctx.bezierCurveTo("+pathRef.pathPoints[j-1].rightDirection[0]+","+(pathRef.pathPoints[j-1].rightDirection[1]*-1)+", "+pathRef.pathPoints[j].leftDirection[0]+","+(pathRef.pathPoints[j].leftDirection[1]*-1)+", "+pathRef.pathPoints[j].anchor[0]+","+(pathRef.pathPoints[j].anchor[1]*-1)+");\r";
				}
				if (j == pathRef.pathPoints.length-1) {
					strCanvas += "ctx.bezierCurveTo("+pathRef.pathPoints[j].rightDirection[0]+","+(pathRef.pathPoints[j].rightDirection[1]*-1)+", "+pathRef.pathPoints[0].leftDirection[0]+","+(pathRef.pathPoints[0].leftDirection[1]*-1)+", "+pathRef.pathPoints[0].anchor[0]+","+(pathRef.pathPoints[0].anchor[1]*-1)+");\r";
				}
			}
			strCanvas += "ctx.closePath();\r";
			strCanvas += "ctx.stroke();\r\r";
		}
	}

	var tName = prompt("Document Name \r .html extension added automatically. Will overwrite files without warning!", "canvas");
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
		textFile.write(strCanvas);
		textFile.writeln('</script>');
		textFile.writeln('</body>');
		textFile.writeln('</html>');
		textFile.close();
		
		alert("Yay! Check your desktop.");
	}
}
