import React from "react";
// Using a placeholder for the image, you can replace it with your own HR-themed image.
import image from "./../assets/studio-arrangement-work.jpg";
export default function FooterSection() {
    return (<div>
        {/* Video Banner Section */}
        <div className="relative">
            <img
                src={image} // Replace with your actual HR-themed image
                className="w-full h-[70vh] object-cover"
                alt="Modern office environment"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Empower Your Workforce with Our HR Solutions
                </h1>
                <button className="bg-[#ffa502] text-white px-6 py-3 rounded-lg text-lg">
                    Request a Demo
                </button>
            </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-50 text-gray-700 pt-10 pb-6">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold">Nexora HR Partners</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            30 Great Peter St, WestMinister, <br/>
                            London SW1P 2BJ, United Kingdom
                        </p>
                        {/* Social Media Links */}
                        <div className="flex space-x-4 mt-4">
                            <a href="#" aria-label="Facebook" className="text-[#ffa502]">
                                {/* Insert Facebook Icon */}
                            </a>
                            <a href="#" aria-label="Instagram" className="text-pink-500">
                                {/* Insert Instagram Icon */}
                            </a>
                            <a href="#" aria-label="YouTube" className="text-red-600">
                                {/* Insert YouTube Icon */}
                            </a>
                        </div>
                    </div>
                    {/* Book Now Button */}
                    <button className="bg-[#ffa502] text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
                        Request a Demo
                    </button>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg">About</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600 hover:underline">Our Mission</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">HR Services</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Company News</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Pricing Plans</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Company</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600 hover:underline">Why Choose Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Partnerships</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">FAQ</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">HR Insights Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Support</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-gray-600 hover:underline">Client Portal</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Help Center</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Submit Feedback</a></li>
                            <li><a href="#" className="text-gray-600 hover:underline">Contact Sales</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="font-semibold text-lg">HR Updates</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Subscribe for the latest HR news, tips, and compliance updates.
                        </p>
                        <div className="flex items-center mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button
                                className="bg-[#ffa502] text-white px-4 py-2 rounded-r-md hover:bg-[#ffa502] transition-colors border-t border-b border-r border-[#ffa502]"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>);
}