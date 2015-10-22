#target illustrator
function coordToMm(coord) { return Math.round(coord / .02834645)/100; }
function mmToCoord(mm) { return mm*100*.02834645; }

Array.prototype.forEach = function(cb) { for (var i=0; i<this.length; i++) cb(this[i], i) }
Array.prototype.map = function(cb) { var res = []; for (var i=0; i<this.length; i++) res.push(cb(this[i], i)); return res; }
var ORIGIN_UNMODIFIED = 0;
var ORIGIN_CENTER = 1;
var ORIGIN_LOWERLEFT = 2;

var OUTPUT_POLYGONS = 0;
var OUTPUT_CENTERS = 1;


var docRef = app.activeDocument;
var selRef = docRef.selection;
var options;

if (selRef.length == 0) {
  alert("You gotta select something, buster.");
} else {
  main();
}

function pointsCenter(points) {
  var sum = {x:0, y:0};
  points.forEach(function(pt){ sum.x += pt.x; sum.y += pt.y; });
  return {x: sum.x / points.length, y: sum.y / points.length};
}

function pointsBounds(points) {
  var bounds = {
    min: {x: +1e10, y: +1e10},
    max: {x: -1e10, y: -1e10}
  };

  points.forEach(function(pt){ 
    bounds.min.x = Math.min(bounds.min.x, pt.x);
    bounds.min.y = Math.min(bounds.min.y, pt.y);
    
    bounds.max.x = Math.max(bounds.max.x, pt.x);
    bounds.max.y = Math.max(bounds.max.y, pt.y);
  });

  return bounds;
}

function strPointMm(pt) {
  return "["+coordToMm(pt.x) + ", "+coordToMm(pt.y)+"]";
}

function pointsForPath(pathRef) {
   var points = [];
   for (var j=0; j<pathRef.pathPoints.length; j++) {
     points.push({x: pathRef.pathPoints[j].anchor[0], y: pathRef.pathPoints[j].anchor[1]});
   }
 
   return points;
}

function handlePathRef(pathRef, allPoints, paths) {
  allPoints = allPoints || [];
  paths = paths || [];
  
  if (pathRef.typename == "GroupItem") {
    var shapes = [];
    
    for (var i=0; pathRef.pageItems && i<pathRef.pageItems.length; i++) {
      handlePathRef(pathRef.pageItems[i]).forEach(function(s){ shapes.push(s); });
    }
  
    return shapes;
  } else if (pathRef.typename == "CompoundPathItem") {
    for (var i=0; pathRef.pathItems && i<pathRef.pathItems.length; i++) {
      handlePathRef(pathRef.pathItems[i], allPoints, paths);
    }
    return paths.length > 1 
      ? [{ points: allPoints, paths: paths }] 
      : [{ points : allPoints }];
  } else if (pathRef.pathPoints) {
     interpolatePathPoints(pathRef, options.divisionLength);
     
     var path = [];
     pointsForPath(pathRef)
       .forEach(function(pt){
         path.push(allPoints.length);
         allPoints.push(pt);
       });
     paths.push(path);
     
     return paths.length > 1 
      ? [{ points: allPoints, paths: paths }] 
      : [{ points : allPoints }];
  } else {
    return [];
  }
}

