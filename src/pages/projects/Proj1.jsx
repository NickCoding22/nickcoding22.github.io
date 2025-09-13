import TitleBox from '../utils/TitleBox';
import CaptionedImage from '../utils/CaptionedImage';

// Error images
import badCathedral from '../../Graphics/proj1/first_try_cathedral.jpg';
import badGen from '../../Graphics/proj1/first_try_three_generations.jpg';

// Small Images
import cathedral from '../../Graphics/proj1/final_cathedral.jpg';
import monastery from '../../Graphics/proj1/final_monastery.jpg';
import tobolsk from '../../Graphics/proj1/final_tobolsk.jpg';

// Larger Images
import church from '../../Graphics/proj1/final_church.jpg';
import emir from '../../Graphics/proj1/final_emir.jpg';
import harvesters from '../../Graphics/proj1/final_harvesters.jpg';
import icon from '../../Graphics/proj1/final_icon.jpg';
import italil from '../../Graphics/proj1/final_italil.jpg';
import lastochikino from '../../Graphics/proj1/final_lastochikino.jpg';
import lugano from '../../Graphics/proj1/final_lugano.jpg';
import melons from '../../Graphics/proj1/final_melons.jpg';
import self_portrait from '../../Graphics/proj1/final_self_portrait.jpg';
import siren from '../../Graphics/proj1/final_siren.jpg';
import three_generations from '../../Graphics/proj1/final_three_generations.jpg';

// Misc Images
import napoleon from '../../Graphics/proj1/final_napoleon.jpg';
import dome from '../../Graphics/proj1/final_dome.jpg';
import alupka from '../../Graphics/proj1/final_alupka.jpg';

