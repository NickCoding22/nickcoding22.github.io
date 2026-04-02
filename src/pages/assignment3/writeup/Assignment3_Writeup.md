# CS 184/284A Spring 2026 — Homework 3 Write-Up

**Names:** [Your name(s)]

**Partner:** None

**Link to webpage:** [TODO]  
**Link to GitHub repository:** https://github.com/cal-cs184-student/hw3-pathtracer-nick_hw3

---

## Overview

In this assignment I built the core of a physically based path tracer in stages. In Part 1, I implemented camera ray generation, pixel sampling, and primitive-ray intersection for triangles and spheres. In Part 2, I accelerated ray-scene intersection using a bounding volume hierarchy (BVH), including BVH construction, axis-aligned bounding box intersection, and recursive BVH traversal. In Part 3, I implemented zero-bounce emission and direct lighting using both uniform hemisphere sampling and light importance sampling. In Part 4, I extended the renderer to global illumination with recursive indirect bounces and Russian Roulette termination. In Part 5, I added adaptive sampling so the renderer can stop early on converged pixels and spend more effort on high-variance regions.

One of the most important ideas in this assignment is that the rendering pipeline is layered. Camera rays are generated in world space, tested against geometry efficiently through the BVH, and then shaded by evaluating how much radiance arrives at the hit point from lights or emissive surfaces. Another major theme is the difference between correctness and efficiency: the primitive intersections and lighting logic can be mathematically correct, but without acceleration structures or good sampling strategies, renders are either too slow or too noisy to be practical.

---

## Part 1: Ray Generation and Scene Intersection

### Rendering Pipeline Walkthrough

The rendering process starts in `PathTracer::raytrace_pixel(...)`, which takes a pixel coordinate and estimates the radiance over that pixel by averaging multiple sampled camera rays. For each sample, the code jitters a point within the pixel, normalizes the coordinates into the camera sensor domain, and calls `Camera::generate_ray(...)`.

Inside `Camera::generate_ray(...)`, the normalized image coordinates are mapped onto the virtual sensor plane at `z = -1` in camera space. The sensor extents are determined from `hFov` and `vFov`, and the sampled sensor point is transformed into a world-space ray direction using the camera-to-world matrix `c2w`. The ray origin is the camera position `pos`, and the ray segment bounds are initialized to the near and far clipping planes.

That ray is then passed into `est_radiance_global_illumination(...)`, which asks the BVH whether the ray intersects any primitive in the scene. In Part 1, the returned value is used for debugging and normal shading. Triangle and sphere intersections update the ray's `max_t` whenever a closer hit is found, so subsequent tests can ignore farther intersections. If a hit occurs, the intersection record stores the hit time, shading normal, primitive pointer, and BSDF pointer for later lighting computations.

### Triangle Intersection Algorithm

I implemented ray-triangle intersection using the Moller-Trumbore formulation. Let the triangle edges be `e1 = p2 - p1` and `e2 = p3 - p1`, and let `s = r.o - p1`. I solve for the barycentric coordinates and hit time by expressing the ray-triangle intersection in terms of the triangle basis and computing the determinant:

\[
\text{det} = (r.d \times e_2) \cdot e_1
\]

If the determinant is zero, the ray is parallel to the triangle plane and there is no valid intersection. Otherwise, I compute the barycentric coordinates \(b_1\) and \(b_2\), reject the hit if either is negative or if \(b_1 + b_2 > 1\), and then solve for the ray parameter \(t\). A hit is valid only if \(t\) lies between `r.min_t` and `r.max_t`.

For `Triangle::has_intersection(...)`, I only test whether such a valid hit exists and then shrink `r.max_t` to the closer hit. For `Triangle::intersect(...)`, I additionally compute the remaining barycentric weight \(b_0 = 1 - b_1 - b_2\) and interpolate the vertex normals:

\[
n = \text{normalize}(b_0 n_1 + b_1 n_2 + b_2 n_3)
\]

This gives a smoothly varying shading normal across the triangle surface.

### Normal Shading Results

**[Insert: `./images/part1_cbempty.png` — `CBempty.dae` debug / normal shading sanity check]**

