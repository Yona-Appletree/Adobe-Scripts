//
// created by JK Keller, dilettante coder
// http://jk-keller.com
//

var selRef = activeDocument.selection;

var doc = app.documents[0];
var layr = doc.layers[0];

for (i=0; i<selRef.length; ++i) {
	var pathRef = selRef[i];
	var radius = pathRef.width/2;
	var myarea = Math.round(Math.PI * (radius*radius))*.1;
	var areatxt = doc.textFrames.add();
	areatxt.left = pathRef.left + pathRef.width + 10;
	areatxt.top = pathRef.top - (pathRef.height/2) + 5;
	areatxt.contents = myarea + " mil";
	areatxt.textRange.characterAttributes.size = 10;
}

/* var items = [ 1781000, 2320054, 1732320, 2314470, 2480100, 479816, 11107760, 2402248, 24852302, 38362310, 2425407, 1000000, 3978708, 3401747, 2670479, 1823192, 6710948, 5801000, 2382367, 4454794, 280255, 577668, 214459, 564029, 36285053, 870000, 3589598, 6218926, 4031470, 7004127, 1763619, 1000000, 24477740, 22432240, 16202572, 12917476, 6326649, 9147566, 757496, 67783999, 6512507, 17005071, 23517578, 21525242, 825000, 2454361, 4219387, 831000, 29854990, 220281670, 124999802, 124999802, 345281472, 257844, 2000000, 1741169, 7753912, 8344364, 6029003, 20982506, 36205323, 10000000, 7208196, 5206683, 8051877, 22852368, 5182310, 15692704, 12845776, 11775477, 2309025, 900319, 36219482, 13879188, 5163749, 6950334, 247551609 ]; */
var items = [ 8075000 ];

for (i=0; i<items.length; i++) {
	var area = items[i] / 1000;
	var radius = Math.sqrt(((area*2)) / Math.PI);

//	var radius = Math.sqrt(area / Math.PI) * .05;
	var budget = layr.pathItems.ellipse(i*-20, 50, radius, radius, true, false);
	var bgttxt = doc.textFrames.add();
	bgttxt.left = 100;
	bgttxt.top = i*-20 - (radius / 2) + 5;
	bgttxt.contents = items[i];
	bgttxt.textRange.characterAttributes.size = 10;
}

var area = Math.PI * (radius*radius);
var radius = Math.sqrt(area / Math.PI);
var circumference = 2 * Math.PI * radius;