function main() {
  options = showOptionsDialog();

  // Expand Styles so we get rounded corners and such
  // app.executeMenuCommand('expandStyle');
  
  var strScadCode = "";
  
  var shapes = [];
  
  // Recursively handle each object in the current selection
  for (i=0; i<selRef.length; i++) {
    // Duplicate the shape so we can do point expansion without modifying the users' shape
    var newRef = selRef[i].duplicate(docRef, ElementPlacement.PLACEATEND);
    
    // Add all the shapes resulting from this path
    handlePathRef(newRef).forEach(function(s){ shapes.push(s); });

    // Remove the new shape
    newRef.remove();
  }

  var allPoints = [];
  shapes.forEach(function(shape) { shape.points.forEach(function(pt){ allPoints.push(pt); }); });
  
  var bounds = pointsBounds(allPoints);
  var center = pointsCenter(allPoints);
  
  shapes.forEach(function(shape){
    var modifiedPoints = shape.points.map(function(pt) {
      if (options.originMode == ORIGIN_CENTER) {
        pt = {x: pt.x-center.x, y: pt.y-center.y};
      } else if (options.originMode == ORIGIN_LOWERLEFT) {
        pt = {x: pt.x-bounds.min.x, y: pt.y-bounds.min.y};
      }
      
      return pt;
    });
  
    if (options.outputMode == OUTPUT_POLYGONS) {
      if (shape.paths) {
        strScadCode += "polygon(\n\tpoints=[\n\t\t"
          + modifiedPoints
              .map(strPointMm)
              .join(", ")
          + "\n\t],\n\tpaths=[\n\t\t"
          + shape.paths.map(function(path){ return "[" + path.join(", ") + "]" }).join(",\n\t\t")
          + "]\n);\n";
      } else {
       strScadCode += "polygon(points=["
        + modifiedPoints
            .map(strPointMm)
            .join(", ")
        + "]);\n";
      }
    } else if (options.outputMode == OUTPUT_CENTERS) {
      strScadCode += strPointMm(pointsCenter(modifiedPoints)) + ", ";
    }
  });

  if (options.outputMode == OUTPUT_CENTERS) {
    strScadCode = "[" + strScadCode.replace(/, $/, "") + "]";
  }

  if (options.includeBounds) {
    strScadCode += "\n";
    strScadCode += "bounds=[" + strPointMm(bounds.min) + ", "+ strPointMm(bounds.max) +"];";
  }

  prompt("Copy This to OpenSCAD", strScadCode);
    
/*
  var tName = prompt("Document Name \r .scad extension added automatically. Will overwrite files without warning!", "output");
  if (tName != null) {
    var textFile = File('~/Desktop/'+tName+'.scad');
    textFile.lineFeed = "Unix";
    textFile.open('w');
    // Automatically add some extrusion, as that's likely what you'll do here
    textFile.writeln("linear_extrude(height = 10, center = false) {\n");
    textFile.writeln(strPolygons);
    textFile.writeln("}");
    textFile.close();

    alert("Yay! Check your desktop.");
  }
    */
}

function showOptionsDialog() {
  var w = new Window ("dialog", "Export Shapes to OpenSCAD");
  w.orientation = "column";
  w.alignChildren = "left";

  var originPanel = w.add ("panel");
  originPanel.alignChildren = "left";
  originPanel.text = "Coordinate Origin";
  var originDontModifyRadio = originPanel.add("radiobutton", undefined, "Don't Modify");
  var originCenterRadio = originPanel.add("radiobutton", undefined, "Center");
  var originLowerLeftRadio = originPanel.add("radiobutton", undefined, "Lower Left");
  // set dialog defaults
  originCenterRadio.value = true;
  
  var dividePanel = w.add("panel");
  dividePanel.orientation = "row";
  dividePanel.text = "Point Division (mm)";

  var divisionLengthSlider = dividePanel.add ("slider", undefined, 5, .1, 100);
  var divisionLengthText = dividePanel.add ('edittext {text: 0, characters: 3, justify: "center"}');
  divisionLengthText.onChanging = function () { divisionLengthSlider.value = divisionLengthText.text; };
  divisionLengthSlider.onChanging = function () { divisionLengthText.text = divisionLengthSlider.value; };
  divisionLengthSlider.onChanging();
  
  var modePanel = w.add ("panel");
  modePanel.alignChildren = "left";
  modePanel.text = "Output Mode";
  var polygonModeRadio = modePanel.add("radiobutton", undefined, "Polygons");
  var centersModeRadio = modePanel.add("radiobutton", undefined, "Centers");
  //var polyhedronModeRadio = modePanel.add("radiobutton", undefined, "Polyhedrons");
  //var pointsModeRadio = modePanel.add("radiobutton", undefined, "Points");
  var generateBoundsCheckbox = modePanel.add("checkbox", undefined, "Generate Bounds");
  // set dialog defaults
  polygonModeRadio.value = true;

  var buttonPanel = w.add ("group");
  buttonPanel.orientation = "row";
  buttonPanel.add ("button", undefined, "OK");
  buttonPanel.add ("button", undefined, "Cancel");

  w.show();
  
  return {
    originMode: originCenterRadio.value ? ORIGIN_CENTER : (originLowerLeftRadio.value ? ORIGIN_LOWERLEFT : ORIGIN_UNMODIFIED),
    divisionLength: mmToCoord(divisionLengthSlider.value),
    outputMode: centersModeRadio.value ? OUTPUT_CENTERS : OUTPUT_POLYGONS,
    includeBounds: generateBoundsCheckbox.value
  };
}

