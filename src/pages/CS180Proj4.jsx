import viserCloud1 from './Graphics/proj4/viser_cloud_1.png';
import viserCloud2 from './Graphics/proj4/viser_cloud_2.png';

import foxOG from './Graphics/proj4/fox.jpg';
import catOG from './Graphics/proj4/cat.jpg';

import foxProgression from './Graphics/proj4/fox_training_progression.png';
import catProgression from './Graphics/proj4/cat_training_progression.png';
import psnrFox from './Graphics/proj4/psnr_curve.png';
import hyperCube from './Graphics/proj4/hyperparameter_grid.png';

import vCloud1 from './Graphics/proj4/vcloud1.png';
import vCloud2 from './Graphics/proj4/vcloud2.png';

import lego1 from './Graphics/proj4/rendered_val_iter_000000.png'
import lego2 from './Graphics/proj4/rendered_val_iter_000500.png'
import lego3 from './Graphics/proj4/rendered_val_iter_001000.png'
import lego4 from './Graphics/proj4/rendered_val_iter_001500.png'
import lego5 from './Graphics/proj4/rendered_val_iter_002000.png'
import lego6 from './Graphics/proj4/rendered_val_iter_002500.png'
import lego7 from './Graphics/proj4/rendered_val_iter_002999.png'
import legoGif from './Graphics/proj4/lego_gif.gif'
import legoDiagrams from './Graphics/proj4/lego-training-charts.png';

import my1 from './Graphics/proj4/rendered_train_iter_000000.png'
import my2 from './Graphics/proj4/rendered_train_iter_001000.png'
import my3 from './Graphics/proj4/rendered_train_iter_002000.png'
import my4 from './Graphics/proj4/rendered_train_iter_003000.png'
import my5 from './Graphics/proj4/rendered_train_iter_004000.png'
import my6 from './Graphics/proj4/rendered_train_iter_005000.png'
import my7 from './Graphics/proj4/rendered_train_iter_006000.png'
import my8 from './Graphics/proj4/rendered_train_iter_007000.png'
import my9 from './Graphics/proj4/rendered_train_iter_008000.png'
import my10 from './Graphics/proj4/rendered_train_iter_009000.png'
import my11 from './Graphics/proj4/rendered_train_iter_009999.png'
import myGif from './Graphics/proj4/z_axis_rotation.gif';
import myDiagram from './Graphics/proj4/my_training_charts.png';

