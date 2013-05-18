#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, dude.");
} else {
	for (i=0; i<selRef.length; i++) {
		var pathRef = selRef[i];

		if (pathRef.typename == "GroupItem") {
			for (j=0; j<pathRef.pathItems.length; j++) {
				var groupPathRef = pathRef.pathItems[j];
				if (groupPathRef.typename == "GroupItem") {
					for (k=0; k<groupPathRef.pathItems.length; k++) {
						var groupGroupPathRef = groupPathRef.pathItems[k];
						exchangeColor(groupGroupPathRef);
					}
				} else if (groupPathRef.typename == "CompundPathItem") {
					alert("Looks like compound paths don't work just yet.");
				} else {
					exchangeColor(groupPathRef);
				}
			}
		} else if (pathRef.typename == "CompoundPathItem") {
			alert("Looks like compound paths don't work just yet.");
		} else {
			exchangeColor(pathRef);
		}
	}
}

function exchangeColor (aPath) {
	if (aPath.stroked == true) {
		var sColor = aPath.strokeColor;	
	} else {
		var sColor = false;
	};
	if (aPath.filled == true) {
		var fColor = aPath.fillColor;
	} else {
		var fColor = false;
	};
	
	if (sColor == false) {
		aPath.filled = false;	
	} else {
		aPath.filled = true;	
		aPath.fillColor = sColor;
	};
	if (fColor == false) {
		aPath.stroked = false;
	} else {
		aPath.stroked = true;
		aPath.strokeColor = fColor;
	};
}