**[Insert: `./images/part1_cube.png` — `dae/simple/cube.dae` normal shading]**

**[Insert: `./images/part1_plane.png` — `dae/simple/plane.dae` normal shading]**

**[Insert: `./images/part1_gem.png` — `dae/meshedit/gem.dae` normal shading]**

**[Insert: `./images/part1_coil.png` — `dae/meshedit/coil.dae` normal shading]**

**[Insert: `./images/part1_cbspheres.png` — `CBspheres_lambertian.dae` normal shading after sphere intersection implementation]**

---

## Part 2: Bounding Volume Hierarchy

### BVH Construction Algorithm

I implemented `BVHAccel::construct_bvh(...)` recursively. For a given primitive range `[start, end)`, I first compute the world-space bounding box of all primitives in the range. This bounding box becomes the node's `bb`.

If the number of primitives in the range is less than or equal to `max_leaf_size`, I make the node a leaf by storing the iterators `start` and `end` and stop the recursion.

Otherwise, I build a second bounding box over the centroids of the primitive bounding boxes. I choose the split axis to be the axis with the largest centroid extent, since splitting along the axis of greatest spatial spread tends to produce the most balanced partition. I then split the primitives at the midpoint of that centroid range using `std::partition(...)`.

This midpoint split can fail if all centroids lie on one side of the split point, which would produce an empty child and cause infinite recursion. To avoid that, I added a fallback that uses `std::nth_element(...)` to split the range at the median primitive along the chosen axis. After that, I recursively construct the left and right children.

This heuristic is simple but effective: it is easy to implement, tends to produce balanced trees, and significantly reduces the number of primitive intersection tests compared to the starter one-node BVH.

### Bounding Box and BVH Traversal

For `BBox::intersect(...)`, I used the slab method. Along each axis, I compute the interval of ray parameters for which the ray lies between the bounding planes. I intersect these intervals across `x`, `y`, and `z`, updating the running `[t0, t1]` range. If the interval ever becomes empty, the ray misses the box.

For BVH traversal, `BVHAccel::has_intersection(...)` first tests whether the ray intersects the node's bounding box. If it does not, the whole subtree is discarded. If the node is a leaf, the code checks the primitives in that leaf. If the node is interior, the function recurses into its children and can short-circuit as soon as any hit is found.

`BVHAccel::intersect(...)` uses the same idea but must return the closest hit, so it cannot stop after the first intersection. When both child boxes are hit, I traverse the nearer child first, which tends to shrink `ray.max_t` sooner and improves pruning on the second child.

### Large-Scene Results

**[Insert: `./images/part2_cow.png` — `cow.dae` normal shading with BVH]**

**[Insert: `./images/part2_lucy.png` — `CBlucy.dae` rendered with BVH]**

**[Insert: `./images/part2_maxplanck.png` — `maxplanck.dae` rendered with BVH]**

**[Insert: `./images/part2_beast.png` — `beast.dae` rendered with BVH]**

**[Insert: `./images/part2_bunny.png` — `bunny.dae` rendered with BVH]**

### Timing Comparison

I recorded the following averages over `3` runs per scene at `800x600` with `8` threads:

| Scene | Before BVH: avg render time | Before BVH: avg primitive tests / ray | After BVH: avg render time | After BVH: avg primitive tests / ray |
|-------|------------------------------|----------------------------------------|-----------------------------|---------------------------------------|
| `cow.dae` | `3.2705s` | `809.37` | `0.0396s` | `2.61` |
| `maxplanck.dae` | `46.4632s` | `13050.70` | `0.0499s` | `2.85` |
| `beast.dae` | `79.6017s` | `17299.66` | `0.0389s` | `1.82` |

The improvement is dramatic because the starter code's one-node BVH behaves like a linear scan over every primitive for every ray, so render time scales badly as scene complexity grows. After implementing BVH construction, box intersection, and recursive traversal, most rays are rejected high in the tree and only descend into a few relevant leaves, which cuts the average primitive tests per ray from hundreds or tens of thousands down to roughly two or three in all three scenes. That reduction translates directly into render-time speedups of roughly `82x` for `cow.dae`, `931x` for `maxplanck.dae`, and over `2000x` for `beast.dae`, turning scenes that previously took seconds or over a minute into renders that complete in a few hundredths of a second.

