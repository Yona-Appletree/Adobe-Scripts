Adobe-Scripts
=============

Collection of scripts for Adobe apps, Illustrator mostly

**exchange_fill_and_stroke.jsx**
- Select path(s) & run script.

**faux_3d.jsx**
- Select path(s) & run script. *no groups or compound paths*

**paths_to_canvas_beziers.jsx**
**paths_to_canvas_beziers_variables.jsx**
- Move path(s) to 0,0 on the artboard to get a decent reference point.
- Select path(s) & run script. *grouped paths don't work yet*
These both take a path from Illustrator and output it to canvas bezier, with one creating variable arrays of all the points first.

**paths_to_scad.jsx**
*you'll likely want to 'Add Anchor Points' (maybe more than once) then 'Simplify Path' with straight lines, as beziers are not allowed.*
- Move path(s) to 0,0 on the artboard to get a decent reference point.
- Select path(s) & run script. *grouped paths don't work yet*
- I've rounded numbers to 2 significant digit to keep my files cleaner.
- Converts points (what Illustrator uses as a default unit) to millimeters.

**random_color-full_featured.jsx**
- Select path(s) & run script. *no groups or compound paths*
- You have a variety of options for randomization

**random_rects.jsx**
- This will create a new layer of randomized rectangles within a defined bounds

**rotate_each.jsx**
*a little more control over rotating each path vs. built-in "Transform Each" function*
- Select path(s) & run script.
- Choose 'random' or 'linear' method.
- Input minimum & maximum rotation limits.

**scale_each.jsx**
*a little more control over scaling each path vs. built-in "Transform Each" function*
- Select path(s) & run script.
- Choose 'random' or 'linear' method.
- Input minimum & maximum scaling limits.

**squares_at_vertices.jsx**
- Select path(s) & run script.

**wellderly_dashes.jsx**
- Select path(s) & run script.
- Input minimum & maximum dash limits.
