# CS 184/284A Spring 2026 — Homework 2 Write-Up

**Names:** [Your name(s)]

**Link to webpage:** [TODO]  
**Link to GitHub repository:** [TODO]

---

## Overview

In this assignment I implemented a mesh editing pipeline consisting of two main sections. In Section I, I implemented Bezier curve and surface evaluation using de Casteljau's algorithm: a recursive linear interpolation scheme that evaluates a curve or surface at a given parameter by repeatedly subdividing control points. In Section II, I worked with the half-edge mesh data structure to implement area-weighted vertex normals for Phong shading, local mesh operations (edge flip and edge split), and Loop subdivision for mesh upsampling.

The half-edge representation stores each edge as two oppositely oriented half-edges that link vertices, edges, and faces. This allows efficient traversal of neighborhoods—for example, iterating over all faces incident to a vertex or all vertices around a face. When modifying the mesh (flip, split), it is critical to update every pointer on every affected element so that connectivity remains consistent; otherwise traversal breaks and the mesh can appear corrupted or crash.

---

## Section I: Bezier Curves and Surfaces

### Part 1: Bezier Curves with 1D de Casteljau Subdivision

A Bezier curve of degree \(n\) is defined by \(n+1\) control points and is a parametric curve with parameter \(t \in [0,1]\). De Casteljau's algorithm evaluates the curve at \(t\) by recursive linear interpolation. Given control points \(p_1, \ldots, p_n\) and parameter \(t\), one step of the algorithm produces \(n-1\) intermediate points in the next subdivision level:

\[
p_i' = \mathrm{lerp}(p_i, p_{i+1}, t) = (1-t)\,p_i + t\,p_{i+1}.
\]

Each new point lies on the line segment between consecutive points at fractional position \(t\). Applying this step recursively reduces the number of points by one each time; when a single point remains, that point lies on the Bezier curve at \(t\). The intermediate levels form a pyramid of control points converging to the curve point.

I implemented this single step in `BezierCurve::evaluateStep(...)` in `student_code.cpp`. The function takes the current level's vector of 2D points and uses the class member `t`. It returns a new vector of size one less, where each entry `i` is `(1-t)*points[i] + t*points[i+1]`. The GUI calls this repeatedly (e.g., when pressing E) to step through levels, or when drawing the full curve by sampling many values of `t` and evaluating at each.

I created a custom Bezier curve with 6 control points for the screenshots below.

**[Insert: images/part1_curve.png — Custom Bezier curve with 6 control points]**

**[Insert: images/part1_steps.png — Each step/level of de Casteljau evaluation from original control points down to the final evaluated point (press E to step). Include the completed curve (toggle C) in at least one view.]**

**[Insert: images/part1_modified.png — Slightly different Bezier curve after moving control points and changing the parameter via mouse scroll.]**

---

### Part 2: Bezier Surfaces with Separable 1D de Casteljau

A Bezier surface of degree \((n,m)\) is defined by an \((n+1) \times (m+1)\) grid of control points and two parameters \(u, v \in [0,1]\). The separable 1D de Casteljau algorithm treats the surface as a family of 1D curves: each row of control points defines a Bezier curve in \(u\), and the resulting column of points defines a Bezier curve in \(v\). The final point lies on the surface at \((u,v)\).

I implemented three functions in `student_code.cpp`:

- **`BezierPatch::evaluateStep(points, t)`** — One step of de Casteljau in 3D: given a vector of 3D points and parameter \(t\), returns the vector of intermediate points \((1-t)\,p_i + t\,p_{i+1}\). Same logic as Part 1 but in 3D and with \(t\) as an argument.
- **`BezierPatch::evaluate1D(points, t)`** — Fully evaluates a 1D Bezier curve (vector of 3D points) at \(t\) by repeatedly calling `evaluateStep` until a single point remains.
- **`BezierPatch::evaluate(u, v)`** — Evaluates the patch at \((u,v)\): for each row of `controlPoints`, call `evaluate1D(row, u)` to get one point per row; collect those into a column and call `evaluate1D(column, v)` to get the final surface point.

**[Insert: images/part2_teapot.png — bez/teapot.bez (not .dae) evaluated by your implementation]**

---

## Section II: Triangle Meshes and Half-Edge Data Structure

### Part 3: Area-Weighted Vertex Normals