---

## Part 3: Direct Illumination

### Diffuse BSDF

I implemented `DiffuseBSDF::f(...)` as a Lambertian BRDF:

\[
f(\omega_o, \omega_i) = \frac{\rho}{\pi}
\]

where \(\rho\) is the surface reflectance (albedo). This means the material reflects incoming radiance equally in all directions over the hemisphere, scaled by its RGB reflectance.

I also implemented `DiffuseBSDF::sample_f(...)` using the provided cosine-weighted hemisphere sampler. The function samples an incoming local direction `wi`, stores the associated PDF, and returns the same Lambertian BRDF value as `f(...)`. This BSDF sampling routine becomes important for indirect illumination in later parts.

### Zero-Bounce Illumination

For zero-bounce illumination, I implemented `zero_bounce_radiance(...)` to return the emission of the intersected surface through `isect.bsdf->get_emission()`. I then updated `est_radiance_global_illumination(...)` to use this value instead of the Part 1 normal-shading debug view.

This means that before implementing direct lighting, emissive geometry such as the Cornell box area light appears correctly while all non-emissive surfaces remain black.
I used this as an intermediate debugging step before enabling the one-bounce direct-lighting estimators.

### Direct Lighting with Uniform Hemisphere Sampling

In `estimate_direct_lighting_hemisphere(...)`, I estimate direct illumination by sampling random directions uniformly over the hemisphere around the shading point. For each sampled local direction `wi`, I transform it to world space, cast a shadow ray from the hit point, and check whether the ray first hits an emissive object. If it does, I accumulate:

\[
L_o \approx \frac{1}{N} \sum_{k=1}^{N} \frac{f(\omega_o, \omega_i^{(k)})\,L_i^{(k)}\,\cos\theta^{(k)}}{p(\omega_i^{(k)})}
\]

where \(p(\omega_i) = 1 / (2\pi)\) for uniform hemisphere sampling.

This estimator is unbiased, but it is noisy because most sampled directions do not hit a light source.

### Direct Lighting with Importance Sampling Lights

In `estimate_direct_lighting_importance(...)`, instead of sampling arbitrary hemisphere directions, I sample each light source directly using `light->sample_L(...)`. This returns the incident radiance, sampled direction, distance to the light, and PDF. I then cast a shadow ray toward that sampled light point, and if the path is not occluded, I accumulate the same reflection equation contribution:

\[
\frac{f(\omega_o, \omega_i)\,L_i\,\cos\theta}{p(\omega_i)}
\]

The key improvement is that samples are concentrated on directions that actually matter for direct lighting. This greatly reduces noise, especially for area lights, and also lets the renderer correctly handle delta lights such as point lights.

`one_bounce_radiance(...)` chooses between the two direct-lighting implementations based on `direct_hemisphere_sample`, so the `-H` flag toggles the hemisphere estimator while the default path uses light importance sampling.

### Direct Lighting Results

For the main comparison between the two direct-lighting estimators, I rendered `CBbunny.dae` and `CBspheres_lambertian.dae` at `-s 64 -l 32 -m 6` both with uniform hemisphere sampling (`-H`) and with light importance sampling.

**CBbunny: uniform hemisphere sampling**

![CBbunny rendered with uniform hemisphere sampling](<./Part 3/CBbunny_H_64_32.png>)

**CBbunny: importance sampling lights**

![CBbunny rendered with light importance sampling](<./Part 3/CBbunny_IS_64_32.png>)

**CBspheres: uniform hemisphere sampling**

![CBspheres rendered with uniform hemisphere sampling](<./Part 3/CBspheres_H_64_32.png>)

**CBspheres: importance sampling lights**

![CBspheres rendered with light importance sampling](<./Part 3/CBspheres_IS_64_32.png>)

### Noise Comparison for Different Light Sample Counts

