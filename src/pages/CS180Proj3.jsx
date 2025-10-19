import leftCar from './Graphics/proj3/before/left_car.jpg';
import rightCar from './Graphics/proj3/before/right_car.jpg';
import carMosaicFirst from './Graphics/proj3/after/left_car_mosaic.jpg';
import carMosaicFinal from './Graphics/proj3/after/car_mosaic_final.jpg';
import carMask from './Graphics/proj3/after/new_mask_9.jpg';


import leftHall from './Graphics/proj3/before/left_hall.jpg';
import rightHall from './Graphics/proj3/before/right_hall.jpg';
import hallMosaicFirst from './Graphics/proj3/after/left_hall_mosaic.jpg';
import hallMosaicFinal from './Graphics/proj3/after/hall_mosaic_final.jpg';
import hallMask from './Graphics/proj3/after/new_mask_7.jpg';

import leftHouse from './Graphics/proj3/before/left_house.jpg';
import rightHouse from './Graphics/proj3/before/right_house.jpg';
import houseMosaicFirst from './Graphics/proj3/after/left_house_mosaic.jpg';
import houseMosaicFinal from './Graphics/proj3/after/house_mosaic_final.jpg';
import houseMask from './Graphics/proj3/after/new_mask_2.jpg';

import leftHouseCorr from './Graphics/proj3/left_house_corr.png';
import rightHouseCorr from './Graphics/proj3/right_house_corr.png';
import HMatrix from './Graphics/proj3/after/H_matrix.png';

import theWork from './Graphics/proj3/the_work.jpg';
import hDiagram from './Graphics/proj3/homography-diagram.png';

import scratchWork from './Graphics/proj3/before/scratch_work.jpg';
import scratchWorkNN from './Graphics/proj3/after/scratch_work_warped_nn.jpg';
import scratchWorkBL from './Graphics/proj3/after/scratch_work_warped_bilinear.jpg';

import honey from './Graphics/proj3/before/honey.jpg';
import honeyNN from './Graphics/proj3/after/honey_warped_nn.jpg';
import honeyBL from './Graphics/proj3/after/honey_warped_bilinear.jpg';

import harrisDots from './Graphics/proj3/after/harris_poi_left_car.jpg';
import harrisAnms from './Graphics/proj3/after/harris_point_amns_left_car.jpg';

import strongestDesc from './Graphics/proj3/after/first_three_descriptors.jpg';

import leftBest from './Graphics/proj3/after/best_matches_highlighted_left.jpg';
import rightBest from './Graphics/proj3/after/best_matches_highlighted_right.jpg';
import bestCoords from './Graphics/proj3/after/best_coor_points.jpg';

