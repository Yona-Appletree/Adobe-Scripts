#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, mister.");
} else {
	// how to scale objects
	var pHow = prompt("random or linear?", "random");

	if (pHow == "linear" || pHow == "Linear") {
		var pStartScale = prompt("Start Scale Percent?", "10")*1;
		var pEndScale = prompt("End Scale Percent?", "100")*1;
		for ( i = 0; i < selRef.length; ++i ) {
			pScale = pStartScale + (((pEndScale-pStartScale) / selRef.length) * i)
			selRef[i].resize(pScale,pScale);
		}
	} else if (pHow == "random" || pHow == "Random") {
		var pMinScale = prompt("Minimum Scale Percent?", "10")*1;
		var pMaxScale = prompt("Maximum Scale Percent?", "100")*1;
		for ( i = 0; i < selRef.length; ++i ) {
			pScale = (Math.random()*pMaxScale)+pMinScale
			selRef[i].resize(pScale,pScale);
		}
	}
}