For this comparison, I used `CBbunny.dae`, which contains an area light, fixed the camera sample count to `-s 1`, and varied only the number of light samples `-l` while using light importance sampling (no `-H`). As expected, the soft-shadow noise decreases steadily as more light samples are taken.

| Image | Command / setting | Observation |
|-------|-------------------|-------------|
| `l=1` | `./build/pathtracer -t 8 -s 1 -l 1 -m 1 -r 480 360 -f "Part 3/bunny_l1.png" dae/sky/CBbunny.dae` | Highest variance; the penumbra and shadowed floor are very speckled |
| `l=4` | `./build/pathtracer -t 8 -s 1 -l 4 -m 1 -r 480 360 -f "Part 3/bunny_l4.png" dae/sky/CBbunny.dae` | Noise drops noticeably, but the soft shadow still has visible grain |
| `l=16` | `./build/pathtracer -t 8 -s 1 -l 16 -m 1 -r 480 360 -f "Part 3/bunny_l16.png" dae/sky/CBbunny.dae` | The shadow boundary is much cleaner and variance is substantially lower |
| `l=64` | `./build/pathtracer -t 8 -s 1 -l 64 -m 1 -r 480 360 -f "Part 3/bunny_l64.png" dae/sky/CBbunny.dae` | Very smooth soft shadows with only small residual noise |

![CBbunny with 1 light sample](<./Part 3/bunny_l1.png>)

![CBbunny with 4 light samples](<./Part 3/bunny_l4.png>)

![CBbunny with 16 light samples](<./Part 3/bunny_l16.png>)

![CBbunny with 64 light samples](<./Part 3/bunny_l64.png>)

### Hemisphere vs. Importance Sampling Analysis

Across `CBbunny` and `CBspheres_lambertian`, the same pattern shows up clearly: uniform hemisphere sampling does converge to the correct direct-lighting solution, but it spends most of its samples on directions that never reach the light, so the images retain noticeable noise and blotchy soft shadows even at `64` camera rays and `32` light samples. Light importance sampling is much more effective because it draws samples directly from the scene lights, so a much larger fraction of the work contributes useful radiance at the hit point. In the bunny render this produces a noticeably cleaner penumbra and smoother shading on the model, and in `CBspheres_lambertian` it gives a more stable estimate across the lit walls, floor, and contact shadows around the spheres. The hemisphere version is useful as a baseline and for understanding the rendering equation estimator, but the importance-sampled version is clearly the more practical method for rendering direct illumination with low noise.

---

## Part 4: Global Illumination

For Part 4, I extended the renderer from direct illumination only to full global illumination by recursively tracing indirect bounce rays. All images in this section were rendered at `1024` samples per pixel. For the comparisons below, I used `4` light samples and the same camera/resolution settings as the earlier sanity renders unless otherwise noted.

### Indirect Lighting Implementation

I implemented indirect lighting in `PathTracer::at_least_one_bounce_radiance(...)`. At each surface hit, I first build the local shading frame from the surface normal and convert the outgoing world-space direction into local coordinates. If accumulated bounces are enabled, I add the one-bounce direct-lighting estimate immediately; if accumulated bounces are disabled, I only add the direct-lighting term when the recursion reaches the final remaining bounce, which isolates the exact `m`th bounce contribution.

If the ray has remaining depth, I sample the BSDF using `sample_f(...)` to obtain a local incoming direction `wi`, its PDF, and the BSDF value. I transform that direction back to world space, spawn a new ray from the hit point with `min_t = EPS_F`, decrement the depth, and intersect it against the BVH. If the bounce ray hits another surface, I recursively evaluate the radiance arriving along that bounce and weight it by

\[
\frac{f(\omega_o, \omega_i)\cos\theta}{p(\omega_i)}
\]

before adding it to the outgoing estimate.

For Russian Roulette, I always trace the first indirect bounce whenever `max_ray_depth > 1`, so indirect illumination is guaranteed to appear once enabled. After that first indirect bounce, I terminate paths probabilistically with continuation probability `0.65`. Whenever a path survives, I divide the recursive contribution by that continuation probability so the estimator remains unbiased.