function CS180Proj4() {
    return (
        <div className="text-white flex flex-col items-start m-auto px-20 py-10 font-mono gap-4">
            <h1 className="text-4xl font-bold">Project 4: Neural Radiance Field!</h1>
            <h1 className="text-4xl font-bold w-full text-center">Part 0: <span className="text-green-500">Calibrating Your Camera and Capturing a 3D Scan</span></h1>
            <div>
                <h3 className="text-2xl font-bold">Part 0.1: Shoot the Pictures</h3>
                <br/>
                <p className="text-xl">
                    Part 0 acts as a prelude to the rest of the project requirements. In <b>Part 0.1</b>, I captured
                    a series of calibration tags from varying angles and distances, subsequently using the images to calibrate my camera.
                    In <b>Part 0.2</b>, I covered all of the tags expect one, placed a bottle of Ibuprofen next to the tag, and repeated
                    the process from before. For <b>Part 0.3</b>, I implemented the function <b>solvePnP</b> to estimate the camera pose for each image of
                    the controller. The following screenshots show the cloud of cameras in Viser that show the camera frustums' poses and images. (The 
                    cloud has been flipped to more accurately represent the dome):
                </p>
                <br/>
                <div className="flex flex-row gap-2 justify-between text-center font-bold italic">
                    <div className="flex flex-col text-xl gap-2">
                        <img src={viserCloud1} />
                        <p>View 1</p>
                    </div>
                    <div className="flex flex-col text-xl gap-2">
                        <img src={viserCloud2} />
                        <p>View 2</p>
                    </div>
                </div>
                <br/>
                <p className="text-xl">
                    With the camera intrinsics and pose estimates collected, I distorted the images as part of <b>Part 0.4</b> and
                    packaged everything into a dataset for <b>Part 2.6</b>, as shown later. The only change was that un-distorting
                    and cropping the images would produce inaccurate results, so that step was avoided.
                </p>
            </div>
            <br/>
            <br/>
            <h1 className="text-4xl font-bold w-full text-center">Part 1: <span className="text-red-500">Fit a Neural Field to a 2D Image</span></h1>
            <div>
                <br/>
                <p className="text-xl">
                    As a prelude to the full 3D NeRF implementation, we start in the realm of 2D. The model architecture I used is as follows: <br/>
                    <br/>   <b>Batch Size: </b>10,000
                    <br/>   <b>Training Steps: </b>2,000
                    <br/>   <b>Learning Rate: </b>0.01
                    <br/>   <b>Number of Hidden Layers: </b>4
                    <br/>   <b>Size of Hidden Layers: </b>256 (throughout all hidden layers)
                    <br/> <br/>
                    The above model was used on the provided fox image, as well as an image of stuffed cat that I captured at the Westfield mall in
                    San Jose. The training progression for each can be viewed below:
                </p>
                <br/>
                <br/>
                <div className="flex flex-row justify-between text-xl font-bold">
                    <div className="flex flex-col gap-2 w-5/12">
                        <img src={foxOG} />
                        Original Fox Image
                    </div>
                    <div className="flex flex-col gap-2 w-5/12">
                        <img src={catOG} />
                        Original Cat Image
                    </div>
                </div>
                <br/>
                <br/>
                <div className="flex flex-col gap-2 w-full text-xl font-bold">
                    <img src={foxProgression} />
                    Fox Image Training Progression (Staff Provided)
                </div>
                <br />
                <div className="flex flex-col gap-2 w-full text-xl font-bold">
                    <img src={catProgression} />
                    Cat Image Training Progression (Mine)
                </div>
                <br/>
                <br/>
                <p>
                    The PSNR curve for the fox image training can be viewed below:
                </p>
                <br/>
                <div className="flex flex-col gap-2 text-lg font-bold">
                    <img src={psnrFox} />
                    PSNR Curve: Fox Image
                </div>
                <br />
                <br />
                <p>
                    When training the fox image, I experimented with different values of L and width, 
                    the positional encoding frequency and number of channels in the hidden layers, respectively. 
                    The effects found in 4 experimental combos can be seen below, on the fox image.
                </p>
                <br />
                <br />
                <div className="flex flex-col gap-2 text-lg font-bold">
                    <img src={hyperCube} />
                    Experimenting with low hyperparameters
                </div>
                <br />
                <br />
            </div>
            <h1 className="text-4xl font-bold w-full text-center">Part 2: <span className="text-blue-500">Fit a Neural Radiance Field from Multi-view Images</span></h1>
            <div>
                <p className="text-2xl font-bold">
                    Now we're entering the realm of 3D. For each of the subpart's various components, I've included an
                    explanation of my implementation.
                </p>
                <br />
                <br />
                <h3 className="text-2xl font-bold">Part 2.1: Create Rays from Cameras</h3>
                <div>
                    <br />
                    For this part, I implemented the outlined utility functions. 
                    I created get_K_matrix to construct the camera intrinsic matrix K from 
                    focal length, image height, and width; the camera_intrinsic value from Part 0
                    was not working correctly for me so I decided to reimplement it. 
                    I also developed transform to move 3D points from camera to world 
                    coordinates using the camera-to-world (c2w) matrix.
                     Then, I implemented pixel_to_camera to convert 2D pixel coordinates and 
                     a depth scalar into 3D camera coordinates. Finally, I integrated these 
                     functions into pixel_to_ray to generate ray origins and normalized ray 
                     directions in world coordinates for given pixels, a camera pose, and the 
                     intrinsic matrix.
                    <br />
                    <br />
                </div>
                <h3 className="text-2xl font-bold">Part 2.2: Sampling & Part 2.3: Putting the Dataloading All Together</h3>
                <div>
                    <br />
                    I implemented generate_image_rays_data to iterate through training 
                    images and camera poses, computing ray origins and directions for 
                    every pixel and flattening them with their corresponding pixel colors. 
                    I also created sample_along_rays to generate 3D sample points along 
                    rays between near and far bounds, with an option for perturbation. I 
                    then designed the RaysData class to encapsulate the dataset, 
                    pre-computing all ray data and providing a sample_rays method for 
                    batch sampling during training.
                    <br /><br />
                    The result of this work can be seen below in the Visualization of rays and samples with cameras, using the 
                    100 rays alloted.
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2 text-lg font-bold italic">
                            <img src={vCloud1} />
                            View 1
                        </div>
                        <div className="flex flex-col gap-2 text-lg font-bold italic">
                            <img src={vCloud2} />
                            View 2
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
                <h3 className="text-2xl font-bold">Part 2.4: Neural Radiance Field</h3>
                <div>
                    <br />
                    In 2.4, I defined the core NeRF model architecture using the MLP guide provided 
                    in the project spec. I implemented PositionalEncoder to expand input data 
                    into a higher-dimensional representation using sinusoidal functions. My 
                    NeRF class, a PyTorch nn.Module, consists of two MLPs: one for spatial 
                    position (x) to predict density (sigma) and a feature vector, and 
                    another for view direction (d) to predict RGB color. I included skip
                    connections in the position MLP to improve information flow.
                    <br />
                    <br />
                    <br />
                </div>
                <h3 className="text-2xl font-bold">Part 2.5: Volume Rendering</h3>
                <div>
                    <br />
                    I used all the components together for training the NeRF model on the 
                    Lego dataset. I implemented volrend to perform differentiable volume 
                    rendering, compositing predicted sigmas and rgbs along a ray into a 
                    final pixel color. I also included a psnr function for evaluating 
                    image quality. My training loop initializes the NeRF model, optimizer, 
                    and loss function. Iteratively, I sample ray batches, predict colors 
                    using render_rays, calculate the loss, and update model weights. 
                    Periodically, I evaluate the model on a validation image, saving 
                    the rendered results and tracking PSNR. After training, I generated 
                    plots for metrics and create a GIF of novel views from c2ws_test.
                    <br /><br />
                    Putting this all together, I was able to create the gif pictured below,
                    and estimated 3d rotation around the Lego excavator. Below the aforementioned gif
                    you can view the progress of the NeRF model in estimating a given pose, the validation
                    PSNR curve, and the PSNR curve on the validation set. <b>Note: The gif display on the website
                        stops after 1 loop despite my efforts to fix that. To validate the gif, reload the page and scroll down
                        immediately.
                    </b>
                    <br /><br />
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-center">
                            <img src='./lego_gif.gif' className="w-64" />
                        </div>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <img src={lego1} />
                                0 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego2} />
                                500 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego3} />
                                1000 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego4} />
                                1500 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego5} />
                                2000 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego6} />
                                2500 iterations
                            </div>
                            <div className="flex flex-col gap-2">
                                <img src={lego7} />
                                3000 iterations
                            </div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <img src={legoDiagrams} />
                    </div>
                    <br />
                    <br />
                </div>
                <h3 className="text-2xl font-bold">Part 2.6: Training with your (my) own data</h3>
                <div>
                    <br />
                    <p className="text-xl">
                        With that all set, we can now apply this to the original set of images from Part 0.
                        The only substantial changes made from the previous part was setting <b>near=0.15</b> and 
                        <b>far=0.75</b>, and by setting the number of iterations at 10,000. The training and code was about the same from the starter provided, with the orientation 
                        of the photos we rotate around the y-axis instead of the z-axis. 
                        Once again, the gif has trouble loading somtimes, so if it is not running, reload the page
                        and scroll down and it should work as intended.</p>
                    <br />
                    <br />
                    <div className="flex flex-col gap-2 italic bold text-2xl">
                        <img src={myDiagram} />
                        Training Stats
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            <img src={my1} />
                            0 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my2} />
                            1000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my3} />
                            2000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my4} />
                            3000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my5} />
                            4000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my6} />
                            5000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my7} />
                            6000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my8} />
                            7000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my9} />
                            8000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my10} />
                            9000 iterations
                        </div>
                        <div className="flex flex-col gap-2">
                            <img src={my11} />
                            10000 iterations
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-2xl font-bold italic items-center">
                        <br/>
                        <br/>
                        <img src={myGif} className="max-w-96" />
                        Final Generated Gif
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CS180Proj4;