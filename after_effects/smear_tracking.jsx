// script for the Gleaning the Fifth Screen project
// maybe I should move it there...
//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//

function processComp(theComp){
	/* cycle through layers (there is only one movie so far) */
	for (var i = 1; i <= theComp.numLayers; i++){
		/* cycle through trackers */
		var myTrackers = theComp.layer(i).property("Motion Trackers");
		for (var m = 1; m <= mTrackers.numProperties; m++){
			alert( myTrackers.property(m).name );
			var currTrackPoint = myTrackers.property(m).property("Attach Point").valueAtTime(theFrame, true);
			var prevTrackPoint = myTrackers.property(m).property("Attach Point").valueAtTime(theFrame-1, true);
		}
		/* cycle through effects */
		var myEffects = theComp.layer(i).property("Effects");
		for (var e = 1; e <= myEffects.numProperties; e++){
			alert(myEffects.property(e).name);
			myEffects.property(e).property("From").setValueAtTime(theFrame-1, -100);
			myEffects.property(e).property("To").setValueAtTime(  theFrame-1, -100);
			myEffects.property(e).property("From").setValueAtTime(theFrame-1, theTrackPoint);
			myEffects.property(e).property("To").setValueAtTime(  theFrame-1, theTrackPoint-1);
		}
	}
}
function main(){
	var myComp = app.project.activeItem;
	if (myComp == null || !(myComp instanceof CompItem)){
		alert ("No comp selected.");
		return;
	}
	processComp(myComp);
}
main()