Finally, `est_radiance_global_illumination(...)` combines zero-bounce emission with the recursive bounce estimator, so the final pixel color includes emitted light, direct illumination, and indirect illumination.

### Global Illumination Renders

Here are four full global-illumination renders at `1024` spp:

**CBbunny, accumulated bounces, `-m 5`**

![CBbunny with global illumination](<./Part 4/bunny_accum_m5.png>)

**CBspheres_lambertian, accumulated bounces, `-m 5`**

![CBspheres_lambertian with global illumination](<./Part 4/spheres_global_m5.png>)

**dragon, accumulated bounces, `-m 5`**

![dragon with global illumination](<./Part 4/dragon_global_m5.png>)

**wall-e, accumulated bounces, `-m 5`**

![wall-e with global illumination](<./Part 4/wall_e_global_m5.png>)

### Direct-Only vs. Indirect-Only

For this comparison I used `CBbunny.dae`. The direct-only image uses the normal accumulated renderer with `-m 1`, so only zero-bounce emission and one-bounce direct lighting are visible. For the indirect-only image, I temporarily skipped the direct-lighting term only at the first camera hit inside `at_least_one_bounce_radiance(...)` and rendered with `-m 5`, while still allowing deeper bounces to gather and reflect light normally.

**Direct-only (`-m 1`)**

![CBbunny direct-only](<./Part 4/bunny_accum_m1.png>)

**Indirect-only (`-m 5`)**

![CBbunny indirect-only](<./Part 4/bunny_indirect_only_m5.png>)

The direct-only image contains the primary shading and the hard-to-soft shadow structure from the area light, but regions that are not directly exposed to the light remain comparatively dark. The indirect-only image is much dimmer overall, yet it reveals the light transport that makes path tracing look realistic: soft fill light inside the shadowed parts of the bunny, light reflected onto the floor beneath it, and subtle red/blue color bleeding from the Cornell-box walls. This is exactly the information that a local rasterization-style lighting model misses.

### Unaccumulated `m`th-Bounce Renders

With `isAccumBounces = false` (`-o 0`), the renderer shows only the isolated `m`th bounce contribution for each depth:

| `m` | Unaccumulated image |
|---|---|
| `0` | ![Unaccumulated bounce 0](<./Part 4/bunny_unaccum_m0.png>) |
| `1` | ![Unaccumulated bounce 1](<./Part 4/bunny_unaccum_m1.png>) |
| `2` | ![Unaccumulated bounce 2](<./Part 4/bunny_unaccum_m2.png>) |
| `3` | ![Unaccumulated bounce 3](<./Part 4/bunny_unaccum_m3.png>) |
| `4` | ![Unaccumulated bounce 4](<./Part 4/bunny_unaccum_m4.png>) |
| `5` | ![Unaccumulated bounce 5](<./Part 4/bunny_unaccum_m5.png>) |

The `2`nd bounce is where global illumination first becomes visually obvious: light that hit the floor and walls on the first bounce is reflected back onto the bunny and into the shadowed parts of the box, so the image gains soft fill light that is absent from direct illumination alone. The `3`rd bounce is dimmer, but it adds another layer of interreflection and makes the red and blue wall tints bleed more naturally into nearby surfaces. Together, these higher bounces are what make the scene feel like real diffuse light transport instead of a purely local shading model, which is why path traced images look richer and more realistic than rasterized renders with only direct lighting.

### Accumulated vs. Unaccumulated Bounces

The table below compares accumulated and unaccumulated renders for `CBbunny.dae` at `m = 0, 1, 2, 3, 4, 5`:

