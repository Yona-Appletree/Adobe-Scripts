#target illustrator

var docRef = app.activeDocument;
var newLayerRef = docRef.layers.add();

// MILLIMETERS TO POINTS CONSTANT
var _TO_POINTS = 2.834645669;

// PROMPTS FOR BOX VALUES
var pBoxThickness = prompt("Cardboard Thickness (mm)", "2")*_TO_POINTS;
var pBoxLength = prompt("Interior Length (mm)", "191")*_TO_POINTS;
var pBoxDepth = prompt("Interior Depth (mm)",  "62")*_TO_POINTS;
var pBoxHeight = prompt("Interior Height (mm)", "62")*_TO_POINTS;

// INITIALIZE STROKE PROPERTIES
var strokeW = 1;
var foldColor = new RGBColor();
foldColor.red = 255;
foldColor.green = 23;
foldColor.blue = 24;
var cutColor = new RGBColor();
cutColor.red = 24;
cutColor.green = 255;
cutColor.blue = 99;

// SETUP VALUES FOR BOX SIDES
var x_start = 10 + pBoxThickness + pBoxDepth + pBoxLength/2;
/* var y_start = -1 * (pBoxHeight*3 + pBoxDepth*2 + pBoxThickness*10); */
var y_start = -300 * _TO_POINTS;

// ILLUSTRATOR UNITS START AT TOP LEFT (SO - IS ADDITIVE)
var x_front_frontflap = pBoxLength/2 + pBoxThickness/2 + pBoxThickness;
var x_frontflap_edge  = x_front_frontflap + pBoxDepth; // maybe minus some

var x_bottom_top_edge = x_front_frontflap + pBoxThickness + pBoxThickness/2;

var x_back_side       = x_front_frontflap + pBoxThickness;
var x_side_edge       = x_back_side + pBoxDepth + pBoxThickness/2;
var x_sidenotch_1     = x_bottom_top_edge + pBoxDepth/3;
var x_sidenotch_2     = x_sidenotch_1 + pBoxDepth/3;

var x_frontcover_frontcoverflap  = x_front_frontflap + pBoxThickness;
var x_frontcoverflap_edge        = x_frontcover_frontcoverflap + pBoxDepth/2;


var y_front_edge      = y_start;
var y_front_bottom    = y_front_edge     + pBoxHeight + pBoxThickness/2;
var y_bottom_back     = y_front_bottom   + pBoxDepth  + pBoxThickness/2;
var y_back_top        = y_bottom_back    + pBoxHeight + pBoxThickness;
var y_top_frontcover  = y_back_top       + pBoxDepth  + pBoxThickness/2;
var y_frontcover_edge = y_top_frontcover + pBoxHeight + pBoxThickness;

var y_side_sidenotchflap         = y_bottom_back + pBoxThickness/2;
var y_side_sidefoldover          = y_back_top    - pBoxThickness;
var y_sidefoldover_sidetoothflap = y_back_top    + pBoxThickness;

var y_frontflap_bottomedge = y_front_bottom         - pBoxThickness;
var y_frontflap_clearance  = y_frontflap_bottomedge - pBoxThickness;

var y_sidenotchflap_topedge    = Math.max( y_side_sidenotchflap - pBoxLength/2 - pBoxThickness/2 - pBoxThickness*2 , y_frontflap_bottomedge);
var y_sidenotch_topedge        = y_side_sidenotchflap - pBoxThickness*2;
var y_sidetoothflap_bottomedge = y_sidefoldover_sidetoothflap + pBoxHeight + pBoxThickness/2;
var y_sidetooth_bottomedge     = y_sidetoothflap_bottomedge + pBoxThickness + pBoxThickness/2;

var y_frontcoverflap_topedge         = y_top_frontcover + pBoxThickness;
var y_frontcoverflap_topclearnace    = y_top_frontcover + pBoxThickness*3;
var y_frontcoverflap_bottomclearance = y_frontcover_edge - pBoxThickness*2;


