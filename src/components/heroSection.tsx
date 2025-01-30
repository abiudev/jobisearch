import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/home.json";
const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAnimation = () => {
      setIsLoaded(true);
    };

    loadAnimation();
  }, []);

  return (
    <div className="bg-white- text-teal-600">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Get your job search on with Jobisearch
            </h1>
            <p className="text-xl sm:text-2xl mb-8">
              Find your dream job with ease and efficiency.
            </p>
            <button className="bg-teal-600 text-white font-bold py-3 px-6 rounded-full hover:bg-teal-100 transition duration-300">
              Start Searching
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {isLoaded && <Lottie animationData={animationData} loop={true} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