// Path Divide Script from http://design.tutsplus.com/articles/20-free-and-useful-adobe-illustrator-scripts--vector-3849
// Downloaded from http://cdn.tutsplus.com/vector/uploads/legacy/articles/2010/article_illustrator_plugin_scripts/scripts/Dividelength.zip
// Created by Hiroyuki Sato

function pointsEqual() {
  for (var i=0; i<arguments.length; i++) {
    for (var k=0; k<arguments.length; k++) {
      if (arguments[i][0] != arguments[k][0] || arguments[i][1] != arguments[k][1]) return false;
    }
  }

  return true;
}

function interpolatePathPoints(path, divisionLength) {
		// This function derived from the original main() function in the original script
    var p = path.pathPoints;
    if (typeof(divisionLength) !== "number") divisionLength = 25;
    if (divisionLength < 1) divisionLength = 1;
    if (divisionLength > 100) divisionLength = 100;

    var i, j, k, q, n;
  	var pnts=[], len, ar, modifiedFlag=false;

    for(i = 0; i < p.length; i++){
      j = parseIdx(p, i + 1);
      if(j < 0) break;
      if(! sideSelection(p[i], p[j])) continue;
      
      // Skip simple points.
      if(pointsEqual(p[i].anchor, p[i].leftDirection, p[i].rightDirection) && pointsEqual(p[j].anchor, p[j].leftDirection, p[j].rightDirection)) continue;

      ar = [i];
      q = [p[i].anchor, p[i].rightDirection, p[j].leftDirection, p[j].anchor];
      //len = getT4Len(q, 0) / n;
      len = divisionLength;
      n = getT4Len(q, 0) / len;
      
      if(len <= 0) continue;

      modifiedFlag = true;

      for(k = 1; k < n; k++){
        ar.push( getT4Len(q, len * k) );
      }
      pnts.push(ar);
    }

    if (modifiedFlag) addPnts(path, pnts, false);
}

// ----------------------------------------------
// addPnts: adds anchors to pathitem "pi"
// an example of usage:
/* var pi=activeDocument.selection[0];
var pnts = [ [0,  0.3,0.8,0.5],
             [3,  0.5] ];  // [ [i, t,t,t,t...],[i, t,t..
addPnts(pi,pnts,true);
 */