// MAKE THE PATHS
var front_bottom_fold = newLayerRef.pathItems.add();
front_bottom_fold.filled = false;
front_bottom_fold.stroked = true;
front_bottom_fold.strokeWidth = strokeW;
front_bottom_fold.strokeColor = foldColor;
front_bottom_fold.closed = false;
front_bottom_fold.setEntirePath(new Array(
	[x_start+x_bottom_top_edge, y_front_bottom],
	[x_start-x_bottom_top_edge, y_front_bottom]
));
var bottom_back_fold = newLayerRef.pathItems.add();
bottom_back_fold.filled = false;
bottom_back_fold.stroked = true;
bottom_back_fold.strokeWidth = strokeW;
bottom_back_fold.strokeColor = foldColor;
bottom_back_fold.closed = false;
bottom_back_fold.setEntirePath(new Array(
	[x_start+x_bottom_top_edge,  y_bottom_back],
	[x_start-x_bottom_top_edge, y_bottom_back]
));
var back_top_fold = newLayerRef.pathItems.add();
back_top_fold.filled = false;
back_top_fold.stroked = true;
back_top_fold.strokeWidth = strokeW;
back_top_fold.strokeColor = foldColor;
back_top_fold.closed = false;
back_top_fold.setEntirePath(new Array(
	[x_start+x_bottom_top_edge,  y_back_top],
	[x_start-x_bottom_top_edge, y_back_top]
));
var top_frontcover_fold = newLayerRef.pathItems.add();
top_frontcover_fold.filled = false;
top_frontcover_fold.stroked = true;
top_frontcover_fold.strokeWidth = strokeW;
top_frontcover_fold.strokeColor = foldColor;
top_frontcover_fold.closed = false;
top_frontcover_fold.setEntirePath(new Array(
	[x_start+x_bottom_top_edge, y_top_frontcover],
	[x_start-x_bottom_top_edge, y_top_frontcover]
));
var sidenotchflap_side_fold = newLayerRef.pathItems.add();
sidenotchflap_side_fold.filled = false;
sidenotchflap_side_fold.stroked = true;
sidenotchflap_side_fold.strokeWidth = strokeW;
sidenotchflap_side_fold.strokeColor = foldColor;
sidenotchflap_side_fold.closed = false;
sidenotchflap_side_fold.setEntirePath(new Array(
	[x_start+x_back_side,  y_side_sidenotchflap],
	[x_start+x_side_edge,  y_side_sidenotchflap]
));
var side_sidefoldover_fold = newLayerRef.pathItems.add();
side_sidefoldover_fold.filled = false;
side_sidefoldover_fold.stroked = true;
side_sidefoldover_fold.strokeWidth = strokeW;
side_sidefoldover_fold.strokeColor = foldColor;
side_sidefoldover_fold.closed = false;
side_sidefoldover_fold.setEntirePath(new Array(
	[x_start+x_back_side,  y_side_sidefoldover],
	[x_start+x_side_edge,  y_side_sidefoldover]
));
var sidefoldover_sidetoothflap_fold = newLayerRef.pathItems.add();
sidefoldover_sidetoothflap_fold.filled = false;
sidefoldover_sidetoothflap_fold.stroked = true;
sidefoldover_sidetoothflap_fold.strokeWidth = strokeW;
sidefoldover_sidetoothflap_fold.strokeColor = foldColor;
sidefoldover_sidetoothflap_fold.closed = false;
sidefoldover_sidetoothflap_fold.setEntirePath(new Array(
	[x_start+x_bottom_top_edge,  y_sidefoldover_sidetoothflap],
	[x_start+x_side_edge,  y_sidefoldover_sidetoothflap]
));
var neg_sidenotchflap_side_fold = newLayerRef.pathItems.add();
neg_sidenotchflap_side_fold.filled = false;
neg_sidenotchflap_side_fold.stroked = true;
neg_sidenotchflap_side_fold.strokeWidth = strokeW;
neg_sidenotchflap_side_fold.strokeColor = foldColor;
neg_sidenotchflap_side_fold.closed = false;
neg_sidenotchflap_side_fold.setEntirePath(new Array(
	[x_start-x_back_side,  y_side_sidenotchflap],
	[x_start-x_side_edge,  y_side_sidenotchflap]
));
var neg_side_sidefoldover_fold = newLayerRef.pathItems.add();
neg_side_sidefoldover_fold.filled = false;
neg_side_sidefoldover_fold.stroked = true;
neg_side_sidefoldover_fold.strokeWidth = strokeW;
neg_side_sidefoldover_fold.strokeColor = foldColor;
neg_side_sidefoldover_fold.closed = false;
neg_side_sidefoldover_fold.setEntirePath(new Array(
	[x_start-x_back_side,  y_side_sidefoldover],
	[x_start-x_side_edge,  y_side_sidefoldover]
));
var neg_sidefoldover_sidetoothflap_fold = newLayerRef.pathItems.add();
neg_sidefoldover_sidetoothflap_fold.filled = false;
neg_sidefoldover_sidetoothflap_fold.stroked = true;
neg_sidefoldover_sidetoothflap_fold.strokeWidth = strokeW;
neg_sidefoldover_sidetoothflap_fold.strokeColor = foldColor;
neg_sidefoldover_sidetoothflap_fold.closed = false;
neg_sidefoldover_sidetoothflap_fold.setEntirePath(new Array(
	[x_start-x_bottom_top_edge,  y_sidefoldover_sidetoothflap],
	[x_start-x_side_edge,  y_sidefoldover_sidetoothflap]
));
var back_side_fold = newLayerRef.pathItems.add();
back_side_fold.filled = false;
back_side_fold.stroked = true;
back_side_fold.strokeWidth = strokeW;
back_side_fold.strokeColor = foldColor;
back_side_fold.closed = false;
back_side_fold.setEntirePath(new Array(
	[x_start+x_back_side,  y_side_sidenotchflap],
	[x_start+x_back_side,  y_side_sidefoldover]
));
var neg_back_side_fold = newLayerRef.pathItems.add();
neg_back_side_fold.filled = false;
neg_back_side_fold.stroked = true;
neg_back_side_fold.strokeWidth = strokeW;
neg_back_side_fold.strokeColor = foldColor;
neg_back_side_fold.closed = false;
neg_back_side_fold.setEntirePath(new Array(
	[x_start-x_back_side,  y_side_sidenotchflap],
	[x_start-x_back_side,  y_side_sidefoldover]
));
var front_frontflap_fold = newLayerRef.pathItems.add();
front_frontflap_fold.filled = false;
front_frontflap_fold.stroked = true;
front_frontflap_fold.strokeWidth = strokeW;
front_frontflap_fold.strokeColor = foldColor;
front_frontflap_fold.closed = false;
front_frontflap_fold.setEntirePath(new Array(
	[x_start+x_front_frontflap,  y_front_edge],
	[x_start+x_front_frontflap,  y_frontflap_bottomedge]
));
var neg_front_frontflap_fold = newLayerRef.pathItems.add();
neg_front_frontflap_fold.filled = false;
neg_front_frontflap_fold.stroked = true;
neg_front_frontflap_fold.strokeWidth = strokeW;
neg_front_frontflap_fold.strokeColor = foldColor;
neg_front_frontflap_fold.closed = false;
neg_front_frontflap_fold.setEntirePath(new Array(
	[x_start-x_front_frontflap,  y_front_edge],
	[x_start-x_front_frontflap,  y_frontflap_bottomedge]
));
var frontcover_frontcoverflap_fold = newLayerRef.pathItems.add();
frontcover_frontcoverflap_fold.filled = false;
frontcover_frontcoverflap_fold.stroked = true;
frontcover_frontcoverflap_fold.strokeWidth = strokeW;
frontcover_frontcoverflap_fold.strokeColor = foldColor;
frontcover_frontcoverflap_fold.closed = false;
frontcover_frontcoverflap_fold.setEntirePath(new Array(
	[x_start+x_frontcover_frontcoverflap,  y_frontcoverflap_topedge],
	[x_start+x_frontcover_frontcoverflap,  y_frontcover_edge]
));
var neg_frontcover_frontcoverflap_fold = newLayerRef.pathItems.add();
neg_frontcover_frontcoverflap_fold.filled = false;
neg_frontcover_frontcoverflap_fold.stroked = true;
neg_frontcover_frontcoverflap_fold.strokeWidth = strokeW;
neg_frontcover_frontcoverflap_fold.strokeColor = foldColor;
neg_frontcover_frontcoverflap_fold.closed = false;
neg_frontcover_frontcoverflap_fold.setEntirePath(new Array(
	[x_start-x_frontcover_frontcoverflap,  y_frontcoverflap_topedge],
	[x_start-x_frontcover_frontcoverflap,  y_frontcover_edge]
));

