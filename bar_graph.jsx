var doc = app.documents[0];
var layr = doc.layers[0];

// an array of values
var items1 = [ 1, 2, 3, 4 ];
// % to change the length of values
var valueShift = 400;
// how far to offset the text
var textLeft = -10;
var barThickness = 5;
var barSeparator = 1;

for (i=0; i<items1.length; i++) {
	var amount1 = items1[i] * valueShift/100;

  var rect1 = layr.pathItems.rectangle( i*-(barThickness+barSeparator), 0, amount1, barThickness );

	var cmykColor1 = new CMYKColor();
	cmykColor1.cyan = 0;
	cmykColor1.yellow = 0;
	cmykColor1.magenta = 0;
	cmykColor1.black = 20;
	rect1.filled = true;
	rect1.fillColor = cmykColor1;

	var bgttxt1 = doc.textFrames.add();
	bgttxt1.left = textLeft;
	bgttxt1.top = i*-(barThickness+barSeparator)+barThickness;
	bgttxt1.contents = items1[i];
	bgttxt1.textRange.characterAttributes.size = 7;
}