function addPnts(pi, pnts, need2sort){ // target pathItem, list, need to sort the parameters
  // pnts = [ [index,  t,t,t,t...],[index,  t,t..
  // items must be ordered by index
  // an item without t ([index]) is acceptable.  an empty allay is not acceptable.
  // an index out of bounds is acceptable.  the range of t is 0 < t < 1.
  var p = pi.pathPoints;
  var pnts2 = [];
  var adjNextLDir  = 0;
  var adjFirstLDir = 0;
  var idx = (pi.closed && pnts[pnts.length-1][0] == p.length - 1) ? 0 : pnts[0][0];
  var ar = pnts.shift();
  var nidx = ar.shift();
  var j, pnt, q;
  for(var i = idx; i < p.length; i++){
    pnts2.push( getDat(p[i]) );
    if(adjNextLDir > 0){
      pnts2[pnts2.length-1][2] = adjHanP(p[i],0,1-adjNextLDir);
    }
    if(nidx == i){
      if(ar.length > 0){
        if(need2sort){
          ar.sort();
          ar = getUniq(ar);
        }
        if(i == p.length - 1 && idx == 0){
          adjFirstLDir = ar[ar.length-1];
        }
        pnts2[pnts2.length - 1][1] = adjHanP(p[i], 1, ar[0]),
        ar.unshift(0);
        ar.push(1);
        nxi = parseIdx(p,i + 1);
        if(nxi < 0) break;
        q = [p[i].anchor, p[i].rightDirection,
             p[nxi].leftDirection, p[nxi].anchor];
        if(arrEq(q[0], q[1]) && arrEq(q[2], q[3])){
          for(j = 1; j < ar.length - 1; j++){
            pnt = bezier(q, ar[j]);
            pnts2.push( [pnt, pnt, pnt, PointType.CORNER] );
          }
        } else {
          for(j = 1; j < ar.length - 1; j++){
            pnts2.push( getDivPnt(q, ar[j-1], ar[j], ar[j+1]) );
          }
        }
         adjNextLDir = ar[ar.length - 2];
      } else {
        adjNextLDir = 0;
      }
      if(pnts.length > 0){
        ar = pnts.shift();
        nidx = ar.shift();
      }
    } else {
      adjNextLDir = 0;
    }
  }
  if(adjFirstLDir > 0) pnts2[0][2] = adjHanP(p[0], 0, 1 - adjFirstLDir);
  if(pnts2.length > 0) applyData2AfterIdx(p, pnts2, idx - 1);
}
// ----------------------------------------------
function getUniq(ar){ // Array (sorted)
  if(ar.length < 2) return ar;
  var ar2 = [ ar[0] ];
  var torelance = 0.01;
  for(var i = 1; i < ar.length; i++){
    if(ar[i] - ar2[ ar2.length - 1 ] > torelance) ar2[ar2.length] = ar[i];
  }
  return ar2;
}
// ----------------------------------------------
// returns an array for properties of a pathpoint
function getDat(p){ // pathPoint
  with(p) return [anchor, rightDirection, leftDirection, pointType];
}
// ----------------------------------------------
// magnifies a handle by m
function adjHanP(p, n, m){ // p=pathpoint, n=0:leftDir, n=1:rightDir, m=magnification rate
  with(p){
    var d = (n == 1 ? rightDirection : leftDirection);
    return [anchor[0] + (d[0] - anchor[0]) * m,
            anchor[1] + (d[1] - anchor[1]) * m];
  }
}
// ----------------------------------------------
// returns an array for properties of a pathpoint
// that corresponds to the parameter "t1"
// q=4 points, t0-2=parameters, anc=coordinate of anchor
function getDivPnt(q, t0, t1, t2, anc){
  if(!anc) anc = bezier(q, t1);
  var r = defDir(q,1, t1, anc, (t2 - t1) / (1 - t1));
  var l = defDir(q,0, t1, anc, (t1 - t0) / t1);
  return [ anc, r, l, PointType.SMOOTH ];
}
// ----------------------------------------------
// returns the [x, y] coordinate of the handle of the point on the bezier curve
// that corresponds to the parameter "t"
// q=4 points, t=paramter, anc=coordinate of anchor, m=magnification ratio
function defDir(q, n, t, anc, m){ // n=0:ldir, n=1:rdir
  var dir = [ t * (t * (q[n][0] - 2 * q[n+1][0] + q[n+2][0]) + 2 * (q[n+1][0] - q[n][0])) + q[n][0],
              t * (t * (q[n][1] - 2 * q[n+1][1] + q[n+2][1]) + 2 * (q[n+1][1] - q[n][1])) + q[n][1]];
  return [anc[0] + (dir[0] - anc[0]) * m,
          anc[1] + (dir[1] - anc[1]) * m];
}
// ----------------------------------------------
// return the [x, y] coordinate on the bezier curve
// that corresponds to the paramter "t"
function bezier(q, t) {
  var u = 1 - t;
  return [u*u*u * q[0][0] + 3*u*t*(u* q[1][0] + t* q[2][0]) + t*t*t * q[3][0],
          u*u*u * q[0][1] + 3*u*t*(u* q[1][1] + t* q[2][1]) + t*t*t * q[3][1]];
}
// ----------------------------------------------
function applyData2Path(p, pnts){ // pathpoint, list
// (format:[[ anchor, rightDirection, leftDirection, poinType ],...]
  if(pnts.length<1) return;

  var pt;

  while(p.length > pnts.length){
    p[ p.length - 1 ].remove();
  }

  for(var i = 0; i < pnts.length; i++){
    pt = i < p.length ? p[i] : p.add();
    with(pt){
      anchor         = pnts[i][0];
      rightDirection = pnts[i][1];
      leftDirection  = pnts[i][2];
      pointType      = pnts[i][3];
    }
  }
}
// ----------------------------------------------
function applyData2AfterIdx(p, pnts, idx){ // pathpoint, list, index
  if(idx == null || idx < 0){
    applyData2Path(p, pnts);
    return;
  }
  var pt;

  while(p.length-1 > idx){
    p[p.length-1].remove();
  }

  for(var i = 0; i < pnts.length; i++){
    pt = p.add();
    with(pt){
      anchor         = pnts[i][0];
      rightDirection = pnts[i][1];
      leftDirection  = pnts[i][2];
      pointType      = pnts[i][3];
    }
  }
}