| `m` | Accumulated (`-o 1`) | Unaccumulated (`-o 0`) |
|---|---|---|
| `0` | ![Accumulated bounce 0](<./Part 4/bunny_accum_m0.png>) | ![Unaccumulated bounce 0](<./Part 4/bunny_unaccum_m0.png>) |
| `1` | ![Accumulated bounce 1](<./Part 4/bunny_accum_m1.png>) | ![Unaccumulated bounce 1](<./Part 4/bunny_unaccum_m1.png>) |
| `2` | ![Accumulated bounce 2](<./Part 4/bunny_accum_m2.png>) | ![Unaccumulated bounce 2](<./Part 4/bunny_unaccum_m2.png>) |
| `3` | ![Accumulated bounce 3](<./Part 4/bunny_accum_m3.png>) | ![Unaccumulated bounce 3](<./Part 4/bunny_unaccum_m3.png>) |
| `4` | ![Accumulated bounce 4](<./Part 4/bunny_accum_m4.png>) | ![Unaccumulated bounce 4](<./Part 4/bunny_unaccum_m4.png>) |
| `5` | ![Accumulated bounce 5](<./Part 4/bunny_accum_m5.png>) | ![Unaccumulated bounce 5](<./Part 4/bunny_unaccum_m5.png>) |

The accumulated series converges quickly toward the final appearance: by `m = 2` and `m = 3`, most of the important soft fill light and color bleeding are already present, and later bounces only make smaller refinements. The unaccumulated series, by contrast, makes it easy to see that each additional bounce contributes less total energy than the previous one. This side-by-side view is useful because it shows both how the final image is built up and why only the first few indirect bounces matter visually in a diffuse Cornell-box scene.

### Russian Roulette

After enabling Russian Roulette, I rendered `CBbunny.dae` with `max_ray_depth = 0, 1, 2, 3, 4, 100`:

| `m` | Russian Roulette render |
|---|---|
| `0` | ![Russian Roulette bounce 0](<./Part 4/bunny_rr_m0.png>) |
| `1` | ![Russian Roulette bounce 1](<./Part 4/bunny_rr_m1.png>) |
| `2` | ![Russian Roulette bounce 2](<./Part 4/bunny_rr_m2.png>) |
| `3` | ![Russian Roulette bounce 3](<./Part 4/bunny_rr_m3.png>) |
| `4` | ![Russian Roulette bounce 4](<./Part 4/bunny_rr_m4.png>) |
| `100` | ![Russian Roulette bounce 100](<./Part 4/bunny_rr_m100.png>) |

The important result is that the `m = 100` image looks extremely close to the shallower accumulated renders because very high-order diffuse bounces contribute only a small amount of additional energy. Russian Roulette makes those deep renders practical by randomly terminating low-contribution paths instead of tracing every path all the way to the maximum depth, while the continuation-probability correction keeps the estimator unbiased.

### Sample-Per-Pixel Comparison

To cover the convergence behavior with different camera sample counts, I rendered `CBspheres_lambertian.dae` with `4` light rays, accumulated bounces enabled, `max_ray_depth = 5`, and sample-per-pixel counts of `1`, `2`, `4`, `8`, `16`, `64`, and `1024`.

| SPP | Render |
|---|---|
| `1` | ![CBspheres at 1 spp](<./Part 4/spheres_spp_1.png>) |
| `2` | ![CBspheres at 2 spp](<./Part 4/spheres_spp_2.png>) |
| `4` | ![CBspheres at 4 spp](<./Part 4/spheres_spp_4.png>) |
| `8` | ![CBspheres at 8 spp](<./Part 4/spheres_spp_8.png>) |
| `16` | ![CBspheres at 16 spp](<./Part 4/spheres_spp_16.png>) |
| `64` | ![CBspheres at 64 spp](<./Part 4/spheres_spp_64.png>) |
| `1024` | ![CBspheres at 1024 spp](<./Part 4/spheres_spp_1024.png>) |

At `1` and `2` samples per pixel, the Cornell-box walls and both spheres are covered in heavy Monte Carlo speckle, and the floor shadows beneath the spheres are especially unstable. By `8` and `16` spp, the overall illumination pattern is already correct, but there is still noticeable grain in the back wall gradient, along the sphere silhouettes, and in the soft shadow boundaries. At `64` spp the image is much more coherent, and by `1024` spp the remaining variance is very low, so the wall color bleeding and smooth shading across the spheres read clearly. This progression again shows that global illumination converges gradually: even in a simple scene, indirect light and soft shadows need many more camera samples than direct-light-only rendering.

---

## Part 5: Adaptive Sampling

