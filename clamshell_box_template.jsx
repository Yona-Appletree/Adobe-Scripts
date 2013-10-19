#target illustrator

var docRef = app.activeDocument;
var newLayerRef = docRef.layers.add();

var mmTOpt = 2.834645669;

var pBoxThickness = prompt("Cardboard Thickness (mm)", "2")*mmTOpt;
var pBoxLength = prompt("Interior Length (mm)", "191")*mmTOpt;
var pBoxDepth = prompt("Interior Depth (mm)",  "62")*mmTOpt;
var pBoxHeight = prompt("Interior Height (mm)", "62")*mmTOpt;
var strokeW = 2;

var foldColor = new RGBColor();
foldColor.red = 255;
foldColor.green = 23;
foldColor.blue = 24;

var cutColor = new RGBColor();
cutColor.red = 24;
cutColor.green = 255;
cutColor.blue = 99;

var y1 = -1 * (pBoxHeight*3 + pBoxDepth*2 + pBoxThickness*10);

var y2 = y1 + pBoxHeight;
var y3 = y2 - pBoxThickness*2;
var y4 = y2 - pBoxThickness;
var y5 = y2 + pBoxThickness;

var y6 = y2 + pBoxDepth;
var y7 = y6 - pBoxThickness*3;
var y8 = y6 + pBoxThickness/2;

var y9 = y6 + pBoxHeight;
var y10 = y9 - pBoxThickness;
var y11 = y9 + pBoxThickness;

var y12 = y9 + pBoxDepth;
var y13 = y12 + pBoxThickness;
var y14 = y13 + pBoxThickness;

var y15 = y12 + pBoxHeight;
var y16 = y15 -pBoxThickness;


var x1 = 10;
var x2 = x1 + pBoxThickness*2;

var x3 = x2 + pBoxDepth/3;
var x4 = x3 + pBoxDepth/3;

var x5 = x2 + pBoxDepth;
var x6 = x5 - pBoxThickness;
var x7 = x5 + pBoxThickness;
var x8 = x5 + pBoxThickness*2;

var x9 = x5 + pBoxLength;
var x10 = x9 - pBoxThickness*2;
var x11 = x9 - pBoxThickness;
var x12 = x9 + pBoxThickness;

var x13 = x9 + pBoxDepth/3;
var x14 = x13 + pBoxDepth/3;

var x15 = x9 + pBoxDepth;
var x16 = x15 - pBoxThickness*2;

var boxFold1 = newLayerRef.pathItems.add();
boxFold1.filled = false;
boxFold1.stroked = true;
boxFold1.strokeWidth = strokeW;
boxFold1.strokeColor = foldColor;
boxFold1.closed = false;
boxFold1.setEntirePath(new Array(
	[x8,  y1],
	[x8,  y4],
	[x6,  y2],
	[x12, y2],
	[x10, y4],
	[x10, y1]
));
var boxFold2 = newLayerRef.pathItems.add();
boxFold2.filled = false;
boxFold2.stroked = true;
boxFold2.strokeWidth = strokeW;
boxFold2.strokeColor = foldColor;
boxFold2.closed = false;
boxFold2.setEntirePath(new Array(
	[x1,  y8],
	[x5,  y8],
	[x6,  y6],
	[x12, y6],
	[x9,  y8],
	[x15, y8]
));
var boxFold3 = newLayerRef.pathItems.add();
boxFold3.filled = false;
boxFold3.stroked = true;
boxFold3.strokeWidth = strokeW;
boxFold3.strokeColor = foldColor;
boxFold3.closed = false;
boxFold3.setEntirePath(new Array(
	[x1,  y10],
	[x5,  y10],
	[x6,  y9],
	[x12, y9],
	[x9,  y10],
	[x15, y10]
));
var boxFold4 = newLayerRef.pathItems.add();
boxFold4.filled = false;
boxFold4.stroked = true;
boxFold4.strokeWidth = strokeW;
boxFold4.strokeColor = foldColor;
boxFold4.closed = false;
boxFold4.setEntirePath(new Array(
	[x8,  y15],
	[x8,  y13],
	[x6,  y12],
	[x12, y12],
	[x10, y13],
	[x10, y15]
));
var boxFold5 = newLayerRef.pathItems.add();
boxFold5.filled = false;
boxFold5.stroked = true;
boxFold5.strokeWidth = strokeW;
boxFold5.strokeColor = foldColor;
boxFold5.closed = false;
boxFold5.setEntirePath(new Array(
	[x1,  y11],
	[x6,  y11]
));
var boxFold6 = newLayerRef.pathItems.add();
boxFold6.filled = false;
boxFold6.stroked = true;
boxFold6.strokeWidth = strokeW;
boxFold6.strokeColor = foldColor;
boxFold6.closed = false;
boxFold6.setEntirePath(new Array(
	[x12,  y11],
	[x15,  y11]
));
var boxFold7 = newLayerRef.pathItems.add();
boxFold7.filled = false;
boxFold7.stroked = true;
boxFold7.strokeWidth = strokeW;
boxFold7.strokeColor = foldColor;
boxFold7.closed = false;
boxFold7.setEntirePath(new Array(
	[x5,  y8],
	[x5,  y10]
));
var boxFold8 = newLayerRef.pathItems.add();
boxFold8.filled = false;
boxFold8.stroked = true;
boxFold8.strokeWidth = strokeW;
boxFold8.strokeColor = foldColor;
boxFold8.closed = false;
boxFold8.setEntirePath(new Array(
	[x9,  y8],
	[x9,  y10]
));

