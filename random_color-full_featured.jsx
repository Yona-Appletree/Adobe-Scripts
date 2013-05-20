#target illustrator

var docRef = app.activeDocument;
var selRef = docRef.selection;

if (selRef.length == 0) {
	alert("You gotta select something, babe.");
} else {
	var pKind = prompt("Kind of Color? (RGB, CMYK, HSB, B/W, full):", "full");

	if (pKind == "full" || pKind == "Full") {
		var pRed = 255;
		var pBlue = 255;
		var pGreen = 255;
	
	} else if (pKind == "RGB" || pKind == "rgb") {
		var pRed = prompt("Red Amount? (0-255):",255);
		var pBlue = prompt("Green Amount? (0-255):",255);
		var pGreen = prompt("Blue Amount? (0-255):",255);
	
	} else if (pKind == "CMYK" || pKind == "cmyk") {
		var pCyan = prompt("Cyan Amount? (0-100):",100);
		var pMagenta = prompt("Magenta Amount? (0-100):",100);
		var pYellow = prompt("Yellow Amount? (0-100):",100);
		var pBright = prompt("Black Amount? (0-100):",0);
	
	} else if (pKind == "HSB" || pKind == "hsb") {
		var pHue = prompt("Hue Amount? Negative numbers not randomized (0-360):",360);
		var pSat = prompt("Saturation Amount? Negative numbers not randomized (0-1):",-1);
		var pBright = prompt("Brightness Amount? Negative numbers not randomized (0-1):",-1);
	}
	
	for (i=0; i<selRef.length; ++i) {
		var pathRef = selRef[i];
		if (pKind == "HSB" || pKind == "hsb") {
			if (pHue > 0) {
				var tHue = Math.random() * pHue;
			} else {
				var tHue = pHue * -1;
			}
			if (pSat > 0) {
				var tSat = Math.random() * pSat;
			} else {
				var tSat = pSat * -1;
			}
			if (pBright > 0) {
				var tBright = Math.random() * pBright;
			} else {
				var tBright = pBright * -1;
			}
			var fillRGB = hsb2rgb(tHue, tSat, tBright);
			var fillColor = new RGBColor();
			fillColor.red = fillRGB[0];
			fillColor.green = fillRGB[1];
			fillColor.blue = fillRGB[2];
			if (pHue > 0) {
				var tHue = Math.random() * pHue;
			} else {
				var tHue = pHue * -1;
			}
			if (pSat > 0) {
				var tSat = Math.random() * pSat;
			} else {
				var tSat = pSat * -1;
			}
			if (pBright > 0) {
				var tBright = Math.random() * pBright;
			} else {
				var tBright = pBright * -1;
			}
			var strokeRGB = hsb2rgb(tHue, tSat, tBright);
			var strokeColor = new RGBColor();
			strokeColor.red = strokeRGB[0];
			strokeColor.green = strokeRGB[1];
			strokeColor.blue = strokeRGB[2];
		} else if (pKind == "full" || pKind == "RGB" || pKind == "Full" || pKind == "rgb") {
			var fillColor = new RGBColor();
			fillColor.red = Math.random() * pRed;
			fillColor.green = Math.random() * pBlue;
			fillColor.blue = Math.random() * pGreen;
			var strokeColor = new RGBColor();
			strokeColor.red = Math.random() * pRed;
			strokeColor.green = Math.random() * pBlue;
			strokeColor.blue = Math.random() * pGreen;
		} else if (pKind == "B/W" || pKind == "b/w") {
			var tmpWhich = 255 * Math.round(Math.random()*1);
			var fillColor = new RGBColor();
			fillColor.red = tmpWhich;
			fillColor.green = tmpWhich;
			fillColor.blue = tmpWhich;
			var tmpWhich = 255 * Math.round(Math.random()*1);
			var strokeColor = new RGBColor();
			strokeColor.red = tmpWhich;
			strokeColor.green = tmpWhich;
			strokeColor.blue = tmpWhich;
		} else if (pKind == "CMYK" || pKind == "cmyk") {
			var fillColor = new CMYKColor();
			fillColor.cyan = Math.random() * pCyan;
			fillColor.magenta = Math.random() * pMagenta;
			fillColor.yellow = Math.random() * pYellow;
			fillColor.black = Math.random() * pBright;
			var strokeColor = new CMYKColor();
			strokeColor.cyan = Math.random() * pCyan;
			strokeColor.magenta = Math.random() * pMagenta;
			strokeColor.yellow = Math.random() * pYellow;
			strokeColor.black = Math.random() * pBright;
		}
	
		if (pathRef.filled == true) {
			pathRef.fillColor = fillColor;
		}
		if (pathRef.stroked == true) {
			pathRef.strokeColor = strokeColor;
		}
	}
}

function hsb2rgb(aH, aS, aB) {
	// I forget where I got this conversion function... sorry.
	hsb_arr = new Array(aH, aS, aB);
	rgb_arr = new Array(0,0,0);

	if (!hsb_arr[1]) {
		if (hsb_arr[0] === null) {
			rgb_arr[0] = rgb_arr[1] = rgb_arr[2] = hsb_arr[2];
		} else {
			return false;
		}
	} else {
		if (hsb_arr[0] == 360) {
			hsb_arr[0] = 0;
		}
		hsb_arr[0] /= 60;
		v_i = Math.floor(hsb_arr[0]);
		v_f = hsb_arr[0] - v_i;
		v_p = hsb_arr[2] * (1 - hsb_arr[1]);
		v_q = hsb_arr[2] * (1 - (hsb_arr[1] * v_f));
		v_t = hsb_arr[2] * (1 - (hsb_arr[1] * (1 - v_f)));
		switch (v_i) {
			case 0:
				rgb_arr[0] = hsb_arr[2];
				rgb_arr[1] = v_t;
				rgb_arr[2] = v_p;
				break;
			case 1:
				rgb_arr[0] = v_q;
				rgb_arr[1] = hsb_arr[2];
				rgb_arr[2] = v_p;
				break;
			case 2:
				rgb_arr[0] = v_p;
				rgb_arr[1] = hsb_arr[2];
				rgb_arr[2] = v_t;
				break;
			case 3:
				rgb_arr[0] = v_p;
				rgb_arr[1] = v_q;
				rgb_arr[2] = hsb_arr[2];
				break;
			case 4:
				rgb_arr[0] = v_t;
				rgb_arr[1] = v_p;
				rgb_arr[2] = hsb_arr[2];
				break;
			case 5:
				rgb_arr[0] = hsb_arr[2];
				rgb_arr[1] = v_p;
				rgb_arr[2] = v_q;
				break;
		}
	}
	for (v_c=0; v_c<3; v_c++) {
		rgb_arr[v_c] = Math.round(rgb_arr[v_c] * 255);
	}
	return rgb_arr;
}