Adaptive sampling reduces render time by stopping early on pixels that have already converged while continuing to spend more samples on noisy or difficult regions. In path tracing, flat backgrounds and smoothly lit surfaces often stabilize quickly, but silhouettes, shadow boundaries, contact regions, and highly detailed geometry usually have much higher variance. Instead of forcing every pixel to use the same large sample count, adaptive sampling uses per-pixel statistics to decide whether additional samples are still necessary.

### Adaptive Sampling Implementation

I implemented adaptive sampling in `PathTracer::raytrace_pixel(...)`. For each pixel, I still trace camera rays one at a time and accumulate the radiance sum, but I also keep two running scalar statistics based on sample illuminance:

\[
s_1 = \sum_{k=1}^{n} x_k,\qquad s_2 = \sum_{k=1}^{n} x_k^2
\]

where each `x_k` is the sample illuminance computed with `Vector3D::illum()`.

Every `samplesPerBatch` samples, I compute the current mean and variance:

\[
\mu = \frac{s_1}{n},\qquad \sigma^2 = \frac{1}{n-1}\left(s_2 - \frac{s_1^2}{n}\right)
\]

Then I estimate the 95% confidence interval half-width:

\[
I = 1.96 \cdot \frac{\sigma}{\sqrt{n}}
\]

and stop sampling the pixel early when

\[
I \leq \text{maxTolerance} \cdot \mu
\]

In my implementation, I used the assignment defaults `samplesPerBatch = 64` and `maxTolerance = 0.05` for the final renders. If a pixel converges early, the loop exits before reaching the maximum `ns_aa`; otherwise it continues up to that maximum. I also store the actual number of samples used in `sampleCountBuffer`, which lets the renderer produce the sampling-rate visualization showing where adaptive sampling concentrated its effort.

### Adaptive Sampling Results

For the final adaptive renders, I used:

`./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f "Part 5/bunny_adaptive_2048.png" dae/sky/CBbunny.dae`

`./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f "Part 5/dragon_adaptive_2048.png" dae/sky/dragon.dae`

`./build/pathtracer -t 8 -s 2048 -a 64 0.05 -l 1 -m 5 -r 480 360 -f "Part 5/wall_e_adaptive_2048.png" dae/sky/wall-e.dae`

**CBbunny adaptive render**

![CBbunny adaptive render](<./Part 5/bunny_adaptive_2048.png>)

**CBbunny sampling rate**

![CBbunny adaptive sampling rate](<./Part 5/bunny_adaptive_2048_rate.png>)

In `CBbunny`, the rate image shows the classic adaptive-sampling pattern clearly. The smooth walls and large low-variance regions converge quickly and therefore stay at lower sampling rates, while the bunny silhouette, shadow boundaries, and the detailed curvature around the ears, back, and contact shadow require many more samples. That is exactly where Monte Carlo noise is hardest to reduce, so the sampler spends its budget where it matters most.

**dragon adaptive render**

![dragon adaptive render](<./Part 5/dragon_adaptive_2048.png>)

**dragon sampling rate**

![dragon adaptive sampling rate](<./Part 5/dragon_adaptive_2048_rate.png>)

The `dragon` render gives another strong example of adaptive behavior on curved geometry. The empty black background converges very quickly and remains at low sampling rates, while the dragon silhouette, horns, whiskers, ridged back, and the base's shadow transition stay much hotter in the rate image. Those are precisely the regions with sharp geometric changes and higher Monte Carlo variance, so adaptive sampling naturally concentrates work there.

**wall-e adaptive render**

![wall-e adaptive render](<./Part 5/wall_e_adaptive_2048.png>)

**wall-e sampling rate**

![wall-e adaptive sampling rate](<./Part 5/wall_e_adaptive_2048_rate.png>)

The `wall-e` scene shows another useful adaptive pattern: the uniform background and broad flat areas of the ground plane converge relatively fast, while the robot outline, treads, arms, head geometry, and small creases remain at much higher sampling rates. Compared to uniform sampling, this is a more efficient allocation of work because the renderer does not waste thousands of extra samples on large regions that were already stable long before the maximum sample budget was reached.

