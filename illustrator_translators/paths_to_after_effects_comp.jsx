//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//

#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, mister.");
} else {
}

#target aftereffects

var jkComp = app.project.activeItem;

var jkShapes = ;
var jkOuts = ;
var jkIns = ;
var jkColors = ;

for (k=0; k<jkShapes.length; k++) {
	for (j=0; j<jkShapes[k].length; j++) {
		jkShapes[k][j][0]+=3000;
		jkShapes[k][j][1]+=3000;
	}
}

for (i=0; i<jkShapes.length; i++) {
	// layer 1 is a solid
	var jkSolid = jkComp.layers.addSolid(jkColors[i], i, 6000, 6000, 1);
	
	var jkMask = jkSolid.Masks.addProperty("Mask");
	jkMask.inverted = false;
	
	var jkMaskShape = jkMask.property("maskShape");
	
	var jkShape = jkMaskShape.value;
//	alert(jkShapes[i][1]);
	jkShape.vertices = jkShapes[i];
	jkShape.inTangents = jkIns[i];
	jkShape.outTangents = jkOuts[i];
	jkShape.closed = true;
	
	jkMaskShape.setValue(jkShape);
	
	jkSolid.opacity.setValue(33);
	jkSolid.blendingMode = BlendingMode.MULTIPLY;
	jkSolid.startTime = (jkShapes.length - i)/30;
};

