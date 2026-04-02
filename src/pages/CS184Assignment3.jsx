import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Utils/NavBar';
import part1CBempty from './assignment3/images/part1/CBempty.png';
import part1Cube from './assignment3/images/part1/cube.png';
import part1Plane from './assignment3/images/part1/plane.png';
import part1CBspheres from './assignment3/images/part1/CBspheres.png';
import part1CBgems from './assignment3/images/part1/CBgems.png';
import part1CBcoil from './assignment3/images/part1/CBcoil.png';
import part2Cow from './assignment3/images/part2/cow.png';
import part2Maxplanck from './assignment3/images/part2/maxplanck.png';
import part2Lucy from './assignment3/images/part2/lucy.png';
import part2Bunny from './assignment3/images/part2/bunny.png';
import part2Beast from './assignment3/images/part2/beast.png';
import part3CBbunnyHemisphere from './assignment3/images/part3/CBbunny_H_64_32.png';
import part3CBbunnyImportance from './assignment3/images/part3/CBbunny_IS_64_32.png';
import part3CBspheresHemisphere from './assignment3/images/part3/CBspheres_H_64_32.png';
import part3CBspheresImportance from './assignment3/images/part3/CBspheres_IS_64_32.png';
import part3BunnyL1 from './assignment3/images/part3/bunny_l1.png';
import part3BunnyL4 from './assignment3/images/part3/bunny_l4.png';
import part3BunnyL16 from './assignment3/images/part3/bunny_l16.png';
import part3BunnyL64 from './assignment3/images/part3/bunny_l64.png';
import part4BunnyAccumM0 from './assignment3/images/part4/bunny_accum_m0.png';
import part4BunnyAccumM1 from './assignment3/images/part4/bunny_accum_m1.png';
import part4BunnyAccumM2 from './assignment3/images/part4/bunny_accum_m2.png';
import part4BunnyAccumM3 from './assignment3/images/part4/bunny_accum_m3.png';
import part4BunnyAccumM4 from './assignment3/images/part4/bunny_accum_m4.png';
import part4BunnyAccumM5 from './assignment3/images/part4/bunny_accum_m5.png';
import part4BunnyIndirectOnlyM5 from './assignment3/images/part4/bunny_indirect_only_m5.png';
import part4BunnyRRM0 from './assignment3/images/part4/bunny_rr_m0.png';
import part4BunnyRRM1 from './assignment3/images/part4/bunny_rr_m1.png';
import part4BunnyRRM2 from './assignment3/images/part4/bunny_rr_m2.png';
import part4BunnyRRM3 from './assignment3/images/part4/bunny_rr_m3.png';
import part4BunnyRRM4 from './assignment3/images/part4/bunny_rr_m4.png';
import part4BunnyRRM100 from './assignment3/images/part4/bunny_rr_m100.png';
import part4BunnyUnaccumM0 from './assignment3/images/part4/bunny_unaccum_m0.png';
import part4BunnyUnaccumM1 from './assignment3/images/part4/bunny_unaccum_m1.png';
import part4BunnyUnaccumM2 from './assignment3/images/part4/bunny_unaccum_m2.png';
import part4BunnyUnaccumM3 from './assignment3/images/part4/bunny_unaccum_m3.png';
import part4BunnyUnaccumM4 from './assignment3/images/part4/bunny_unaccum_m4.png';
import part4BunnyUnaccumM5 from './assignment3/images/part4/bunny_unaccum_m5.png';
import part4DragonGlobalM5 from './assignment3/images/part4/dragon_global_m5.png';
import part4SpheresGlobalM5 from './assignment3/images/part4/spheres_global_m5.png';
import part4SpheresSPP1 from './assignment3/images/part4/spheres_spp_1.png';
import part4SpheresSPP2 from './assignment3/images/part4/spheres_spp_2.png';
import part4SpheresSPP4 from './assignment3/images/part4/spheres_spp_4.png';
import part4SpheresSPP8 from './assignment3/images/part4/spheres_spp_8.png';
import part4SpheresSPP16 from './assignment3/images/part4/spheres_spp_16.png';
import part4SpheresSPP64 from './assignment3/images/part4/spheres_spp_64.png';
import part4SpheresSPP1024 from './assignment3/images/part4/spheres_spp_1024.png';
import part4WallEGlobalM5 from './assignment3/images/part4/wall_e_global_m5.png';
import part5BunnyAdaptive2048 from './assignment3/images/part5/bunny_adaptive_2048.png';
import part5BunnyAdaptive2048Rate from './assignment3/images/part5/bunny_adaptive_2048_rate.png';
import part5DragonAdaptive2048 from './assignment3/images/part5/dragon_adaptive_2048.png';
import part5DragonAdaptive2048Rate from './assignment3/images/part5/dragon_adaptive_2048_rate.png';
import part5WallEAdaptive2048 from './assignment3/images/part5/wall_e_adaptive_2048.png';
import part5WallEAdaptive2048Rate from './assignment3/images/part5/wall_e_adaptive_2048_rate.png';

function PlaceholderFigure({ title, description, className = 'w-full', tall = false }) {
    return (
        <figure className={`flex flex-col items-center gap-3 my-6 ${className}`}>
            <div
                className={`w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-center px-6 ${
                    tall ? 'min-h-[24rem]' : 'min-h-[16rem]'
                }`}
            >
                <div>
                    <div className="text-lg font-semibold text-gray-700">{title}</div>
                    <div className="mt-2 text-sm text-gray-500">{description}</div>
                    <div className="mt-4 text-xs uppercase tracking-widest text-gray-400">Image Placeholder</div>
                </div>
            </div>
            <figcaption className="text-center text-sm text-gray-600">{description}</figcaption>
        </figure>
    );
}

