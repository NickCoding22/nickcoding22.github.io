import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Utils/NavBar';

const baseImagePath = `${process.env.PUBLIC_URL || ''}/cs184/images`;

export default function CS184() {
    const colorList = ["bg-neutral-500", "bg-orange-500", "bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * 6)]);

    // Trigger MathJax to typeset LaTeX when content loads
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
                    CS184/284A Spring 2025 Homework 1 Write-Up
                </h1>
                <div className="text-center mb-6">Name: Nicholas Angelici</div>

                <br />

                Link to webpage: (TODO) <a href="https://cs184.eecs.berkeley.edu/sp25" className="text-blue-600 hover:underline">cs184.eecs.berkeley.edu/sp25</a>

                <br />

                Link to GitHub repository: (TODO) <a href="https://cs184.eecs.berkeley.edu/sp25" className="text-blue-600 hover:underline">cs184.eecs.berkeley.edu/sp25</a>

                <figure className="text-center my-6">
                    <img src={`${baseImagePath}/image1.png`} alt="Lion" className="inline-block w-1/2" />
                    <figcaption>You can add images with captions!</figcaption>
                </figure>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
                <p>
                    Give a high-level overview of what you implemented in this homework. Think about what you've built as a whole. Share your thoughts on what interesting things you've learned from completing the homework.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 1: Drawing Single-Color Triangles</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <p className="my-4">
                    Here is an example 2x2 gridlike structure using an HTML table. Each <b>tr</b> is a row and each <b>td</b> is a column in that row. You might find this useful for framing and showing your result images in an organized fashion.
                </p>
                <div className="flex flex-col items-center my-6">
                    <table className="w-full text-center border-collapse">
                        <tbody>
                            <tr>
                                <td className="text-center p-2">
                                    <img src={`${baseImagePath}/image1.png`} alt="" width="400" />
                                    <figcaption>Caption goes here.</figcaption>
                                </td>
                                <td className="text-center p-2">
                                    <img src={`${baseImagePath}/image2.png`} alt="" width="400" />
                                    <figcaption>Caption goes here.</figcaption>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center p-2">
                                    <img src={`${baseImagePath}/image3.png`} alt="" width="400" />
                                    <figcaption>Caption goes here.</figcaption>
                                </td>
                                <td className="text-center p-2">
                                    <img src={`${baseImagePath}/image4.png`} alt="" width="400" />
                                    <figcaption>Caption goes here.</figcaption>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 2: Antialiasing by Supersampling</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 3: Transforms</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 4: Barycentric coordinates</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 5: "Pixel sampling" for texture mapping</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Task 6: "Level Sampling" with mipmaps for texture mapping</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">(Optional) Task 7: Extra Credit - Draw Something Creative!</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Notes (please remove)</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>You can also add code if you'd like as so: <code className="bg-gray-100 px-1 rounded">code code code</code></li>
                    <li>If you'd like to add math equations,
                        <ul className="list-disc list-inside ml-4 mt-2">
                            <li>You can write inline equations like so: \( a^2 + b^2 = c^2 \)</li>
                            <li>You can write display equations like so: \[ a^2 + b^2 = c^2 \]</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