var box_outline_cut = newLayerRef.pathItems.add();
box_outline_cut.filled = false;
box_outline_cut.stroked = true;
box_outline_cut.strokeWidth = strokeW;
box_outline_cut.strokeColor = cutColor;
box_outline_cut.closed = true;
box_outline_cut.setEntirePath(new Array(
	[x_start+x_frontflap_edge, y_front_edge],
	[x_start+x_frontflap_edge, y_frontflap_clearance],
	[x_start+x_front_frontflap, y_frontflap_bottomedge],
	[x_start+x_bottom_top_edge, y_front_bottom],
	[x_start+x_bottom_top_edge, y_bottom_back],
	[x_start+x_back_side, y_side_sidenotchflap],
	[x_start+x_bottom_top_edge, y_bottom_back],
	[x_start+x_bottom_top_edge, y_sidenotchflap_topedge],
	[x_start+x_side_edge, y_sidenotchflap_topedge],
	[x_start+x_side_edge, y_sidetoothflap_bottomedge],
	[x_start+x_sidenotch_2, y_sidetoothflap_bottomedge],
	[x_start+x_sidenotch_2, y_sidetooth_bottomedge],
	[x_start+x_sidenotch_1, y_sidetooth_bottomedge],
	[x_start+x_sidenotch_1, y_sidetoothflap_bottomedge],
	[x_start+x_bottom_top_edge, y_sidetoothflap_bottomedge],
	[x_start+x_bottom_top_edge, y_back_top],
	[x_start+x_back_side, y_side_sidefoldover],
	[x_start+x_bottom_top_edge, y_back_top],
	[x_start+x_bottom_top_edge, y_top_frontcover],
	[x_start+x_frontcover_frontcoverflap, y_frontcoverflap_topedge],
	[x_start+x_frontcoverflap_edge, y_frontcoverflap_topclearnace],
	[x_start+x_frontcoverflap_edge, y_frontcoverflap_bottomclearance],
	[x_start+x_frontcover_frontcoverflap, y_frontcover_edge],

	[x_start-x_frontcover_frontcoverflap, y_frontcover_edge],
	[x_start-x_frontcoverflap_edge, y_frontcoverflap_bottomclearance],
	[x_start-x_frontcoverflap_edge, y_frontcoverflap_topclearnace],
	[x_start-x_frontcover_frontcoverflap, y_frontcoverflap_topedge],
	[x_start-x_bottom_top_edge, y_top_frontcover],
	[x_start-x_bottom_top_edge, y_back_top],
	[x_start-x_back_side, y_side_sidefoldover],
	[x_start-x_bottom_top_edge, y_back_top],
	[x_start-x_bottom_top_edge, y_sidetoothflap_bottomedge],
	[x_start-x_sidenotch_1, y_sidetoothflap_bottomedge],
	[x_start-x_sidenotch_1, y_sidetooth_bottomedge],
	[x_start-x_sidenotch_2, y_sidetooth_bottomedge],
	[x_start-x_sidenotch_2, y_sidetoothflap_bottomedge],
	[x_start-x_side_edge, y_sidetoothflap_bottomedge],
	[x_start-x_side_edge, y_sidenotchflap_topedge],
	[x_start-x_bottom_top_edge, y_sidenotchflap_topedge],
	[x_start-x_bottom_top_edge, y_bottom_back],
	[x_start-x_back_side, y_side_sidenotchflap],
	[x_start-x_bottom_top_edge, y_bottom_back],
	[x_start-x_bottom_top_edge, y_front_bottom],
	[x_start-x_front_frontflap, y_frontflap_bottomedge],
	[x_start-x_frontflap_edge, y_frontflap_clearance],
	[x_start-x_frontflap_edge, y_front_edge]
));