Vertex normals are used for Phong shading so that the mesh appears smoothly shaded instead of flat (one color per face). The area-weighted normal at a vertex is the normalized sum of the face normals of all incident triangles, each weighted by that triangle's area. Larger faces contribute more to the final direction.

I implemented `Vertex::normal()` in `student_code.cpp` as a const member function (using `HalfedgeCIter` only). The algorithm: start from the vertex's half-edge and iterate over incident faces using the standard vertex circulation `h = h->twin()->next()` until returning to the start. For each incident face that is not a boundary face, I compute the triangle area from the three vertex positions via \(0.5 \times \|(p_1 - p_0) \times (p_2 - p_0)\|\) and add \(area \times face\text{-}\mathtt{>}normal()\) to an accumulator. The face normal is already unit length. Finally I return the normalized sum, or the zero vector if the sum has zero length.

**[Insert: images/part3_flat.png — dae/teapot.dae with flat shading]**  
**[Insert: images/part3_phong.png — dae/teapot.dae with Phong shading (press Q to toggle)]**

---

### Part 4: Edge Flip

An edge flip is a local remeshing operation on two adjacent triangles. Given triangles \((a,b,c)\) and \((c,b,d)\) sharing edge \((b,c)\), the flip replaces that edge with the other diagonal of the quadrilateral, producing triangles \((a,d,c)\) and \((a,b,d)\) sharing edge \((a,d)\). No vertices, edges, faces, or half-edges are created or destroyed; only pointers are reassigned.

I implemented `HalfedgeMesh::flipEdge(EdgeIter e0)` in `student_code.cpp`. The steps: (1) Return immediately if the edge or either adjacent face is on the boundary (boundary flips are undefined). (2) Collect the two half-edges on the edge (\(h_0\) and \(h_1\)) and the four "spoke" half-edges—the other two edges of each triangle—via `h0->next()`, `h0->next()->next()`, and similarly for \(h_1\). (3) Reassign all six half-edges using `setNeighbors` so that \(h_0\) and \(h_1\) now connect the opposite vertices \(a\) and \(d\), and the two faces are \((a,d,c)\) and \((a,b,d)\). (4) Update the half-edge pointers for both faces and all four vertices so every element points into the modified mesh.

**[Insert: images/part4_before.png — Teapot (or other mesh) before edge flips]**  
**[Insert: images/part4_after.png — Same mesh after several edge flips]**

*If you had a notable debugging journey, describe it here.*

---

### Part 5: Edge Split

An edge split inserts a new vertex at the midpoint of the edge and connects it to the two opposite vertices, turning two triangles into four. The original edge \((b,c)\) becomes two edges \((b,m)\) and \((m,c)\), and two new edges \((a,m)\) and \((m,d)\) are created.

I implemented `HalfedgeMesh::splitEdge(EdgeIter e0)` in `student_code.cpp`. The steps: (1) Return immediately if the edge or either face is on the boundary. (2) Collect the two half-edges and four vertices (endpoints \(b,c\) and opposite \(a,d\)). (3) Allocate one new vertex \(m\) at the midpoint, three new edges, two new faces, and six new half-edges. The original edge is reused for \((b,m)\). (4) Reassign all half-edges so the two triangles become four: \((a,b,m)\), \((a,m,c)\), \((c,m,d)\), \((m,b,d)\). (5) Update face, vertex, and edge half-edge pointers. The new vertex's half-edge is set to lie along the split edge (e.g., \(m \to b\)) as required by the spec.

**[Insert: images/part5_before.png — Mesh before edge splits]**  
**[Insert: images/part5_after.png — Same mesh after several edge splits]**  
**[Insert: images/part5_combined.png — Mesh before and after a combination of edge splits and edge flips]**

*If you had a notable debugging journey, describe it here.*

---

### Part 6: Loop Subdivision for Mesh Upsampling

Loop subdivision increases mesh resolution by (1) subdividing each triangle into four (4–1 subdivision) using edge splits and flips, and (2) updating all vertex positions with weighted averages of neighboring positions. Repeated application converges to a smooth approximation of the original mesh.

#### Implementation

I implemented `MeshResampler::upsample(HalfedgeMesh& mesh)` in `student_code.cpp` following the recommended order:

1. **Mark vertices and compute Vertex::newPosition** — For each vertex, set `isNew = false`. For non-boundary vertices, compute the Loop update: \((1 - n\,u)\,\text{position} + u \sum \text{neighbors}\), where \(n\) is the vertex degree and \(u = 3/(8n)\). Boundary vertices keep their position.
2. **Compute Edge::newPosition** — For each non-boundary edge with endpoints A, B and opposite vertices C, D, set \(\text{newPosition} = \frac{3}{8}(A+B) + \frac{1}{8}(C+D)\). Boundary edges use the midpoint.
3. **Split every original edge** — Collect all edges into a vector first (to avoid iterating over newly created edges). For each non-boundary edge, call `splitEdge`, set the new vertex's position and `newPosition` from the edge's `newPosition`, mark it `isNew = true`, and set `Edge::isNew` on the four edges at the new vertex (the two halves of the split edge are not new; the two diagonals are new).
4. **Flip new edges** — For each edge with `isNew == true` that connects an old vertex and a new vertex, call `flipEdge`.
5. **Copy positions** — Set `v->position = v->newPosition` for every vertex.

#### Observations on Mesh Behavior

**Sharp corners and edges:** After subdivision, sharp corners and edges become rounded because vertex positions are averaged with neighbors. Pre-splitting edges can reduce this effect by introducing more vertices along sharp features before subdivision, giving the averaging more structure to work with.

**Cube asymmetry:** The cube has asymmetric vertex degrees (corners have degree 3, edge midpoints have degree 4, face centers have degree 4). When we apply the Loop rule, vertices of different degrees get different weights, so the cube subdivides asymmetrically—corners and edges move differently than face centers.

**Pre-processing for symmetry:** Pre-processing the cube by splitting the diagonals of each face (or otherwise adjusting connectivity) can make the vertex degree distribution more uniform. With more symmetric connectivity, the Loop weights produce more symmetric subdivision.

#### Screenshots

**Teapot / mesh with 0, 1, 2 subdivision iterations:**

| Image | Description |
|-------|-------------|
| part6_l0 | Mesh before any subdivision (0 iterations) |
| part6_l1 | Mesh after 1 Loop subdivision |
| part6_l2 | Mesh after 2 Loop subdivisions |

**[Insert: images/part6_l0.png — Teapot or cube with 0 subdivision iterations]**  
**[Insert: images/part6_l1.png — Same mesh after 1 Loop subdivision]**  
**[Insert: images/part6_l2.png — Same mesh after 2 Loop subdivisions]**

**Cube (dae/cube.dae) — asymmetry:**

| Image | Description |
|-------|-------------|
| cube_0 | Cube before subdivision |
| cube_1 | Cube after 1 Loop subdivision |
| cube_3 | Cube after 3 Loop subdivisions (showing asymmetry) |

**[Insert: images/cube_0.png — Cube before subdivision]**  
**[Insert: images/cube_1.png — Cube after 1 Loop subdivision]**  
**[Insert: images/cube_3.png — Cube after 3 Loop subdivisions — note asymmetry]**

**Preprocessed cube — symmetric subdivision:**

| Image | Description |
|-------|-------------|
| cube_s_0 | Cube after pre-processing (splits on diagonals) but before subdivision |
| cube_s_1 | Preprocessed cube after 1 Loop subdivision |
| cube_s_3 | Preprocessed cube after 3 Loop subdivisions — more symmetric |
| cube_s_3_alt | Alternate angle of preprocessed cube at 3 subdivisions (as proof of symmetry) |

**[Insert: images/cube_s_0.png — Cube preprocessed with splits on diagonals, before subdivision]**  
**[Insert: images/cube_s_1.png — Preprocessed cube after 1 Loop subdivision]**  
**[Insert: images/cube_s_3.png — Preprocessed cube after 3 Loop subdivisions — more symmetric]**  
**[Insert: images/cube_s_3_alt.png — Alternate angle of preprocessed cube at 3 subdivisions — proof of symmetry]**

#### Summary: Why Asymmetry Occurs and How Pre-processing Helps

The cube subdivides asymmetrically because its vertices have different degrees (3 at corners, 4 elsewhere). The Loop rule uses \(u = 3/(8n)\), so degree-3 vertices move differently than degree-4 vertices. Pre-processing by splitting face diagonals (or performing edge flips/splits) changes the connectivity so that vertex degrees are more uniform. With more symmetric connectivity, the subdivision produces a more symmetric result.