// ------------------------------------------------
// returns true, if a segment between pathpoints ps1 and ps2 is selected
function sideSelection(ps1, ps2) {
  return (ps1.selected != PathPointSelection.NOSELECTION
      && ps1.selected != PathPointSelection.LEFTDIRECTION
      && ps2.selected != PathPointSelection.NOSELECTION
      && ps2.selected != PathPointSelection.RIGHTDIRECTION);
}
// ------------------------------------------------
// if the contents of both arrays are equal, return true (lengthes must be same)
function arrEq(arr1, arr2) {
  for(var i in arr1){
    if (arr1[i] != arr2[i]){
      return false;
    }
  }
  return true;
}

// ------------------------------------------------
// return the bezier curve parameter "t"
// at the point which the length of the bezier curve segment
// (from the point start drawing) is "len"
// when "len" is 0, return the length of whole this segment.
function getT4Len(q, len){
  var m = [q[3][0] - q[0][0] + 3 * (q[1][0] - q[2][0]),
           q[0][0] - 2 * q[1][0] + q[2][0],
           q[1][0] - q[0][0]];
  var n = [q[3][1] - q[0][1] + 3 * (q[1][1] - q[2][1]),
           q[0][1] - 2 * q[1][1] + q[2][1],
           q[1][1] - q[0][1]];
  var k = [ m[0] * m[0] + n[0] * n[0],
            4 * (m[0] * m[1] + n[0] * n[1]),
            2 * ((m[0] * m[2] + n[0] * n[2]) + 2 * (m[1] * m[1] + n[1] * n[1])),
            4 * (m[1] * m[2] + n[1] * n[2]),
            m[2] * m[2] + n[2] * n[2]];

   var fullLen = getLength(k, 1);

  if(len == 0){
    return fullLen;

  } else if(len < 0){
    len += fullLen;
    if(len < 0) return 0;

  } else if(len > fullLen){
    return 1;
  }

  var t, d;
  var t0 = 0;
  var t1 = 1;
  var torelance = 0.001;

  for(var h = 1; h < 30; h++){
    t = t0 + (t1 - t0) / 2;
    d = len - getLength(k, t);

    if(Math.abs(d) < torelance) break;
    else if(d < 0) t1 = t;
    else t0 = t;
  }

  return t;
}

// ------------------------------------------------
// return the length of bezier curve segment
// in range of parameter from 0 to "t"
// "m" and "n" are coefficients.
function getLength(k, t){
  var h = t / 128;
  var hh = h * 2;

  var fc = function(t, k){
    return Math.sqrt(t * (t * (t * (t * k[0] + k[1]) + k[2]) + k[3]) + k[4]) || 0 };

  var total = (fc(0, k) - fc(t, k)) / 2;

  for(var i = h; i < t; i += hh){
    total += 2 * fc(i, k) + fc(i + h, k);
  }

  return total * hh;
}

// ------------------------------------------------
// extract PathItems from the selection which length of PathPoints
// is greater than "n"
function getPathItemsInSelection(n, pathes){
  if(documents.length < 1) return;

  var s = activeDocument.selection;

  if (!(s instanceof Array) || s.length < 1) return;

  extractPathes(s, n, pathes);
}

// --------------------------------------
// extract PathItems from "s" (Array of PageItems -- ex. selection),
// and put them into an Array "pathes".  If "pp_length_limit" is specified,
// this function extracts PathItems which PathPoints length is greater
// than this number.
function extractPathes(s, pp_length_limit, pathes){
  for(var i = 0; i < s.length; i++){
    if(s[i].typename == "PathItem"){
      if(pp_length_limit
         && s[i].pathPoints.length <= pp_length_limit){
        continue;
      }
      pathes.push(s[i]);

    } else if(s[i].typename == "GroupItem"){
      // search for PathItems in GroupItem, recursively
      extractPathes(s[i].pageItems, pp_length_limit, pathes);

    } else if(s[i].typename == "CompoundPathItem"){
      // searches for pathitems in CompoundPathItem, recursively
      // ( ### Grouped PathItems in CompoundPathItem are ignored ### )
      extractPathes(s[i].pathItems, pp_length_limit , pathes);
    }
  }
}

// ----------------------------------------------
// return pathpoint's index. when the argument is out of bounds,
// fixes it if the path is closed (ex. next of last index is 0),
// or return -1 if the path is not closed.
function parseIdx(p, n){ // PathPoints, number for index
  var len = p.length;
  if(p.parent.closed){
    return n >= 0 ? n % len : len - Math.abs(n % len);
  } else {
    return (n < 0 || n > len-1) ? -1 : n;
  }
}