var sidenotch_cut = newLayerRef.pathItems.add();
sidenotch_cut.filled = false;
sidenotch_cut.stroked = true;
sidenotch_cut.strokeWidth = strokeW;
sidenotch_cut.strokeColor = cutColor;
sidenotch_cut.closed = true;
sidenotch_cut.setEntirePath(new Array(
	[x_start+x_sidenotch_1,  y_side_sidenotchflap],
	[x_start+x_sidenotch_2,  y_side_sidenotchflap],
	[x_start+x_sidenotch_2,  y_sidenotch_topedge],
	[x_start+x_sidenotch_1,  y_sidenotch_topedge]
));
var neg_sidenotch_cut = newLayerRef.pathItems.add();
neg_sidenotch_cut.filled = false;
neg_sidenotch_cut.stroked = true;
neg_sidenotch_cut.strokeWidth = strokeW;
neg_sidenotch_cut.strokeColor = cutColor;
neg_sidenotch_cut.closed = true;
neg_sidenotch_cut.setEntirePath(new Array(
	[x_start-x_sidenotch_1,  y_side_sidenotchflap],
	[x_start-x_sidenotch_2,  y_side_sidenotchflap],
	[x_start-x_sidenotch_2,  y_sidenotch_topedge],
	[x_start-x_sidenotch_1,  y_sidenotch_topedge]
));