var boxOutline = newLayerRef.pathItems.add();
boxOutline.filled = false;
boxOutline.stroked = true;
boxOutline.strokeWidth = strokeW;
boxOutline.strokeColor = cutColor;
boxOutline.closed = true;
boxOutline.setEntirePath(new Array(
	[x2,  y1],
	[x16, y1],
	[x16, y3],
	[x10, y4],
	[x11, (y4+y2)/2],
	[x12, y2],
	[x12, y6],
	[x9,  y8],
	[x12, y6],
	[x12, y5],
	[x15, y5],
	[x15, y12],
	[x14, y12],
	[x14, y13],
	[x13, y13],
	[x13, y12],
	[x12, y12],
	[x12, y9],
	[x9,  y10],
	[x12, y9],
	[x12, y12],
	[x10, y13],
/* 	[x1, y1], */
	[x13, y14],
	[x13, y16],
/* 	[x1, y1], */
	[x9,  y15],
	[x8,  y15],
/* 	[x1, y1], */
	[x4,  y16],
	[x4,  y14],
/* 	[x1, y1], */
	[x8,  y13],
	[x6,  y12],
	[x6,  y9],
	[x5,  y10],
	[x6,  y9],
	[x6,  y12],
	[x4,  y12],
	[x4,  y13],
	[x3,  y13],
	[x3,  y12],
	[x1,  y12],
	[x1,  y5],
	[x6,  y5],
	[x6,  y6],
	[x5,  y8],
	[x6,  y6],
	[x6,  y2],
	[x7,  (y4+y2)/2],
	[x8,  y4],
	[x2,  y3]
));

var boxNotch1 = newLayerRef.pathItems.add();
boxNotch1.filled = false;
boxNotch1.stroked = true;
boxNotch1.strokeWidth = strokeW;
boxNotch1.strokeColor = cutColor;
boxNotch1.closed = true;
boxNotch1.setEntirePath(new Array(
	[x3,  y8],
	[x3,  y7],
	[x4,  y7],
	[x4,  y8]
));
var boxNotch2 = newLayerRef.pathItems.add();
boxNotch2.filled = false;
boxNotch2.stroked = true;
boxNotch2.strokeWidth = strokeW;
boxNotch2.strokeColor = cutColor;
boxNotch2.closed = true;
boxNotch2.setEntirePath(new Array(
	[x13,  y8],
	[x13,  y7],
	[x14,  y7],
	[x14,  y8]
));