function CS180Proj3() {
    return (
        <div className="text-white flex flex-col items-start m-auto px-20 py-10 font-mono gap-4">
            <h1 className="text-4xl font-bold">Project 3: [Auto]Stitching Photo Mosaics</h1>
            <h1 className="text-4xl font-bold w-full text-center">Part (a): <span className="text-blue-500">Image Warping and Mosaicing</span></h1>
            <div>
                <h3 className="text-2xl font-bold">Part A.1: Shoot the Pictures</h3>
                <br/>
                <p className="">
                    For the following processes, I will be using the sets of images that are displayed 
                    below. <span className="font-bold">The bottom floor of Cory</span> where I have a club meeting, 
                    <span className="font-bold">Hillegass Ave.</span> the street I live on, and <span className="font-bold">a random house</span> on that street. They have been captured by
                    using my phone (iPhone 15 Pro Max) in the landscape orientation and by rotating around the camera.
                </p>
                <br/>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-row justify-around">
                        <img src={leftHall} className="w-5/12" />
                        <img src={rightHall} className="w-5/12" />
                    </div>
                    <div className="flex flex-row justify-around">
                        <img src={leftCar} className="w-5/12" />
                        <img src={rightCar} className="w-5/12" />
                    </div>
                    <div className="flex flex-row justify-around">
                        <img src={leftHouse} className="w-5/12" />
                        <img src={rightHouse} className="w-5/12" />
                    </div>
                </div>
            </div>
            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part A.2: Recover Homographies</h3>
                <br/>
                <div className="flex flex-row justify-between gap-10">
                    <p>
                        For the following parts, we define a homography as the equation <span className="font-extrabold text-green-500">p' = Hp</span> where p and p' are 
                        the set of corresponding points in the 2 images and H is a 3x3 matrix used to transform from one plane to another (see fig. 2.1).
                        Another important point is that H has 8 degrees of freedom, meaning that we can set i = 1, leaving 8 unknowns for
                        us to solve in order to recover the matrix.
                        <br/><br/>
                        As such, we first need to set up a system of linear equations <span className="font-extrabold text-green-500">Ah = b</span> where h is a vector containing
                        all the unknown values of the matrix H: <span className="font-extrabold text-green-500">h = [a b c d e f g h]<sup>T</sup></span>. The derivation of such is shown and explained in
                        fig 2.2.
                        
                    </p>
                    <div className="flex flex-col text-lg">
                        <img src={hDiagram} className="min-w-72" />
                        <p className="w-full font-extrabold">
                            fig. 2.1: <span className="font-normal">p' = Hp</span>
                        </p>
                    </div>
                </div>
                <br/>
                <div>
                    <img src={theWork} className="min-w-72" />
                    <p className="w-full font-extrabold">
                        fig. 2.2: <span className="font-normal">System of Equations Derivation</span>
                    </p>
                </div>
                <br/>
                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <img src={leftHouseCorr} className="min-w-72" />
                        <p className="w-full">
                            Left Image
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img src={rightHouseCorr} className="min-w-72" />
                        <p className="w-full">
                            Right Image
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img src={HMatrix} className="min-w-72" />
                        <p className="w-full">
                            H (Derived from the highlighted points)
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part A.3: Warp the Images</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        Now that we can derive the homography as expected, let's apply it to some images.
                        The first is my original scratch work for A.2 at an off angle. The second is a poster of unknown origin
                        that hangs in my apartment. Comparing the results of the nearest neighbors and bilinear
                        approaches, the results are almost exactly the same. If you zoom in, though, it can be observed that
                        there is a slight blur to the bilinear approach, likely since we averaged from the 4 nearest pixels.
                    </p>
                    <br/>
                    <div className="flex flex-row justify-around text-lg">
                        <div className="flex flex-col gap-2">
                            <img src={scratchWork} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Original
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={scratchWorkNN} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Nearest Neighbors
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={scratchWorkBL} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Bilinear
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-row justify-around text-lg">
                        <div className="flex flex-col gap-2">
                            <img src={honey} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Original
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={honeyNN} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Nearest Neighbors
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={honeyBL} className="border-2 border-white max-h-96" />
                            <p className="w-full font-extrabold">
                                Bilinear
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part A.4: Blend the Images into a Mosaic</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        With the homography and warping working correctly we can now generate some mosaics!
                        The process was simply taking a set of 2 photos, designating one as a base and the other as the warped image.
                        Using the bilinear approach established in A.3, I warped the designated "warped image", and what its pixel coordinates would be relative to 
                        that of the base image. With that, I placed both images on a fully-black canvas that reflected all the possible coordinates
                        for both images. Now, with the two images on a common plane I created a gradient by making all pixels with a color value that is not black
                        that is in the warped image but not in the base image and set it white. Then, I created a gradient going from the inside of that
                        base to the inside of the overlapping section between the warped and base image. Using the two photos on the black canvas and the new gradient,
                        I used the multiresolution blending I developed in project 2 to create the blended final mosaic.
                    </p>
                    <br/>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <img src={leftHall} className="max-w-96" />
                            <p>Left Hall (Warp)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={rightHall} className="max-w-96" />
                            <p>Right Hall (Base)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={hallMask} className="max-w-96" />
                            <p>Mask</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={hallMosaicFirst} className="max-w-96" />
                            <p>Manual Mosaic</p>
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <img src={leftCar} className="max-w-96" />
                            <p>Left Car (Warp)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={rightCar} className="max-w-96" />
                            <p>Right Car (Base)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={carMask} className="max-w-96" />
                            <p>Mask</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={carMosaicFirst} className="max-w-96" />
                            <p>Manual Mosaic</p>
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                            <img src={leftHouse} className="max-w-96" />
                            <p>Left House (Warp)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={rightHouse} className="max-w-96" />
                            <p>Right House (Base)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={houseMask} className="max-w-96" />
                            <p>Mask</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={houseMosaicFirst} className="max-w-96" />
                            <p>Manual Mosaic</p>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="text-4xl font-bold w-full text-center">Part (a): <span className="text-blue-500">Feature Matching for Autostitching</span></h1>

            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part B.1: Harris Corner Detection</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        Now that we can produce mosaics, the next step is to improve our 
                        alignment by auto detecting similar points across the images. 
                        The first step is to use Harris Corner detection to find and isolate such points of interest. 
                        Below, are the Harris POI identified on the left car image. 
                        The image to the right uses Adaptive Non-Maximal Suppression (ANMS) to isolate the k=500 strongest
                        points--it isolates those points with the smallest minimum radius where it has the strongest h-value.
                    </p>
                    <br/>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2 w-6/12">
                            <div className="flex flex-col w-9/12">
                                <img src={harrisDots} />
                                Harris Interest Point Detector
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-6/12">
                            <div className="flex flex-col w-9/12">
                                <img src={harrisAnms} />
                                Harris with ANMS: k=500, c=0.9
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part B.2: Feature Descriptor Extraction</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        Following the ANMS implementation, we want to extrapolate information regarding
                        the corners that we've isolated; we want to get the feature descriptions for each Harris corner. 
                        To do this, we extract the feature vectors for each of the corners.
                        This entails selecting the 40x40 area around the coordinate for the given feature, down-sampling it to an 8x8 (using anti-aliasing), 
                        and flattening it into a vector.
                        The feature matricies (8x8 matricies before being converted to vectors) corresponding to the three points with the strongest h-values 
                        are displayed below.
                    </p>
                    <br/>
                    <div className="flex flex-row justify-center">
                        <img src={strongestDesc} />
                    </div>
                </div>
            </div>

            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part B.3: Feature Matching</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        Now that we have feature descriptions for each point of interest, we want to compare them against one another to identify which
                        pairs can be used to generate our mosaics. The best approach is to find the euclidean distance from every feature vector to every other feature vector,
                        and choosing pairs where the nearest vector's distance divided by the second nearest vector's distance is below some threshold. This indicates
                        that it is a good choice, as no other feature description is similar to the pair of features (to satisfiable degree).
                        <br/> <br/>
                        Below are the matching features in the left and right car photos:
                    </p>
                    <br/>
                    <div className="flex flex-row justify-around">
                        <img src={bestCoords} className="" />
                    </div>
                </div>
            </div>

            <div>
                <br/>
                <h3 className="text-2xl font-bold">Part B.4: RANSAC for Robust Homography</h3>
                <br/>
                <div className="flex flex-col">
                    <p>
                        With all of this put together, we can using the RANSAC loop to automatically generate mosaics 
                        for each of the image pairs all the way back in pair A.1. I used the same technique from A.4, and the masks
                        are roughly the same, with minor changes in dimension due to the difference in points used.
                        <br/> <br/>
                        RANSAC Loop: (abbrev. from slides) <br />
                        1. Select four feature pairs (at random) <br />
                        2. Compute homography H (exact)  <br />
                        3. Compute inliers where dist(p2i, H @ p1i) &lt; epsilon <br />
                        4. Loop 1 through 3 for a set number of iterations <br />
                        5. Keep largest set of inliers <br />
                        6. Re-compute least-squares H estimate on all of the inliers
                    </p>
                    <br/>
                    <div className="flex flex-row justify-between text-center">
                        <div className="flex flex-col gap-2">
                            <img src={hallMosaicFirst} />
                            Manual Stitching
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={hallMosaicFinal} />
                            Automatic Stitching
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-row justify-between text-center">
                        <div className="flex flex-col gap-2">
                            <img src={carMosaicFirst} />
                            Manual Stitching
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={carMosaicFinal} />
                            Automatic Stitching
                        </div>
                    </div>
                    <br/>
                    <div className="flex flex-row justify-between text-center">
                        <div className="flex flex-col gap-2">
                            <img src={houseMosaicFirst} />
                            Manual Stitching
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={houseMosaicFinal} />
                            Automatic Stitching
                        </div>
                    </div>
                    <br/>
                    <p>
                        Overall, this has been a really interesting project that has allowed me to better
                        understand the process behind panorama and mosaic creation. The feature matching portion, I think,
                        was the most enlightening, as it allowed me to fully grasp how we can determine optimal
                        connections to make when generating mosaics.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CS180Proj3;