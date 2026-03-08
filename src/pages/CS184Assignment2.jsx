import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Utils/NavBar';

const imgBase = `${process.env.PUBLIC_URL || ''}/assignment2/images`;

export default function CS184Assignment2() {
    const colorList = ["bg-neutral-500", "bg-orange-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * 6)]);

    useEffect(() => {
        if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        }
    }, []);

    return (
        <div className={`flex flex-col min-h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} />
            <div 
                className="mx-auto py-16 px-8 md:px-16 lg:px-24 max-w-6xl bg-white font-['Inter',sans-serif]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
                <h1 className="text-center text-3xl font-bold mb-4">
                    CS 184/284A Spring 2026 — Homework 2 Write-Up
                </h1>
                <div className="text-center mb-4 text-gray-600">Nick Angelici</div>
                <div className="text-center mb-4 text-gray-600">Link to webpage: <a href="https://nickangelici.com/#/cs184assignment2" className="text-blue-600 hover:underline">nickangelici.com/#/cs184assignment2</a></div>
                <div className="text-center mb-8 text-gray-600">Link to GitHub repository: <a href="https://github.com/cal-cs184-student/hw2-meshedit-nick_a" className="text-blue-600 hover:underline">github.com/cal-cs184-student/hw2-meshedit-nick_a</a></div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
                <p className="mb-4">
                    In this assignment I implemented a mesh editing pipeline consisting of two main sections. In Section I, I implemented Bezier curve and surface evaluation using de Casteljau&apos;s algorithm: a recursive linear interpolation scheme that evaluates a curve or surface at a given parameter by repeatedly subdividing control points. In Section II, I worked with the half-edge mesh data structure to implement area-weighted vertex normals for Phong shading, local mesh operations (edge flip and edge split), and Loop subdivision for mesh upsampling.
                </p>
                <p className="mb-6">
                    The half-edge representation stores each edge as two oppositely oriented half-edges that link vertices, edges, and faces. This allows efficient traversal of neighborhoods—for example, iterating over all faces incident to a vertex or all vertices around a face. When modifying the mesh (flip, split), it is critical to update every pointer on every affected element so that connectivity remains consistent; otherwise traversal breaks and the mesh can appear corrupted or crash.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Section I: Bezier Curves and Surfaces</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 1: Bezier Curves with 1D de Casteljau Subdivision</h3>
                <p className="mb-4">
                    A Bezier curve of degree n is defined by n+1 control points and is a parametric curve with parameter t ∈ [0,1]. De Casteljau&apos;s algorithm evaluates the curve at t by recursive linear interpolation. Given control points p<sub>1</sub>, …, p<sub>n</sub> and parameter t, one step of the algorithm produces n−1 intermediate points in the next subdivision level:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    p<sub>i</sub>′ = lerp(p<sub>i</sub>, p<sub>i+1</sub>, t) = (1−t)p<sub>i</sub> + t·p<sub>i+1</sub>
                </p>
                <p className="mb-4">
                    Each new point lies on the line segment between consecutive points at fractional position t. Applying this step recursively reduces the number of points by one each time; when a single point remains, that point lies on the Bezier curve at t. The intermediate levels form a pyramid of control points converging to the curve point.
                </p>
                <p className="mb-4">
                    I implemented this single step in <code className="bg-gray-100 px-1 rounded text-sm">BezierCurve::evaluateStep(...)</code> in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code>. The function takes the current level&apos;s vector of 2D points and uses the class member <code className="bg-gray-100 px-1 rounded text-sm">t</code>. It returns a new vector of size one less, where each entry i is <code className="bg-gray-100 px-1 rounded text-sm">(1-t)*points[i] + t*points[i+1]</code>. The GUI calls this repeatedly (e.g., when pressing E) to step through levels, or when drawing the full curve by sampling many values of <code className="bg-gray-100 px-1 rounded text-sm">t</code> and evaluating at each.
                </p>
                <p className="mb-4">
                    I created a custom Bezier curve with 6 control points for the screenshots below.
                </p>
                <div className="flex flex-col gap-6 my-6">
                    <figure className="flex flex-col items-center w-full">
                        <img src={`${imgBase}/part1_curve.png`} alt="Custom Bezier curve with 6 control points" className="w-full" />
                        <figcaption className="text-center mt-2 text-sm">Custom Bezier curve with 6 control points.</figcaption>
                    </figure>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <figure key={i} className="flex flex-col items-center w-full">
                            <img src={`${imgBase}/part1_step${i}.png`} alt={`De Casteljau step ${i}`} className="w-full" />
                            <figcaption className="text-center mt-2 text-sm">Step {i} — De Casteljau evaluation.</figcaption>
                        </figure>
                    ))}
                    <figure className="flex flex-col items-center w-full">
                        <img src={`${imgBase}/part1_modified.png`} alt="Modified Bezier curve" className="w-full" />
                        <figcaption className="text-center mt-2 text-sm">Slightly different Bezier curve after moving control points and changing the parameter.</figcaption>
                    </figure>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 2: Bezier Surfaces with Separable 1D de Casteljau</h3>
                <p className="mb-4">
                    A Bezier surface of degree (n,m) is defined by an (n+1) × (m+1) grid of control points and two parameters u, v ∈ [0,1]. The separable 1D de Casteljau algorithm treats the surface as a family of 1D curves: each row of control points defines a Bezier curve in u, and the resulting column of points defines a Bezier curve in v. The final point lies on the surface at (u,v).
                </p>
                <p className="mb-4">
                    I implemented three functions in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code>:
                </p>
                <ul className="list-disc list-inside ml-6 mb-4 space-y-1">
                    <li><strong>BezierPatch::evaluateStep(points, t)</strong> — One step of de Casteljau in 3D: given a vector of 3D points and parameter t, returns the vector of intermediate points (1−t)p<sub>i</sub> + t·p<sub>i+1</sub>. Same logic as Part 1 but in 3D and with t as an argument.</li>
                    <li><strong>BezierPatch::evaluate1D(points, t)</strong> — Fully evaluates a 1D Bezier curve (vector of 3D points) at t by repeatedly calling <code className="bg-gray-100 px-1 rounded text-sm">evaluateStep</code> until a single point remains.</li>
                    <li><strong>BezierPatch::evaluate(u, v)</strong> — Evaluates the patch at (u,v): for each row of <code className="bg-gray-100 px-1 rounded text-sm">controlPoints</code>, call <code className="bg-gray-100 px-1 rounded text-sm">evaluate1D(row, u)</code> to get one point per row; collect those into a column and call <code className="bg-gray-100 px-1 rounded text-sm">evaluate1D(column, v)</code> to get the final surface point.</li>
                </ul>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part2_teapot.png`} alt="Teapot from bez/teapot.bez" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">bez/teapot.bez (not .dae) evaluated by implementation.</figcaption>
                </figure>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Section II: Triangle Meshes and Half-Edge Data Structure</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 3: Area-Weighted Vertex Normals</h3>
                <p className="mb-4">
                    Vertex normals are used for Phong shading so that the mesh appears smoothly shaded instead of flat (one color per face). The area-weighted normal at a vertex is the normalized sum of the face normals of all incident triangles, each weighted by that triangle&apos;s area. Larger faces contribute more to the final direction.
                </p>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">Vertex::normal()</code> in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code> as a const member function (using <code className="bg-gray-100 px-1 rounded text-sm">HalfedgeCIter</code> only). The algorithm: start from the vertex&apos;s half-edge and iterate over incident faces using the standard vertex circulation <code className="bg-gray-100 px-1 rounded text-sm">h = h-&gt;twin()-&gt;next()</code> until returning to the start. For each incident face that is not a boundary face, I compute the triangle area from the three vertex positions via 0.5 × ‖(p<sub>1</sub> − p<sub>0</sub>) × (p<sub>2</sub> − p<sub>0</sub>)‖ and add area × <code className="bg-gray-100 px-1 rounded text-sm">face-&gt;normal()</code> to an accumulator. The face normal is already unit length. Finally I return the normalized sum, or the zero vector if the sum has zero length.
                </p>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part3_flat.png`} alt="dae/teapot.dae with flat shading" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">dae/teapot.dae with flat shading.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part3_phong.png`} alt="dae/teapot.dae with Phong shading" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">dae/teapot.dae with Phong shading.</figcaption>
                </figure>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 4: Edge Flip</h3>
                <p className="mb-4">
                    An edge flip is a local remeshing operation on two adjacent triangles. Given triangles (a,b,c) and (c,b,d) sharing edge (b,c), the flip replaces that edge with the other diagonal of the quadrilateral, producing triangles (a,d,c) and (a,b,d) sharing edge (a,d). No vertices, edges, faces, or half-edges are created or destroyed; only pointers are reassigned.
                </p>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">HalfedgeMesh::flipEdge(EdgeIter e0)</code> in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code>. The steps: (1) Return immediately if the edge or either adjacent face is on the boundary (boundary flips are undefined). (2) Collect the two half-edges on the edge (h<sub>0</sub> and h<sub>1</sub>) and the four &quot;spoke&quot; half-edges—the other two edges of each triangle—via <code className="bg-gray-100 px-1 rounded text-sm">h0-&gt;next()</code>, <code className="bg-gray-100 px-1 rounded text-sm">h0-&gt;next()-&gt;next()</code>, and similarly for h<sub>1</sub>. (3) Reassign all six half-edges using <code className="bg-gray-100 px-1 rounded text-sm">setNeighbors</code> so that h<sub>0</sub> and h<sub>1</sub> now connect the opposite vertices a and d, and the two faces are (a,d,c) and (a,b,d). (4) Update the half-edge pointers for both faces and all four vertices so every element points into the modified mesh.
                </p>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part4_before.png`} alt="Teapot before edge flips" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Teapot (or other mesh) before edge flips.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part4_after.png`} alt="Mesh after edge flips" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Same mesh after several edge flips.</figcaption>
                </figure>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 5: Edge Split</h3>
                <p className="mb-4">
                    An edge split inserts a new vertex at the midpoint of the edge and connects it to the two opposite vertices, turning two triangles into four. The original edge (b,c) becomes two edges (b,m) and (m,c), and two new edges (a,m) and (m,d) are created.
                </p>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">HalfedgeMesh::splitEdge(EdgeIter e0)</code> in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code>. The steps: (1) Return immediately if the edge or either face is on the boundary. (2) Collect the two half-edges and four vertices (endpoints b,c and opposite a,d). (3) Allocate one new vertex m at the midpoint, three new edges, two new faces, and six new half-edges. The original edge is reused for (b,m). (4) Reassign all half-edges so the two triangles become four: (a,b,m), (a,m,c), (c,m,d), (m,b,d). (5) Update face, vertex, and edge half-edge pointers. The new vertex&apos;s half-edge is set to lie along the split edge (e.g., m → b) as required by the spec.
                </p>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part5_before.png`} alt="Mesh before edge splits" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Mesh before edge splits.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part5_after.png`} alt="Mesh after edge splits" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Same mesh after several edge splits.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part5_combined_before.png`} alt="Before splits and flips" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Mesh before a combination of edge splits and edge flips.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full">
                        <img src={`${imgBase}/part5_combined_after.png`} alt="After splits and flips" className="w-full" />
                    </div>
                    <figcaption className="text-center mt-2 text-sm">Same mesh after a combination of edge splits and edge flips.</figcaption>
                </figure>

                <h3 className="text-xl font-semibold mt-6 mb-4">Part 6: Loop Subdivision for Mesh Upsampling</h3>
                <p className="mb-4">
                    Loop subdivision increases mesh resolution by (1) subdividing each triangle into four (4–1 subdivision) using edge splits and flips, and (2) updating all vertex positions with weighted averages of neighboring positions. Repeated application converges to a smooth approximation of the original mesh.
                </p>

                <h4 className="text-lg font-semibold mt-6 mb-3">Implementation</h4>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">MeshResampler::upsample(HalfedgeMesh& mesh)</code> in <code className="bg-gray-100 px-1 rounded text-sm">student_code.cpp</code> following the recommended order:
                </p>
                <ol className="list-decimal list-inside ml-6 mb-4 space-y-2">
                    <li><strong>Mark vertices and compute Vertex::newPosition</strong> — For each vertex, set <code className="bg-gray-100 px-1 rounded text-sm">isNew = false</code>. For non-boundary vertices, compute the Loop update: (1 − nu)·position + u·∑neighbors, where n is the vertex degree and u = 3/(8n). Boundary vertices keep their position.</li>
                    <li><strong>Compute Edge::newPosition</strong> — For each non-boundary edge with endpoints A, B and opposite vertices C, D, set newPosition = 3/8(A+B) + 1/8(C+D). Boundary edges use the midpoint.</li>
                    <li><strong>Split every original edge</strong> — Collect all edges into a vector first (to avoid iterating over newly created edges). For each non-boundary edge, call <code className="bg-gray-100 px-1 rounded text-sm">splitEdge</code>, set the new vertex&apos;s position and <code className="bg-gray-100 px-1 rounded text-sm">newPosition</code> from the edge&apos;s <code className="bg-gray-100 px-1 rounded text-sm">newPosition</code>, mark it <code className="bg-gray-100 px-1 rounded text-sm">isNew = true</code>, and set <code className="bg-gray-100 px-1 rounded text-sm">Edge::isNew</code> on the four edges at the new vertex (the two halves of the split edge are not new; the two diagonals are new).</li>
                    <li><strong>Flip new edges</strong> — For each edge with <code className="bg-gray-100 px-1 rounded text-sm">isNew == true</code> that connects an old vertex and a new vertex, call <code className="bg-gray-100 px-1 rounded text-sm">flipEdge</code>.</li>
                    <li><strong>Copy positions</strong> — Set <code className="bg-gray-100 px-1 rounded text-sm">v-&gt;position = v-&gt;newPosition</code> for every vertex.</li>
                </ol>

                <h4 className="text-lg font-semibold mt-6 mb-3">Observations on Mesh Behavior</h4>
                <p className="mb-4">
                    <strong>Sharp corners and edges:</strong> After subdivision, sharp corners and edges become rounded because vertex positions are averaged with neighbors. Pre-splitting edges can reduce this effect by introducing more vertices along sharp features before subdivision, giving the averaging more structure to work with.
                </p>
                <p className="mb-4">
                    <strong>Cube asymmetry:</strong> The cube has asymmetric vertex degrees (corners have degree 3, edge midpoints have degree 4, face centers have degree 4). When we apply the Loop rule, vertices of different degrees get different weights, so the cube subdivides asymmetrically—corners and edges move differently than face centers.
                </p>
                <p className="mb-4">
                    <strong>Pre-processing for symmetry:</strong> Pre-processing the cube by splitting the diagonals of each face (or otherwise adjusting connectivity) can make the vertex degree distribution more uniform. With more symmetric connectivity, the Loop weights produce more symmetric subdivision.
                </p>

                <h4 className="text-lg font-semibold mt-6 mb-3">Screenshots</h4>
                <p className="mb-4 font-semibold">Teapot / mesh with 0, 1, 2 subdivision iterations:</p>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-300 px-4 py-2">part6_l0</td><td className="border border-gray-300 px-4 py-2">Mesh before any subdivision (0 iterations)</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">part6_l1</td><td className="border border-gray-300 px-4 py-2">Mesh after 1 Loop subdivision</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">part6_l2</td><td className="border border-gray-300 px-4 py-2">Mesh after 2 Loop subdivisions</td></tr>
                        </tbody>
                    </table>
                </div>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/part6_l0.png`} alt="Teapot or cube with 0 subdivision iterations" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Teapot or cube with 0 subdivision iterations.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/part6_l1.png`} alt="Mesh after 1 Loop subdivision" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Same mesh after 1 Loop subdivision.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/part6_l2.png`} alt="Mesh after 2 Loop subdivisions" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Same mesh after 2 Loop subdivisions.</figcaption>
                </figure>

                <p className="mb-4 font-semibold">Cube (dae/cube.dae) — asymmetry:</p>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_0</td><td className="border border-gray-300 px-4 py-2">Cube before subdivision</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_1</td><td className="border border-gray-300 px-4 py-2">Cube after 1 Loop subdivision</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_3</td><td className="border border-gray-300 px-4 py-2">Cube after 3 Loop subdivisions (showing asymmetry)</td></tr>
                        </tbody>
                    </table>
                </div>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_0.png`} alt="Cube before subdivision" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Cube before subdivision.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_1.png`} alt="Cube after 1 Loop subdivision" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Cube after 1 Loop subdivision.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_3.png`} alt="Cube after 3 Loop subdivisions" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Cube after 3 Loop subdivisions — note asymmetry.</figcaption>
                </figure>

                <p className="mb-4 font-semibold">Preprocessed cube — symmetric subdivision:</p>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_s_0</td><td className="border border-gray-300 px-4 py-2">Cube after pre-processing (splits on diagonals) but before subdivision</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_s_1</td><td className="border border-gray-300 px-4 py-2">Preprocessed cube after 1 Loop subdivision</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_s_3</td><td className="border border-gray-300 px-4 py-2">Preprocessed cube after 3 Loop subdivisions — more symmetric</td></tr>
                            <tr><td className="border border-gray-300 px-4 py-2">cube_s_3_alt</td><td className="border border-gray-300 px-4 py-2">Alternate angle of preprocessed cube at 3 subdivisions (as proof of symmetry)</td></tr>
                        </tbody>
                    </table>
                </div>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_s_0.png`} alt="Cube preprocessed with splits on diagonals" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Cube preprocessed with splits on diagonals, before subdivision.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_s_1.png`} alt="Preprocessed cube after 1 Loop subdivision" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Preprocessed cube after 1 Loop subdivision.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_s_3.png`} alt="Preprocessed cube after 3 Loop subdivisions" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Preprocessed cube after 3 Loop subdivisions — more symmetric.</figcaption>
                </figure>
                <figure className="flex flex-col gap-6 my-6">
                    <div className="w-full"><img src={`${imgBase}/cube_s_3_alt.png`} alt="Alternate angle of preprocessed cube" className="w-full" /></div>
                    <figcaption className="text-center mt-2 text-sm">Alternate angle of preprocessed cube at 3 subdivisions — proof of symmetry.</figcaption>
                </figure>

                <h4 className="text-lg font-semibold mt-6 mb-3">Summary: Why Asymmetry Occurs and How Pre-processing Helps</h4>
                <p className="mb-6">
                    The cube subdivides asymmetrically because its vertices have different degrees (3 at corners, 4 elsewhere). The Loop rule uses u = 3/(8n), so degree-3 vertices move differently than degree-4 vertices. Pre-processing by splitting face diagonals (or performing edge flips/splits) changes the connectivity so that vertex degrees are more uniform. With more symmetric connectivity, the subdivision produces a more symmetric result.
                </p>

            </div>
        </div>
    );
}