export default function CS184Assignment3() {
    const colorList = ['bg-neutral-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * colorList.length)]);

    useEffect(() => {
        if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        }
    }, []);

    const unaccumulatedBounceRenders = [
        { m: 0, src: part4BunnyUnaccumM0 },
        { m: 1, src: part4BunnyUnaccumM1 },
        { m: 2, src: part4BunnyUnaccumM2 },
        { m: 3, src: part4BunnyUnaccumM3 },
        { m: 4, src: part4BunnyUnaccumM4 },
        { m: 5, src: part4BunnyUnaccumM5 },
    ];

    const accumulatedVsUnaccumulatedRenders = [
        { m: 0, accum: part4BunnyAccumM0, unaccum: part4BunnyUnaccumM0 },
        { m: 1, accum: part4BunnyAccumM1, unaccum: part4BunnyUnaccumM1 },
        { m: 2, accum: part4BunnyAccumM2, unaccum: part4BunnyUnaccumM2 },
        { m: 3, accum: part4BunnyAccumM3, unaccum: part4BunnyUnaccumM3 },
        { m: 4, accum: part4BunnyAccumM4, unaccum: part4BunnyUnaccumM4 },
        { m: 5, accum: part4BunnyAccumM5, unaccum: part4BunnyUnaccumM5 },
    ];

    const russianRouletteRenders = [
        { m: 0, src: part4BunnyRRM0 },
        { m: 1, src: part4BunnyRRM1 },
        { m: 2, src: part4BunnyRRM2 },
        { m: 3, src: part4BunnyRRM3 },
        { m: 4, src: part4BunnyRRM4 },
        { m: 100, src: part4BunnyRRM100 },
    ];

    const samplePerPixelRenders = [
        { spp: 1, src: part4SpheresSPP1 },
        { spp: 2, src: part4SpheresSPP2 },
        { spp: 4, src: part4SpheresSPP4 },
        { spp: 8, src: part4SpheresSPP8 },
        { spp: 16, src: part4SpheresSPP16 },
        { spp: 64, src: part4SpheresSPP64 },
        { spp: 1024, src: part4SpheresSPP1024 },
    ];

    return (
        <div className={`flex flex-col min-h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} />
            <div
                className="assignment3-writeup mx-auto py-16 px-8 md:px-16 lg:px-24 max-w-6xl bg-white font-['Inter',sans-serif]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <style>{`
                    .assignment3-writeup img {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                    }
                `}</style>
                <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
                <h1 className="text-center text-3xl font-bold mb-4">
                    CS 184/284A Spring 2026 - Homework 3 Write-Up
                </h1>
                <div className="text-center mb-4 text-gray-600">Nick Angelici</div>
                <div className="text-center mb-4 text-gray-600">Partner: None</div>
                <div className="text-center mb-4 text-gray-600">
                    Link to webpage:{' '}
                    <a href="https://nickangelici.com/#/cs184assignment3" className="text-blue-600 hover:underline">
                        nickangelici.com/#/cs184assignment3
                    </a>
                </div>
                <div className="text-center mb-8 text-gray-600">
                    Link to GitHub repository:{' '}
                    <a
                        href="https://github.com/cal-cs184-student/hw3-pathtracer-nick_hw3"
                        className="text-blue-600 hover:underline"
                    >
                        github.com/cal-cs184-student/hw3-pathtracer-nick_hw3
                    </a>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
                <p className="mb-4">
                    In this assignment I built the core of a physically based path tracer in stages. In Part 1, I
                    implemented camera ray generation, pixel sampling, and primitive-ray intersection for triangles and
                    spheres. In Part 2, I accelerated ray-scene intersection using a bounding volume hierarchy (BVH),
                    including BVH construction, axis-aligned bounding box intersection, and recursive BVH traversal.
                    In Part 3, I implemented zero-bounce emission and direct lighting using both uniform hemisphere
                    sampling and light importance sampling. In Part 4, I extended the renderer to global illumination
                    with recursive indirect bounces and Russian Roulette termination. In Part 5, I added adaptive
                    sampling so the renderer can stop early on converged pixels and spend more effort on high-variance
                    regions.
                </p>
                <p className="mb-6">
                    One of the most important ideas in this assignment is that the rendering pipeline is layered.
                    Camera rays are generated in world space, tested against geometry efficiently through the BVH,
                    and then shaded by evaluating how much radiance arrives at the hit point from lights or emissive
                    surfaces. Another major theme is the difference between correctness and efficiency: the primitive
                    intersections and lighting logic can be mathematically correct, but without acceleration structures
                    or good sampling strategies, renders are either too slow or too noisy to be practical.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Part 1: Ray Generation and Scene Intersection</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">Rendering Pipeline Walkthrough</h3>
                <p className="mb-4">
                    The rendering process starts in <code className="bg-gray-100 px-1 rounded text-sm">PathTracer::raytrace_pixel(...)</code>,
                    which takes a pixel coordinate and estimates the radiance over that pixel by averaging multiple
                    sampled camera rays. For each sample, the code jitters a point within the pixel, normalizes the
                    coordinates into the camera sensor domain, and calls <code className="bg-gray-100 px-1 rounded text-sm">Camera::generate_ray(...)</code>.
                </p>
                <p className="mb-4">
                    Inside <code className="bg-gray-100 px-1 rounded text-sm">Camera::generate_ray(...)</code>, the normalized image
                    coordinates are mapped onto the virtual sensor plane at <code className="bg-gray-100 px-1 rounded text-sm">z = -1</code> in
                    camera space. The sensor extents are determined from <code className="bg-gray-100 px-1 rounded text-sm">hFov</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">vFov</code>, and the sampled sensor point is transformed into a
                    world-space ray direction using the camera-to-world matrix <code className="bg-gray-100 px-1 rounded text-sm">c2w</code>.
                    The ray origin is the camera position <code className="bg-gray-100 px-1 rounded text-sm">pos</code>, and the ray segment
                    bounds are initialized to the near and far clipping planes.
                </p>
                <p className="mb-4">
                    That ray is then passed into <code className="bg-gray-100 px-1 rounded text-sm">est_radiance_global_illumination(...)</code>,
                    which asks the BVH whether the ray intersects any primitive in the scene. In Part 1, the returned
                    value is used for debugging and normal shading. Triangle and sphere intersections update the ray&apos;s{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">max_t</code> whenever a closer hit is found, so subsequent tests
                    can ignore farther intersections. If a hit occurs, the intersection record stores the hit time,
                    shading normal, primitive pointer, and BSDF pointer for later lighting computations.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Triangle Intersection Algorithm</h3>
                <p className="mb-4">
                    I implemented ray-triangle intersection using the Moller-Trumbore formulation. Let the triangle
                    edges be <code className="bg-gray-100 px-1 rounded text-sm">e1 = p2 - p1</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">e2 = p3 - p1</code>, and let{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">s = r.o - p1</code>. I solve for the barycentric coordinates and
                    hit time by expressing the ray-triangle intersection in terms of the triangle basis and computing
                    the determinant:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    det = (r.d x e2) dot e1
                </p>
                <p className="mb-4">
                    If the determinant is zero, the ray is parallel to the triangle plane and there is no valid
                    intersection. Otherwise, I compute the barycentric coordinates <code className="bg-gray-100 px-1 rounded text-sm">b1</code>{' '}
                    and <code className="bg-gray-100 px-1 rounded text-sm">b2</code>, reject the hit if either is negative or if{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">b1 + b2 &gt; 1</code>, and then solve for the ray parameter{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">t</code>. A hit is valid only if{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">t</code> lies between <code className="bg-gray-100 px-1 rounded text-sm">r.min_t</code>{' '}
                    and <code className="bg-gray-100 px-1 rounded text-sm">r.max_t</code>.
                </p>
                <p className="mb-4">
                    For <code className="bg-gray-100 px-1 rounded text-sm">Triangle::has_intersection(...)</code>, I only test whether
                    such a valid hit exists and then shrink <code className="bg-gray-100 px-1 rounded text-sm">r.max_t</code> to the closer
                    hit. For <code className="bg-gray-100 px-1 rounded text-sm">Triangle::intersect(...)</code>, I additionally compute the
                    remaining barycentric weight <code className="bg-gray-100 px-1 rounded text-sm">b0 = 1 - b1 - b2</code> and interpolate
                    the vertex normals:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    n = normalize(b0 * n1 + b1 * n2 + b2 * n3)
                </p>
                <p className="mb-4">
                    This gives a smoothly varying shading normal across the triangle surface.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Normal Shading Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1CBempty} alt="CBempty.dae normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBempty.dae</code> debug / normal shading sanity check.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1Cube} alt="cube.dae normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dae/simple/cube.dae</code> normal shading.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1Plane} alt="plane.dae normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dae/simple/plane.dae</code> normal shading.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1CBspheres} alt="CBspheres normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBspheres_lambertian.dae</code> normal shading after sphere intersection implementation.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1CBgems} alt="CBgems normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dae/meshedit/gem.dae</code> normal shading.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part1CBcoil} alt="CBcoil normal shading" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dae/meshedit/coil.dae</code> normal shading.
                        </figcaption>
                    </figure>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Part 2: Bounding Volume Hierarchy</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">BVH Construction Algorithm</h3>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">BVHAccel::construct_bvh(...)</code> recursively.
                    For a given primitive range <code className="bg-gray-100 px-1 rounded text-sm">[start, end)</code>, I first compute the
                    world-space bounding box of all primitives in the range. This bounding box becomes the node&apos;s{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">bb</code>.
                </p>
                <p className="mb-4">
                    If the number of primitives in the range is less than or equal to{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">max_leaf_size</code>, I make the node a leaf by storing the
                    iterators <code className="bg-gray-100 px-1 rounded text-sm">start</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">end</code> and stop the recursion.
                </p>
                <p className="mb-4">
                    Otherwise, I build a second bounding box over the centroids of the primitive bounding boxes. I
                    choose the split axis to be the axis with the largest centroid extent, since splitting along the axis
                    of greatest spatial spread tends to produce the most balanced partition. I then split the primitives
                    at the midpoint of that centroid range using <code className="bg-gray-100 px-1 rounded text-sm">std::partition(...)</code>.
                </p>
                <p className="mb-4">
                    This midpoint split can fail if all centroids lie on one side of the split point, which would produce
                    an empty child and cause infinite recursion. To avoid that, I added a fallback that uses{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">std::nth_element(...)</code> to split the range at the median
                    primitive along the chosen axis. After that, I recursively construct the left and right children.
                </p>
                <p className="mb-4">
                    This heuristic is simple but effective: it is easy to implement, tends to produce balanced trees,
                    and significantly reduces the number of primitive intersection tests compared to the starter
                    one-node BVH.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Bounding Box and BVH Traversal</h3>
                <p className="mb-4">
                    For <code className="bg-gray-100 px-1 rounded text-sm">BBox::intersect(...)</code>, I used the slab method. Along
                    each axis, I compute the interval of ray parameters for which the ray lies between the bounding
                    planes. I intersect these intervals across <code className="bg-gray-100 px-1 rounded text-sm">x</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">y</code>, and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">z</code>, updating the running{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">[t0, t1]</code> range. If the interval ever becomes empty, the ray
                    misses the box.
                </p>
                <p className="mb-4">
                    For BVH traversal, <code className="bg-gray-100 px-1 rounded text-sm">BVHAccel::has_intersection(...)</code> first
                    tests whether the ray intersects the node&apos;s bounding box. If it does not, the whole subtree is
                    discarded. If the node is a leaf, the code checks the primitives in that leaf. If the node is interior,
                    the function recurses into its children and can short-circuit as soon as any hit is found.
                </p>
                <p className="mb-4">
                    <code className="bg-gray-100 px-1 rounded text-sm">BVHAccel::intersect(...)</code> uses the same idea but must
                    return the closest hit, so it cannot stop after the first intersection. When both child boxes are hit,
                    I traverse the nearer child first, which tends to shrink <code className="bg-gray-100 px-1 rounded text-sm">ray.max_t</code>{' '}
                    sooner and improves pruning on the second child.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Large-Scene Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part2Cow} alt="cow.dae normal shading with BVH" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>cow.dae</code> normal shading with BVH.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part2Maxplanck} alt="maxplanck.dae rendered with BVH" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>maxplanck.dae</code> rendered with BVH.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part2Lucy} alt="lucy.dae rendered with BVH" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBlucy.dae</code> rendered with BVH.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part2Bunny} alt="bunny.dae rendered with BVH" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>bunny.dae</code> rendered with BVH.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0 md:col-span-2">
                        <img src={part2Beast} alt="beast.dae rendered with BVH" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>beast.dae</code> rendered with BVH.
                        </figcaption>
                    </figure>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Timing Comparison</h3>
                <p className="mb-4">
                    I recorded the following averages over <code className="bg-gray-100 px-1 rounded text-sm">3</code> runs per
                    scene at <code className="bg-gray-100 px-1 rounded text-sm">800x600</code> with{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">8</code> threads:
                </p>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Scene</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Before BVH: avg render time</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Before BVH: avg primitive tests / ray</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">After BVH: avg render time</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">After BVH: avg primitive tests / ray</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>cow.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>3.2705s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>809.37</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>0.0396s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>2.61</code></td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>maxplanck.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>46.4632s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>13050.70</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>0.0499s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>2.85</code></td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>beast.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>79.6017s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>17299.66</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>0.0389s</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>1.82</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mb-4">
                    The improvement is dramatic because the starter code&apos;s one-node BVH behaves like a linear scan
                    over every primitive for every ray, so render time scales badly as scene complexity grows. After
                    implementing BVH construction, box intersection, and recursive traversal, most rays are rejected
                    high in the tree and only descend into a few relevant leaves, which cuts the average primitive tests
                    per ray from hundreds or tens of thousands down to roughly two or three in all three scenes. That
                    reduction translates directly into render-time speedups of roughly <code className="bg-gray-100 px-1 rounded text-sm">82x</code>{' '}
                    for <code className="bg-gray-100 px-1 rounded text-sm">cow.dae</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">931x</code> for{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">maxplanck.dae</code>, and over{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">2000x</code> for{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">beast.dae</code>, turning scenes that previously took
                    seconds or over a minute into renders that complete in a few hundredths of a second.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Part 3: Direct Illumination</h2>

                <h3 className="text-xl font-semibold mt-6 mb-4">Diffuse BSDF</h3>
                <p className="mb-4">
                    I implemented <code className="bg-gray-100 px-1 rounded text-sm">DiffuseBSDF::f(...)</code> as a Lambertian BRDF:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    f(wo, wi) = rho / pi
                </p>
                <p className="mb-4">
                    where <code className="bg-gray-100 px-1 rounded text-sm">rho</code> is the surface reflectance (albedo). This
                    means the material reflects incoming radiance equally in all directions over the hemisphere, scaled
                    by its RGB reflectance.
                </p>
                <p className="mb-4">
                    I also implemented <code className="bg-gray-100 px-1 rounded text-sm">DiffuseBSDF::sample_f(...)</code> using the
                    provided cosine-weighted hemisphere sampler. The function samples an incoming local direction{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">wi</code>, stores the associated PDF, and returns the same
                    Lambertian BRDF value as <code className="bg-gray-100 px-1 rounded text-sm">f(...)</code>. This BSDF sampling
                    routine becomes important for indirect illumination in later parts.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Zero-Bounce Illumination</h3>
                <p className="mb-4">
                    For zero-bounce illumination, I implemented{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">zero_bounce_radiance(...)</code> to return the emission of the
                    intersected surface through <code className="bg-gray-100 px-1 rounded text-sm">isect.bsdf-&gt;get_emission()</code>.
                    I then updated <code className="bg-gray-100 px-1 rounded text-sm">est_radiance_global_illumination(...)</code> to
                    use this value instead of the Part 1 normal-shading debug view.
                </p>
                <p className="mb-4">
                    This means that before implementing direct lighting, emissive geometry such as the Cornell box area
                    light appears correctly while all non-emissive surfaces remain black.
                </p>
                <p className="mb-4">
                    I used this as an intermediate debugging step before enabling the one-bounce direct-lighting
                    estimators.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Direct Lighting with Uniform Hemisphere Sampling</h3>
                <p className="mb-4">
                    In <code className="bg-gray-100 px-1 rounded text-sm">estimate_direct_lighting_hemisphere(...)</code>, I estimate
                    direct illumination by sampling random directions uniformly over the hemisphere around the shading
                    point. For each sampled local direction <code className="bg-gray-100 px-1 rounded text-sm">wi</code>, I transform
                    it to world space, cast a shadow ray from the hit point, and check whether the ray first hits an
                    emissive object. If it does, I accumulate:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    Lo ~= (1 / N) * sum( f(wo, wi_k) * Li_k * cos(theta_k) / p(wi_k) )
                </p>
                <p className="mb-4">
                    where <code className="bg-gray-100 px-1 rounded text-sm">p(wi) = 1 / (2pi)</code> for uniform hemisphere sampling.
                    This estimator is unbiased, but it is noisy because most sampled directions do not hit a light source.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Direct Lighting with Importance Sampling Lights</h3>
                <p className="mb-4">
                    In <code className="bg-gray-100 px-1 rounded text-sm">estimate_direct_lighting_importance(...)</code>, instead of
                    sampling arbitrary hemisphere directions, I sample each light source directly using{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">light-&gt;sample_L(...)</code>. This returns the incident radiance,
                    sampled direction, distance to the light, and PDF. I then cast a shadow ray toward that sampled
                    light point, and if the path is not occluded, I accumulate the same reflection equation contribution:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    f(wo, wi) * Li * cos(theta) / p(wi)
                </p>
                <p className="mb-4">
                    The key improvement is that samples are concentrated on directions that actually matter for direct
                    lighting. This greatly reduces noise, especially for area lights, and also lets the renderer correctly
                    handle delta lights such as point lights.
                </p>
                <p className="mb-4">
                    <code className="bg-gray-100 px-1 rounded text-sm">one_bounce_radiance(...)</code> chooses between the two
                    direct-lighting implementations based on <code className="bg-gray-100 px-1 rounded text-sm">direct_hemisphere_sample</code>,
                    so the <code className="bg-gray-100 px-1 rounded text-sm">-H</code> flag toggles the hemisphere estimator while the
                    default path uses light importance sampling.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Direct Lighting Results</h3>
                <p className="mb-4">
                    For the main comparison between the two direct-lighting estimators, I rendered{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBbunny.dae</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBspheres_lambertian.dae</code> at{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">-s 64 -l 32 -m 6</code> both with uniform
                    hemisphere sampling (<code className="bg-gray-100 px-1 rounded text-sm">-H</code>) and with light
                    importance sampling.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3CBbunnyHemisphere} alt="CBbunny rendered with uniform hemisphere sampling" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code>: uniform hemisphere sampling.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3CBbunnyImportance} alt="CBbunny rendered with light importance sampling" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code>: light importance sampling.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3CBspheresHemisphere} alt="CBspheres rendered with uniform hemisphere sampling" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBspheres_lambertian.dae</code>: uniform hemisphere sampling.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3CBspheresImportance} alt="CBspheres rendered with light importance sampling" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBspheres_lambertian.dae</code>: light importance sampling.
                        </figcaption>
                    </figure>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Noise Comparison for Different Light Sample Counts</h3>
                <p className="mb-4">
                    For this comparison, I used <code className="bg-gray-100 px-1 rounded text-sm">CBbunny.dae</code>, which
                    contains an area light, fixed the camera sample count to{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">-s 1</code>, and varied only the number of light samples{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">-l</code> while using light importance sampling
                    (no <code className="bg-gray-100 px-1 rounded text-sm">-H</code>). As expected, the soft-shadow noise decreases steadily
                    as more light samples are taken.
                </p>
                <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Command / setting</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Observation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>l=1</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>./build/pathtracer -t 8 -s 1 -l 1 -m 1 -r 480 360 -f "Part 3/bunny_l1.png" dae/sky/CBbunny.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2">Highest variance; the penumbra and shadowed floor are very speckled.</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>l=4</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>./build/pathtracer -t 8 -s 1 -l 4 -m 1 -r 480 360 -f "Part 3/bunny_l4.png" dae/sky/CBbunny.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2">Noise drops noticeably, but the soft shadow still has visible grain.</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>l=16</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>./build/pathtracer -t 8 -s 1 -l 16 -m 1 -r 480 360 -f "Part 3/bunny_l16.png" dae/sky/CBbunny.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2">The shadow boundary is much cleaner and variance is substantially lower.</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2"><code>l=64</code></td>
                                <td className="border border-gray-300 px-4 py-2"><code>./build/pathtracer -t 8 -s 1 -l 64 -m 1 -r 480 360 -f "Part 3/bunny_l64.png" dae/sky/CBbunny.dae</code></td>
                                <td className="border border-gray-300 px-4 py-2">Very smooth soft shadows with only small residual noise.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3BunnyL1} alt="CBbunny with 1 light sample" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code> with <code>-l 1</code> and <code>-s 1</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3BunnyL4} alt="CBbunny with 4 light samples" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code> with <code>-l 4</code> and <code>-s 1</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3BunnyL16} alt="CBbunny with 16 light samples" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code> with <code>-l 16</code> and <code>-s 1</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part3BunnyL64} alt="CBbunny with 64 light samples" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny.dae</code> with <code>-l 64</code> and <code>-s 1</code>.
                        </figcaption>
                    </figure>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Hemisphere vs. Importance Sampling Analysis</h3>
                <p className="mb-6">
                    Across <code className="bg-gray-100 px-1 rounded text-sm">CBbunny</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBspheres_lambertian</code>, the same pattern
                    shows up clearly: uniform hemisphere sampling does converge to the correct direct-lighting solution,
                    but it spends most of its samples on directions that never reach the light, so the images retain
                    noticeable noise and blotchy soft shadows even at{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">64</code> camera rays and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">32</code> light samples. Light importance sampling is
                    much more effective because it draws samples directly from the scene lights, so a much larger
                    fraction of the work contributes useful radiance at the hit point. In the bunny render this produces
                    a noticeably cleaner penumbra and smoother shading on the model, and in{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBspheres_lambertian</code> it gives a more stable
                    estimate across the lit walls, floor, and contact shadows around the spheres. The hemisphere
                    version is useful as a baseline and for understanding the rendering equation estimator, but the
                    importance-sampled version is clearly the more practical method for rendering direct illumination
                    with low noise.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Part 4: Global Illumination</h2>
                <p className="mb-4">
                    For Part 4, I extended the renderer from direct illumination only to full global illumination by
                    recursively tracing indirect bounce rays. All images in this section were rendered at{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">1024</code> samples per pixel. For the comparisons
                    below, I used <code className="bg-gray-100 px-1 rounded text-sm">4</code> light samples and the same
                    camera/resolution settings as the earlier sanity renders unless otherwise noted.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Indirect Lighting Implementation</h3>
                <p className="mb-4">
                    I implemented indirect lighting in{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">PathTracer::at_least_one_bounce_radiance(...)</code>.
                    At each surface hit, I first build the local shading frame from the surface normal and convert the
                    outgoing world-space direction into local coordinates. If accumulated bounces are enabled, I add
                    the one-bounce direct-lighting estimate immediately; if accumulated bounces are disabled, I only add
                    the direct-lighting term when the recursion reaches the final remaining bounce, which isolates the
                    exact <code className="bg-gray-100 px-1 rounded text-sm">m</code>th bounce contribution.
                </p>
                <p className="mb-4">
                    If the ray has remaining depth, I sample the BSDF using{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">sample_f(...)</code> to obtain a local incoming
                    direction <code className="bg-gray-100 px-1 rounded text-sm">wi</code>, its PDF, and the BSDF value. I
                    transform that direction back to world space, spawn a new ray from the hit point with{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">min_t = EPS_F</code>, decrement the depth, and
                    intersect it against the BVH. If the bounce ray hits another surface, I recursively evaluate the
                    radiance arriving along that bounce and weight it by
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    f(wo, wi) * cos(theta) / p(wi)
                </p>
                <p className="mb-4">
                    before adding it to the outgoing estimate.
                </p>
                <p className="mb-4">
                    For Russian Roulette, I always trace the first indirect bounce whenever{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">max_ray_depth &gt; 1</code>, so indirect illumination is
                    guaranteed to appear once enabled. After that first indirect bounce, I terminate paths
                    probabilistically with continuation probability <code className="bg-gray-100 px-1 rounded text-sm">0.65</code>.
                    Whenever a path survives, I divide the recursive contribution by that continuation probability so
                    the estimator remains unbiased.
                </p>
                <p className="mb-4">
                    Finally, <code className="bg-gray-100 px-1 rounded text-sm">est_radiance_global_illumination(...)</code>{' '}
                    combines zero-bounce emission with the recursive bounce estimator, so the final pixel color includes
                    emitted light, direct illumination, and indirect illumination.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Global Illumination Renders</h3>
                <p className="mb-4">
                    Here are four full global-illumination renders at <code className="bg-gray-100 px-1 rounded text-sm">1024</code> spp:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4BunnyAccumM5} alt="CBbunny with global illumination" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny</code>, accumulated bounces, <code>-m 5</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4SpheresGlobalM5} alt="CBspheres_lambertian with global illumination" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBspheres_lambertian</code>, accumulated bounces, <code>-m 5</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4DragonGlobalM5} alt="dragon with global illumination" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dragon</code>, accumulated bounces, <code>-m 5</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4WallEGlobalM5} alt="wall-e with global illumination" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>wall-e</code>, accumulated bounces, <code>-m 5</code>.
                        </figcaption>
                    </figure>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Direct-Only vs. Indirect-Only</h3>
                <p className="mb-4">
                    For this comparison I used <code className="bg-gray-100 px-1 rounded text-sm">CBbunny.dae</code>. The
                    direct-only image uses the normal accumulated renderer with{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">-m 1</code>, so only zero-bounce emission and
                    one-bounce direct lighting are visible. For the indirect-only image, I temporarily skipped the
                    direct-lighting term only at the first camera hit inside{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">at_least_one_bounce_radiance(...)</code> and rendered
                    with <code className="bg-gray-100 px-1 rounded text-sm">-m 5</code>, while still allowing deeper bounces to
                    gather and reflect light normally.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4BunnyAccumM1} alt="CBbunny direct-only" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            Direct-only render with <code>-m 1</code>.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part4BunnyIndirectOnlyM5} alt="CBbunny indirect-only" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            Indirect-only render with <code>-m 5</code>.
                        </figcaption>
                    </figure>
                </div>
                <p className="mb-4 mt-4">
                    The direct-only image contains the primary shading and the hard-to-soft shadow structure from the
                    area light, but regions that are not directly exposed to the light remain comparatively dark. The
                    indirect-only image is much dimmer overall, yet it reveals the light transport that makes path
                    tracing look realistic: soft fill light inside the shadowed parts of the bunny, light reflected onto the
                    floor beneath it, and subtle red/blue color bleeding from the Cornell-box walls. This is exactly the
                    information that a local rasterization-style lighting model misses.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Unaccumulated mth-Bounce Renders</h3>
                <p className="mb-4">
                    With <code className="bg-gray-100 px-1 rounded text-sm">isAccumBounces = false</code> ({' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">-o 0</code>), the renderer shows only the isolated{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">m</code>th bounce contribution for each depth:
                </p>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left"><code>m</code></th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Unaccumulated image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unaccumulatedBounceRenders.map(({ m, src }) => (
                                <tr key={`unaccum-${m}`}>
                                    <td className="border border-gray-300 px-4 py-2 align-top"><code>{m}</code></td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={src} alt={`Unaccumulated bounce ${m}`} className="w-full rounded-lg" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mb-4">
                    The <code className="bg-gray-100 px-1 rounded text-sm">2</code>nd bounce is where global illumination
                    first becomes visually obvious: light that hit the floor and walls on the first bounce is reflected
                    back onto the bunny and into the shadowed parts of the box, so the image gains soft fill light that is
                    absent from direct illumination alone. The <code className="bg-gray-100 px-1 rounded text-sm">3</code>rd
                    bounce is dimmer, but it adds another layer of interreflection and makes the red and blue wall tints
                    bleed more naturally into nearby surfaces. Together, these higher bounces are what make the scene
                    feel like real diffuse light transport instead of a purely local shading model, which is why path
                    traced images look richer and more realistic than rasterized renders with only direct lighting.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Accumulated vs. Unaccumulated Bounces</h3>
                <p className="mb-4">
                    The table below compares accumulated and unaccumulated renders for{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBbunny.dae</code> at{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">m = 0, 1, 2, 3, 4, 5</code>:
                </p>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left"><code>m</code></th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Accumulated (<code>-o 1</code>)</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Unaccumulated (<code>-o 0</code>)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accumulatedVsUnaccumulatedRenders.map(({ m, accum, unaccum }) => (
                                <tr key={`accum-vs-unaccum-${m}`}>
                                    <td className="border border-gray-300 px-4 py-2 align-top"><code>{m}</code></td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={accum} alt={`Accumulated bounce ${m}`} className="w-full rounded-lg" />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={unaccum} alt={`Unaccumulated bounce ${m}`} className="w-full rounded-lg" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mb-4">
                    The accumulated series converges quickly toward the final appearance: by{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">m = 2</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">m = 3</code>, most of the important soft fill light and
                    color bleeding are already present, and later bounces only make smaller refinements. The
                    unaccumulated series, by contrast, makes it easy to see that each additional bounce contributes
                    less total energy than the previous one. This side-by-side view is useful because it shows both
                    how the final image is built up and why only the first few indirect bounces matter visually in a
                    diffuse Cornell-box scene.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Russian Roulette</h3>
                <p className="mb-4">
                    After enabling Russian Roulette, I rendered{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBbunny.dae</code> with{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">max_ray_depth = 0, 1, 2, 3, 4, 100</code>:
                </p>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left"><code>m</code></th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Russian Roulette render</th>
                            </tr>
                        </thead>
                        <tbody>
                            {russianRouletteRenders.map(({ m, src }) => (
                                <tr key={`rr-${m}`}>
                                    <td className="border border-gray-300 px-4 py-2 align-top"><code>{m}</code></td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={src} alt={`Russian Roulette bounce ${m}`} className="w-full rounded-lg" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mb-6">
                    The important result is that the <code className="bg-gray-100 px-1 rounded text-sm">m = 100</code> image
                    looks extremely close to the shallower accumulated renders because very high-order diffuse bounces
                    contribute only a small amount of additional energy. Russian Roulette makes those deep renders
                    practical by randomly terminating low-contribution paths instead of tracing every path all the way to
                    the maximum depth, while the continuation-probability correction keeps the estimator unbiased.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Sample-Per-Pixel Comparison</h3>
                <p className="mb-4">
                    To cover the convergence behavior with different camera sample counts, I rendered{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">CBspheres_lambertian.dae</code> with{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">4</code> light rays, accumulated bounces
                    enabled, <code className="bg-gray-100 px-1 rounded text-sm">max_ray_depth = 5</code>, and
                    sample-per-pixel counts of <code className="bg-gray-100 px-1 rounded text-sm">1</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">2</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">4</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">8</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">16</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">64</code>, and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">1024</code>.
                </p>
                <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">SPP</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Render</th>
                            </tr>
                        </thead>
                        <tbody>
                            {samplePerPixelRenders.map(({ spp, src }) => (
                                <tr key={`spp-${spp}`}>
                                    <td className="border border-gray-300 px-4 py-2 align-top"><code>{spp}</code></td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={src} alt={`CBspheres at ${spp} spp`} className="w-full rounded-lg" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mb-6">
                    At <code className="bg-gray-100 px-1 rounded text-sm">1</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">2</code> samples per pixel, the Cornell-box walls
                    and both spheres are covered in heavy Monte Carlo speckle, and the floor shadows beneath the
                    spheres are especially unstable. By <code className="bg-gray-100 px-1 rounded text-sm">8</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">16</code> spp, the overall illumination pattern is
                    already correct, but there is still noticeable grain in the back wall gradient, along the sphere
                    silhouettes, and in the soft shadow boundaries. At{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">64</code> spp the image is much more coherent,
                    and by <code className="bg-gray-100 px-1 rounded text-sm">1024</code> spp the remaining variance is very
                    low, so the wall color bleeding and smooth shading across the spheres read clearly. This progression
                    again shows that global illumination converges gradually: even in a simple scene, indirect light and
                    soft shadows need many more camera samples than direct-light-only rendering.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Part 5: Adaptive Sampling</h2>
                <p className="mb-4">
                    Adaptive sampling reduces render time by stopping early on pixels that have already converged
                    while continuing to spend more samples on noisy or difficult regions. In path tracing, flat
                    backgrounds and smoothly lit surfaces often stabilize quickly, but silhouettes, shadow boundaries,
                    contact regions, and highly detailed geometry usually have much higher variance. Instead of forcing
                    every pixel to use the same large sample count, adaptive sampling uses per-pixel statistics to
                    decide whether additional samples are still necessary.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Adaptive Sampling Implementation</h3>
                <p className="mb-4">
                    I implemented adaptive sampling in{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">PathTracer::raytrace_pixel(...)</code>. For each
                    pixel, I still trace camera rays one at a time and accumulate the radiance sum, but I also keep two
                    running scalar statistics based on sample illuminance:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    s1 = sum(x_k), s2 = sum(x_k^2)
                </p>
                <p className="mb-4">
                    where each <code className="bg-gray-100 px-1 rounded text-sm">x_k</code> is the sample illuminance
                    computed with <code className="bg-gray-100 px-1 rounded text-sm">Vector3D::illum()</code>.
                </p>
                <p className="mb-4">
                    Every <code className="bg-gray-100 px-1 rounded text-sm">samplesPerBatch</code> samples, I compute the
                    current mean and variance:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    mu = s1 / n, sigma^2 = (1 / (n - 1)) * (s2 - (s1^2 / n))
                </p>
                <p className="mb-4">
                    Then I estimate the 95% confidence interval half-width:
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    I = 1.96 * sigma / sqrt(n)
                </p>
                <p className="mb-4">
                    and stop sampling the pixel early when
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    I &lt;= maxTolerance * mu
                </p>
                <p className="mb-4">
                    In my implementation, I used the assignment defaults{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">samplesPerBatch = 64</code> and{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">maxTolerance = 0.05</code> for the final renders.
                    If a pixel converges early, the loop exits before reaching the maximum{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">ns_aa</code>; otherwise it continues up to that
                    maximum. I also store the actual number of samples used in{' '}
                    <code className="bg-gray-100 px-1 rounded text-sm">sampleCountBuffer</code>, which lets the renderer
                    produce the sampling-rate visualization showing where adaptive sampling concentrated its effort.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Adaptive Sampling Results</h3>
                <p className="mb-4">For the final adaptive renders, I used:</p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    ./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f &quot;Part 5/bunny_adaptive_2048.png&quot; dae/sky/CBbunny.dae
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    ./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f &quot;Part 5/dragon_adaptive_2048.png&quot; dae/sky/dragon.dae
                </p>
                <p className="mb-4 text-center font-mono bg-gray-50 py-3 px-4 rounded">
                    ./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f &quot;Part 5/wall_e_adaptive_2048.png&quot; dae/sky/wall-e.dae
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5BunnyAdaptive2048} alt="CBbunny adaptive render" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny</code> adaptive render.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5BunnyAdaptive2048Rate} alt="CBbunny adaptive sampling rate" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>CBbunny</code> sampling-rate visualization.
                        </figcaption>
                    </figure>
                </div>
                <p className="mb-4 mt-4">
                    In <code className="bg-gray-100 px-1 rounded text-sm">CBbunny</code>, the rate image shows the classic
                    adaptive-sampling pattern clearly. The smooth walls and large low-variance regions converge quickly
                    and therefore stay at lower sampling rates, while the bunny silhouette, shadow boundaries, and the
                    detailed curvature around the ears, back, and contact shadow require many more samples. That is
                    exactly where Monte Carlo noise is hardest to reduce, so the sampler spends its budget where it
                    matters most.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5DragonAdaptive2048} alt="dragon adaptive render" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dragon</code> adaptive render.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5DragonAdaptive2048Rate} alt="dragon adaptive sampling rate" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>dragon</code> sampling-rate visualization.
                        </figcaption>
                    </figure>
                </div>
                <p className="mb-4 mt-4">
                    The <code className="bg-gray-100 px-1 rounded text-sm">dragon</code> render gives another strong
                    example of adaptive behavior on curved geometry. The empty black background converges very quickly
                    and remains at low sampling rates, while the dragon silhouette, horns, whiskers, ridged back, and
                    the base&apos;s shadow transition stay much hotter in the rate image. Those are precisely the regions
                    with sharp geometric changes and higher Monte Carlo variance, so adaptive sampling naturally
                    concentrates work there.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5WallEAdaptive2048} alt="wall-e adaptive render" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>wall-e</code> adaptive render.
                        </figcaption>
                    </figure>
                    <figure className="flex flex-col items-center my-0">
                        <img src={part5WallEAdaptive2048Rate} alt="wall-e adaptive sampling rate" className="w-full rounded-lg" />
                        <figcaption className="text-center mt-2 text-sm text-gray-600">
                            <code>wall-e</code> sampling-rate visualization.
                        </figcaption>
                    </figure>
                </div>
                <p className="mb-6 mt-4">
                    The <code className="bg-gray-100 px-1 rounded text-sm">wall-e</code> scene shows another useful adaptive
                    pattern: the uniform background and broad flat areas of the ground plane converge relatively fast,
                    while the robot outline, treads, arms, head geometry, and small creases remain at much higher
                    sampling rates. Compared to uniform sampling, this is a more efficient allocation of work because
                    the renderer does not waste thousands of extra samples on large regions that were already stable
                    long before the maximum sample budget was reached.
                </p>

            </div>
        </div>
    );
}