function Proj0() {
    return (
        <div className="flex flex-col items-center justify-start p-10 pl-4 pt-4 gap-10">
            <div className="flex flex-col items-center gap-4 w-full">
                <TitleBox title="Project 1: Images of the Russian Empire" />
                <TitleBox subtitle title="In project 1 we were presented with a series of greyscale collages of the red, blue, and green glass plate images from the Prokudin-Gorskii collection. With a given collage, we were meant to crop out the individual images, overlay the results, and generate an aligned, fully-colored photo of the original subject. In addition, we were challenged to accomplish this with three sets of photos: smaller jpeg images, larger tif images, and a set of our own choosing from an online collection." />
                <TitleBox title="Part 1: Small images" />
                <TitleBox subtitle title="For the collection of smaller photos I split the image into three equal parts (as defined by the height), placed the results into their own matrices, and then searched an offset window of (-15, 15) to determine the optimal pair of values. For each offset in that range, I shifted one of the matrices by that value, kept the other the same, and calculated the difference between the two resulting matrices. In order to calculate the difference I tried out two metrics: the Euclidean Distance and the Normalized Cross Correlation. For the NCC I centered the pixel values around zero in anticipation of the brightness values altering the ability to properly calculate the similarity, and I negated the result so the metric would be the same as the Euclidean distance (smaller is more similar, larger is less similar). In the end, I ended up using NCC. Thus, the offset that produced the smallest value was the most optimal. I used the Blue data as the static matrix and found the optimal offset for the Green and Red matrices, shifted the matrices by those values, and overlaid them to produce the RGB image. The result of which was an image that was fairly aligned, but blurry:" />
                <div className="flex flex-row justify-around w-full flex-wrap gap-y-4">
                    <CaptionedImage photo={badCathedral} title={"cathedral.jpg"} caption={"Close generation, but blurry"}/>
                    <CaptionedImage photo={badGen} title={"three_generations.jpg"} caption={"Close generation, but blurry.\nLarger image generated to highlight the error"}/>
                </div>
                <TitleBox subtitle title="I realized that the borders caused issues when generating an accurate alignment for the images. Particularly, the top and bottom borders caused my initial attempt to extract the different filtered images to be faulty as parts of one panel would roll over into another, misrepresenting the color values. To mitigate the border’s impact, I implemented two solutions. First, I cropped out all rows that had pure white values (within a tolerance) to get rid of the top and bottom borders. Second, when computing the difference value I limited the matrix to the inner 80% of values (removing the 20% of the rows and 20% of the columns from the border). In doing so I was able to get the desired result for all of the small photos, as displayed below:" />
                <div className="flex flex-row justify-between w-full flex-wrap gap-y-4">
                    <CaptionedImage photo={cathedral} title={"cathedral.jpg"} caption={"Green to Blue: (2, 3)\nRed to Blue: (3, 8)"}/>
                    <CaptionedImage photo={monastery} title={"monastery.jpg"} caption={"Green to Blue: (2, -8)\nRed to Blue: (2, -7)"}/>
                    <CaptionedImage photo={tobolsk} title={"tobolsk.jpg"} caption={"Green to Blue: (3, 3)\nRed to Blue: (3, 6)"}/>
                </div>
                <TitleBox title="Part 2: Large Images" />
                <TitleBox subtitle title="With the larger files in the .tif files, I implemented the image pyramid for greater speed in searching a wider area. Specifically, with a set of the three color channel images I iterated from a coarser scaling to the original scaling by a power of two (i.e. resizing from 1/(2^3) -> 1/(2^2) -> 1/(2^1) -> 1/(2^0)). So, I would start with an image rescaled to a much smaller size, find the optimal offset from zero, and then use that offset as the starting point for the next iteration. Each successive offset would be calculated using the previous one as the starting point. For example, if the coarsest image produced an offset of (1, 2) and was 100x the original image, then the offset would be (100, 200) in the original scale of the image. Then, the next iteration would start at (2, 4), if that image was 50x the original size. This would be repeated until we reached the original size and derived the optimal offset for the original scaling. This produced great results for all of the larger images, as displayed below. The only exception was emir.tif, as if we created a pyramid with more than 2 levels, it would provide a nonoptimal solution as the varying brightness levels would still have an impact outside of a certain range of displacement." />
                <div className="flex flex-row justify-between w-full flex-wrap gap-y-4">
                    <CaptionedImage photo={emir} title={"emir.jpg"} caption={"Green to Blue: (24, -13)\nRed to Blue: (42, -21)"}/>
                    <CaptionedImage photo={church} title={"church.jpg"} caption={"Green to Blue: (4, -4)\nRed to Blue: (-4, 0)"}/>
                    <CaptionedImage photo={harvesters} title={"harvesters.jpg"} caption={"Green to Blue: (17, 60)\nRed to Blue: (13, 124)"}/>
                    <CaptionedImage photo={icon} title={"icon.jpg"} caption={"Green to Blue: (17, 41)\nRed to Blue: (23, 89)"}/>
                    <CaptionedImage photo={italil} title={"italil.jpg"} caption={"Green to Blue: (21, -9)\nRed to Blue: (35, -18)"}/>
                    <CaptionedImage photo={lastochikino} title={"lastochikino.jpg"} caption={"Green to Blue: (-2, -3)\nRed to Blue: (-9, 75)"}/>
                    <CaptionedImage photo={lugano} title={"lugano.jpg"} caption={"Green to Blue: (-16, -6)\nRed to Blue: (-29, -1)"}/>
                    <CaptionedImage photo={melons} title={"melons.jpg"} caption={"Green to Blue: (10, 1)\nRed to Blue: (13, 17)"}/>
                    <CaptionedImage photo={self_portrait} title={"self_portrait.jpg"} caption={"Green to Blue: (29, 11)\nRed to Blue: (37, 40)"}/>
                    <CaptionedImage photo={siren} title={"siren.jpg"} caption={"Green to Blue: (-6, 4)\nRed to Blue: (-25, 6)"}/>
                    <CaptionedImage photo={three_generations} title={"three_generations.jpg"} caption={"Green to Blue: (14, 53)\nRed to Blue: (11, 112)"}/>
                </div>
                <TitleBox title="Part 3: New Images" />
                <TitleBox subtitle title="In addition, I chose another set of images from the provided website and used the algorithm to derive successful results:" />
                <div className="flex flex-row justify-between w-full flex-wrap gap-y-4">
                    <CaptionedImage photo={napoleon} title={"napoleon.jpg"} caption={"Green to Blue: (1, 1)\nRed to Blue: (0, 3)"}/>
                    <CaptionedImage photo={dome} title={"dome.jpg"} caption={"Green to Blue: (1, -3)\nRed to Blue: (1, -3)"}/>
                    <CaptionedImage photo={alupka} title={"alupka.jpg"} caption={"Green to Blue: (-1, -2)\nRed to Blue: (-3, 4)"}/>
                </div>
            </div>
        </div>
    )
}

export default Proj0;